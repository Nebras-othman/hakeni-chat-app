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

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.use(bodyParser());

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({"message": "Welcome to our chat"});
});



app.post('/login', (req, res) => {

  console.log("req body "+ req.body.email);
  if(!req.body.email || !req.body.password)
      return res.json({ err: 'username and password required'});

  else{

      var userData = {
        email: req.body.email,
        password: req.body.password,
      }
      //use schema.create to insert data into the db
      User.find({email : req.body.email}, function (err, user1) {
          console.log("the user1" + user1)
        if (err) {
          console.log("error finding the email " + err)
          return res.json({error:"incorect email"})
        } else {
            console.log("the user1 " + user1 + "the rest" +user1[0].email + req.body.email + user1[0].password + req.body.password)
          if (user1[0].email === req.body.email && user1[0].password === req.body.password) {
              console.log("it is working")
            return res.json(user1)
          }
            else{
                   console.log("it is not")
              return res.json({error:"incorect password"})
            }
          }
        });
      } 

});

app.post('/register', (req, res) => {

if(!req.body.email || !req.body.password)
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

