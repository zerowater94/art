define(['basicInfo', 'basicUtil'
        , 'text!../../common/view/tmpl/basicEditor.html'
        ], function (BasicInfo, BasicUtil, _tmplEditor) 
{
	'use strict';
	
	var basicTemplate = {
		// Main 상단 페이지 button
		nvButton : {
			options : {
				id      : "",
				linkCss : "",
				title   : "",
				btnCss  : ""
			},
			add  : function(el, obj ) {
				var _btnOpt = $.extend(true, {}, this.options, obj );
				
				var rtnHtml = '<div class="btn-group">';
				rtnHtml += '<a data-toggle="tooltip" data-original-title="'+_btnOpt.title+'" data-placement="bottom" class="btn '+_btnOpt.linkCss+'" id="'+_btnOpt.id+'">';
				rtnHtml += '<i class="'+_btnOpt.btnCss+'"></i>';
				rtnHtml += '</a></div>';
				el.append(rtnHtml);
			}
		},
		mainMenu : {
			options : {
				iconCss  : null,
				menuCss  : null,
				menuLvl  : null , 
				menuId   : null,
				menuName : null,
				menuType : null,
				subMenus : null,
			},
			getHtml : function( obj ) {
				
				var _opt = $.extend(true, {}, this.options, obj );
				var rtnHtml = '<li id='+_opt.menuId+'><a>';
				if ( _opt.iconCss != null ) {
					rtnHtml += '<i class="'+_opt.iconCss+'"></i>';
				}
				
				if( _opt.menuCss != null  ) {
					rtnHtml += '<span class="'+_opt.menuCss +'">&nbsp;'+_opt.menuName+'</span>';
				}else {
					rtnHtml += '&nbsp;'+_opt.menuName+'';
				}
				
				
				if ( _opt.subMenus != null ) {
					rtnHtml += '<span class="fa arrow"></span>';
				}
				
				rtnHtml    += '</a>';
				
				if ( _opt.subMenus != null ) {
					rtnHtml += '<ul class="collapse"></ul>';
				}
				
				rtnHtml    += '</li>';
				
				return rtnHtml;
			},
			addMenu : function(el, obj) {
				obj.menuCss = "link-title";
				el.append(this.getHtml(obj));
			},
			addMenuSub : function (el, obj) {
				if( obj.iconCss == undefined || obj.iconCss == null )
					obj.iconCss = "fa fa-angle-right";
				el.append(this.getHtml(obj));
			}
		},
		mainBar : {
			options : {
				iconCss : null,
				title   : null
			},
			els : {},
			initialize : function( el ) {
				
				var rtnHtml = '<div class="pull-left"><h3>';
				rtnHtml += "<i class=''></i>&nbsp;";
				rtnHtml += "<span></span></h3></div>";
				rtnHtml += "<div class='btn-group pull-right'></div>";
				
				el.html(rtnHtml);
				this.els.label = el.find("h3");
				this.els.icon = this.els.label.find("i");
				this.els.title = this.els.label.find("span");
				this.els.btnGroup = el.find(".btn-group");
				
			},
			render : function(obj) {
				
				var _opt = $.extend(true, {}, this.options, obj );
				this.els.title.text(_opt.title);
				this.els.icon.removeClass().addClass(_opt.iconCss);
				this.els.btnGroup.empty();
			},
			addButton : function( btnObj ){
				
				basicTemplate.button.render(this.els.btnGroup, $.extend(true, {btnCls:"btn-default btn-sm"}, btnObj));
			}
		},
		mainEditor : {
			options : {
				title : null,
				callBackHide : null,
				callBackShow : null
			},
			els : {},
			initialize : function( el ) {

				el.html(_.template(_tmplEditor));
				
				this.$el = el;
				this.els.editPanel = el.find(".panel");
				this.els.editTitle = this.els.editPanel.find(".panel-title");
				this.els.editBody = this.els.editPanel.find(".panel-body");
				
				BasicInfo.addEvent(this.els.editPanel.find(".close"), "click", this.hideEditor);
				
			},
			render : function(obj) {
				
				var _this = basicTemplate.mainEditor;
				_this.options = {
					title : null,
					callBackHide : null,
					callBackShow : null
				};
				$.extend(true, _this.options, obj );
				
				this.els.editTitle.text(_this.options.title);
				this.els.editPanel.addClass("panel-default");
				
				_this.$el.width(320);

				_this.$el.css({
					position: "absolute",
					right : -(_this.$el.width())
				});
				
				_this.$el.hide();
			},
			addButton : function( btnObj ){
				
				basicTemplate.button.render(this.els.btnGroup, $.extend(true, {btnCls:"btn-default btn-sm"}, btnObj));
			},
			showEditor : function() {
				
				var _this = basicTemplate.mainEditor;
				_this.$el.show();
				
				BasicInfo.getMainArea().closest(".area-inner").animate({
		            marginRight: _this.$el.width(),
		        }, 500 );
				
				_this.$el.animate({
		            right: 2, 
		            opacity:1,
		            display:'block'
		        }, 500 );
				
				setTimeout(function(){
					if ( _this.callBackShow != null )
						_this.callBackShow();
				}, 500);

			},
			hideEditor : function() {
				var _this = basicTemplate.mainEditor;
				
				BasicInfo.getMainArea().closest(".area-inner").animate({
					marginRight: "0px"
		        }, 500 );

				_this.$el.animate({
		            right  : -(_this.$el.width()+10),
		            opacity:0,
		        }, 500 );
				
				setTimeout(function(){
					
					if ( _this.options.callBackHide != null )
						_this.options.callBackHide();
					_this.$el.hide();
					
				}, 500);
				
				BasicInfo.removeWinResizeEvent("window-resize_"+_this.$el.selector);
			},
			getContents : function() {
				return basicTemplate.mainEditor.els.editBody;
			},
		},
		dropDown : {
			options : {
				name : "",
				id   : $.guid,
				menus : null,
				btnCls : "btn-default",
				callbackFunc : null , 
				useHelp : {
					use : false,
					clickFunc : null
				}
			},
			render : function( el, obj ) {
				var _opt = $.extend(true,{},this.options, obj );
				
				basicInfo.send({
	                url : "app/common/tmpl/dropdown.html",
	                dataType : "html",
	                success : function(data) {
	                	el.html(data);
	                }
	            });
				
				var _elBtn = el.find("button");
				var _elUL  = el.find("ul.dropdown-menu");
				_elBtn.find("span.select-text").html(_opt.name);
				_elBtn.attr("id", _opt.id).addClass(_opt.btnCls);

				_elUL.attr("aria-labelledby", _opt.id);
				
				if( _opt.menus != null ) {
					var _obj;
					for( var idx = 0; idx < _opt.menus.length; idx++ ) {
						_obj = _opt.menus[idx];
						_elUL.append('<li  id="'+_obj.id+'"><a href="javascript:void(0)">'+_obj.name+'</a></li>');
					}
					_elUL.find("li").click(function(e){
						_elBtn.find("span.select-text").html($(this).text());
						if( _opt.callbackFunc != null ) 
							_opt.callbackFunc({
								id : $(this).attr("id")
							});
					});
				} 
			},
		},
		button : {
			options : {
				name : null,
				btnCls : null,
				callbackFunc : null
			},
			render : function(el, obj) {
				var _opt = $.extend(true,{},this.options, obj );
				
				el.append('<button type="button" class="btn '+_opt.btnCls+'">'+_opt.name+'</button>');
				
				el.find("button").last().click(function(e){
					_opt.callbackFunc(e);
				});
			}
		},
		date : {
			options : {
				
			},
			getHtml : function() {
				var _h  = '<div class="input-group date">';
				_h += '<input type="text" id="agentStartDate" class="form-control">';
				_h += '<span class="input-group-addon"> ~ </span>';
				_h += '<input type="text" id="agentEndDate" class="form-control">';
				_h += '</div>';
				return getHtml ();
			},
			render : function(el, obj){
				
				el.html(this.getHtml());
			}
		},
		rowBox : {
			options : {
				colClass : 'col-lg-12',
				boxClass : null,
				title : null,
				id    : $.guid, 
			},
			render : function(el, obj) {
				
				var _opt = $.extend(true,{},this.options, obj );
				el.html('<div class="row"><div class="'+_opt.colClass+'" id="'+_opt.id+'"> <div class="box"><header><h5>'+_opt.title+'</h5></header><div class="body"></div><div><div></div>');
				if( _opt.title == null )
					el.find("#"+_opt.id).find("header").remove();
				
				if( _opt.boxClass != null )
					el.find(".box").addClass(_opt.boxClass);
			}
		},
		toolbar : {
			options : {
				colClass : 'col-lg-12',
				boxClass : null,
				id    : $.guid, 
			},
			render : function(el, obj) {
				
				var _opt = $.extend(true,{},this.options, obj );
				el.html('<div class="row"><div class="'+_opt.colClass+'" id="'+_opt.id+'"><div class="box"><header><div class="toolbar"></div></header><div><div></div>');
				if( _opt.boxClass != null )
					el.find(".box").addClass(_opt.boxClass);
			}
		}, 
		grid : {
			options : {
				colModel   : null,
				dataModel  : {
					data : null
				},
				width : "auto",
				title: "No Title",
				resizable:false,
				draggable:false,
				scrollModel: { autoFit: true },
		        collapsible: { on: true, collapsed: false },	
			},
			els : {},
			initialize : function() {
				
			},
			render : {

				var _opt =  $.extend(true, {}, options, paramObj );
				
				thisEl.html("<div></div>");
				_els.grid = thisEl.find("div");
				
				var _g = _els.grid.pqGrid(_pm);
				
				_els.grid.on( "pqpagerchange", function( event, ui ) {
					if( ui.rPP != undefined  ) {
						_els.grid.pqGrid( "option", "pageModel.curPage", 1 );
					}
				} );
				return _g;
			},
			
		},
	}
	
	return basicTemplate;
	
});