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

module.exports = {
    sendMail,
    download
};