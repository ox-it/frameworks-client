define(['backbone', 'app/collections/ExamplesCollection', 'app/views/ExampleView'], function(Backbone, ExamplesCollection, ExampleView){

	var Router = Backbone.Router.extend({

		initialize: function() {
			console.log('initialising router');
			this.examples = new ExamplesCollection();
			this.examples.fetch({success: function() {
				//start the app
				Backbone.history.start();
				console.log("Started the app");
			}.bind(this)});
		},

		routes: {
			"": "home"
		},


		///routes
		home: function() {

			//Example
			var anExample = this.examples.at(0);
			var exampleView = new ExampleView({el:$('.example'), model:anExample});
			exampleView.render();


			//End Example
		}

	});

	return Router;

});