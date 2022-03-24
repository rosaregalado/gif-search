// server
const express = require('express');
const app = express();
app.use(express.static('public'));

// Middleware
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// API wrapper
const Tenor = require('tenorjs').client({
  'Key': '88VITW5WZ5WW',
  'Locale': 'en_US',
  'Filter': 'high',
})

// Routes
app.get('/', (req, res) => {
  // Handle the home page when we haven't queried yet
  term = ""
  if (req.query.term) {
    term = req.query.term
  }
  // Tenor.search.Query("KEYWORD", "LIMIT")
  Tenor.Search.Query(term, "10")
    .then(response => {
      //store gifs
      const gifs = response;
      //pass the gifs as an obj into the homepage
      res.render('home', { gifs })
    }).catch(console.error)
})

app.get('/greetings/:name', (req, res) => {
  // grab name from the path
  const name = req.params.name;
  res.render('greetings', { name });
})

// Start server
app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});

