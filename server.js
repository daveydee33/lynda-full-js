import config from './config';

import express from 'express';
const server = express();

server.get('/', (req, res) => {
  res.send('Hello Express');
});

// Express static middleware to serve public files
server.use(express.static('public'));

server.listen(config.port, () => {
  console.info('Express listening on port: ', config.port);
})

// run this now (can use: npm start)
// open a browswer and access http://localhost:8080
// "Hello Express" is printed on screen.
// open http://localhost:8080/about and get the about HTML file.