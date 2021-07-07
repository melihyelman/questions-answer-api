const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");

const routers = require("./routers/index");

// Enviroment Variables
dotenv.config({
  path: "./config/env/config.env",
});

// MongoDb Connection

connectDatabase();

const app = express();

// Express - body middleware

app.use(express.json());

const PORT = process.env.PORT;

// Routers Middleware

app.use("/api", routers);

// Error Handler

app.use(customErrorHandler);

//Static files

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`App Started On ${PORT} : ${process.env.NODE_ENV}`);
});
