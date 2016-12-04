define(['basicInfo', 'wgHelper'
        ], function ($a, wgHelper) {
	
	'use strict';
	
	return new function() {
		
		var _this = {};
		
		var _optNavButton = {
			id      : "",
			linkCss : "",
			title   : "",
			btnCss  : ""
		} ; // param
		
		var _optMenu = {
			iconCss  : null,
			menuCss  : null,
			menuLvl  : null , 
			menuId   : null,
			menuName : null,
			menuType : null,
			subMenus : null,
		};
		
		var _f = {
			html   : {
				nvButton : function(obj) {
					var rtnHtml = '<div class="btn-group">';
					rtnHtml += '<a data-toggle="tooltip" data-original-title="'+obj.title+'" data-placement="bottom" class="btn '+obj.linkCss+'" id="'+obj.id+'">';
					rtnHtml += '<i class="'+obj.btnCss+'"></i>';
					rtnHtml += '</a></div>';
					return rtnHtml;
				},
				mainMenu : function(obj) {
					
					var rtnHtml = '<li id='+obj.menuId+'><a>';
					if ( obj.iconCss != null ) {
						rtnHtml += '<i class="'+obj.iconCss+'"></i>';
					}
					
					if( obj.menuCss != null  ) {
						rtnHtml += '<span class="'+obj.menuCss +'">&nbsp;'+obj.menuName+'</span>';
					}else {
						rtnHtml += '&nbsp;'+obj.menuName+'';
					}
					
					
					if ( obj.subMenus != null ) {
						rtnHtml += '<span class="fa arrow"></span>';
					}
					
					rtnHtml    += '</a>';
					
					if ( obj.subMenus != null ) {
						rtnHtml += '<ul class="collapse"></ul>';
					}
					
					rtnHtml    += '</li>';
					
					return rtnHtml;
				},	
			},
			addNavBtn : function(el, obj){
				
				var _btnOpt = $.extend(true, {}, _optNavButton, obj );
				el.append(_f.html.nvButton(_btnOpt));
			},
			addMenu : function(el, obj) {
				obj.menuCss = "link-title";
				
				var _opt = $.extend(true, {}, _optMenu, obj );
				el.append(_f.html.mainMenu(_opt));
			},
			addMenuSub : function (el, obj) {
				if( obj.iconCss == undefined || obj.iconCss == null )
					obj.iconCss = "fa fa-angle-right";
				
				var _opt = $.extend(true, {}, _optMenu, obj );
				el.append(_f.html.mainMenu(_opt));
			}
		};
				
		_this.addNavBtn = _f.addNavBtn;
		_this.addMenu   = _f.addMenu;
		_this.addMenuSub = _f.addMenuSub;
		

		return _this;
	}; 
});