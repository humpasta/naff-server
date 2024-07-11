import nodemailer, {SentMessageInfo} from 'nodemailer';
import Mail, {Address} from 'nodemailer/lib/mailer';
import {logger} from "../server";
import {getSubscribers} from "./subscriber-controller";


export const sendMail = async (subject: string, message: string) => {

    // sending an email to the admin
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT!, 10),
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASS
        }
    });

    const address: Address = {
        name: process.env.MAIL_NAME!,
        address: process.env.MAIL_ADDRESS!
    }

    const subscribers = await getSubscribers();

    const mailOptions: Mail.Options = {
        from: address,
        to: address,
        bcc: subscribers,
        sender: address,
        subject: subject,
        text: message
    }

    try {
        logger.info(JSON.stringify(mailOptions));
        // uncomment the following two lines for production use
        const info: SentMessageInfo = await transporter.sendMail(mailOptions);
        logger.info('Message sent: ' + info.messageId);
    } catch (error) {
        throw new Error('Message could not be sent: ' + error);
    }
};
