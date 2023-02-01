const express = require('express');
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/';

app.use(express.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phone = req.body.phone;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const landmark = req.body.landmark;
  const city = req.body.city;
  const state = req.body.state;
  const pincode = req.body.pincode;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    res.status(400).send('Passwords do not match.');
  } else {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        console.log('Error connecting to MongoDB:', err);
        res.status(500).send('Error connecting to database.');
      } else {
        const db = client.db('mydb');
        const users = db.collection('users');
        users.insertOne({
          fullName: fullName,
          email: email,
          phone: phone,
          address1: address1,
          address2: address2,
          landmark: landmark,
          city: city,
          state: state,
          pincode: pincode,
          password: password
        }, (err, result) => {
          if (err) {
            console.log('Error inserting document:', err);
            res.status(500).send('Error inserting document.');
          } else {
            console.log('Document inserted.');
            res.send('Sign-up successful!');
          }
        });
      }
    });
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
