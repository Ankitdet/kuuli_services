require('dotenv').config();
const pug = require('pug');
const Path = require('path');
var nodemailerConfig = require('../../utils/email/nodemailer_config');
const logger = require('../../logger/logger');
const executeQuery = require('../../db/connect');
const moment = require('moment');
const apiStatus = require('../../utils/apiStatus');
const { OK, INTERNAL_SERVER_ERROR } = require('../../utils/apiStatus');
const { main } = require('../../../nodemailer');


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
                subject: `Thank you`,
                html: template
            };
            return new Promise((resolve, reject) => {
                main(emailAddress).then((data) => {
                    res.status(OK).send({ status: 200, success: 'Email sent successfully' });
                })
                /*  nodemailerConfig.gmailTransport.sendMail(message, function (err, info) {
                     if (err) reject(res.status(INTERNAL_SERVER_ERROR).send({ failed: err }));
                     res.status(OK).send({ status: 200, success: 'Email sent successfully' });
                 }); */
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
            subject: `Thank you for selecting Kuulie Service.`,
            html: template
        };
        return new Promise((resolve, reject) => {
            nodemailerConfig.gmailTransport.sendMail(message, function (err, info) {
                if (err) reject(res.status(INTERNAL_SERVER_ERROR).send({ failed: err }));
                res.status(OK).send({ success: 'Email sent successfully' });
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

    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ message: 'Data submitted successfully.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }

}

module.exports = {
    sendMail: sendEmail,
    contactUs: contactUs,
    sendLink: sendLink
};