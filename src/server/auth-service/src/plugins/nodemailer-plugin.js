import fp from 'fastify-plugin';
import nodemailer from 'nodemailer';


async function nodemailerPlugin(fastify, options) {
    let transporterInstance
    if (process.env.NODE_ENV === 'development')
    {
        const testAccount = await nodemailer.createTestAccount();
        
        transporterInstance = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        })
    }
    else if (process.env.NODE_ENV === 'production')
    {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS)
            throw new Error('Missing Gmail credentials in environment');
        transporterInstance = nodemailer.createTransport({
            service: 'gmail',
            auth : {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASS
            }
        })
    }


    fastify.decorate('sendMail', async (mailOptions) => {
        await transporterInstance.sendMail(mailOptions)
        .then((info) => {
            console.log("info: ", info);
            if (process.env.NODE_ENV === 'development')
            {
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            return info;
        })
        .catch(console.error);
    })
};

export default fp(nodemailerPlugin);
