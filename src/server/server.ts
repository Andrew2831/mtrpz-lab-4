import express from "express";
import morgan from "morgan";
import cors from 'cors';
import helmet from "helmet";
import { handleErrorSync, options } from "@stlib/utils";
import pem from 'pem';
import https from 'https';
import { recepiesController } from '../api'
import { connectDb } from "../db";

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet);
app.use(recepiesController);

export const start = async () => {
  try {
    connectDb();

    const PORT: number = 3000;
    const HOST: string = 'localhost';

    if (options.https) {
      const days: number = Number(options.https);

      return pem.createCertificate(
        { days, selfSigned: true },
        async (error, keys) => {
          handleErrorSync(error, { throw: true });

          https
            .createServer({ key: keys.clientKey, cert: keys.certificate }, app)
            .listen(PORT, HOST, () => {
              console.log(`Server listening on https://${HOST}:${PORT}`);
            });
        },
      );
    }

    app.listen(PORT, HOST, () => {
      console.log(`Server listening on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    handleErrorSync(error, {
      throw: true,
      message: 'Server crashed on startup.',
    });
  }
};
