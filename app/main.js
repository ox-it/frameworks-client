define([
			'backbone', 
			'underscore', 
			'layoutmanager', 
			'app/router/router', 
			'pouchdb',
			'backbonepouch'
		],
	function(
			Backbone, 
			_, 
			Layout, 
			Router, 
			PouchDB,
			BackbonePouch
	){

		var App = {
			onDeviceReady: function() {
				//callback for tests
				console.log("Device ready");

				//configure Layoutmanager to manage views by default
				Backbone.Layout.configure({ manage:true });
				
				//set global pouchDB in order to use inspector
				window.PouchDB = PouchDB;

				//open the skills database
				window.skills_db = new PouchDB('skills');

				//override Backbone sync to use pouch.
				// TODO specify separate db per collection
				Backbone.sync = BackbonePouch.sync({
					db: window.skills_db
				});
				Backbone.Model.prototype.idAttributes = "_id";
				
				this.populateDatabase().then(function(response) {
					console.log("added json data to db")
					//initialise the router
					var router = new Router();
				}).fail(function(err) {
					//Seem to need .fail here (as used by jquery promises) rather than .catch (as used by pouch promises)
					// TODO check whether this is an issue.
					// Could maybe resolve by starting the promise chain with a (trivial) pouch promise rather than a jquery one.
					console.log(err);
				});
			},

			initialize: function(cb) {
				document.addEventListener('deviceready', _.bind(this.onDeviceReady, this), false);
			},
			
			populateDatabase: function() {
				//enter some data into the skills Database
				console.log('getting docs from json');
				return $.get('app/data/examples.json').done(function(result) {
					console.log('got docs from json, adding to DB')
					return window.skills_db.bulkDocs(result);
				});
			}
			
		};

		return App;
});
