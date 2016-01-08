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

				// Disabling this will prevent jQuery Mobile from handling hash changes
//				$.mobile.hashListeningEnabled = false;

//				$.mobile.ajaxEnabled = false;
				// Let Backbone handle click events
//				$.mobile.linkBindingEnabled = false;
//				$.mobile.listview.prototype.options.icon = "";
				// Don't listen to hash changes. Let backbone do this
//				$.mobile.hashListeningEnabled = false;
//				$.mobile.pushStateEnabled = false;
				// No hoverdelay for buttons. Use FastClick for 0 delay a tags
//				$.mobile.buttonMarkup.hoverDelay = 0;
				// Disable button styling out of the box. Only style if specified
//				$.mobile.button.prototype.options.initSelector = ".jquery-button";
//*/


				$(document).bind("mobileinit", function() {
					console.log("mobileinit triggered");
				    $.mobile.ajaxEnabled = false;
				    $.mobile.hashListeningEnabled = false;
				    $.mobile.linkBindingEnabled = false;
				    $.mobile.pushStateEnabled = false;

				    $('div[data-role="page"]').live('pagehide', function(event, ui) {
				        $(event.currentTarget).remove();
				    });
				});



//				window.fdb = new PouchDB('http://nyble.it.ox.ac.uk:5984/frameworks');

	//			var res = window.fdb.allDocs({include_docs:true});

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
				$(document).on("mobileinit", function () {
					console.log("mobileinit event triggered!");
					console.log('mobileinit');
				});
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
