const nodemailer = require("nodemailer");

exports.sendEmail = (options) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.Port,
    auth: {
      user: process.env.Username,
      pass: process.env.pass,
    },
  });
  const mailOption = {
    from: "Jay Thakkar<jayt@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  transporter.sendMail(mailOption);
};
