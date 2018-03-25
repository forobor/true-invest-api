const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const port = 8000;
MongoClient.connect(db.url, (error, database) => {
  if (error) return console.log(error)
  const myDB = database.db('true-invest-db')
  require('./app/routes')(app, myDB);
  
  app.listen(port, () => {
    console.log('We live on ' + port);
  });               
})