import React from 'react';
import ReactDOM from 'react-dom';

// bringing in some test JSON data.
// see: testData.json
// also needed to add json to the webpack.config.js, and re-run: 'npm run dev'.
import data from './testData';
// we can write it to the command line (to explore the data objects)
//console.log(data);
// or, even better than console.log(data), open the React Dev Tools, and hover over the <App> and we can explore that data object there!

// moving the components to their own files - see Header.js and App.js
import App from './components/App';

ReactDOM.render(
  <App contests={data.contests} />, // we can pass the new data like this
  document.getElementById('root')
);
