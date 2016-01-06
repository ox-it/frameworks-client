define(['backbone', 'app/collections/ExamplesCollection', 'app/views/ExampleView', 'app/views/ListViews'],
	function(Backbone, ExamplesCollection, ExampleView, ExampleListView){

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
			"": "home",
			"list": "list",
			"items/:item": "showitem"
		},


		///routes
		home: function() {

			//Example
			var anExample = this.examples.at(1);
			var exampleView = new ExampleView({el:$('.example'), model:anExample});
			exampleView.render();


			//End Example
		},
		showitem: function(item) {

			//Example

			var anExample = this.examples.findWhere({name: item});
			var exampleView = new ExampleView({el:$('.example'), model:anExample});
			exampleView.render();


			//End Example
		},
		list: function() {
			var listExample = this.examples;
			var exampleListView = new ExampleListView({el:$('.example'), collection:listExample});
			exampleListView.render();
		}

	});

	return Router;

});
