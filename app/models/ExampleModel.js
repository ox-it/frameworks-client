define([
			'backbone', 
			'underscore',
			'backbonepouch',
			'pouchdb',
		], function(
			Backbone, 
			_,
			BackbonePouch,
			PouchDB
) {

	var ExampleModel = Backbone.Model.extend({
		parse: function(response) {
			// parse model here
			return response;
		}
	})

	return ExampleModel;

});
