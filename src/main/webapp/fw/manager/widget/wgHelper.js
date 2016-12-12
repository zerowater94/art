define(['mngEvent',
        'text!../../../fw/manager/tmpl/mainEditor.html'
        ], function (MngEvent, _tmpl) {
	
	'use strict';
	
	var _funcs = function() {
		
		var _this = {};
		
		var _msg = {
			blankStr : "::::::",
			search   : "Search"
		};
		
		var _f = {
			init : function(obj) {
				_this.msg = $.extend(true, {} , _msg, obj);
			},
			html : {
				button : function( obj ) {
					return '<button type="button" class="btn '+obj.btnCls+'" id="'+obj.id+'">'+obj.name+'</button>';
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
					},
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
			button : {
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
					
					var _elInputGroup = el.find(".input-group");
					var elSelect = _elInputGroup.find("select");
					
					
					if( _opt.addedBtn != null ) {
						_f.button.render(el.find(".input-group"), _opt.addedBtn);
						elSelect.css({
							maxWidth : "80%"
						});
					}
					
					
					
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
					
					var _formOpt = {
						id   : null,
						type : "text",
						required : null,
						etc      : null,
						addedBtn : null,
					};
					var _rtnElObj = {}, _obj, areaForm;
					var _label, _input;
					
					if ( formList.length == undefined )
						return;
					
					for( var idx = 0 ; idx < formList.length; idx++ ) {
						_obj = $.extend(true,{},_formOpt,formList[idx] );
						el.append(_f.html.formInputGroup(_obj));
						areaForm = el.children(".form-group").last().addClass("form-inline");
						
						_rtnElObj[_obj.id] = areaForm;
						
						if ( _obj.type == 'select' ) {
							_f.makeForm.select(areaForm, _obj);
							_rtnElObj[_obj.id] = areaForm.find(".input-group");
							_input = areaForm.find("select");
						} else if ( _obj.type == 'textarea' ) {
							_f.makeForm.textarea(areaForm, _obj);
							_input = areaForm.find("textarea");
						}else if ( _obj.type == 'date' ) {
							_f.makeForm.date(areaForm, _obj);
							_rtnElObj[_obj.id] = areaForm.find(".input-group");
						} else if ( _obj.type == 'custom' ) {
							_f.makeForm.custom(areaForm, _obj);
							_rtnElObj[_obj.id] = areaForm.find("#"+_obj.id);
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
					return _rtnElObj;
				}
			},
			rowBox : {
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
							_f.button.render(_elBtnGroup, $.extend(true, {btnCls:"btn-default btn-xs"}, _opt.buttons[idx]));
						}
					}

					return {
						elBoxBody : _elBody,
						addButtion : function( obj ) {
							_f.button.render(_elBtnGroup, $.extend(true, {btnCls:"btn-default btn-xs"}, _opt.buttons[idx]));
						}
					};
				}
			},
		};
		
		_this.initialize = _f.init;
		_this.button = _f.button;
		_this.makeForm = _f.makeForm;
		_this.rowBox = _f.rowBox;
		
		return _this;
	}; 
	
	return new _funcs();
});