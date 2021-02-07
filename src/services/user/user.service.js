const nodemailer = require('nodemailer');
var jade = require('jade');
const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')


const sendEmail = async function (req, res) {
    const { emailAddress, name } = req.body;

    var template = jade.renderFile(__dirname + '/emailTemplate.jade',
        req.body
    );

    try {
        return new Promise((resolve, reject) => {
            const smtpTrans = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'apdetrojaa@gmail.com',
                    pass: 'Ankit#2car'
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const mailOptions = {
                from: "apdetrojaa@gmail.com",
                to: emailAddress,
                subject: `Welcome Mail`,
                html: template,
                context: {
                    name: name
                }
            }

            smtpTrans.sendMail(mailOptions, (err, res) => {
                err ?
                    reject({ failed: 'failed' })
                    : resolve({ ok: 'asdasdad' })
            });
        });

    } catch (error) {
        console.log(error);
    }
}

const download = async () => {
    const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
    const path = Path.resolve(__dirname, 'images', 'code1.jpg')

    // axios image download with response type "stream"
    const response = await Axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    })

    // pipe the result stream into a file on disc
    response.data.pipe(Fs.createWriteStream(path))

    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve()
        })

        response.data.on('error', () => {
            reject()
        })
    })

}

module.exports = {
    sendMail: sendEmail,
    download: download
};