import {NextFunction, Request, Response} from 'express';
import {logger} from './server';

export const logErrors = (err: Error | Error[], req: Request, res: Response, next: NextFunction) => {
    if (err.hasOwnProperty('length')) {
        (err as Error[]).forEach(e => logger.error(e.stack));
    } else {
        logger.error((err as Error).stack);
    }
    next(err);
};

export const errorHandler = (err: Error | Error[], req: Request, res: Response, next: NextFunction) => {
    logger.log('info', `req.xhr: ${req.xhr}`);
    const body: any = {};
    if (err.hasOwnProperty('length')) {
        body.errors = [];
        (err as Error[]).forEach(e => body.errors.push(e.message));
    } else {
        body.error = (err as Error).message;
    }
    if (!Array.isArray(err) && err.name === 'UnauthorizedError') {
        res.status(401).send('Access token expired.');
    }
    res.status(500).send(body);
};
