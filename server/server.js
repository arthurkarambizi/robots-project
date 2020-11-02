const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('useFindAndModify', false); //for put robots routes

// allows us to take requests and get data from the body when we send the post request
const bodyParser = require('body-parser');

// api/routes
const robots = require('./routes/api/robots');

// initialize express
const app = express();
app.get('/', (req, res) => res.send('hello'));

app.use(bodyParser.json());

app.use(cors());

const localUrl = require('./config/keys').mongoLocal;

// db connection

mongoose
  .connect(
    localUrl,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Mongo db connected ....'))
  .catch(err => console.log(err));

app.use('/api/robots', robots);

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
