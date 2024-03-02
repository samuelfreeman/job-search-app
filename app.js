const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const methodOverride = require('method-override');
// const session = require('express-session');
const rfs = require('rotating-file-stream');
const path = require('path');
const colors = require('colors');
require('dotenv').config();
const morgan = require('morgan');

const cors = require('cors');

const { run } = require('./utils/setup');
const approute = require('./routes/index');

const app = express();
const port = 3000;

const accessLogStream = rfs.createStream('file.log', {
  interval: '1d',
  path: path.join(__dirname, 'reqLogs'),
});

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compression());
app.use(helmet());
app.use(morgan('dev', { stream: accessLogStream }));

app.use('/api', approute);
app.get('/', async (req, res) => {
  res.status(200).json({
    status: 'successful ',
    message: 'Welcome to the job search app',
  });
});
run();


app.use((err, req, res, next) => {
  // console.error(err.stack); // Log the error stack trace
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err.message,
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.cyan);
});
// quantitative = numeric form
//
