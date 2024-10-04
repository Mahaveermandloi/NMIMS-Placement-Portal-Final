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









// import Queue from 'bull';
// import nodemailer from 'nodemailer';

// // Create a transporter using the nodemailer configuration
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use true for port 465 (SSL), false for port 587 (TLS)
//   auth: {
//     user: process.env.EMAIL_USER || "jay439363@gmail.com",
//     pass: process.env.EMAIL_PASS || "lwoxlcjtbmewosnc",
//   },
// });

// // Create a queue for email sending
// const emailQueue = new Queue('emailQueue', {
//   redis: {
//     host: '127.0.0.1', 
//     port: 6379,
//   },
// });



// // Process the queue
// emailQueue.process(async (job) => {
//   const { to, subject, text } = job.data;

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
// });

// export default emailQueue;
