import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import userRoutes from './apiv2/routes/auth';
import propertyRoutes from './apiv2/routes/property';
import swaggerDoc from './swagger.json';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => console.log(`listening on port ${PORT}, ${process.env.NODE_ENV} ...`));

export default app;
