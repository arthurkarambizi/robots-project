const express = require('express');
const mongoose = require('mongoose'); //you can use mongo db drive
const cors = require('cors');
mongoose.set('useFindAndModify', false); //for put robots routes

// ────────────────────────────────────────────────────────────────────────────────
//allows us to take requests and get data from the body when we send the post request
// ────────────────────────────────────────────────────────────────────────────────

const bodyParser = require('body-parser');

// ────────────────────────────────────────────────────────────────────────────────
//api/routes
// ────────────────────────────────────────────────────────────────────────────────

const robots = require('./routes/api/robots');

// ────────────────────────────────────────────────────────────────────────────────
// initialize express in variable app
// ────────────────────────────────────────────────────────────────────────────────

const app = express();
app.get('/', (req, res) => res.send('hello'));

// ────────────────────────────────────────────────────────────────────────────────
//body parser
// ────────────────────────────────────────────────────────────────────────────────

app.use(bodyParser.json());

app.use(cors());

// ────────────────────────────────────────────────────────────────────────────────
//we need a mongo db url we  used a local mongo url
// ────────────────────────────────────────────────────────────────────────────────

const localUrl = require('./config/keys').mongoLocal;

// ────────────────────────────────────────────────────────────────────────────────
// connect to mongo db we use mongoose
// ────────────────────────────────────────────────────────────────────────────────
//Set up mongoose connection

mongoose
  .connect(
    localUrl,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Mongo db connected ....'))
  .catch(err => console.log(err));

// ────────────────────────────────────────────────────────────────────────────────
//use routes
//any request that goes to /api/robots/* should refers to robots variable
// ────────────────────────────────────────────────────────────────────────────────

app.use('/api/robots', robots);

// ────────────────────────────────────────────────────────────────────────────────
// we need to be able to run our server
// ────────────────────────────────────────────────────────────────────────────────

const port = 5000;

// app to listen to that port
app.listen(port, () => console.log(`server started on port ${port}`));
