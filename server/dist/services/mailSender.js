"use strict";

var _nodemailer = require("nodemailer");

var _gmailAuth = _interopRequireDefault(require("../gmailAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.sendMail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    var transporter = (0, _nodemailer.createTransport)({
      service: 'gmail',
      auth: _gmailAuth.default
    });
    var mailOptions = {
      from: 'ziro84@gmail.com',
      to: to,
      subject: subject,
      text: text
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};