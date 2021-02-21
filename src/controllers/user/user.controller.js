const userService = require('../../services/user/user.service');
const logger = require('../../logger/logger');
require('dotenv').config();

const sendMail = function (req, res) {
    logger.info(`Sending email to ${JSON.stringify(req.body)}`)
    userService.sendMail(req, res).then((response) => {
        res.send(response);
    });
}

const download = function (req, res) {
    logger.info(`Downloading file`)
    userService.download(process.env.FILE_URL, './resources/file.png', (da) => {
        res.send(da)
    });
}

const contactUs = (req, res) => {
    logger.info(`Contact to customer with data ${JSON.stringify(req.body)}`);
    userService.contactUs(req, res).then((response) => {
        res.send(response);
    });
}

module.exports = {
    sendMail,
    contactUs,
    download
};