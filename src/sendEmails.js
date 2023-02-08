const nodemailer = require('nodemailer')

const sendEmail = async (options) => {

    const transport = nodemailer.createTransport({

        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: 'test',
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    await transport.sendMail(mailOptions);

};

module.exports = sendEmail;