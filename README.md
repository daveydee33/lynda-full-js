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



# Node as a Web Server

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

## using HTTPS as a client to retrieve a URL `test_http_get.js`
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


## using HTTP as a server `test_http_server.js`

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