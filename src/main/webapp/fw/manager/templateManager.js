define(['jquery','../../fw/manager/eventManager',
        'text!../../../fw/manager/tmpl/mainEditor.html'], function ($, MngEvent, _tmplEditor) {
	
	var _this = {};
	
	var _els = {
		areaMain : null,
		areaEditor : null,
		areaMainBar : null,
		areaShowMsg : null,
		mainBar : {},
		mainEditor : {},
	};
	
	var _msg = {
		blankStr : "::::::",
		search   : "Search"
	};
	
	
	var _vws = {
		grid : null,
	}
	
	var _f = {
		init : {
			mainBar : function() {
				
				_els.areaMainBar.html(_f.html.mainBar());
				_els.mainBar.label = _els.areaMainBar.find("h3");
				_els.mainBar.icon = _els.mainBar.label.find("i");
				_els.mainBar.title = _els.mainBar.label.find("span");
				_els.mainBar.btnGroup = _els.areaMainBar.find(".btn-group");
			},
			mainEditor : function() {
				
				_els.areaEditor.html(_.template(_tmplEditor));
				_els.mainEditor.editPanel = _els.areaEditor.find(".panel");
				_els.mainEditor.editTitle = _els.mainEditor.editPanel.find(".panel-title");
				_els.mainEditor.editBody = _els.mainEditor.editPanel.find(".panel-body");
				_els.mainEditor.editToolbar = _els.mainEditor.editPanel.find(".panel-toolbar");
//				_els.mainEditor.editContents = _els.mainEditor.editBody.find(".panel-contents");
				MngEvent.addEvent(_els.mainEditor.editPanel.find(".close"), "click", _this.mainEditor.hideEditor);
			}, 
			grid : function() {
				
				requirejs(['grid'] , function(grid) {
					
				});
			}
		},
		html : {
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
			mainBar : function() {
				
				var rtnHtml = '<div class="pull-left"><h3>';
				rtnHtml += "<i class=''></i>&nbsp;";
				rtnHtml += "<span></span></h3></div>";
				rtnHtml += "<div class='btn-group pull-right'></div>";
				return rtnHtml; 
			},
			showMsg : function( obj ) {
				var rtnHtml = '<div class="alert alert-'+obj.type+'">';
				rtnHtml += '<strong>'+obj.msg+'</strong>';
				rtnHtml +='</div>';
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
		_f.init.mainBar();     // mainBar initialize
		_f.init.mainEditor(obj.callbackFunc);  // mainEditor initialize
		_f.init.grid();
	};
	
	_this.nvButton = {
		options : {
			id      : "",
			linkCss : "",
			title   : "",
			btnCss  : ""
		},
		add  : function(el, obj ) {
			var _btnOpt = $.extend(true, {}, this.options, obj );
			el.append(_f.html.nvButton(_btnOpt));
		}
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
	
	_this.button = {
		options : {
			name : null,
			btnCls : null,
			id   : $.guid,
			callbackFunc : null
		},
		render : function(el, obj) {
			var _opt = $.extend(true,{},this.options, obj );
			
			el.append(_f.html.button(_opt));
			
			el.find("button").last().click(function(e){
				if ( _opt.callbackFunc != null )
					_opt.callbackFunc(e);
				
				$(this).blur();
			});
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
//            	$('#'+el.attr("id")+' [data-toggle="popover"]').not($(this)).popover('hide'); //결재선 다른 팝오버 숨김
            	
                
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
	
	_this.mainEditor = {
			
		options : {
			title : null,
			showToolbar  : true,
			buttons      : null,
			formList     : null,
			callBackHide : null,
			callBackShow : null
		},	
		render : function(obj) {
			
			this.options = {
				title : null,
				showToolbar  : true,
				buttons      : [],
				formList     : [],
				callBackHide : null,
				callBackShow : null
			};
			$.extend(true, this.options, obj );
			
			_els.mainEditor.editTitle.text(this.options.title);
			_els.mainEditor.editPanel.addClass("panel-default");
			_els.mainEditor.editToolbar.empty();
			_els.mainEditor.editBody.empty();
			
			if ( this.options.showToolbar ) {
				
				for( var idx = 0 ; idx < this.options.buttons.length; idx++ ) {
					
					_this.button.render(_els.mainEditor.editToolbar, $.extend(true, {btnCls:"btn-default btn-sm"}, this.options.buttons[idx]));
				}
			}
			
			_f.makeForm.execBatch(_els.mainEditor.editBody, this.options.formList);
			
//			var _obj, _label, _input;
//			for( var idx = 0 ; idx < this.options.formList.length; idx++ ) {
//				_obj = this.options.formList[idx];
//				_els.mainEditor.editBody.append(_f.html.formInputGroup(_obj));
//				areaForm = _els.mainEditor.editBody.children(".form-group").last().addClass("form-inline");
//				
//				
//				if ( _obj.type == 'select' ) {
//					_f.makeForm.select(areaForm, _obj);
//					_input = areaForm.find("select");
//				} else if ( _obj.type == 'textarea' ) {
//					_f.makeForm.textarea(areaForm, _obj);
//					_input = areaForm.find("textarea");
//				} else if ( _obj.type == 'custom' ) {
//					_f.makeForm.custom(areaForm, _obj);
//					_input = null;
//				} else {
//					_f.makeForm.text(areaForm, _obj);
//					_input = areaForm.find("input");
//				}
//				_label = areaForm.find("label");
//
//				if( _obj.required != undefined && _obj.required ) {
//					_label.addClass("required");
//					_input.attr("required","true");
//				} 
//				
//				if( _input != null && _obj.etc != undefined ) {
//					_input.attr(_obj.etc);
//				}
//			}
			
			_els.areaEditor.width(320).css({
				position: "absolute",
				right : -(_els.areaEditor.width())
			});
			_els.areaEditor.hide();
		},
		addButton : function( btnObj ){
			
		},
		showEditor : function() {
			
			_els.areaEditor.show();
			
			_els.areaMain.closest(".area-inner").animate({
	            marginRight: _els.areaEditor.width(),
	        }, 500 );
			
			_els.areaEditor.animate({
	            right: 2, 
	            opacity:1,
	            display:'block'
	        }, 500 );
			
			setTimeout(function(){

				if ( _this.mainEditor.options.callBackShow != null )
					_this.mainEditor.options.callBackShow();
				
				MngEvent.execWinResize();
			}, 500);
			
		},
		hideEditor : function() {
			
			_els.areaMain.closest(".area-inner").animate({
				marginRight: "0px"
	        }, 500 );

			_els.areaEditor.animate({
	            right  : -(_els.areaMain.width()+10),
	            opacity:0,
	        }, 500 );
			
			setTimeout(function(){
				
				if ( _this.mainEditor.options.callBackHide != null )
					_this.mainEditor.options.callBackHide();
				_els.areaEditor.hide();
				
				MngEvent.execWinResize();
			}, 500);
			
		},
		getInputValue : function() {
			
			var rtnObj = {};
			var obj;
			console.log(this.options);
			for( var idx = 0 ; idx < this.options.formList.length; idx++ ) {
				obj = this.options.formList[idx];
				

				if ( obj.type == 'custom' )
					continue;
					
				if ( obj.type == 'date' )
					rtnObj[obj.id] = _els.mainEditor.editBody.find("#"+obj.id).val();
				else
					rtnObj[obj.id] = _els.mainEditor.editBody.find("#"+obj.id).val(); //text , textarea, select
			}
			return rtnObj;
		},
		getContents : function() {
			return _els.mainEditor.editBody;
		}
	};
	
	_this.search = {
		options : {
			title        : null,
			formList     : null,
			searchFunc   : null
		},
		formObj : {
			id   : null,
			type : "text" // text / select / checkbox, radio , 
		},
		render : function(el, obj){
			
			var _opt = $.extend(true,{},this.options, obj );
			el.empty();
			
			// row box 생성
			var boxObj = _this.rowBox.render(el,{
				title   : _opt.title,
				buttons : [{
					name : _msg.search,
					callbackFunc : _opt.searchFunc
				}]
			});
			
			boxObj.elBoxBody.addClass("search-area");
			boxObj.elBoxBody.append(_f.html.formBody());
			
			var elBody = boxObj.elBoxBody.find(".form-body");
			var obj, areaForm;
			
			_f.makeForm.execBatch(elBody, _opt.formList);
			
//			for( var idx = 0 ; idx < _opt.formList.length; idx++ ) {
//				obj = _opt.formList[idx];
//				elBody.append(_f.html.formInputGroup(obj));
//				areaForm = elBody.children(".form-group").last();
//				
//				if ( obj.type == 'select' )
//					_f.makeForm.select(areaForm, obj);
//				else
//					_f.makeForm.text(areaForm, obj);
//			}

			var _searchData = function() {
				
				var rtnObj = {};
				var obj;
				for( var idx = 0 ; idx < _opt.formList.length; idx++ ) {
					obj = _opt.formList[idx];
					if ( obj.type == 'select' )
						rtnObj[obj.id] = elBody.find("#"+obj.id).val();
					else
						rtnObj[obj.id] = elBody.find("#"+obj.id).val();
				}
				return rtnObj;
			};
			
			return {
				searchData : _searchData,
				addButton : boxObj.addButtion
			};
		}
	};
	
	_this.rowBox = {
		options : {
			boxClass : null,
			title : null,
			buttons : []
		},
		render : function(el, obj) {
			
			var _opt = $.extend(true,{},this.options, obj );
			var _elHeader, _elBtnGroup, _elBody;
			el.html(_f.html.rowBox());
			
			_elHeader = el.find(".box").find("header");
			_elBtnGroup = _elHeader.find(".pull-right");
			_elBody = el.find(".box").find(".body");
			
			if( _opt.boxClass != null )
				el.find(".box").addClass(_opt.boxClass);
			
			if( _opt.title == null && _opt.buttons.length == 0 ) {
				
				_elHeader.remove();
			} else {
				
				if( _opt.title != null )
					_elHeader.find("h5").html(_opt.title);
				
				for( var idx = 0; idx < _opt.buttons.length; idx++ ) {
					_this.button.render(_elBtnGroup, $.extend(true, {btnCls:"btn-default btn-xs"}, _opt.buttons[idx]));
				}
			}

			return {
				elBoxBody : _elBody,
				addButtion : function( obj ) {
					_this.button.render(_elBtnGroup, $.extend(true, {btnCls:"btn-default btn-xs"}, _opt.buttons[idx]));
				}
			};
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
	
	_this.grid = {
		options : {
			colModel   : null,
			dataModel  : {
				data : null
			},
			width : "auto",
			title: "No Title",
			showTitle : false, 
			resizable:false,
			draggable:false,
			scrollModel: { autoFit: true },
	        collapsible: { on: true, collapsed: false },
		},
		render : function(el, obj) {
			var _this = this;
			
			var grid = _f.makeGrid(el, $.extend(true, {}, this.options, obj));
			
			var _reloadData = function(data) {
				
				var reloadData ;
		        if( data == undefined ) {
		        	reloadData = {
		            	dataModel : {
		            		data : [],
		            		location : "local"
		            	}
		            }
				}else {
					reloadData = data;
				}
		
		        grid.pqGrid('option', reloadData).pqGrid('refreshDataAndView');
			}
			return {
				reloadData : _reloadData
			};
		},
	};
	
	_this.showMsg = {
		options : {
			msg : "",
			callbackFunc : null,
			type : 'seccess',
		},
		render : function( obj ) {
			
			var _opt = $.extend(true,{},this.options, obj );
			_els.areaShowMsg.append(_f.html.showMsg(_opt));
			var _alert = _els.areaShowMsg.children(".alert").last();
			_els.areaShowMsg.animate({
	            bottom: "150px", 
	        }, 500 );
			_alert.animate({
	            opacity: 1, 
	        }, 1000 );
			
			setTimeout(function(){
				_els.areaShowMsg.animate({
		            bottom: "0px", 
		        }, 1000 );
				
			}, 200);
			setTimeout(function(){
				
				_alert.animate({
		            opacity:0, 
		        }, 1000 );
				
				setTimeout(function(){
					_alert.remove();
				}, 1000);
				
			}, 4000);
			
			if( _opt.callbackFunc != null )
				_opt.callbackFunc();
		}
	};
	
	return {
		initialize : _this.initialize,
		nvButton   : _this.nvButton,
		mainMenu   : _this.mainMenu,
		button     : _this.button,
		addForm    : _f.makeForm,
		popover    : _this.popover,
		mainBar    : _this.mainBar,
		mainEditor : _this.mainEditor,
		search     : _this.search,
		rowBox     : _this.rowBox,
		toolbar    : _this.toolbar,
		grid       : _this.grid,
		showMsg    : _this.showMsg,
	};
});