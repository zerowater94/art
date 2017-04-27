define([ 'basicInfo' , 'app/main/mainHelper'
         ,'text!app/main/main.html'
         ,'libs/screenfull/screenfull'
       ], function (  $a, mainHelper, Tmpl ) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = {};
		
		var _pm = {
			viewName : null 
		} ; // param
		var _els = {
				
		} ; // elements
		
		var _vws = {
			
		};
		var _f = {
		    createPage : function() {
		    	
		    	var tmpl = _.template(Tmpl);
				thisEl.html(tmpl({}));
				_els.body           = thisEl;
				_els.areaTop        = thisEl.find("#top");
				_els.areaFooter     = thisEl.find("footer");
				_els.areaUserAcess  = thisEl.find(".user-media");
				_els.areaUserSearch = thisEl.find('#search-bar-user');
				_els.areaMainBar    = thisEl.find(".main-bar");
				_els.areaContents   = thisEl.find("#content");
				_els.areaContentOut = _els.areaContents.find(".outer");
				_els.areaTopBrand   = _els.areaTop.find(".navbar-header");
				_els.areaTopNav     = _els.areaTop.find(".topnav");
				_els.areaTopLeftNav = _els.areaTop.find(".navbar-ex1-collapse");
				_els.areaMenuUl     = thisEl.find("#menu");
				_els.styleSwitcher  = thisEl.find("#style-switcher");
		    },
			setMainInitialize : function(){
				
				$a.setMainArea(_els.areaContents.find("#main-area"));
				$a.setMainEditor(_els.areaContents.find("#main-editor"));
				
				$a.t.initialize({
					els : {
						areaBody    : _els.body,
						areaMain    : $a.getMainArea(),
						areaEditor  : $a.getMainEditor(),
						areaMainBar : _els.areaMainBar,
						areaSearchUser : _els.areaUserSearch,
						areaShowMsg    : _els.areaContents.find("#main-msg"),
						styleSwitcher  : _els.styleSwitcher,
					},
					msg : {
						blankStr   : $a.getMsg("lbl.blankStr"),
						search     : $a.getMsg("lbl.search"),
						addItem    : $a.getMsg("lbl.addItem"),
						editName   : $a.getMsg("lbl.editName"),
						deleteItem : $a.getMsg("lbl.deleteItem"),
						moveUp     : $a.getMsg("lbl.up"),
						moveDown   : $a.getMsg("lbl.down"),
						close      : $a.getMsg("lbl.close")
					}
				});
				
			},
			setMainStyle : function() {
				
				var bottomEditorHeight = 300;
				var topBottomHeight = _els.areaFooter.outerHeight()+_els.areaMainBar.outerHeight()+1; 
				
				if( _els.areaTop.find("nav").hasClass("navbar-static-top"))
					topBottomHeight += _els.areaTop.outerHeight();
				
				var margin = (_els.areaContentOut.css("padding").slice(0, -2))*2;
				topBottomHeight += margin;
				var _editPanel = $a.getMainEditor().find(".panel");
				
				$a.e.addWinResizeEvent("WIN-MAIN_resize-contents", function(){
					var _heightMain = $(window).height()-topBottomHeight;
					var _heightEditorBody = _heightMain;
					
					if ( $a.getMainEditor().hasClass("panel-bottom") ) {
						if ( $a.getMainEditor().is(":visible") ) {
							bottomEditorHeight = _heightMain*0.4;
						} else {
							bottomEditorHeight = 0;
						}
						_heightEditorBody  = bottomEditorHeight;
						_heightMain       -= bottomEditorHeight;
						// editor margin 계산.
						if ( $a.getMainEditor().is(":visible") ) {
							_heightMain       -= (margin-1);
						}
					}
					
					_heightEditorBody -= _editPanel.find("#editor-header").outerHeight();
					_heightEditorBody -= _editPanel.find("#editor-tail").outerHeight();

					$a.getMainArea().css({
						height : _heightMain
					});
					
					_editPanel.find("#editor-body").css({
						maxHeight : _heightEditorBody
					});
				});
				
				$a.winResize();
			},
			setBrand : function() {
				var _elBrand = _els.areaTopBrand.find(".navbar-brand");
				_elBrand.find("img").attr("src", $a.getDefaultUrl()+'/common/initialize/getCustomCss/'+$a.getTheme()+'/logo.png');
				_elBrand.off().click(function(e){
					$a.goHome();
				}).addClass("pointers");
				
			},
			setTopNav : function() {
				
				mainHelper.addNavBtn(_els.areaTopNav, {
					id      : "toggleFullScreen" ,
					linkCss : "btn-default btn-sm",
					title   : "Fullscreen",
					btnCss  : "glyphicon glyphicon-fullscreen"
				});
				
				mainHelper.addNavBtn(_els.areaTopNav, {
					linkCss : "btn-metis-1 btn-sm",
					title   : "Logout",
					btnCss  : "fa fa-power-off"
				});
				
				_els.toggleFullSreen = _els.areaTopNav.find("#toggleFullScreen");
				$a.e.addEvent(_els.toggleFullSreen, "click", _f.execFullScreen );

			},
			execFullScreen : function(e) {
				screenfull.toggle(window.document[0]);
		        $('body').toggleClass('fullScreen');
		        e.preventDefault();
			},
			// Main Left menu.. 
			searchLeftMenu : function() {
				var _menus = [{
					iconCss  : "fa fa-dashboard",
					menuLvl  : 0 , 
					menuId   : "menu-id-1",
					menuName : "Dashboard",
					url      : "base/code/codeList",
					menuType : null,
					subMenus : null
				},{
					iconCss  : "fa fa-building",
					menuLvl  : 0 , 
					menuId   : "menu-id-2",
					menuName : "Layouts",
					menuType : null,
					subMenus : [{menuName : "Boxed Layout", maneId : "aaa-1"},{menuName : "Fixed Header", menuId : "aaa-2"}]
				},{
					iconCss  : "fa fa-building",
					menuLvl  : 1 , 
					menuId   : "menu-id-3",
					menuName : "마사회",
					menuType : null,
					subMenus : [{menuName : "현황1", maneId : "menu-3-1", menuLvl  : 2, url:"kra/dashboard/dashboard"}
					,{menuName : "현황2", menuId : "menu-3-1", menuLvl  : 2}]
				},{
					iconCss  : "fa fa-wrench",
					menuLvl  : 1 , 
					menuId   : "menu-id-4",
					menuName : "설정",
					menuType : null,
					subMenus : [{iconCss  : "fa fa-h-square",menuName : $a.getMsg("lbl.manageOption"), maneId : "menu-4-1", menuLvl  : 2, url:"app/base/system/optionList"},
					            {iconCss  : "fa fa-h-square",menuName : "코드", maneId : "menu-4-2", menuLvl  : 2, url:"app/base/system/codeList"},
					            {iconCss  : "fa fa-h-square",menuName : "메뉴관리", maneId : "menu-4-3", menuLvl  : 2, url:"app/base/system/menuList"},
					            {iconCss  : "fa fa-h-square",menuName : "조직관리", maneId : "menu-4-4", menuLvl  : 2, url:"app/base/system/orgList"},
					            {iconCss  : "fa fa-h-square",menuName : "사용자관리", maneId : "menu-4-5", menuLvl  : 2, url:"app/base/system/userList"}
					,]
				}];
				
				var _menuObj;
				var _elLi ; 
				var _elSubUl ; 
				var _elSubLi ;
				var _subMenuObj;
				for( var idx = 0 ; idx < _menus.length; idx++ ) {
					
					_menuObj = _menus[idx];
					mainHelper.addMenu(_els.areaMenuUl , _menuObj);
					_elLi = _els.areaMenuUl.find("#"+_menuObj.menuId);
					_f.addEventMenuShow(_elLi, _menuObj);
					
					if( _menuObj.subMenus != null && _menuObj.subMenus.length > 0 ) {
						
						_elSubUl = _elLi.find("> ul");
						for( var jdx = 0 ; jdx < _menuObj.subMenus.length; jdx++ ) {
							
							_subMenuObj = _menuObj.subMenus[jdx];
							mainHelper.addMenuSub(_elSubUl , _subMenuObj);
							_f.addEventMenu(_elSubUl.find("li").eq(jdx), _subMenuObj);
						}
					}
				}
				
				_els.areaMenuUl.find("li").addClass("pointers");
			}, 
			addEventMenuShow : function(el, obj) {
				
				$a.addEvent(el.find("a"), "click", function() {
					
					el.toggleClass("active");

					if ( el.find("ul").length > 0 ) {
						el.find("ul").toggleClass("in");
					} else {
						_els.areaMenuUl.find(".selected").removeClass("selected");
						_f.getMainContents(obj);
					}
				});
				
			},
			addEventMenu : function( el, obj ) {
				
				$a.addEvent(el, "click", function() {
					_els.areaMenuUl.find(".selected").removeClass("selected");
					el.addClass("selected");
					_f.getMainContents(obj);
				});
			}, 
			getMainContents : function( obj ) {
				
				var _param = {
					viewName : obj.url,
					paramData : obj,
					isMainContents : true
				}
				
				history.pushState(_param, _param.viewName, '');
				$a.goPage(_param);
			},
		}; // functions..
		
		
		/*************************************************
		 * common structure
		 *************************************************/
		// return method.. 
		
		_this.render = function( obj ) {
			
			$.extend( true, _pm ,obj);
			
			_f.createPage();
			_f.setMainInitialize();
			_f.setMainStyle();
			_f.setBrand();
			_f.setTopNav();
			_f.searchLeftMenu();
			if( _pm.viewName != null ) {
				_f.getMainContents(_pm);
			}
		}
		
		return _this;
	};
	
	return _funcs;

});
