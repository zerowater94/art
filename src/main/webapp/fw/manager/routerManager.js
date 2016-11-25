define(['backbone'
], function (Backbone) {
	
    'use strict';
    
    return Backbone.Router.extend({
    	routes: {
			'app/:module(/*moduleSub)(?*queryString)':	'app',
			'link(/*moduleSub)(?*queryString)':	'link',
		}, 
		app: function(module, moduleSub, queryString) {

			setTimeout(function(){
				Backbone.trigger("contentsLoad", {
					viewName : moduleSub,
					queryString : queryString
				});
				
			}, 100);
			
			
		}, 
		link: function(viewName, queryString) {

			setTimeout(function(){
				Backbone.trigger("contentsLoad", {
					viewName : viewName,
					queryString : queryString
				});
				
			}, 100);
			
			
		},
    });
});