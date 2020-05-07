require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const winston = require('winston');

//import routers
const foldersRouter = require('./folders/folders-router')
const notesRouter = require('./notes/notes-router')

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//link to routers
app.use('/api/folders', foldersRouter);
app.use('/api/notes', notesRouter);

app.get("/", (req, res) => {
    res.send("Hello world, from noteful!");
  });

  //link to xss
  app.get('/xss', (req, res) => {
      //revisit this later
  })



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

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })
  
  module.exports = app



module.exports = app;
