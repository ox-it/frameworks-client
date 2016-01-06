define(['backbone', 'hbs!app/templates/list_template'], function(Backbone, listTemplate) {

	var ExampleListView = Backbone.View.extend({

		template: listTemplate,

		initialize: function(params) {
			//initialisation of view from params
			this.collection = params.collection;
		},

		serialize: function() {
			//serialize relevant model data to send to template
			var data = {};
			data.items = this.collection.toJSON();

			return data;
		},

		events: {},

	});

	return ExampleListView;

});
