import express from "express";
import {login, refresh} from "../controllers/auth-controller";

export const auth = express.Router();

auth.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const response = await login(username, password);
        res.status(200).json(response);

    } catch (e) {
        res.status(401).json({error: e});
    }
});

auth.post("/refresh", async (req, res) => {
    const refreshToken = req.headers['refresh-token'] as string;

    try {
        const response = refresh(refreshToken);
        res.status(200).json(response);

    } catch (e) {
        res.status(401).json({error: e});
    }
});
