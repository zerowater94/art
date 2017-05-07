define(['mngEvent', 'basicValid', 'wgHelper',
        'text!fw/manager/tmpl/mainMembers.html'
        ], function ($aEvent, $aValid, $aWg, _tmpl) {
	
	'use strict';
	var _pm = {
		data    : null,
		jsonKey : {
			id : "memberId",
            name : "memberName", 
            parentId : "parentMemberId",
            group    : "group",
            rootId : null
		},
		clickAction : null,
		dblClickAction : null
	};
	var _showPm = {
	};
	var wgApp = Backbone.View.extend({
		els : {},
		initialize : function(el) {
			this.$el = el;
		},
		render : function(obj) {
			this.$el.html(_.template(_tmpl));
			this.els.searchBar = this.$el.find(".search-bar");
			this.els.btnClose = this.els.searchBar.find(".btn-close");
			this.els.body = this.$el.find(".search-bar-body");
		},
		reloadFunction : null,
		reload : function(paramObj) {
			var param = $.extend(true, {}, _pm, paramObj);
			if (this.reloadFunction != null ) {
				param.data = this.reloadFunction();
			}
			$aWg.tree.render(this.els.body,param);
		},
		addActions : function() {
			var _self = this;
			this.els.btnClose.off().click(function(){
				_self.hide();
			});
		},
		showHideClose : function(showFlag) {
			var _self = this;
			if (showFlag) {
				_self.els.btnClose.removeClass("disabled").show();
			} else {
				_self.els.btnClose.addClass("disabled").hide();
			}
		},
		hide : function() {
			var _el = this.els;
			_el.searchBar.removeClass("show-body");
			_el.body.removeClass("show-body");
			this.showHideClose(false);
		},
		show : function(showParam) {
			var _el = this.els;
			var _param = $.extend(true, {}, _showPm , showParam);
			_el.searchBar.addClass("show-body");
			_el.body.addClass("show-body");
			this.showHideClose(true);
		}
	});
	
	
	return {
		app : null,
		initialize : function() {
			this.app = new wgApp($aWg.els.areaSearchUser);
			this.app.render();
			this.app.addActions();
		},
		reload : function(paramObj){
			this.app.reload(paramObj);
		},
		show : function(showParamObj) {
			this.app.show(showParamObj);
		},
		reloadShow : function(paramObj) {
			this.app.reload(paramObj);
			this.app.show();
		},
		hide : function(closeParamObj) {
			this.app.hide(closeParamObj);
		},
		setReloadFunc : function(func) {
			this.app.reloadFunction = func;
		}
	};
});