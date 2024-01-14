import nodemailer from "nodemailer";
import fs from "fs";

const sendMail = async (options, htmlPath) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  let htmlContent;

  if (htmlPath) {
    htmlContent = fs.readFileSync(htmlPath, "utf-8");
  }

  let message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: htmlContent,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

export default sendMail;
