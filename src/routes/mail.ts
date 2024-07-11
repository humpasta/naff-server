import express from "express";
import {sendMail} from "../controllers/mail-controller";
import {authenticateToken} from "../middlewares/auth";

export const mail = express.Router();

mail.post('/', authenticateToken, async (req, res) => {
    const subject = req.body.subject;
    const message = req.body.message;

    try {
        await sendMail(subject, message);
        res.status(200).json({message: "ok"});
    } catch(e) {
        res.status(500).json({error: e});
    }
});