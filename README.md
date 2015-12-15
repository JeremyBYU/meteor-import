# meteor-import
A simple example of using Meteor 1.3 with react and npm.

```
git clone https://github.com/JeremyBYU/meteor-import.git
cd meteor-import
npm install
meteor
```
Be sure to use ```npm install``` **before** you launch meteor. Npm will install formsy-react and moment into node_modules folder.  
There seems to be a bug where the build cache in .meteor/local never receives the packages from node_modules during refresh.  The only way to fix it
is to delete the .meteor/local folder to see changes in node_modules.  Probably a bug that needs to be reported or fixed.

This package uses the new import syntax. It also uses the require syntax as well.  A little hacks had to be done to get this to work.
Review the code to

