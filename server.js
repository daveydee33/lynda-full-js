import config from './config';
import fs from 'fs';

import express from 'express';
const server = express();

server.get('/', (req, res) => {
  res.send('Hello Express');
});

// using fs to return an html page (but we'll improve this!)
server.get('/about', (req, res) => {
  fs.readFile('./about.html', (err, data) => {
    res.send(data.toString());
  });
});

server.listen(config.port, () => {
  console.info('Express listening on port: ', config.port);
})

// run this now (can use: npm start)
// open a browswer and access http://localhost:8080
// "Hello Express" is printed on screen.
// open http://localhost:8080/about and get the about HTML file.