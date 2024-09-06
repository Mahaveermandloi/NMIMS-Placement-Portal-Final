import nodemailer from "nodemailer";

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

// Function to send email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "jay439363@gmail.com",
    to,
    subject,
    text,
  };

  console.log(mailOptions);

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully:", info.response);
  return info;
};



// import Bull from "bull";
// import nodemailer from "nodemailer";

// // Initialize the Bull queue
// const emailQueue = new Bull("emailQueue", {
//   redis: { host: "127.0.0.1", port: 6379 },
// });

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

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", info.response);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error; // Re-throw the error so the job can handle it properly
//   }
// };

// // Process email jobs
// emailQueue.process(async (job) => {
//   const { email, subject, text } = job.data;
//   console.log(email, subject, text);
//   try {
//     await sendEmail(email, subject, text);
//     console.log(`Email sent to ${email}`);
//   } catch (error) {
//     console.error(`Failed to send email to ${email}:`, error);
//   }
// });

// export { emailQueue };
