define(['backbone', 'hbs!app/templates/example_template'], function(Backbone, exampleTemplate) {

	var ExampleViewAccordion = Backbone.View.extend({

		template: exampleTemplate,

		initialize: function(params) {
			//initialisation of view from params
			console.log("itemView initialized");
			this.model = params.model;
			exampleModel = this.model;
		},

		serialize: function() {
			//serialize relevant model data to send to template
			var data = this.model.toJSON();
			return data;
		},

		afterRender : function() {
			$( ".example" ).enhanceWithin();
			$( "#age-slider" ).slider(
				{
			  	stop: this.sliderStop,
				}
			);
		},
		sliderStop : function(event, ui) {
//	use set (update the model) or save (Save the model to DB database)
			exampleModel.set({age: event.target.value});
		},
		events: {},

	});

	return ExampleView;

});
