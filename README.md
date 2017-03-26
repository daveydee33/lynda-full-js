# Notes

Using this Lynda.com course video as a starting point : 

- [Full-Stack Javascript: GitHub](https://github.com/jscomplete/learn-fullstack-javascript)

- [Full-Stack Javascript: Lynda.com](https://www.lynda.com/Express-js-tutorials/Setup-configurations/533304/557605-4.html?srchtrk=index%3a15%0alinktypeid%3a2%0aq%3anode+express%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2 "Lynda.com")


# Initial Setup (part 1)

```bash
npm init

npm install --save express
npm install --save mongodb
npm install --save react react-dom

npm install --save-dev webpack
npm install --save-dev babel-cli babel-loader babel-preset-es2015 babel-preset-stage-2 babel-preset-react

# so we don't have to restart server each time
npm i -D nodemon

npm i -D eslint eslint-plugin-react babel-eslint
# don't forget to get the eslint config file from the GitHub repo!
```

> Note:
> can use '--save' or '-S'
> can use '--save-dev' or '-D'

** Don't forget to see what all this does to the *package.json* file and verify everything.  Any changes to the package.json file, like typo or verion changes, require to do ```npm install``` to re-run.
(right?)

# Starting a Git project
```bash
git init

# adding this file here for my own notes.
git add NOTES.md

# and the file that npm init/npm install created.
git add package.json

git commit -m 'initial commit.  new npm project and packages only'

# Then I went on to GitHub.com and quickly created a repo there with a name and description.
# Now we'll connect this local git repo to that empty remote one on GitHub
git remote add origin https://github.com/daveydee33/lynda-full-js.git
git push -u origin master

# And just a quick review that all is good
git status
git log
```

I figured I don't need to check all the node modules into git, so I created a `.gitignore` file and added the line:
```
node_modules
```
```bash
echo 'node_modules' >> .gitignore
git status
git commit
```
> Is that the way we should do it or not?


# Adding some additional config files following the example
* .babelrc
* .eslintrc.js
* .gitignore
* server.js
* webpack.config.js

> Copied these files from here.
[GitHub: jscomplete/learn-fullstack-javasript](https://github.com/jscomplete/learn-fullstack-javascript/commit/9616488753513a1db91fc2d598fabacd3a37cca0 "GitHub.com")

... not quite sure what they do yet.

# Start building the directory structure and file placeholders
```bash
mkdir src
touch src/index.js
# All JS frontend modular code in the source directory.  This will be the source of all our generated working files.

mkdir public
touch public/index.html
# to host all of our static assets - HTML, JavaScript, CSS.
# The files that will actually be loading on clients.
# Express will serve these public files directly with it's static middleware

mkdir api
touch api/index.js
# directory for backend API server.

touch server.js
# the starting point for our application (?)
```

- src
- src/index.js
- public
- public/index.html
- api
- api/index.js
- server.js


# Add a start script to the `package.json` file - with `nodemon`

```javascript
  "scripts": {
    "start": "nodemon --exec babel-node server.js --ignore public/",
    "dev": "webpack -wd"
  },
```
## nodemon
We're using `nodemon` to start the server so that it will watch for any modified files that require a server restart, and will automatically restart the server for us.

> Normally we'd have to stop/start many times with: 
`
node server.js
`

So we're going to use the `nodemon` execution wrapper and use babel-node instead of node.

we're ignoring the `public/` directory from nodemon watch because these changes are usually driven by changes in the `src` directory.

## webpack

We use `webpack` To transfer the src files into a bundled file for the browser.  We create a `dev` script that runs the webpack command using `-w` and `-d` for `watch` mode and `development` mode.

# Copy these files as-is (review and understand them)
## `webpack.config.js` file
```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
```
> see explanation of this file in video ~7 minute mark.  
[Setup and configurations](https://www.lynda.com/Express-js-tutorials/Setup-configurations/533304/557605-4.html?autoplay=true)

bundle all the files into public/bundle.js



## `.babelrc` file
```javascript
{
  "presets": ["react", "es2015", "stage-2"]
}
```


## `.eslintrc.js` file
```javascript
module.exports = {
  "parser": 'babel-eslint',
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [ "react" ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error","unix"],
    "quotes": ["error","single"],
    "semi": ["error","always"],
    "no-console": ["warn", { "allow": ["info", "error"] }]
  }
};
```



# 2. Node as a Web Server

## Modules

```javascript
// use 'import' to bring in a dependency
import 'config';
// but like this, will look for it as a core module or an npm installed module.

import 'config';    // check for core module or npm installed module.
import './config';  // check in same dir
import '../config'; // check in parent dir
```

## side note about PATH variable.
> had to add this to global var `PATH` per instruction... not sure if there is a better way to do this.  I tested trying to globally install babel-node but got some note about wanted babel-cli intead.. anyway, just followed what he said in the video for now. 

`.bashrc` or `.bash_profile`.  He put his in `.bash_profile` but I put mine in `.bashrc`. We'l see if it works.

```bash
# had to add this for node projects
export PATH=$PATH:./node_modules/.bin
```

## every module get's it's own private scope.
within a module you can create a top-level variable like this
`var env = process.env;` and it won't write to the global scope.  if you try to reference that variable `env` in a different file - it won't work.

```javascript
const a = "blah"; // is better than...
var a = "blah";
// if not going to change it.
```

## importing
```javascript
// usually we import a config object to a variable.
import config from './config';

console.log(config); // prints {}  -- and empty object
```

## Importing to a variable.
Importing like this will import from a file called 'config.js' in the same directory, and assign it to a variable named 'config' that we can reference later.
```javascript
import config from './config';
```

`server.js`
```javascript
import dave, {nodeEnv, myName, logstars} from './dave';
// we have to use the destructure {} to import a non-default export.
// we do this to import something specific that is not labeled 'default' in the file we're importing.

// then we can use them
console.log(dave);
console.log(nodeEnv);
console.log(dave, nodeEnv);

console.log(myName);

logstars("blah");
```

`dave.js`
```javascript
const env = process.env;

// we can export other things too...
export const nodeEnv = env.NODE_ENV || 'development'
export const myName = 'Dave';


export const logstars = function logStars(message) {
    console.info('**********');
    console.info(message);
    console.info('**********');
}

// note that this is the default object to be exported.
export default {
    port: env.PORT || 8080
}
```

Now run `server.js` and this is the output:
```
$ babel-node server.js
{ port: 8080 }
development
{ port: 8080 } 'development'
Dave
**********
blah
**********
```



# The HTTP/HTTPS modes (understand this before using Express.js)
Express.js is really of a wrapper around Node's core HTTP and HTTPS modules.  These are both core modules so we don't need to `npm install` them.

These can be used as both as both client and server.

```javascript
import https from 'https';
// or, if using just http
// import http from 'http';

// how to use them as a client.
// we can use... 
// https.request(...)
// ...or for just a GET request, we can just use
// http.get(...)
https.get('https://www.lynda.com', res => {
    console.log('Response status code: ', res.statusCode);

    console.log('---------');

    console.log('');
});
// the callback for this 'get' method receives a response stream.  we can read methods like statusCode on this stream.  we can listen for data events on that stream.  every event will give us a chunk buffer so we can read its content with a twoString call. To test this we can babel-node the file and let's pipe the output to less to paginate it because it's going to be big.
```

## using HTTPS as a client to retrieve a URL 
`test_http_get.js`
```javascript
// using http for a GET request
import https from 'https';

//console.log(http.STATUS_CODES[200]); // prints specific element of array

https.get('https://www.lynda.com', res => {
    console.log('Response status code: ', res.statusCode);
    console.log(res.statusMessage);

    console.log('--- Headers ---');
    console.log(res.headers);
    console.log('---------------');

    res.on('data', chunk => {
        console.log(chunk.toString());
    });
});

```

this will retrieve a URL and then spit out a couple lines I used for testing, and then the body of the URL.


## using HTTP as a server 
`test_http_server.js`

```javascript
// using http for a SERVER
import http from 'http';

const server = http.createServer();

server.listen(8080);

server.on('request', (req,res) => {
    res.write('Hello HTTP!\n');
    setTimeout(() => {
        res.write('I can stream\n');
        res.end();
    }, 3000);
});
```

use curl, or open browser and access http://localhost:8080
It will print the first line, and then after 3 seconds it will print the second line.


# Using Express.js
[Express (Express.js)](https://www.google.com.au/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiOvMOXvPHSAhURNpQKHZWSA2oQFggbMAA&url=https%3A%2F%2Fexpressjs.com%2F&usg=AFQjCNHy74oAb0RFvqjXp9M6Up98vJ_pnA)

Let's do the same thing we did with core HTTP module, now in Express

## Creating an Express server
### import Express
We just need to import Express and then to create server with it,  we just invoke the imported Express variable as a function. If you read the source code of the Express package, you'll find out that the default export there is just a function, similar to the HTTP module. We also do a .listen method on the Express server. I'll read the port from the configuration file this time.

```javascript
import express from 'express';
const server = express();

server.listen();
```

We'll improve this, but for a reference point for starting with Express
```javascript
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
```


But we'll make this a lot easier now!

First, move `about.html` to the `public` directory.  

Then we can get rid of the `fs` module and the extra routing for `/about`

```javascript
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

// Also can access any other file in the public directory like http://localhost:8080/filename
```


### Setting up routing.
`api/index.js`
```javascript
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(
        // object with empty "data" array.
        {
            data: [],
        }
    );
});

export default router;
```

`server.js`
```javascript
import config from './config';
import apiRouter from './api';

import express from 'express';
const server = express();

server.get('/', (req, res) => {
  res.send('Hello Express');
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
```

open http://localhost:8080/api and get the sample data returned from /api/index.js


So, now we know we can start serving up some static content by putting it all in the `public` directory.  And if we want to do additional routing, we can add sections for them in the `server.js` file like these examples

```javascript
server.get('/example', (req, res) => {
  res.send('Here is some example response');
  // or a variety of ways to do this.
});
```


# Templating Engines!

To dynamically render content in a static HTML view template.

There are a variety available...

  * EJS
  * Handlebars
  * Pug (previously: Jade) - syntax looks like simple text (or Python)
  * Mustache
  
__Handlebars__ seems to be one of the favorites, but uses a lot of {{these}} which may be messy for some people using Angular.  One of the favorites.

__Pug/Jade__ looks clean and simple like simple text outline in plain English, or like Python or something where formatting is based on white text/indents and things.  One of the most popular.

__EJS__ seems like an easy one to get started with.  Looks a little like Ruby on Rails.

## Using the EJS Template Language

> EJS - "Embedded JavaScript"

First we need to install the module
```bash
npm install --save ejs
```

Then this towards top of the `server.js` file.

```javascript
server.set('view engine', 'ejs');
```

By default, Express will look for the EJS templates under `views` folder.  These EJS templates with be regular HTML files with template tags to embed JavaScript.

```bash
mkdir views
touch views/index.ejs
```

`views/index.ejs` example with some embedded template tag.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello EJS</title>
</head>
<body>

    <%= Math.random() %>

</body>
</html>
```

Then we add/change this in `server.js`
```javascript
server.get('/', (req, res) => {
  res.render('index');  // if using a template, such as "views/index.ejs"
});
```

the `res.render();` needs a parameter - the name of the template, which should be a file in `views` directory, and we don't include the file extension.

For example, to render the template `views/index.ejs` we would use:
```javascript
res.render('index');
```

And then we can run the app and take a look.  The landing page should just generate a random number on screen.  You can refresh and see the number change.

To expand on the `server.js` file, let's pass some variables to the view template by passing an object as the second parameter in the `render()` method.

`server.js`
```javascript
  // adding some variables to pass to the template by passing an object as the second parameter
  res.render('index', {
    content: 'Hello Express and <em>EJS</em>!',
  });
```

`index.ejs`
```html
<%- content %>
```

Note the difference if we pass a string containing HTML, if we use a '-' vs a '=' in the EJS tag.
If we use the equals symbol, it will encode it and we'll see the HTML tags as text.  If we use the dash, it will be treated as HTML.

> "git it and commit it!" --dave :)


## More EJS templating to create header and footer templates.

We're going to pull apart our `index.ejs` file and create a `header.ejs` and `footer.ejs` and `include` references to those in the `index.ejs` file.

`header.ejs`
```html header.ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello EJS</title>
</head>
<body>
```

`index.ejs`
```html header.ejs
<%- include('header') %>
  <%- content %>
  <%= Math.random() %>
<%- include('footer') %>
```

`footer.ejs`
```html header.ejs
</body>
</html>
```

> See [EJS Docs](http://ejs.co/#docs)

# Adding Bootstrap to the EJS template header and footer
This part probably wasn't the best way to go about it, but not knowing the best way to do it, I just addeded links to the CDN for Bootstrap css and js files in the `header.ejs` and `footer.ejs` files.



# Front End - React

* src/index.js

This is where we'll put code to start working with React

`src/index.js`
```javascript
import React from 'react';
import ReactDom from 'react-dom';

ReactDOM.render(
    React.createElement(h1, null, 'Hello React!'),
    document.getElementById('root')
);
```

Since we're going to attach this to an HTML element with id "root" we need to create that element and id in the `index.ejs` view template

```html
<%- include('header') %>
  <div id="root">
      <%- content %>
  </div>
<%- include('footer') %>
```

The `dev` script was what we created in the `package.json` file to run `webpack` to generate the `bundle.js` file with our React code  `public/bundle.js` and `public/bundle.js.map` in the `public` directory.
```bash
npm run dev
```

And then since this new `bundle.js` file is created now, we need to include reference to it in our view index.. we'll add this towards the bottom of `views/footer.ejs`  just before the closing ```</body>``` tag.  

### `footer.js`
```
<script src="/bundle.js" charset="utf-8"></script>

</body>
</html>
```

React with JavaScript
```javascript
ReactDOM.render(
    React.createElement('h1', null, 'Hello React!'),
    document.getElementById('root')
);
```

React with JSX
```javascript
ReactDOM.render(
    <h1>Hello React! {Math.random()}</h1>,
    document.getElementById('root')
);
```

React with JSX and JavaScript variables
```javascript
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
```

JSX is very similar to HTML, but watch for some of these things...

In HTML:
```html
<h1 class="text-center">Title</h1>
```

in JSX:
```html
<h1 className="text-center">Title</h1>
```

In JSX we have to do `className` because that's how it is in the DOM API.  
eg.
```javascript
var head = document.getElementById('header');
var head.className = "text-center";
```

## React Components
