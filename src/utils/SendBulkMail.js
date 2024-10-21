import nodemailer from "nodemailer";

class MassMailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use true for port 465 (SSL), false for port 587 (TLS)
      auth: {
        user: process.env.EMAIL_USER || "jay439363@gmail.com", // Use environment variables for email credentials
        pass: process.env.EMAIL_PASS || "lwoxlcjtbmewosnc",
      },
    });
    this.successEmail = [];
    this.failureEmail = [];
  }

  // Function to send bulk emails
  sendBulkEmails = async (emailDetails, company_name, job_title) => {
    const emailPromises = emailDetails.map((email) =>
      this.sendEmail(email, company_name, job_title)
    );

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    // Log results
    console.log("Successfully sent emails:", this.successEmail);
    console.log("Failed to send emails:", this.failureEmail);
  };

  // Function to send a single email
  sendEmail = async (to, company_name, job_title) => {
    const subject = `Job Alert: ${job_title}`;
    const text = `Dear Student,\n\nYou are eligible for the job titled "${job_title}" at ${company_name}.\n\nBest Regards,\nYour Placement Team`;

    const mailOptions = {
      from: this.transporter.options.auth.user, // Sender's email address
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
      this.successEmail.push(to);
    } catch (error) {
      console.error(`Error sending to ${to}:`, error);
      this.failureEmail.push(to);
    }
  };
}

export default MassMailer;
