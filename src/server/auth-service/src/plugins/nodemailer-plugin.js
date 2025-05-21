import fp from 'fastify-plugin';
import nodemailer, { createTransport } from 'nodemailer';


async function nodemailerPlugin(fastify, options) {
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.se,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
        
    })


    fastify.decorate('sendMail', async (mailOptions) => {
        transporter.sendMail(mailOptions)
        .then((info) => {
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        })
        .catch(console.error);
    })
};

export default fp(nodemailerPlugin);
