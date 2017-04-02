import React from 'react';
import ReactDOM from 'react-dom';

// bringing in some test JSON data.
// see: testData.json
// also needed to add json to the webpack.config.js, and re-run: 'npm run dev'.
import data from './testData';
// we can write it to the command line (to explore the data objects)
console.log(data);

// moving the components to their own files - see Header.js and App.js
import App from './components/App';

ReactDOM.render(
  <App contest={data.contests} />, // we can pass the new data like this
  document.getElementById('root')
);