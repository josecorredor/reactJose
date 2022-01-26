require('dotenv').config();

import express, {Request, Response} from 'express';
import cors from 'cors';
import { routes } from './routes';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';

createConnection().then(connection => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  const allowedOrigins = ['http://localhost:3000'];
  const options: cors.CorsOptions = {
    credentials:true,
    origin: "allowedOrigins"
  };

  routes(app);
  app.listen(8081, () => {
      console.log('Listening to port 8081')
  });
});