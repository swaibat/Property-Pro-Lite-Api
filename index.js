import express from 'express';
import fileUpload from 'express-fileupload';
import { methodError, serverError } from './api/midleware/errors';
import apiRoutes from './api/routes/apiRoutes';
import cors from 'cors';

var app = express()

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app
  .use(express.json())
  .use(cors())
  .use('/api/v2', apiRoutes)
  .use(methodError)
  .use(serverError);


app.listen(process.env.PORT);

export default app;
