import config from './config';

import express from 'express';
const server = express();

server.get('/', (req, res) => {
  res.send('Hello Express');
});

server.get('/about', (req, res) => {
  res.send('About page...');
});

server.listen(config.port, () => {
  console.info('Express listening on port: ', config.port);
})

// run this now (can use: npm start)
// open a browswer and access localhost/8080
// "Hello Express" is printed on screen.
// There's alternative (better) ways to do this.
