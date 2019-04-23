import { createTransport } from 'nodemailer';
import gmailAuth from '../gmailAuth';

module.exports.sendMail = (to, subject, text) => {
    return new Promise((resolve, reject) => {
        var transporter = createTransport({
            service: 'gmail',
            auth: gmailAuth
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
    })
}