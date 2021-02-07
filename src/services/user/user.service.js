const nodemailer = require('nodemailer');
var jade = require('jade');
const Path = require('path')

const sendEmail = async function (req, res) {
    const { emailAddress, name } = req.body;

    var template = jade.renderFile(Path.resolve(__dirname, '../../' + '/views/emailTemplate.jade'),
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
   // TODO
}

module.exports = {
    sendMail: sendEmail,
    download: download
};