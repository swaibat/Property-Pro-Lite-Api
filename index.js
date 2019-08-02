import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { methodError, serverError } from './api/midleware/errors';
import apiRoutes from './api/routes/apiRoutes';

const app = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api/v2', apiRoutes)
  .use(methodError)
  .use(serverError);


app.listen(process.env.PORT, () => console.warn(`listening on port ${process.env.PORT}...`));

export default app;