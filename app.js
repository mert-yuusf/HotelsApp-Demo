const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const { connectDb } = require('./db/connectDb');
require('dotenv').config();
const app = express();
// Configurations And Security
app.use(express.json({ limit: '10kb' }));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this ip please try again within 1 hour',
});

app.use('/api', limiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
// Basic routes
app.get('/', (req, res) => {
  res.json({ INDEX: '👉 API IS RUNNING' });
});

// Routers
const {
  hotelsRoutes,
  roomsRoutes,
  authRoutes,
  reviewsRoutes,
  usersRoutes,
} = require('./routes');
app.use('/api', authRoutes);
app.use('/api', hotelsRoutes);
app.use('/api', roomsRoutes);
app.use('/api', reviewsRoutes);
app.use('/api', usersRoutes);

// Custom Middleware
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found-middleware');
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// Configurations
// RUN SERVER
app.listen(process.env.PORT, async () => {
  await connectDb(process.env.MONGO_URI);
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
