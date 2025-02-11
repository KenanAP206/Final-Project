import express from 'express';
import './Config/Config.js';
const app = express();
import cors from 'cors';
import { config } from 'dotenv';
import { route } from './Routers/ShowRouter.js';
import { userRouter } from './Routers/UserRouter.js';
import {EpisodeRouter} from './Routers/EpisodeRouter.js'
app.use(express.json());
app.use(cors({
  exposedHeaders: ['Content-Range']
}));
config();

app.use('/shows', route);
app.use('/users', userRouter);
app.use('/episodes',EpisodeRouter)
app.listen(3000, () => {
  console.log('Port 3000');
});
