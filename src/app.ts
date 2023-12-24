import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandle/globalErrorHandle';
const app: Application = express();

// parser use here
app.use(express.json());
app.use(cors());

// Application routes using here
app.use('/api', router);

app.use(globalErrorHandler);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

export default app;
