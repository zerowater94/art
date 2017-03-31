define(['bootstrap-menu'
        ], function () {
	
	'use strict';
		
	var _f = {
		options : {
			menuEvent: 'right-click',
			menuSource: 'element',
			menuPosition: 'belowLeft',
			selectedClass : 'selected',
			actions: {
				addItem   : null,
				editName  : null,
				deleteItem: null,
				moveUp    : null,
				moveDown  : null,
				close     : null,
			},
			actionsGroups : [['moveUp','moveDown'],['close']],
			useMenu : {
				addItem   : false,
				editName  : false,
				deleteItem: false,
				moveUp    : false,
				moveDown  : false,
				close : true
			},
			clickAction : {
				addItem   : null,
				editName  : null,
				deleteItem: null,
				moveUp    : null,
				moveDown  : null,
				close : null,
			},
			fetchElementData: function($rowElem) {
				return $rowElem;
			},
			closed : null,
		},
		actionOptions : {
			name: 'Action',
			onClick: function() {
				console.info("defined onclick..");
			},
			closed : null
		},
		msg : {
			addItem    : "Add Item",
			editName   : "Change Name",
			deleteItem : "Delete Item",
			moveUp     : "Move Up",
			moveDown   : "Move Down",
			close      : "close",
		},
		menus : null,
		initMsg : function( msgObj ){
			$.extend(true,_f.msg, msgObj);
		},
		getDefaultActions : function() {
			return {
				addItem    : {name : _f.msg.addItem,    iconClass :'fa-plus-circle' },
				editName   : {name : _f.msg.editName,   iconClass :'fa-pencil-square' },
				deleteItem : {name : _f.msg.deleteItem, iconClass :'fa-trash' },
				moveUp     : {name : _f.msg.moveUp,     iconClass :'fa-arrow-up' },
				moveDown   : {name : _f.msg.moveDown,   iconClass :'fa-arrow-down' },
				close      : {name : _f.msg.close,      iconClass :'fa-close' },
			};
		},
		setDefaultMenus : function( param ) {
			$.extend(true,param.actions, _f.getDefaultActions() );
			var actionObj ;
			for(var key in param.actions) {
				if ( key == 'close' )
					continue;
				actionObj = param.actions[key];
				if ( actionObj.onClick == undefined ) {
					delete param.actions[key];
				}
					
			}
//			var calcMenu = function( menuKey ){
//				var clickAction = param.clickAction[menuKey]; 
//				if ( param.useMenu[menuKey] || clickAction != null ) {
//					param.actions[menuKey] = menuInfo[menuKey];
//					if ( clickAction != null) {
//						param.actions[menuKey].onClick = clickAction;
//					}
//				}	
//			};
//			
//			calcMenu('addItem');
//			calcMenu('editName');
//			calcMenu('deleteItem');
//			calcMenu('moveUp');
//			calcMenu('moveDown');
//			calcMenu('close');
		},
		contextMenus : {},
		removeBeforeCtx : function( ctxKey, ctxMenu ) {
			
			if ( this.contextMenus[ctxKey] != undefined )
				this.contextMenus[ctxKey].clear();
			this.contextMenus[ctxKey] = ctxMenu;
		}
	};
	
	var funcCtxMenu = function( el, param ) {
		_f.setDefaultMenus(param);
		var bsCtxMenu = new BootstrapMenu(el.selector, param);
		var elContextMenu = $(".bootstrapMenu").last();
		elContextMenu.find(".dropdown-menu").find("i").removeClass("fa-lg");
		param.actions.close.onClick = function( rows ) {
			bsCtxMenu.close();
			if ( param.closed != null ) 
				param.closed(rows);
		}
		
		bsCtxMenu.clear = function() {
			bsCtxMenu.destroy();
			elContextMenu.remove();
		}
		
		_f.removeBeforeCtx(el.selector, bsCtxMenu);
		
		return bsCtxMenu;
	};
	
	
	return {
		initMsg : _f.initMsg,
		render  : function(el, paramObj){
			var param = $.extend(true,{},_f.options, paramObj);
			return new funcCtxMenu(el, param);
		}
	};
});