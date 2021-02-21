require('dotenv').config();
const https = require('https');
const fs = require('fs');
const jade = require('jade');
const Path = require('path');
var nodemailerConfig = require('../../utils/email/nodemailer_config');
const logger = require('../../logger/logger');
const executeQuery = require('../../db/connect');
const moment = require('moment');


const sendEmail = async function (req, res) {
    const { emailAddress, name, company } = req.body;

    var template = jade.renderFile(Path.resolve(__dirname, '../../../' + '/views/email.jade'),
        req.body
    );

    // https://github.com/jkasun/sa-node-postgres
    let query = `INSERT INTO users(name, email, company, created_on) VALUES ('${name}', '${emailAddress}', '${company}', '${moment().format('dd-mmm-yyyy hh:mm:ss')}');`;

    return executeQuery(query).then(() => {
        try {
            var message = {
                to: emailAddress,
                subject: `welcome ${name} Test Message`,
                html: template
            };
            return new Promise((resolve, reject) => {
                nodemailerConfig.gmailTransport.sendMail(message, function (err, info) {
                    if (err) reject({ failed: err });
                    resolve({ success: 'email send successfully' })
                });
            })

        } catch (error) {
            logger.error(`Error while sending mail ${JSON.stringify(error)}`);
        }
    });
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

const contactUs = (req, res) => {
    const { email, name, message, mobile } = req.body;

    let query = `INSERT INTO contactus(name, email, message, mobile, created_on) 
                 VALUES ('${name}', '${email}', '${message}', '${mobile}, '${moment().format('dd-mmm-yyyy hh:mm:ss')}');`;

    return executeQuery(query).then(() => {
        return ({ status: 200, message: 'Our team will get back to you within 2 business days.' });
    });
}

module.exports = {
    sendMail: sendEmail,
    contactUs: contactUs,
    download: downloadFile
};