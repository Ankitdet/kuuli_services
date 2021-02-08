const userService = require('../../services/user/user.service');
require('dotenv').config();

const sendMail = function (req, res) {
    userService.sendMail(req, res).then((response) => {
        res.send(response);
    });
}

const download = function (req, res) {
    userService.download(process.env.FILE_URL, './resources/file.png', (da) => {
        res.send(da)
    });
}

module.exports = {
    sendMail,
    download
};