require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const winston = require('winston');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());

const notes = [];
const folders = [];
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'info.log' })
    ]
});

if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
  
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        logger.error(`Unauthorized request to path: ${req.path}`);
      return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
  })



app.get("/", (req, res) => {
  res.send("A GET Request");
});

app.post("/", (req, res) => {
  res.send("POST request received.");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

app.use(cors());



app.get("/notes", (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    `;
  res.status(200).send(responseText).json(cards);

  const { label, content } = req.query;
  if (!label) {
      logger.error(`Label is required`);
    return res
    .status(400)
    .send("Please provide a label");
  }
  if (!content) {
    logger.error(`Content is required`);
    return res.status(400).send("Please provide some content");
  }
});

app.post("/notes", (req, res) => {
  const { label, content = [] } = req.body;
});

app.get("/folders", (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    `;
  res.status(200).send(responseText).json(folders);

  const { folder } = req.query;
  if (!folder) {
    return res.status(400).send("Please provide a folder name");
  }
});

app.post("/folders", (req, res) => {
  const { folder = [] } = req.body;
});

//routes
app.get("/notes/:notesId", (req, res) => {});

app.get("/folders/:foldersId", (req, res) => {});

app.delete("/notes/:notesId", (req, res) => {
  const { label, content } = req.params;
  res.status(204).end();
});

app.delete("/folders/:foldersId", (req, res) => {
  const { folder } = req.params;
  res.status(204).end();
});

module.exports = app;
