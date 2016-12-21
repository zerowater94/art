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
				addLabel : function( obj ) {
					
					if( obj.label == null )
						return "";
					
					var isRequired = "";
					if (  obj.validation != undefined && obj.validation.required )
						isRequired = "required";
					
					if( obj.type == 'textarea')
						return '<label class="input-group col-form-label textarea-label '+obj.labelCls+'  '+isRequired+'">'+obj.label+'</label>';
					else
						return '<label class="input-group-addon col-form-label '+obj.labelCls+' '+isRequired+'">'+obj.label+'</label>';
				},
				addDiv : function( obj ) {
					return "<div id='"+obj.id+"'></div>";
				},
				form : {
					text : function( obj ) {
						
						var html = '';
						html += '<input type="text" class="'+obj.inputCls+'" id="'+obj.id+'" placeholder="'+obj.placeholder+'">';
						return html;
					},
					textarea : function( obj ) {
						
						var html = '';
						html += '<textarea class="form-control" id="'+obj.id+'" rows="'+obj.typeOpt.rows+'" ></textarea>';
						return html;
					},
					select : function( obj ) {
						
						var html = "";
						html += '<div class="input-group"><select class="'+obj.inputCls+'"  id="'+obj.id+'" ></select></div>';
						return html;
					},
					radio : function( obj ) {
						
						var html = "";
						html += '<div class="input-group"></div>';
						return html;
					},
					date : function(obj) {
						
						var html = "";
						html += '<div class="input-group date">';
						html += '<input type="text" id="'+obj.id+'SDate" class="form-control">';
						html += '<span class="input-group-addon"> ~ </span>';
						html += '<input type="text" id="'+obj.id+'EDate" class="form-control">';
						html += '</div>';
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
				},
				addRow : function(obj ) {
					var html = '<div class="row">';
					for( var idx = 0 ; idx < obj.cols.length; idx++ ) {
						html += '<div class="col-sm-'+obj.cols[idx]+'" ></div>';
					}
					
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
					var _rtnBtnEl = el.find("button").last();
					_rtnBtnEl.click(function(e){
						if ( _opt.callbackFunc != null )
							_opt.callbackFunc(e);
						$(this).blur();
					});
					return _rtnBtnEl;
				}	
			},
			addRow : {
				options : {
					cols : [12]
					
				},
				render : function( el, obj ) {
					
					var _opt = $.extend(true,{},this.options, obj );
					el.append(_f.html.addRow(_opt));
					return el.find(".row").last();
				}
			},
			makeForm : {
				options : {
					type   : "text",
					id     : 'form-'+$.guid,
					label  : "",
					labelCls : "",
					inputCls : "",
					placeholder : "",
					validation : {
						readOnly   : false,
						required   : false,
						maxLength  : null,
						minLength  : null,
						onlyEng    : null,
						onlyEngNum : null,
						onlyNum    : null,
						currency   : null,
						notKor     : null,
					},
					addedBtn : null,
					typeOpt  : null,
				},
				formList : function() {
					
					var formObj = _f.html.form;
					var rtnList = [];
					for(var key in formObj) {
						rtnList.push(key);
					}
					return rtnList;
				},
				getNewFormObj : function( obj ) {
					return $.extend(true,{},_f.makeForm.options, obj);
				},
				addNewForm : function( el, obj ) {
					
					var _areaForm, _elRtnForm, _elInput, _elLabel;  
					var _opt = $.extend(true,{},_f.makeForm.options, obj );
					el.append(_f.html.formInputGroup(_opt));
					var areaForm = el.children(".form-group").last().addClass("form-inline");
					
					// add label
					areaForm.html(_f.html.addLabel(_opt));
					
					_elRtnForm = areaForm;
					_elLabel   = areaForm.find("label"); //validation attribute set..
					
					_elRtnForm = _f.makeForm.appendFormEl(areaForm, _opt);

					return _elRtnForm;
				},
				appendFormEl : function( elFormGroup, obj ) {
					
					var _elRtnForm = elFormGroup;
					
					if ( obj.type == 'select' ) {
						_f.makeForm.select(elFormGroup, obj);
						_elRtnForm = elFormGroup.find(".input-group");
					} else if ( obj.type == 'textarea' ) {
						_f.makeForm.textarea(elFormGroup, obj);
					}else if ( obj.type == 'date' ) {
						_f.makeForm.date(elFormGroup, obj);
						_elRtnForm = elFormGroup.find(".input-group");
					} else if ( obj.type == 'custom' ) {
						_f.makeForm.custom(elFormGroup, obj);
					} else {
						_f.makeForm.text(elFormGroup, obj);
					}
					return _elRtnForm;
				},
				setValidAttr : function( obj,  _elInput ) {
					
					var _objValid = obj.validation;
					
					if( _objValid.required != undefined && _objValid.readOnly ) {
						_elInput.attr("readOnly","true");
					} 
					if( _objValid.required != undefined && _objValid.required ) {
						_elInput.attr("required","true");
					} 
					if( _objValid.maxLength != null ) {
						_elInput.attr("max-length",_objValid.maxLength);
					}
					if( _objValid.minLength != null ) {
						_elInput.attr("min-length",_objValid.minLength);
					}
					if( _objValid.onlyEng != null && _objValid.onlyEng ) {
						_elInput.attr("only-eng",true);
					}
					if( _objValid.onlyEngNum != null && _objValid.onlyEngNum ) {
						_elInput.attr("only-engNum",true);
					}
					if( _objValid.onlyNum != null && _objValid.onlyNum ) {
						_elInput.attr("only-num",true);
					}
					if( _objValid.currency != null && _objValid.currency ) {
						_elInput.attr("currency",true);
					}
					if( _objValid.notKor != null && _objValid.notKor ) {
						_elInput.attr("not-kor",true);
					}
				},
				text : function( el, obj ) {
					
					el.append(_f.html.form.text(obj));
					
					var elInput = el.find("input");
					
					if( obj.addedBtn != null ) {
						_f.button.render(el, obj.addedBtn);
						elInput.css({
							maxWidth : "80%"
						});
					}
					
					_f.makeForm.setValidAttr(obj, elInput);
				},
				select : function( el, obj ) {
					
					var _selOptions = {
						optionsList : null,
						blankStr    : _msg.blankStr,
						blankOption : true,
						defaultParam : null,
						jsonReader  : {
							code : "code",
							value : "value"
						}
					};
					var _typeObj = $.extend(true,{},_selOptions, obj.typeOpt );
					el.append(_f.html.form.select(obj));
					
					var _elInputGroup = el.find(".input-group");
					var elSelect = _elInputGroup.find("select");
					
					if( obj.addedBtn != null ) {
						_f.button.render(el.find(".input-group"), obj.addedBtn);
						elSelect.css({
							maxWidth : "80%"
						});
					}
					
					if( _typeObj.blankOption ) {
						elSelect.append("<option value=''>"+_typeObj.blankStr+"</option>");
					}
					if( _typeObj.optionList != null ) {
						var _obj;
						for( var idx = 0 ; idx < _typeObj.optionList.length; idx++ ) {
							_obj = _typeObj.optionList[idx];
							
							if( typeof _obj == 'object')
								elSelect.append("<option value='"+_obj[_typeObj.jsonReader.code]+"'>"+_obj[_typeObj.jsonReader.value]+"</option>");
							else
								elSelect.append("<option value='"+_obj+"'>"+_obj+"</option>");
						}
					}
					
					if( _typeObj.defaultParam != null )
						elSelect.val(_typeObj.defaultParam);
					
					_f.makeForm.setValidAttr(obj, elSelect);
				},
				textarea : function( el, obj ) {
					
					var _textareaOptions = {
						rows : 5
					};
					
					el.append(_f.html.form.textarea(obj));
					var elInput = el.find("textarea");
					_f.makeForm.setValidAttr(obj, elInput);
				},
				date : function( el, obj ) {
					
					el.append(_f.html.form.date(obj));
				},
				custom : function(el, obj ) {
					
					el.append(_f.html.addDiv(obj));
				},
				
				execBatch : function( el, formList ) {
					
					var _rtnElObj = {};
					var _obj;
					
					if ( formList.length == undefined )
						return;
					
					for( var idx = 0 ; idx < formList.length; idx++ ) {
						_obj = formList[idx];
						_rtnElObj[_obj.id] = _f.makeForm.addNewForm( el, _obj);
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
			relocationEl : function( container, elParent) {
		    	
		    	var cntnEl = elParent;
		    	var position = cntnEl.position();
		    	var winW = container.width();
		    	var winH = container.height();
		    	var cntnW = cntnEl.width();
		    	var cntnH = cntnEl.height();

		    	var minLeft = -1*(cntnW - 200) ; // 100만큼 보이게 ( 최소 )
		    	var minTop = 0; // 
		    	
		    	var maxLeft = winW-200; // 100만큼 보이게 ( 최소 )
		    	var maxTop = winH-cntnH; // Header이기 때문에 ( 헤더가 사라지게는 하지 않는다 ), 30( bs modal top margin) + header높이
		    	
		    	if( position.left < minLeft ) {
		    		cntnEl.css({
		            	left:minLeft+"px",
		            });
		    	}

		    	if( position.left > maxLeft ) {
		    		cntnEl.css({
		            	left:maxLeft+"px",
		            });
		    	}

		    	if( position.top < minTop ) {
		    		cntnEl.css({
		            	top:minTop+"px",
		            });
		    	}
		    	
		    	if( position.top > maxTop ) {
		    		cntnEl.css({
		            	top:maxTop+"px",
		            });
		    	}
		    }
		};
		
		_this.initialize = _f.init;
		_this.button = _f.button;
		_this.makeForm = _f.makeForm;
		_this.rowBox = _f.rowBox;
		_this.relocationEl = _f.relocationEl;
		_this.addRow = _f.addRow;
		
		return _this;
	}; 
	
	return new _funcs();
});