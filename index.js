/* eslint-disable linebreak-style */
import express from 'express';
import userRoutes from './api/routes/auth';
import bodyParser from 'body-parser'
import propertyRoutes from './api/routes/property';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

const app = express();
const PORT = process.env.PORT || 3000;
app.use( bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true})); 

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// if the page is not found
app.use((req, res, next) => {
  const error = new Error('Ooops this method is not allowed ');
  error.status = 405;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ status: error.status || 500, error: error.message });
  next();
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));

export default app;