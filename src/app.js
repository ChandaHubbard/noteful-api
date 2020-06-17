require("dotenv").config();
const knex = require('knex')
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV, CLIENT_ORIGIN, PORT, DB_URL } = require("./config");
const bodyParser = require('body-parser')

const app = express();

//import routers
const foldersRouter = require('./folders/folders-router')
const notesRouter = require('./notes/notes-router')

//import services
const foldersService = require('./folders/folders-service')
const notesService = require('./notes/notes-service')

const db = knex({
  client: "pg",
  connection: DB_URL,
});

app.set('db', db)

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
const morganOption = NODE_ENV === "production" 
? "tiny" 
: "common";
const knexTest = db.select().table("expense_type");

//link to routers
app.use(foldersRouter);
app.use(notesRouter);


app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.get('/', (req, res) => {
  res.send("Hello, world from noteful deploy!")
})

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

module.exports = app;
