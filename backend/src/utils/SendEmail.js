// import nodemailer from "nodemailer";

// // Create a transporter using the nodemailer configuration
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use true for port 465 (SSL), false for port 587 (TLS)
//   auth: {
//     user: process.env.EMAIL_USER || "jay439363@gmail.com", // Use environment variables for email credentials
//     pass: process.env.EMAIL_PASS || "lwoxlcjtbmewosnc",
//   },
// });

// // Function to send email
// export const sendEmail = async (to, subject, text) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER || "jay439363@gmail.com",
//     to,
//     subject,
//     text,
//   };

//   console.log(mailOptions);

//   const info = await transporter.sendMail(mailOptions);
//   console.log("Email sent successfully:", info.response);
//   return info;
// };


import nodemailer from "nodemailer";
import { promisify } from "util";
import async from "async";

// Create a transporter using the nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465 (SSL), false for port 587 (TLS)
  auth: {
    user: process.env.EMAIL_USER || "jay439363@gmail.com", // Use environment variables for email credentials
    pass: process.env.EMAIL_PASS || "lwoxlcjtbmewosnc",
  },
});

// Convert sendMail to a promise-based function for better handling in async/await
const sendMailAsync = promisify(transporter.sendMail.bind(transporter));

// Function to send email in batches
export const sendBulkEmails = async (recipients, subject, text, batchSize = 10) => {
  const mailOptionsList = recipients.map((email) => ({
    from: process.env.EMAIL_USER || "jay439363@gmail.com",
    to: email,
    subject,
    text,
  }));

  // Process emails in parallel with a limit on concurrency
  const sendEmails = async () => {
    return new Promise((resolve, reject) => {
      async.eachLimit(mailOptionsList, batchSize, async (mailOptions) => {
        try {
          const info = await sendMailAsync(mailOptions);
          console.log(`Email sent successfully to ${mailOptions.to}:`, info.response);
        } catch (error) {
          console.error(`Error sending email to ${mailOptions.to}:`, error);
        }
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  try {
    await sendEmails();
    console.log("All emails sent successfully.");
  } catch (error) {
    console.error("Error sending bulk emails:", error);
  }
};

// Usage example:
// const recipients = ['student1@example.com', 'student2@example.com', 'student3@example.com'];
// sendBulkEmails(recipients, "Subject of the Email", "Body of the Email");
