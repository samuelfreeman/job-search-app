const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const helmet = require("helmet");

const compression = require("compression");

const methodOverride = require("method-override");

require("dotenv").config();

const { run } = require("./src/utils/setup");

const cors = require("cors");

const approute = require("./src/routes/index");

const port = 3000;

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());

app.use(methodOverride());

app.use(compression());

app.use(helmet());

app.use("/api", approute);
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to the app",
  });
});

app.use(async (req, res, next) => {
  next(
    res.status(200).json({
      message: "Route not found!",
    })
  );
});

app.use((error, req, res, next) => {
  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
});
run();
app.listen(port, () => {
  console.log(`server heard on port ${port}`);
});
