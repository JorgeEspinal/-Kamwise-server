import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import router from './route.js';
const app = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log('ERROR MONGODB');
    console.log(error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.use('/post', router);

app.use((_req, res, _next) => {
  const error = new Error('Not found resource');

  return res.status(404).json({ message: error.message });
});

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}.`);
});
