import config from './config';
import apiRouter from './api';

import express from 'express';
const server = express();

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
  // res.send('Hello Express');  // if plain text
  // res.render('index');  // if using a template, such as "views/index.ejs"

  // adding some variables to pass to the template by passing an object as the second parameter
  res.render('index', {
    content: 'Hello Express and <em>EJS</em>!',
  });

});

server.use('/api', apiRouter);

// Express static middleware to serve public files
server.use(express.static('public'));

server.listen(config.port, () => {
  console.info('Express listening on port: ', config.port);
})

// run this now (can use: npm start)
// open a browswer and access http://localhost:8080

// "Hello Express" is printed on screen.
// open http://localhost:8080/about and get the about HTML file.

// open http://localhost:8080/api and get the sample data returned from /api/index.js
