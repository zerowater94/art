define(['mngEvent', 'basicValid', 'wgHelper',
        'text!fw/manager/tmpl/mainSearchUser.html'
        ], function ($aEvent, $aValid, $aWg, _tmpl) {
	
	'use strict';
	
	var wgApp = Backbone.View.extend({
		els : {},
		initialize : function(el) {
			this.$el = el;
		},
		render : function(obj) {
			this.$el.html(_.template(_tmpl));
			this.els.searchBar = this.$el.find(".search-bar");
			this.els.body = this.$el.find(".search-bar-body");
			this.els.searchBar.addClass("show-body");
			this.els.body.addClass("show-body");
			this.els.body.html("aa<Br><baaa><br>");
		}
	});
	
	
	return {
		app : null,
		initialize : function() {
			this.app = new wgApp($aWg.els.areaSearchUser);
			this.app.render();
		},
		showSearchUser : function() {
			
		}
	};
});