// import fs from "fs";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";

// /**
//  * Extracts text content from a PDF file
//  * @param filePath - Path to the PDF file
//  * @returns Extracted text from the PDF
//  */
// export async function extractTextFromPDF(filePath: string): Promise<string> {
//   const dataBuffer = fs.readFileSync(filePath);
//   const pdfData = await pdfParse(dataBuffer);
//   return pdfData.text;
// }

// /**
//  * Extracts text content from a Word DOCX file
//  * @param filePath - Path to the DOCX file
//  * @returns Extracted text from the DOCX
//  */
// export async function extractTextFromDocx(filePath: string): Promise<string> {
//   const dataBuffer = fs.readFileSync(filePath);
//   const result = await mammoth.extractRawText({ buffer: dataBuffer });
//   return result.value;
// }
