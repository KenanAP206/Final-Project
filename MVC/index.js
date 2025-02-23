import express from 'express';
import './Config/Config.js';
import cors from 'cors';
import { config } from 'dotenv';
import { route } from './Routers/ShowRouter.js';
import { userRouter } from './Routers/UserRouter.js';
import { EpisodeRouter } from './Routers/EpisodeRouter.js';


const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],  
    credentials: true,
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
}));

config();

app.use('/shows', route);
app.use('/users', userRouter);
app.use('/episodes', EpisodeRouter);

app.listen(3000, () => {
    console.log('Port 3000');
});
