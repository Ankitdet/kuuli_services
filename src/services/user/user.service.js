require('dotenv').config();
const https = require('https');
const fs = require('fs');
const jade = require('jade');
const Path = require('path');
var nodemailerConfig = require('../../utils/email/nodemailer_config');
const logger = require('../../utils/logger');


const sendEmail = async function (req, res) {
    const { emailAddress, name } = req.body;

    var template = jade.renderFile(Path.resolve(__dirname, '../../../' + '/views/email.jade'),
        req.body
    );
    try {
        var message = {
            to: emailAddress,
            subject: `welcome ${name} Test Message`,
            html: template
        };
        return new Promise((resolve, reject) => {
            nodemailerConfig.gmailTransport.sendMail(message, function (err, info) {
                if (err) reject({ failed: err });
                resolve({ success: 'email send successfuly' })
            });
        })

    } catch (error) {
        logger.error(`Error while sending mail ${JSON.stringify(error)}`);
    }
}

var downloadFile = async function (url, dest, cb) {
    const file = fs.createWriteStream(dest);
    https.get(url, function (response) {
        response.pipe(file);
        response.on('end', function () {
            cb({ success: 'downloding success..' });
        })
    })
}

module.exports = {
    sendMail: sendEmail,
    download: downloadFile
};