/**
 * Created by ahaith on 20/04/15.
 */
require.config({
	shim: {
		backbonepouch: {
			exports: "BackbonePouch"
		}
	},
	paths: {
		almond: "app/libs/almond/almond",
		backbone: "app/libs/backbone/backbone",
		handlebars: "app/libs/handlebars/handlebars",
		jquery: "app/libs/jquery/dist/jquery",
		requirejs: "app/libs/requirejs/require",
		underscore: "app/libs/underscore/underscore",
		layoutmanager: "app/libs/layoutmanager/backbone.layoutmanager",
		hbs: "app/libs/require-handlebars-plugin/hbs",
		pouchdb: "app/libs/pouchdb/dist/pouchdb",
		jquerymobile: "app/libs/jquery-mobile-bower/js/jquery.mobile-1.4.5",
		backbonepouch: "app/libs/backbone-pouchdb/backbone-pouch"
	},
	packages: [

	],
	//config for the 'require-handlebars-plugin'
	hbs: {
		helpers: true,
		i18n: false,
		templateExtension: 'handlebars',
		partialsUrl: ''
	}
});

//require(['app/main']);


require([ "jquery","backbone","app/main","jquerymobile" ], function( $, Backbone, Mobile ) {
	$.mobile.ajaxEnabled = false
	$.mobile.hashListeningEnabled = false
	$.mobile.linkBindingEnabled = false
	$.mobile.pushStateEnabled = false
	console.log("$.mobile.hashListeningEnabled=",$.mobile.hashListeningEnabled);
} );
