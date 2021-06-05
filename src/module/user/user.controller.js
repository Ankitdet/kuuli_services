const userService = require('./user.service');
const logger = require('../../logger/logger');
require('dotenv').config();

const sendMail = function (req, res) {
    logger.info(`Sending email to ${JSON.stringify(req.body)}`)
    userService.sendMail(req, res).then((response) => res.send(response));
}

const sendLink = function (req, res) {
    logger.info(`Sending downloadind link via Mail`)
    userService.sendLink(req,res).then((response) => res.send(response));
}

const contactUs = (req, res) => {
    logger.info(`Contact to customer with data ${JSON.stringify(req.body)}`);
    userService.contactUs(req, res).then((response) => res.send(response));
}

module.exports = {
    sendMail,
    contactUs,
    sendLink
};