import * as jwt from 'jsonwebtoken';
import {LoginResponse} from "../models";
import {DB} from "../db/database";
import * as argon2 from "argon2";
import {JwtPayload} from "jsonwebtoken";

export const register = async (username: string, password: string): Promise<boolean> => {
    try {
        const hash = await argon2.hash(password);
        await DB.run(`INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    let hash: string;
    try {
        hash = (await DB.get(`SELECT password from users where username="${username}"`)).password;
    } catch (e) {
        throw new Error("Error while retrieving userdata from db.");
    }
    if (hash) {
        if (process.env.JWT_SECRET && await argon2.verify(hash, password)) {
            return  createTokens(username, true);
        } else throw new Error("Unauthorized access credentials");
    } else throw new Error("Unauthorized access credentials");
};

export const refresh = (token: string): LoginResponse => {
    if (process.env.JWT_SECRET) {
        const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        if (decoded.sub) {
            return createTokens(decoded.sub, true);
        } else {
            throw new Error("Missing username in refresh token");
        }
    } else {
        throw new Error("Internal server error");
    }

}

const createTokens = (username: string, includeRefresh = false): LoginResponse => {
    const accessTokenExpiration = 900; // 15min
    const refreshTokenExpiration = 28800; // 8h

    const accessTokenExpiresAt = new Date().getTime() + accessTokenExpiration * 1000;
    const refreshTokenExpiresAt = new Date().getTime() + refreshTokenExpiration * 1000;

    const accessToken = jwt.sign({}, process.env.JWT_SECRET!, {
        algorithm: 'HS256',
        expiresIn: accessTokenExpiration,
        subject: username
    });

    if (includeRefresh) {
        const refreshToken = jwt.sign({}, process.env.JWT_SECRET!, {
            algorithm: 'HS256',
            expiresIn: refreshTokenExpiration,
            subject: username
        });

        return {accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt};
    } else {
        return {accessToken, accessTokenExpiresAt};
    }

}