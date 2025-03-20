import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js";

// Load environment variables
const tenantId = process.env.EMAIL_TENANT_ID as string;
const clientId = process.env.EMAIL_CLIENT_ID as string;
const clientSecret = process.env.EMAIL_CLIENT_SECRET as string;
const userEmail = process.env.EMAIL_USER as string;

if (!tenantId || !clientId || !clientSecret || !userEmail) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

// Function to create a Microsoft Graph client
async function getGraphClient(): Promise<Client> {
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
        scopes: ["https://graph.microsoft.com/.default"],
    });

    return Client.initWithMiddleware({ authProvider });
}

// Function to send an email
export async function sendEmail(recipient: string, subject: string, body: string): Promise<void> {
    try {
        const client = await getGraphClient();

        const emailPayload = {
            message: {
                subject: subject,
                body: {
                    contentType: "TEXT",
                    content: body,
                },
                toRecipients: [
                    {
                        emailAddress: { address: recipient }, // Change recipient email
                    },
                ],
            },
        };

        await client.api(`/users/${userEmail}/sendMail`).post(emailPayload);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}