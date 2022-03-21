const express = require('express');
const app = express();

//middleware

// routes
app.get('/', (req, res) => {
  res.send('Hello Squirrel');
});

//start server
app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});