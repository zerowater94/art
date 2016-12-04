define(['jquery','mngEvent',
        'wgHelper','grid',
        '../../fw/manager/widget/mainEditor',
        '../../fw/manager/widget/mainDetail',
        '../../fw/manager/widget/search',
        '../../fw/manager/widget/showMsg',
        '../../fw/manager/widget/navButton'
        ], function ($, MngEvent, _wgHelper,grid, _vEditor,_vDetail, _vSearch, _vShowMsg, _vNavBtn) {
	
	'use strict';
	
	var _funcs = function() {
		
		var _this = {};
		
		var _els = {
			areaMain : null,
			areaEditor : null,
			areaMainBar : null,
			areaMainDetail : null,
			areaShowMsg : null,
			mainBar : {},
			mainEditor : {},
			mainDetail : {},
		};
		
		var _msg = {
			blankStr : "::::::",
			search   : "Search"
		};
		
		
		var _vws = {
			wgHelper : null,
			grid : null,
			mainDetail : null
		};
		
		var _f = {
			init : {
				widget : function( obj ) {
					
					_this.mainEditor = new _vEditor();
					_this.mainDetail = new _vDetail();
					_this.search = new _vSearch();
					_this.showMsg = new _vShowMsg();
					_this.nvButton = new _vNavBtn();
					
					_wgHelper.initialize(obj.msg);
					$.extend(true, _this, _wgHelper);
					
					_this.mainEditor.initialize(_els);
					_this.mainDetail.initialize(_els);
					_this.showMsg.initialize(_els);
				},
				mainBar : function() {
					
					_els.areaMainBar.html(_f.html.mainBar());
					_els.mainBar.label = _els.areaMainBar.find("h3");
					_els.mainBar.icon = _els.mainBar.label.find("i");
					_els.mainBar.title = _els.mainBar.label.find("span");
					_els.mainBar.btnGroup = _els.areaMainBar.find(".btn-group");
				},
				grid : function() {
					requirejs(['../../fw/manager/widget/pqGrid'], function( _vGrid ) {
						_this.grid = new _vGrid();
					});
				}
			},
			html : {
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
				mainBar : function() {
					
					var rtnHtml = '<div class="pull-left"><h3>';
					rtnHtml += "<i class=''></i>&nbsp;";
					rtnHtml += "<span></span></h3></div>";
					rtnHtml += "<div class='btn-group pull-right'></div>";
					return rtnHtml; 
				},
				button : function( obj ) {
					
					return '<button type="button" class="btn '+obj.btnCls+'" id="'+obj.id+'">'+obj.name+'</button>';
				},
				toolbar : function( obj ) {
					
					var rtnHtml = '<div class="box">';
					rtnHtml += '<header><div class="toolbar" id="'+obj.id+'"></div></header>';
					rtnHtml += "</div>";
					return rtnHtml; 
				},
				formBody : function() {
					
					return "<div class='form-body'></div>";
				},
				formInputGroup : function(obj) {
					
					return "<div id='area-"+obj.id+"' class='form-group input-group'></div>";
				},
				form : {
					text : function( obj ) {
						
						var html = '';
						if( obj.label != null ) 
							html += '<label class="input-group-addon col-form-label">'+obj.label+'</label>';
						
						html += '<input type="text" class="'+obj.inputCls+'" id="'+obj.id+'" placeholder="'+obj.placeholder+'">';
						return html;
					},
					textarea : function( obj ) {
						
						var html = '';
						if( obj.label != null ) 
							html += '<label class="input-group col-form-label textarea-label">'+obj.label+'</label>';
						
						html += '<textarea class="form-control" id="'+obj.id+'" rows="'+obj.rows+'" ></textarea>';
						return html;
					},
					select : function( obj ) {
						
						var html = "";
						if( obj.label != null ) 
							html += '<label class="input-group-addon col-form-label">'+obj.label+'</label>';
						
						html += '<div class="input-group"><select class="'+obj.inputCls+'"  id="'+obj.id+'" ></select></div>';
						return html;
					},
					date : function(obj) {
						
						var html = "";
						if( obj.label != null ) 
							html += '<label class="input-group-addon col-form-label">'+obj.label+'</label>';
						html += '<div class="input-group date">';
						html += '<input type="text" id="'+obj.id+'SDate" class="form-control">';
						html += '<span class="input-group-addon"> ~ </span>';
						html += '<input type="text" id="'+obj.id+'EDate" class="form-control">';
						html += '</div>';
						return html;
					},
					custom : function(obj) {
						
						var html = "";
						if( obj.label != null ) 
							html += '<label class="input-group-addon col-form-label">'+obj.label+'</label>';
						
						html += '<div id="'+obj.id+'" ></div>';
						return html;
					}
				},
				rowBox : function() {
					
					var html = '<div class="box">';
					html += '<header>';
					html += '<div class="pull-left"><h5></h5></div>';
					html += '<div class="pull-right"></div>';
					html += '</header>';
					html += '<div class="body"></div><div>';
					html += "</div>";
					return html;

				}
			},
			makeForm : {
				options : {
					label : "",
					placeholder : ""
				},
				text : function( el, obj ) {
					
					var _opt = $.extend(true,{},{inputCls : ""},this.options, obj );
					el.html(_f.html.form.text(_opt));
				},
				select : function( el, obj ) {
					
					var _selOptions = {
						optionsList : null,
						blankStr    : _msg.blankStr,
						blankOption : true,
						jsonReader  : {
							code : "code",
							value : "value"
						}
					};
					var _opt = $.extend(true,{},this.options,_selOptions, obj );
					el.html(_f.html.form.select(_opt));
					
					var elSelect = el.find("select");
					
					if( _opt.blankOption ) {
						elSelect.append("<option value=''>"+_opt.blankStr+"</option>");
					}
					if( _opt.optionList != null ) {
						var _obj;
						for( var idx = 0 ; idx < _opt.optionList.length; idx++ ) {
							_obj = _opt.optionList[idx];
							elSelect.append("<option value='"+_obj[_opt.jsonReader.code]+"'>"+_obj[_opt.jsonReader.value]+"</option>");
						}
					}
				},
				textarea : function( el, obj ) {
					
					var _textareaOptions = {
						rows : 5
					};
					
					var _opt = $.extend(true,{},this.options,obj );
					el.html(_f.html.form.textarea(_opt));
				},
				date : function( el, obj ) {
					
					var _opt = $.extend(true,{},this.options,obj );
					el.html(_f.html.form.date(_opt));
				},
				custom : function(el, obj ) {
					
					var _opt = $.extend(true,{},this.options,obj );
					el.html(_f.html.form.custom(_opt));
				},
				execBatch : function( el, formList ) {
					
					var _obj, areaForm;
					var _label, _input;
					
					if ( formList.length == undefined )
						return;
					
					for( var idx = 0 ; idx < formList.length; idx++ ) {
						_obj = formList[idx];
						el.append(_f.html.formInputGroup(_obj));
						areaForm = el.children(".form-group").last().addClass("form-inline");
						
						if ( _obj.type == 'select' ) {
							_f.makeForm.select(areaForm, _obj);
							_input = areaForm.find("select");
						} else if ( _obj.type == 'textarea' ) {
							_f.makeForm.textarea(areaForm, _obj);
							_input = areaForm.find("textarea");
						} else if ( _obj.type == 'custom' ) {
							_f.makeForm.custom(areaForm, _obj);
							_input = null;
						} else {
							_f.makeForm.text(areaForm, _obj);
							_input = areaForm.find("input");
						}
						_label = areaForm.find("label");

						if( _obj.required != undefined && _obj.required ) {
							_label.addClass("required");
							_input.attr("required","true");
						} 
						
						if( _input != null && _obj.etc != undefined ) {
							_input.attr(_obj.etc);
						}
					}
				}
			},
			makeGrid : function( el , obj ) {
				
				el.html("<div></div>");
				var _g = el.find("div");
				
				_g.pqGrid(obj);
				
				MngEvent.addWinResizeEvent("resize-"+el.selector+"-grid", function(){
					
					_g.pqGrid('option', 'width', el.width()).pqGrid('refresh');
				});
				
				_g.on( "pqpagerchange", function( event, ui ) {
					if( ui.rPP != undefined  ) {
						_g.pqGrid( "option", "pageModel.curPage", 1 );
					}
				} );
				
				return _g;
			}
		};
		
		_this.initialize = function(obj) {
			
			$.extend(true, _els, obj.els);
			$.extend(true, _msg, obj.msg);
			_f.init.widget(obj);
			_f.init.mainBar();     // mainBar initialize
			_f.init.grid();
		};
		_this.mainMenu = {
			options : {
				iconCss  : null,
				menuCss  : null,
				menuLvl  : null , 
				menuId   : null,
				menuName : null,
				menuType : null,
				subMenus : null,
			},
			addMenu : function(el, obj) {
				obj.menuCss = "link-title";
				
				var _opt = $.extend(true, {}, this.options, obj );
				el.append(_f.html.mainMenu(_opt));
			},
			addMenuSub : function (el, obj) {
				if( obj.iconCss == undefined || obj.iconCss == null )
					obj.iconCss = "fa fa-angle-right";
				
				var _opt = $.extend(true, {}, this.options, obj );
				el.append(_f.html.mainMenu(_opt));
			}
		};
		
		_this.popover = {
			options : {
				title : null,
				contextCss : {
					minWidth : "300px"
				},
				id        : $.guid,
				direction : 'left',
				shownFunc : null
			},
			render : function(el, obj) {
				
				var _opt = $.extend(true,{},this.options, obj );
				
				var _elPopoverCntn, _elCloseBtn;
				
				var pOver = el.popover({
	                container: _els.areaMain,
	                html: true,
	                title: function() {
	                    return _opt.title+'<span class="close">&times;</span>';
	                },
	                delay: {show: 150, hide: 0},
	                content : '<div id="'+_opt.id+'_popover'+'"></div>',
	                placement: function(context, src){
	                    $(context).css(_opt.contextCss);
	                    return _opt.direction;
	                },
	            }).click(function(event) {
	            	event.preventDefault();
//	            	$('#'+el.attr("id")+' [data-toggle="popover"]').not($(this)).popover('hide'); //결재선 다른 팝오버 숨김
	            	
	                
	            }).on('shown.bs.popover', function() { 
	                // 팝오버 내용 생성
	                _elPopoverCntn = _els.areaMain.find("#"+_opt.id+'_popover');
	                _elCloseBtn = _els.areaMain.find(".popover .close");
	                
	                _elCloseBtn.off().click(function(){
	                	pOver.popover('hide');
	                });
	                if( _opt.shownFunc != null ) {
	                	_opt.shownFunc(_elPopoverCntn);
	                }
	            });
				
				return {
					close : function() {
						pOver.popover('hide');
					}
				};
			}
		};
		
		_this.mainBar = {
			options : {
				iconCss : null,
				title   : null
			},	
			render : function(obj) {
				
				var _opt = $.extend(true, {}, this.options, obj );
				_els.mainBar.title.text(_opt.title);
				_els.mainBar.icon.removeClass().addClass(_opt.iconCss);
				_els.mainBar.btnGroup.empty();
			},
			addButton : function( btnObj ){
				
				_this.button.render(_els.mainBar.btnGroup, $.extend(true, {btnCls:"btn-default btn-sm"}, btnObj));
			}	
		};
		
		_this.toolbar = {
			
			options : {
				colClass : 'col-lg-12',
				boxClass : null,
				id       : $.guid, 
				buttons  : null,
			},
			render : function(el, obj) {
				
				var _opt = $.extend(true,{},this.options, obj );
				el.html( _f.html.toolbar(_opt));
				
				if( _opt.boxClass != null )
					el.find(".box").addClass(_opt.boxClass);
				
				var _areaToolbar = el.find(".toolbar");
				
				if( _opt.buttons != null ) {
					
					for( var idx = 0 ; idx < _opt.buttons.length; idx++ ) {
						
						_this.button.render(_areaToolbar, $.extend(true, {btnCls:"btn-default btn-xs"}, _opt.buttons[idx]));
					}
				}
				
				return _areaToolbar;
			}
		};

		return _this;
		
	};
	
	return new _funcs();
	
});