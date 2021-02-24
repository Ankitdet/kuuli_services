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
    let query = `INSERT INTO users(name, email, company, created_on) VALUES ('${name}', '${emailAddress}', '${company}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}');`;

    return executeQuery(query).then(() => {
        try {
            var message = {
                to: emailAddress,
                subject: `welcome ${name} Test Message`,
                html: template
            };
            return new Promise((resolve, reject) => {
                nodemailerConfig.gmailTransport.sendMail(message, function (err, info) {
                    if (err) reject({ status: 500, failed: err });
                    resolve({ status: 200, success: 'Email sent successfully' })
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
            cb({ status: 200, url: url });
        })
    })
}

const contactUs = (req, res) => {
    const { email, name, message, mobile } = req.body;

    let query = `INSERT INTO contactus(name, email, message, mobile, created_on) 
                VALUES ('${name}', '${email}', '${message}', '${mobile}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}');`;

    return executeQuery(query).then((data) => {
        return ({ status: 200, message: 'Data submitted successfully.' });
    });
}

module.exports = {
    sendMail: sendEmail,
    contactUs: contactUs,
    download: downloadFile
};