define(['backbone','jquery', 'jquerymobile', 'app/collections/ExamplesCollection', 'app/views/ExampleView', 'app/views/ExampleView', 'app/views/ListViews'],
	function(Backbone, jquery, Jquerymobile, ExamplesCollection, ExampleView, ExampleViewAccordion, ExampleListView){

	var Router = Backbone.Router.extend({

		initialize: function() {
//			console.log('initialising router');
//			console.log( ":::",$(".ui-listview") );
			this.examples = new ExamplesCollection();
			this.examples.fetch({success: function() {
				//start the app
				Backbone.history.start();
				console.log("Started the app");
			}.bind(this)});
		},
// Please use "?" instead of "/"for routing. "/"s seems to be handled by jQuerymobile instead of Backbone.
		routes: {
			"": "list",
			"list": "list",
			"items?:item": "showitem",
			"items-accordion?:item": "showitemaccordion",
//			"test?:item?:example": "test"
		},

		showitem: function(item) {
			//Example
			var anExample = this.examples.findWhere({name: item});
			var exampleView = new ExampleView({el:$('.example'), model:anExample});
//			$.mobile.changePage( "#items?Bob" , { transition: "slide", reverse: false, changeHash: false } );
			exampleView.render();
			//End Example
		},
		showitemaccordion: function(item) {
			//Example
			var anExample = this.examples.findWhere({name: item});
			var exampleView = new ExampleViewAccordion({el:$('.example'), model:anExample});
//			$.mobile.changePage( "#items?Bob" , { transition: "slide", reverse: false, changeHash: false } );
			exampleView.render();
			//End Example
		},
		list: function() {
			var listExample = this.examples;
			var exampleListView = new ExampleListView({el:$('.example'), collection:listExample});
			exampleListView.render();
		},
/*
		test : function(item, example) {
			console.log("test:",item, example);
		}
*/
	});

	return Router;

});
