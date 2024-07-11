import express, {Express} from 'express';
import {auth} from './routes/auth';
import {mail} from './routes/mail';
import cors from 'cors';
import morgan from 'morgan';
import {errorHandler, logErrors} from './error';
import {subscriber} from "./routes/subscriber";

export const app: Express = express();

// dependencies
app.use(cors({origin: true, credentials: true}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
app.use(express.json());

// routes
app.use('/auth', auth);
app.use('/mail', mail);
app.use('/subscriber', subscriber);

app.use(logErrors);
// app.use(errorHandler);
