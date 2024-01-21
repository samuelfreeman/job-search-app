const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const helmet = require('helmet');

const compression = require('compression');

const methodOverride = require('method-override');

require('dotenv').config();

const cors = require('cors');
const logger = require('./src/utils/logger');
const { run } = require('./src/utils/setup');

const approute = require('./src/routes/index');

const port = 3000;

// Enable CORS for all routes with specified options
app.use(cors({ origin: true, credentials: true }));

// Parse incoming JSON requests
app.use(bodyParser.json());

// Enable HTTP method override
app.use(methodOverride());

// Enable response compression
app.use(compression());

// Improve security with HTTP headers
app.use(helmet());

// Use the defined routes from approute
app.use('/api', approute);

// Welcome message for the root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the app',
  });
});
// Middleware for handling 404 errors (Route not found)
app.use(async (req, res, next) => {
  next(
    res.status(200).json({
      message: 'Route not found!',
    }),
  );
});
// Error handling middleware
app.use((err, req, res, next) => {
  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Log the error
  logger.error(err);

  // Respond with a 500 Internal Server Error and error message
  return res.status(500).json({ error: err.message || 'An error occurred.' });
});

// Run setup tasks
run();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
