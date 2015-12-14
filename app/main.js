define(['backbone', 'underscore', 'layoutmanager', 'app/router/router', 'pouchdb'],
	function(Backbone, _, Layout, Router, PouchDB){

		var App = {
			onDeviceReady: function() {
				//callback for tests
				console.log("Device ready");

				//configure Layoutmanager to manage views by default
				Backbone.Layout.configure({ manage:true });

				//create router
				var router = new Router();

				window.fdb = new PouchDB('http://nyble.it.ox.ac.uk:5984/frameworks');

				var res = window.fdb.allDocs({include_docs:true});
				//	.then(
				//	function(res) {
				//		console.log(res);
				//	}
				//)


				window.mydb = new PouchDB('frameworks');


				window.mydb.put({
					_id: 'andrew.haith@it.ox.ac.uk',
					name: 'Andy',
					foo: 'bar'
				});

				window.mydb.sync('http://nyble.it.ox.ac.uk:5984/frameworks')


			},

			initialize: function(cb) {
				document.addEventListener('deviceready', _.bind(this.onDeviceReady, this), false);
			}
		};

		return App;
});
