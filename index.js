import express from 'express';
import fileUpload from 'express-fileupload';
import { methodError, serverError } from './api/midleware/errors';
import apiRoutes from './api/routes/apiRoutes';

var app = express()

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app
  .use(express.json())
  .use('/api/v2', apiRoutes)
  .use(methodError)
  .use(serverError);


app.listen(process.env.PORT, () => console.warn(`listening on port ${process.env.PORT}...`));

export default app;
