import React from 'react';
import ReactDOM from 'react-dom';

const color = Math.random() > 0.5 ? 'green' : 'red';

ReactDOM.render(
    <div>
    <h1>Hello React!</h1>
    <h2 style={{color: color}}>Random color</h2>
    <h2>Random Number: { Math.random() }</h2>
    </div>
    ,
    document.getElementById('root')
);