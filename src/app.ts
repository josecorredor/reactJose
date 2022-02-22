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

  //const allowedOrigins = ['http://localhost:3000'];
  const allowedOrigins = ['http://54.253.60.21:8080'];
  const options: cors.CorsOptions = {
    credentials:true,
    origin: "allowedOrigins"
  };

  routes(app);
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
      console.log('Listening to port 8000')
  });
});
