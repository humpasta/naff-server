import * as jwt from 'jsonwebtoken';

// Middleware for token verification
export const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Token required');

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) return res.status(403).send('Invalid or expired token');
        req.user = user;
        next();
    });
};