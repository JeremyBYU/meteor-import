# meteor-import
A simple example of using Meteor 1.3 with react and npm react-components.

```
git clone https://github.com/JeremyBYU/meteor-import.git
cd meteor-import
npm install
meteor
```
Be sure to use ```npm install``` **before** you launch meteor. Npm will install ```formsy-react``` and ```moment``` into node_modules folder.  
There seems to be a bug where the build cache in .meteor/local never receives the packages from node_modules during refresh.  The only way to fix it
is to delete the .meteor/local folder to see changes in node_modules.  Probably a bug that needs to be reported or fixed. If you follow the instuction above you should be good.  Also be aware that if you dont have meteor 1.3 installed it will install it and will take much longer.

This package uses the new import syntax. It also uses the require syntax as well.  A little hacks had to be done to get this to work.  I'll try to detail some of them down below.

### The App
This app uses the ```formsy-react``` component.  It very easily creates a form component for you that contains all the states of a form.

The model we are using is just a simple book collection defined with ```aldeed:collection2```. I create custom validators for ```formsy-react``` that utilize aldeeds simple schema. I even add in server side validation to check that a book title is unique!

Uses PureCSS for simple minimal styling. Enjoy!

### Gotchas

#### Meteor react package vs npm react
Couldnt get npm react to work (react installed from npm).  I think it needs browserify or something.  Kept complaining about process.env stuff. I just used the official meteor react package.

#### NPM React packages needing reference to react
```
global = {};
global.React = React;
```
You need this code to load before anything. A react component was looking for react.  It checks to find it in ```global.React```. Since Meteors official react package uses the global variable ```React``` this is pretty easy.

#### Referencing NPM React Components
I dont get this but I had to do full path to reference the Formsy react component in my custom components. My custom react components are in client/imports.
```
let Formsy = require('../../node_modules/formsy-react');  
```
Really annoying, if someone can figure out a cleaner way that would be great.  

#### Some NPM React packages just dont work
Some of the npm packages I wanted to use just didn't work.  I wanted to use React Pure css components.  Didnt work. Complained about babel not being installed as a dependency....yada yada
