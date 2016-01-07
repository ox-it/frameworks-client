define([
		'backbone', 
		'underscore', 
		'app/models/ExampleModel',
		'pouchdb',
		'backbonepouch'
	], function(
		Backbone, 
		_, 
		ExampleModel,
		PouchDB,
		BackbonePouch
	) {

	var ExamplesCollection = Backbone.Collection.extend({

		//fetch data from local storage
		// url: 'app/data/examples.json',
		model: ExampleModel,
		
		pouch: {
	      listen: true,
	      fetch: 'query',
	      options: {
	        query: {
	          include_docs: true,
	          fun: {
	            map: function(doc) {
	              emit(doc.order, null);
	            }
	          }
	        },
	        changes: {
	          include_docs: true
	        }
	      }
	    },
		
	    parse: function(result) {
	      return _.pluck(result.rows, 'doc');
	    },
		
	});

	return ExamplesCollection;

});
