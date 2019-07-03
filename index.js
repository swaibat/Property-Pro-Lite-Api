/* eslint-disable linebreak-style */
import express from 'express';
import userRoutes from './api/routes/users';
import propertyRoutes from './api/routes/property';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

const app = express();
const PORT = process.env.PORT || 1000;
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// if the page is not found
app.use((req, res, next) => {
  const error = new Error('Resource your looking for notfound');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: error.status || 500, message: error.message });
  next();
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));

export default app;