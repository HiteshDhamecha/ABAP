
import dotenv  from "dotenv";
import nodemailer from "nodemailer";


// Load environment variables from .env file
dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'h.dhamecha@gmail.com',
    pass: '',
  },
});

export async function sendEmailNotification(toEmail: string): Promise<boolean> {

  //Replace placeholders with actual values
  const personalizedEmail = formatEmailContent(emailBody, {
    eventName: "AI & Society Conference",
    associationName: "AI Research Association",
    abstractTitle: "Psychological Effects of AI on Society",
    submissionID: "AIC-2025-00123",
    submissionDate: "March 6, 2025",
    notificationDate: "April 15, 2025",
    supportEmail: "support@conference.com",
    industryField: "Artificial Intelligence & Psychology"
});
    
  const mailOptions = {
    from: 'h.dhamecha@gmail.com',
    to: toEmail,
    subject: "Abstract Submission Confirmation",
    text: personalizedEmail,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", toEmail);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
}

// Function to Replace Placeholders with Actual Values
function formatEmailContent(template: string, replacements: Record<string, string>): string {
  let formattedTemplate = template;
  for (const key in replacements) {
      formattedTemplate = formattedTemplate.replace(new RegExp(`{${key}}`, 'g'), replacements[key]);
  }
  return formattedTemplate;
}



// Email Body with Placeholders
const emailBody = `
Dear Sir/Mam,

We are pleased to confirm that we have received your abstract submission for <strong>{eventName}</strong>, hosted by <strong>{associationName}</strong>.<br><br>

<strong>Submission Details:</strong><br>
📌 Title: {abstractTitle}<br>
📌 Submission ID: {submissionID}<br>
📌 Date Submitted: {submissionDate}<br><br>

<strong>What’s Next?</strong><br>
✔️ Review Process: Your abstract will be reviewed by our committee.<br>
✔️ Notification Date: You will be informed of the decision by <strong>{notificationDate}</strong>.<br>
✔️ Next Steps: If accepted, we will provide details regarding presentation format, schedule, and speaker guidelines.<br><br>

If you have any questions or need to update your submission, please contact us at <strong>{supportEmail}</strong>.<br><br>

Thank you for your contribution! We appreciate your dedication to advancing <strong>{industryField}</strong> and look forward to reviewing your work.<br><br>

Best regards,<br>
Elastik Teams
`;
