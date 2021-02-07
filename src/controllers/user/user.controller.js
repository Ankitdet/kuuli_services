const userService = require('../../services/user/user.service');

const sendMail = function (req, res) {
    userService.sendMail(req, res).then((response)=> {
        res.send(response);
    });
}

const download = function (req, res) {
    /* const data = userService.download(req);
    console.log(data) */
    res.download('sample.html', 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80');
}

module.exports = {
    sendMail,
    download
};