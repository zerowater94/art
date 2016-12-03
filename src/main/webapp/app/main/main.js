define([ 'abstractView', 'basicInfo'
         ,'text!main/main.html'
         ,'../../libs/screenfull/screenfull'
       ], function ( AbstractView , $a, Tmpl ) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			viewName : null 
		} ; // param
		var _els = {
				
		} ; // elements
		var _f = {
			setMainInitialize : function(){
				
				$a.setMainArea(_els.areaContents.find("#main-area"));
				$a.setMainEditor(_els.areaContents.find("#main-editor"));
				
				$a.t.initialize({
					els : {
						areaMain : $a.getMainArea(),
						areaEditor : $a.getMainEditor(),
						areaMainBar : _els.areaMainBar,
						areaShowMsg : _els.areaContents.find("#main-msg"),
					},
					msg : {
						blankStr : $a.getMsg("lbl.blankStr"),
						search   : $a.getMsg("lbl.search")
					}
				});
			},
			setMainStyle : function() {
				
				var topBottomHeight = 164;
				if( _els.areaTop.find("nav").hasClass("navbar-fixed-top"))
					topBottomHeight = 114;
				
				var _editPanel = $a.getMainEditor().find(".panel");
				$a.e.addWinResizeEvent("WIN-MAIN_resize-contents", function(){
					
					_els.areaContent.css({
						minHeight : $(window).height()-topBottomHeight
					});
//					_editPanel.css({
//						height : _els.areaContent.outerHeight()
//					});
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
				
				$a.t.nvButton.add(_els.areaTopNav, {
					id      : "toggleFullScreen" ,
					linkCss : "btn-default btn-sm",
					title   : "Fullscreen",
					btnCss  : "glyphicon glyphicon-fullscreen"
				});
				
				$a.t.nvButton.add(_els.areaTopNav, {
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
					subMenus : [{iconCss  : "fa fa-h-square",menuName : $a.getMsg("lbl.manageOption"), maneId : "menu-4-1", menuLvl  : 2, url:"base/system/optionList"},
					            {iconCss  : "fa fa-h-square",menuName : "코드", maneId : "menu-4-2", menuLvl  : 2, url:"base/system/codeList"},
					            {iconCss  : "fa fa-h-square",menuName : "메뉴관리", maneId : "menu-4-3", menuLvl  : 2, url:"base/system/menuList"}
					,]
				}];
				
				var _menuObj;
				var _elLi ; 
				var _elSubUl ; 
				var _elSubLi ;
				var _subMenuObj;
				for( var idx = 0 ; idx < _menus.length; idx++ ) {
					
					_menuObj = _menus[idx];
					$a.t.mainMenu.addMenu(_els.areaMenuUl , _menuObj);
					_elLi = _els.areaMenuUl.find("#"+_menuObj.menuId);
					_f.addEventMenuShow(_elLi, _menuObj);
					
					if( _menuObj.subMenus != null && _menuObj.subMenus.length > 0 ) {
						
						_elSubUl = _elLi.find("> ul");
						for( var jdx = 0 ; jdx < _menuObj.subMenus.length; jdx++ ) {
							
							_subMenuObj = _menuObj.subMenus[jdx];
							$a.t.mainMenu.addMenuSub(_elSubUl , _subMenuObj);
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
						_f.goMainPage(obj);
					}
				});
				
			},
			addEventMenu : function( el, obj ) {
				
				$a.addEvent(el, "click", function() {
					_els.areaMenuUl.find(".selected").removeClass("selected");
					el.addClass("selected");
					_f.goMainPage(obj);
				});
			}, 
			goMainPage : function( obj ) {
				
				$a.t.mainBar.render({
					iconCss  : obj.iconCss,
					title    : obj.menuName
				});
				
				$a.clearWinResizeEvent();
				
				$a.t.mainEditor.hideEditor();
				
				var _param = {
					viewName : obj.url,
					paramData : obj
				}
				
				history.pushState(_param, _param.viewName, '');
				$a.goPage(_param);
			},
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		 _this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
			
			var tmpl = _.template(Tmpl);
			thisEl.html(tmpl({}));
			
			_els.areaTop        = thisEl.find("#top");
			_els.areaUserAcess  = thisEl.find(".user-media");
			_els.areaMainBar    = thisEl.find(".main-bar");
			_els.areaContents   = thisEl.find("#content");
			_els.areaContentOut = _els.areaContents.find(".outer");
			_els.areaContent    = _els.areaContentOut.find(".inner");
			_els.areaTopBrand   = _els.areaTop.find(".navbar-header");
			_els.areaTopNav     = _els.areaTop.find(".topnav");
			_els.areaTopLeftNav = _els.areaTop.find(".navbar-ex1-collapse");
			_els.areaMenuUl     = thisEl.find("#menu");
			
		};
		
		_this.reloadContents = function() {
			
			_f.setMainInitialize();
			_f.setMainStyle();
			_f.setBrand();
			_f.setTopNav();
			_f.searchLeftMenu();
			
			if( _pm.viewName != null ) {
				$a.goPage(_pm);
			}
		};
		
		_this.returns = {
			
		};
		
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});
