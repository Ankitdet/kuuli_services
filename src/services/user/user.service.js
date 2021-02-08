require('dotenv').config();
const https = require('https');
const fs = require('fs');
const nodemailer = require('nodemailer');
const jade = require('jade');
const Path = require('path');


const sendEmail = async function (req, res) {
    const { emailAddress, name } = req.body;

    var template = jade.renderFile(Path.resolve(__dirname, '../../../' + '/views/emailTemplate.jade'),
        req.body
    );

    try {
        return new Promise((resolve, reject) => {
            const smtpTrans = nodemailer.createTransport({
                host: process.env.GMAIL_SERVICE_HOST || 'smtp.gmail.com',
                port: process.env.GMAIL_SERVICE_PORT || 465,
                secure: true,
                auth: {
                    user: process.env.GMAIL_USER_NAME,
                    pass: process.env.GMAIL_USER_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const mailOptions = {
                from: process.env.GMAIL_USER_NAME,
                to: emailAddress,
                subject: `Welcome Mail`,
                html: template,
                context: {
                    name: name
                }
            }

            smtpTrans.sendMail(mailOptions, (err, res) => {
                err ?
                    reject({ failed: err, status: 500 })
                    : resolve({ success: 'Email successfully sent', status: 200 })
            });
        });

    } catch (error) {
        console.log(error);
    }
}

var downloadFile = async function (url, dest, cb) {
    const file = fs.createWriteStream(dest);
    https.get(url, function (response) {
        response.pipe(file);
        response.on('end', function () {
            cb({success : 'downloding success..'});
        })
    })
}

module.exports = {
    sendMail: sendEmail,
    download: downloadFile
};