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


# Node as a Web Server