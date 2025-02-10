import express from 'express';
import './Config/Config.js';
const app = express();
import cors from 'cors';
import { config } from 'dotenv';
import { route } from './Routers/ShowRouter.js';

app.use(express.json());
app.use(cors());
config();

app.use('/shows', route);
app.listen(3000, () => {
  console.log('Port 3000');
});