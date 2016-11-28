define([ 'abstractView', 'basicInfo', 'basicUtil',  'basicTmpl'
         ,'text!main/main.html'
         ,'../../libs/screenfull/screenfull'
       ], function ( AbstractView , BasicInfo, BasicUtil, BasicTmpl, Tmpl ) {
	

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
				
				BasicTmpl.mainBar.initialize(_els.areaMainBar);
				BasicTmpl.mainEditor.initialize(_els.areaContents.find("#main-editor"));
				BasicTmpl.formHtml.initialize({
					blankStr : BasicInfo.getMsg("lbl.blankStr")
				});
				BasicTmpl.grid.initialize();
			},
			setMainStyle : function() {
				
				var topBottomHeight = 164;
				if( _els.areaTop.find("nav").hasClass("navbar-fixed-top"))
					topBottomHeight = 114;
				
				var _editPanel = BasicInfo.getMainEditor().find(".panel");
				BasicInfo.addWinResizeEvent("WIN-MAIN_resize-contents", function(){

					_els.areaContent.css({
						minHeight : $(window).height()-topBottomHeight
					});
					_editPanel.css({
						minHeight : $(window).height()-topBottomHeight
					});
				});
				BasicInfo.winResize();
				
			},
			setBrand : function() {
				var _elBrand = _els.areaTopBrand.find(".navbar-brand");
				_elBrand.find("img").attr("src", BasicInfo.getDefaultUrl()+'/common/initialize/getCustomCss/'+BasicInfo.getTheme()+'/logo.png');
				_elBrand.off().click(function(e){
					BasicInfo.goHome();
				}).addClass("pointers");
				
			},
			setTopNav : function() {
				
				BasicTmpl.nvButton.add(_els.areaTopNav, {
					id      : "toggleFullScreen" ,
					linkCss : "btn-default btn-sm",
					title   : "Fullscreen",
					btnCss  : "glyphicon glyphicon-fullscreen"
				});
				
				BasicTmpl.nvButton.add(_els.areaTopNav, {
					linkCss : "btn-metis-1 btn-sm",
					title   : "Logout",
					btnCss  : "fa fa-power-off"
				});

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
					subMenus : [{iconCss  : "fa fa-h-square",menuName : BasicInfo.getMsg("lbl.manageOption"), maneId : "menu-4-1", menuLvl  : 2, url:"base/config/optionList"},
					            {iconCss  : "fa fa-h-square",menuName : "코드", maneId : "menu-4-2", menuLvl  : 2, url:"base/config/codeList"}
					,]
				}];
				
				var _menuObj;
				var _elLi ; 
				var _elSubUl ; 
				var _elSubLi ;
				var _subMenuObj;
				for( var idx = 0 ; idx < _menus.length; idx++ ) {
					
					_menuObj = _menus[idx];
					BasicTmpl.mainMenu.addMenu(_els.areaMenuUl , _menuObj);
					_elLi = _els.areaMenuUl.find("#"+_menuObj.menuId);
					_f.addEventMenuShow(_elLi, _menuObj);
					
					if( _menuObj.subMenus != null && _menuObj.subMenus.length > 0 ) {
						
						_elSubUl = _elLi.find("> ul");
						for( var jdx = 0 ; jdx < _menuObj.subMenus.length; jdx++ ) {
							
							_subMenuObj = _menuObj.subMenus[jdx];
							BasicTmpl.mainMenu.addMenuSub(_elSubUl , _subMenuObj);
							_f.addEventMenu(_elSubUl.find("li").eq(jdx), _subMenuObj);
						}
					}
				}
				
				_els.areaMenuUl.find("li").addClass("pointers");
			}, 
			addEventMenuShow : function(el, obj) {
				
				BasicInfo.addEvent(el.find("a"), "click", function() {
					
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
				
				BasicInfo.addEvent(el, "click", function() {
					_els.areaMenuUl.find(".selected").removeClass("selected");
					el.addClass("selected");
					_f.goMainPage(obj);
				});
			}, 
			goMainPage : function( obj ) {
				
				BasicTmpl.mainBar.render({
					iconCss  : obj.iconCss,
					title    : obj.menuName
				});
				
				BasicInfo.clearWinResizeEvent();
				BasicTmpl.mainEditor.hideEditor();
				
				var _param = {
					viewName : obj.url,
					paramData : obj
				}
				
				history.pushState(_param, _param.viewName, '');
				BasicInfo.goPage(_param);
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
			_els.areaMainBar    = thisEl.find(".main-bar");
			_els.areaContents   = thisEl.find("#content");
			_els.areaContentOut = _els.areaContents.find(".outer");
			_els.areaContent    = _els.areaContentOut.find(".inner");
			_els.areaTopBrand   = _els.areaTop.find(".navbar-header");
			_els.areaTopNav     = _els.areaTop.find(".topnav");
			_els.areaTopLeftNav = _els.areaTop.find(".navbar-ex1-collapse");
			_els.areaMenuUl     = thisEl.find("#menu");
			
			
		};
		
		_this.setElVariable = function() {
			
			BasicInfo.setMainArea(_els.areaContents.find("#main-area"));
			BasicInfo.setMainEditor(_els.areaContents.find("#main-editor"));
			_els.toggleFullSreen = _els.areaTopNav.find("#toggleFullScreen");
			
		};
		
		_this.setEvent = function() {
			
			BasicInfo.addEvent(_els.toggleFullSreen, "click", _f.execFullScreen );
		};
		
		_this.reloadContents = function() {
			
			_f.setMainInitialize();
			_f.setMainStyle();
			_f.setBrand();
			_f.setTopNav();
			_f.searchLeftMenu();
			
			if( _pm.viewName != null ) {
				BasicInfo.goPage(_pm);
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
