# Career planner / Skills Frameworks app
An app to enable training researchers to track their skills development, log activities and set and achieve goals.

###Features
* **Backbone**
* **LayoutManager**
* **Handlebars** templating
* **Grunt** task runner
* **Sass** for styling
* **JQuery**
* **RequireJS** module management
* **Jasmine** testing

###Installation
Assumes bower is installed
```
npm install -g bower
```


Clone the project:
```
git clone https://github.com/ox-it/frameworks-client
cd frameworks-client
```
install dependencies:
```
npm install
bower install
```
initialise cordova:
```
grunt setup
```

All relevant plugins and platforms will be added

### Run
Build & run on device or emulator with the following grunt tasks
```
grunt ios
grunt ios-sim
grunt android
grunt android-sim
```

#Customising
Duplicate and modify the example Model, Collection, View, Template and Router.

####Adding plugins
1. Add the plugin to the array in the top of Gruntfile.js
2. Run `grunt plugins`
