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

### Run on device
build and runs all installed platforms on attached devices:
```
grunt device
```
build and runs all platforms on simulator/emulato:
```
grunt emulate
```

Add a platform option to specify a single platform:
```
grunt device --platform=ios
```


Or use specific task for either ios or android to device
`grunt ios`: builds and runs on ios device
`grunt android`: builds and runs on android device


#Customising
Duplicate and modify the example Model, Collection, View, Template and Router.

####Adding plugins
1. Add the plugin to the array in the top of Gruntfile.js
2. Run `grunt plugins`
