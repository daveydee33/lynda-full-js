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