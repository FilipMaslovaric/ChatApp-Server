require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Message = require('./models/message');

app.use(bodyParser.json());

app.get('/api/messages', (req, res) => {
  console.log('received GET request');
  Message.find().then(result => {
    res.send(result.reverse());
    console.log('current messages sent');
  });
});

app.post('/api/messages', (req, res) => {
  const ip = req.connection.remoteAddress;
  console.log(req.body);
  let message = new Message({
    user: req.body.user,
    content: req.body.content,
    ip: ip
  });

  message.save((err, message) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message created');
    }
    res.send(message);
  });
});

app.listen(3001, () => console.log('Example app listening on port 3001!'));
