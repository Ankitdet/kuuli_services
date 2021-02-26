require('dotenv').config();
const pug = require('pug');
const Path = require('path');
var nodemailerConfig = require('../../utils/email/nodemailer_config');
const logger = require('../../logger/logger');
const executeQuery = require('../../db/connect');
const moment = require('moment');


const sendEmail = async function (req, res) {
    const { emailAddress, name, company } = req.body;

    var template = pug.renderFile(Path.resolve(__dirname, '../../../' + '/views/email.jade'),
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

var sendLink = async function (req, res) {

    const { email } = req.body;
    logger.info("attaching the file name:", process.env.FILE_URL)
    var template = pug.renderFile(Path.resolve(__dirname, '../../../' + '/views/sendLink.jade'),
        {
            url: process.env.FILE_URL
        }
    );

    try {
        var message = {
            to: email,
            subject: `Thank you for selecting Kuuli Service.`,
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
}

const contactUs = async (req, res) => {
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
    sendLink: sendLink
};