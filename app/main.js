
define(['backbone', 'underscore', 'layoutmanager', 'app/router/router'],
	function(Backbone, _, Layout, Router){
//		define(['backbone', 'underscore', 'layoutmanager', 'app/router/router', 'pouchdb'],
//			function(Backbone, _, Layout, Router, PouchDB){

		var App = {
			onDeviceReady: function() {
				//callback for tests
				console.log("Device ready");
				//configure Layoutmanager to manage views by default
				Backbone.Layout.configure({ manage:true });

				// Prevents all anchor click handling
//				$.mobile.linkBindingEnabled = false;

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
    $.mobile.ajaxEnabled = false
    $.mobile.hashListeningEnabled = false
    $.mobile.linkBindingEnabled = false
    $.mobile.pushStateEnabled = false

    $('div[data-role="page"]').live('pagehide', function(event, ui) {
        $(event.currentTarget).remove()
    })
})


				//create router
				var router = new Router();




//				window.fdb = new PouchDB('http://nyble.it.ox.ac.uk:5984/frameworks');

	//			var res = window.fdb.allDocs({include_docs:true});
				//	.then(
				//	function(res) {
				//		console.log(res);
				//	}
				//)


//				window.mydb = new PouchDB('frameworks');


/*				window.mydb.put({
					_id: 'andrew.haith@it.ox.ac.uk',
					name: 'Andy',
					foo: 'bar'
				});

				window.mydb.sync('http://nyble.it.ox.ac.uk:5984/frameworks')
*/

			},

			initialize: function(cb) {
				document.addEventListener('deviceready', _.bind(this.onDeviceReady, this), false);
				$(document).on("mobileinit", function () {
					console.log("mobileinit event triggered!");
					console.log('mobileinit')





				});

			}

		};
		return App;
});
