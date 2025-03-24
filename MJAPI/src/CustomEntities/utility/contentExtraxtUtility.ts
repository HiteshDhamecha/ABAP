import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

// Azure Blob Storage Configuration
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.CONTAINER_NAME; // Change this to your container name

// Function to download blob and extract text
export async function extractTextFromBlob(blobName: string): Promise<string> {
    try {
        if (!AZURE_STORAGE_CONNECTION_STRING) {
            throw new Error("Azure Storage connection string is missing.");
        }

        // Create Blob Service Client
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
        const blobClient = containerClient.getBlobClient(blobName);

        // Download the Blob
        const downloadResponse = await blobClient.download();
        const fileBuffer = await streamToBuffer(downloadResponse.readableStreamBody as NodeJS.ReadableStream);

        // Determine file type
        const fileExtension = path.extname(blobName).toLowerCase();
        let extractedText = "";

        if (fileExtension === ".pdf") {
            extractedText = await extractTextFromPDF(fileBuffer);
        } else if (fileExtension === ".docx") {
            extractedText = await extractTextFromWord(fileBuffer);
        } else {
            throw new Error("Unsupported file format. Only PDF and DOCX are supported.");
        }

        return extractedText;
    } catch (error) {
        console.error("Error extracting text:", error);
        throw error;
    }
}

// Function to convert stream to buffer
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });
}

// Function to extract text from PDF
async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
    const data = await pdfParse(fileBuffer);
    return data.text;
}

// Function to extract text from Word file (.docx)
async function extractTextFromWord(fileBuffer: Buffer): Promise<string> {
    const data = await mammoth.extractRawText({ buffer: fileBuffer });
    return data.value;
}

// Example Usage
// (async () => {
//     const blobName = "Cheat-Sheet-Data-Volumes.pdf"; // Change to your blob file
//     const text = await extractTextFromBlob(blobName);
//     console.log("Extracted Text:\n", text);
// })();
