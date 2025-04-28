import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"YourApp Support" <haay.maay@gmail.com>',
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
