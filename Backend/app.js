const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const methodOverride = require('method-override');
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

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compression());
app.use(helmet());
app.use(morgan('dev', { stream: accessLogStream }));
// app.use((req, res, next) => {
//   try {
//     if (new URL(req.query.url).host === 'example.com') {
//       return res
//         .status(400)
//         .end(`Unsupported redirect to host :${req.query.url}`);
//     }
//   } catch (error) {
//     return res.status(400).end(`Invalid url:${req.query.url}`);
//   }
//   res.redirect(req.query.url);
// });

// const count = io.engine.clientsCount;
// const count2 = io.of('/').sockets.size;
// console.log('Users', count);
// console.log('users size', count2);

app.use('/api', approute);
app.get('/', async (req, res) => {
  res.status(200).json({
    status: 'successful ',
    message: 'Welcome to the job search app',
  });
});
run();

app.use((req, res, next) => {
  res.status(404).send('Route not found!');
});
app.disable('x-powered-by');

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
