const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/users.model')


mongoose.connect('mongodb://admin:admin@ds229008.mlab.com:29008/hakeni');


mongoose.connection.on('error', function(error) {
    console.log('Could not connect to the database. Exiting now...' + error);
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})


app.use(bodyParser());

app.get('/', (req, res) => {
  res.json({"message": "Welcome to our chat"});
});



app.get('/login', (req, res) => {
  console.log(req.body);
  if(!req.body.email || !req.body.password)
      return res.json({ err: 'username and password required'});

  if (req.body.email &&
      req.body.password){

      var userData = {
        email: req.body.email,
        password: req.body.password,
      }
      //use schema.create to insert data into the db
      User.Find(userData, function (err, user) {
        if (err) {
          return next(err)
        } else {
          return res.send(user);
        }
      });
    }

});

app.post('/signup', (req, res) => {
console.log(req.body);
if(!req.body.username || !req.body.password)
    return res.json({ err: 'username and password required'});

  if (req.body.email &&
      req.body.password){

    
      User.create({email: req.body.email , password : req.body.password}, function(err){
        if (err) {
          console.log('user creating problem')
        }
      })
  }

});


app.listen(3000, () => {
	console.log('server is listening on port 3000');
});

