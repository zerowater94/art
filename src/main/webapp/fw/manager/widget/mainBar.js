define(['mngEvent', 'wgHelper', 
        'text!fw/manager/tmpl/mainEditor.html'
        ], function ($aEvent, $aWg,  _tmpl) {
	
	'use strict';
	
	var _pm = {
		iconCss : null,
		title   : null
	} ; // param
	
	var _els = {} ; // elements
	
	var _f = {
		
		html : {
			mainBar : function() {
				
				var rtnHtml = '<div class="pull-left"><h3>';
				rtnHtml += "<i class=''></i>&nbsp;";
				rtnHtml += "<span></span></h3></div>";
				rtnHtml += "<div class='btn-group pull-right'></div>";
				return rtnHtml; 
			}, 
		},
		init : function() {
			_els.areaMainBar = $aWg.els.areaMainBar;
			_els.areaMainBar.html(_f.html.mainBar());
			_els.label = _els.areaMainBar.find("h3");
			_els.icon = _els.label.find("i");
			_els.title = _els.label.find("span");
			_els.btnGroup = _els.areaMainBar.find(".btn-group");
			
		},
		render : function( obj ) {
			var _opt = $.extend(true, {}, this.options, obj );
			_els.title.text(_opt.title);
			_els.icon.removeClass().addClass(_opt.iconCss);
			_els.btnGroup.empty();
			
		},
		addButton : function( btnObj ){
			return $aWg.button.render(_els.btnGroup, $.extend(true, {btnCls:"btn-default btn-sm"}, btnObj));
		},
		clearButton : function() {
			_els.btnGroup.empty();
		},
	};
	
	return {
		initialize : _f.init,
		render     : _f.render,
		addButton  : _f.addButton,
		clearButton : _f.clearButton
	};
});