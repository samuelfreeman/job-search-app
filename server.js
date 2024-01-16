const express = require("express");

const bodyParser = require("body-parser");

const helmet = require("helmet");

const compression = require("compression");

const methodOverride = require("method-override");

const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json);

app.use(methodOverride());

app.use(compression());

app.use(helmet());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).json({
    err: err.statusMessage,
  });
});
app.listen(port, () => {
  console.log(`server heard on port ${port}`);
});
