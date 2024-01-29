const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const methodOverride = require('method-override');


require('dotenv').config();
const cors = require('cors');
const logger = require('./utils/logger');
const { run } = require('./utils/setup');
const approute = require('./routes/index');
const { error } = require('console');

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compression());
app.use(helmet());
app.use('/api', approute);

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: 'successful ', message: 'Welcome to the job search app' });
});

app.use(async (req, res, next) => {
  next(
    res.status(200).json({
      message: 'Route not found!',
    }),
  );
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(err);
  console.log(error);
  return res.status(500).json({ error: err.message || 'An error occurred.' });
});

run();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
