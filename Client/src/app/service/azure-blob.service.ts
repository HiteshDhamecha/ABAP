import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AzureBlobService {
  private blobServiceClient: BlobServiceClient;
  private containerClient: any;
  private readonly containerName = environment.CONTAINER; // Update with your container name

  constructor() {
    const sasToken = environment.SAS_TOKEN; // Replace with your Azure Storage SAS Token
    const storageAccount = environment.STORAGE_ACCT; // Replace with your storage account name
    const blobUrl = `https://${storageAccount}.blob.core.windows.net`;

    // Initialize Blob Service Client
    this.blobServiceClient = new BlobServiceClient(`${blobUrl}/?${sasToken}`);
    this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
  }

  // Upload file
  async uploadFile(file: File): Promise<string> {
    const blobName = file.name;
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadData(file, {
        blobHTTPHeaders: { blobContentType: file.type },
      });
      return blockBlobClient.url.split('?')[0];
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // List files in container
  async listFiles(): Promise<string[]> {
    const blobNames: string[] = [];
    for await (const blob of this.containerClient.listBlobsFlat()) {
      blobNames.push(blob.name);
    }
    return blobNames;
  }

  // Download file
  async downloadFile(fileName: string): Promise<Blob> {
    const blobClient = this.containerClient.getBlobClient(fileName);
    const downloadResponse = await blobClient.download();
    return await downloadResponse.blobBody!;
  }
}
