const nodemailer = require("nodemailer");

exports.sendEmail = (options) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {},
  });
};
