import { Injectable } from '@angular/core';
import { BlobSASPermissions, BlobServiceClient, BlockBlobClient, SASProtocol } from '@azure/storage-blob';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { Metadata, RunView } from '@memberjunction/core';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private md = new Metadata();

    constructor(private user: UserService) { }

    private async connectAndAccessContainer(userID: string, sessionID: string, abstractID: string, fileName: string) {
        try {
            const blobServiceClient = await BlobServiceClient.fromConnectionString(environment.azureStorage.connectionString as string);
            const containerClient = await blobServiceClient.getContainerClient(environment.azureStorage.containerName as string);
            await containerClient.createIfNotExists();
            const blobName = `${userID}/${sessionID}/${abstractID}/${fileName}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            return blockBlobClient;
        } catch (error) {
            console.error(`Couldn't connect to Azure Storage/Container: ${error}`);
            return null;
        }
    }

    private async generateSAS(blob: BlockBlobClient) {
        try {
            const sasToken = await blob.generateSasUrl({
                protocol: SASProtocol.Https,
                expiresOn: new Date(new Date().getTime() + 1000 * 60 * 60 * environment.azureStorage.sasExpiry), //environment file is in hours
                permissions: BlobSASPermissions.parse(environment.azureStorage.sasPermission as string),
            })
            return sasToken;
        } catch (error) {
            console.error(`Couldn't generate SAS: ${error}`)
            return null;
        }
    }

    async upload(file: File, sessionID: string, abstractID: string) {
        try {
            const user = this.user.getUserInfo();
            const blob = await this.connectAndAccessContainer(user.ID, sessionID, abstractID, file.name) as BlockBlobClient;
            if (blob) {
                const blobOptions = { blobHTTPHeaders: { blobContentType: file.type } };
                await blob.uploadFile(file.webkitRelativePath, blobOptions);
                const url = blob.url;
                // Use when the uploaded URL needs to be previewed by the user.
                // const sasToken = await this.generateSAS(blob);
                // if (sasToken) return sasToken;
                // else throw new Error('Error while creating sasToken');
                return url;
            } else throw new Error('Error while connecting to the container');
        } catch (error: any) {
            console.log('Error while uploading file', error);
            return null;
        }
    }

    async get(sessionID: string, abstractID: string) {
        try {
            const rv = new RunView();
            const result = await rv.RunView({
                EntityName: 'Abstracts',
                ExtraFilter: `SessionID = '${sessionID}' AND ID = '${abstractID}'`,
                Fields: ['UserID', 'UploadUrl', 'FileName'],
                MaxRows: 1,
            });
            if (result?.Results && result?.Results.length === 0) throw new Error('No record found!');
            const abstract = result.Results[0];
            const blob = await this.connectAndAccessContainer(abstract.UserID, sessionID, abstractID, abstract.FileName) as BlockBlobClient;
            const sasToken = await this.generateSAS(blob);
            return sasToken;
        } catch (error: any) {
            console.log('Error while fetching file', error);
            return null;
        }
    }
}