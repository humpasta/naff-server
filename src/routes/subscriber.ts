import express from "express";
import {addSubscriber, deleteSubscriber, getSubscribers} from "../controllers/subscriber-controller";
import {authenticateToken} from "../middlewares/auth";

export const subscriber = express.Router();

subscriber.get("/all", authenticateToken, async (req, res) => {
   try {
       const users = await getSubscribers();
       res.status(200).json(users);
   } catch (e) {
       res.status(500).json({error: e});
   }
});

subscriber.post("/", authenticateToken, async (req, res) => {
    const email = req.body.email;

    if (email) {
        try {
            await addSubscriber(email);
            res.status(200).json({message: "ok"});
        } catch (e) {
            res.status(500).json({error: e});
        }
    } else {
        res.status(400).json({message: "email is required"});
    }
});

subscriber.delete("/", authenticateToken, async (req, res) => {
    const email = req.body.email;

    if (email) {
        try {
            await deleteSubscriber(email);
            res.status(200).json({message: "ok"});
        } catch (e) {
            res.status(500).json({error: e});
        }
    } else {
        res.status(400).json({message: "email is required"});
    }
});