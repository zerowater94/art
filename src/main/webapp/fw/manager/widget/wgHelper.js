define(['mngEvent', 'basicUtil',
        'text!../../../fw/manager/tmpl/dropDown.html'
        ], function ($aEvent, $aUtil, TmplDropDown) {
	
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
			null2Str : function( value ) {
				if( value == undefined || value == null )
					return "";
				else
					return value;
			},
			html : {
				button : function( obj ) {
					return '<button type="button" class="btn '+obj.btnCls+'" id="'+obj.id+'">'+obj.name+'</button>\n';
				},
				aTagButton : function( obj ) {
					return '<a href="javascript:void(0);" class="btn '+obj.btnCls+'" id="'+obj.id+'">'+obj.name+'</a>\n';
				},
				formBody : function() {
					
					return "<div class='form-body'></div>";
				},
				formInputGroup : function(obj) {
					
					return "<div id='area-"+obj.id+"' class='form-group "+obj.formGroupCls+"'></div>";
				},
				addLabel : function( obj ) {
					
					if( obj.label == null )
						return "";
					
					var isRequired = "";
					if (  obj.validation != undefined && obj.validation.required )
						isRequired = "required";
					
					if( obj.type == 'textarea')
						return '<sapn class="title input-group col-form-label textarea-label '+obj.labelCls+'  '+isRequired+'">'+obj.label+'</sapn>';
					else
						return '<sapn class="title input-group-addon col-form-label '+obj.labelCls+' '+isRequired+'">'+obj.label+'</sapn>';
				},
				addDiv : function( obj ) {
					return "<div id='"+obj.id+"'></div>";
				},
				radioOption : function( obj, typeObj, optObj ) {
					
					var html = "";
					if( typeObj.isInline ) {
						html += '<label class="radio-inline">';
					} else {
						html += '<div class="radio">';
						html += '<label>';
					}	
					
					html += '<input type="radio" name="'+obj.id+'" value="'+optObj[typeObj.jsonReader.code]+'"> '+optObj[typeObj.jsonReader.value];
					html += '</label>';
					if( !typeObj.isInline )
						html += '</div>';
					return html;
				},
				checkboxOption : function( obj, typeObj, optObj ) {
					
					var html = "";
					if( typeObj.isInline ) {
						html += '<label class="checkbox-inline">';
					} else {
						html += '<div class="checkbox">';
						html += '<label>';
					}	
					
					html += '<input type="checkbox" name="'+obj.id+'" value="'+optObj[typeObj.jsonReader.code]+'"> '+optObj[typeObj.jsonReader.value];
					html += '</label>';
					if( !typeObj.isInline )
						html += '</div>';
					return html;
				},
				addBtnGroup : function() {
					return '<div class="input-group-btn"></div>';
				},
				form : {
					text : function( obj ) {
						
						var html = '';
						html += '<input type="text" class="form-control '+obj.inputCls+'" id="'+obj.id+'" placeholder="'+obj.placeholder+'">';
						return html;
					},
					textarea : function( obj ) {
						
						var html = '';
						html += '<textarea class="form-control" id="'+obj.id+'" rows="'+obj.typeOpt.rows+'" ></textarea>';
						return html;
					},
					select : function( obj ) {
						
						var html = "";
						html += '<select class="form-control '+obj.inputCls+'"  id="'+obj.id+'" ></select>';
						return html;
					},
					radio : function( obj ) {
						
						var html = "";
						html += '<div class="radio-area"></div>';
						return html;
					},
					checkbox : function( obj ) {
						
						var html = "";
						html += '<div class="checkbox-area"></div>';
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
					},
				},
				rowBox : function(obj) {
					
					var html = '<div class="box">';
					html += '<header>';
					if( obj.iconCls != null ) { 
						html += '<div class="icons">'+obj.iconCls+'</div>';	
					}
					html += '<h5></h5>';
					html += '<div class="toolbar"><nav style="padding:8px;"></nav></div>';
					html += '</header>';
					html += '<div class="body"></div><div>';
					html += "</div>";
					return html;
				},
				areaBox : function() {
					return '<div class="area-color"></div>';
				},
				addRow : function( obj ) {
					return '<div class="col-sm-'+obj.colCnt+' '+obj.colCls+' " ></div>';
				},
				li    : function( obj ) {
					return '<li id='+obj[obj.jsonReader.id]+'><a href="javascript:void(0)">'+obj[obj.jsonReader.name]+'</a></li>';
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
			aTagButton : {
				options : {
					name : null,
					btnCls : null,
					id   : $.guid,
					callbackFunc : null
				},
				render : function(el, obj) {
					var _opt = $.extend(true,{},this.options, obj );
					el.append(_f.html.aTagButton(_opt));
					var _rtnBtnEl = el.find("a").last();
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
					id   : "",
					cols : []
				},
				render : function( el, obj ) {
					
					var _colOpt = {
						colCnt : 12,
						colCls : ""
					};
					
					var _opt = $.extend(true,{},this.options, obj );
					el.append('<div class="row" id="'+_opt.id+'" ><div>');
					var rowEl = el.find(".row").last();
					for( var idx = 0 ; idx < _opt.cols.length; idx++ ) {
						rowEl.append(_f.html.addRow($.extend(true,{},_colOpt, _opt.cols[idx] )));
					}
					return rowEl;
				}
			},
			makeForm : {
				options : {
					type   : "text",
					id     : 'form-'+$.guid,
					label  : "",
					labelCls : "",
					inputCls : "",
					formGroupCls : "input-group",
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
					var areaForm = el.children(".form-group").last(); //.addClass("form-inline");
					
					// add label
					if( obj.label != null ) {
						areaForm.html(_f.html.addLabel(_opt));
					}
					_f.makeForm.appendFormEl(areaForm, _opt);
					return areaForm;
				},
				appendFormEl : function( elFormGroup, obj ) {
					
					if ( obj.type == 'select' ) {
						_f.makeForm.select(elFormGroup, obj);
					} else if ( obj.type == 'radio' ) {
						_f.makeForm.radio(elFormGroup, obj);
					}else if ( obj.type == 'checkbox' ) {
						_f.makeForm.checkbox(elFormGroup, obj);
					}else if ( obj.type == 'textarea' ) {
						_f.makeForm.textarea(elFormGroup, obj);
					}else if ( obj.type == 'date' ) {
						_f.makeForm.date(elFormGroup, obj);
					} else if ( obj.type == 'custom' ) {
						_f.makeForm.custom(elFormGroup, obj);
					} else {
						_f.makeForm.text(elFormGroup, obj);
					}
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
						el.append(_f.html.addBtnGroup());
						_f.button.render(el.find(".input-group-btn"), obj.addedBtn);
					}
					
					_f.makeForm.setValidAttr(obj, elInput);
				},
				select : function( el, obj ) {
					
					var _selOptions = {
						optionsList : null,
						blankStr    : _msg.blankStr,
						blankOption : true,
						defaultParam : null,
						callbackChange : null,
						jsonReader  : {
							code : "code",
							value : "value"
						}
					};
					var _typeObj = $.extend(true,{},_selOptions, obj.typeOpt );
					el.append(_f.html.form.select(obj));
					
					var elSelect = el.find("select");
					
					if( obj.addedBtn != null ) {
						el.append(_f.html.addBtnGroup());
						_f.button.render(el.find(".input-group-btn"), obj.addedBtn);
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
					
					if ( _typeObj.callbackChange != null ) 
						$aEvent.addEvent(elSelect,"change",_typeObj.callbackChange);
					
					_f.makeForm.setValidAttr(obj, elSelect);
				},
				radio : function(el, obj) {
					var _radioOptions = {
						isInline    : false,
						optionsList : null,
						defaultParam : null,
						callbackClick : null,
						jsonReader  : {
							code : "code",
							value  : "value"
						}
					};
					var _typeObj = $.extend(true,{},_radioOptions, obj.typeOpt );
					el.append(_f.html.form.radio(obj));
					var elRadio = el.find(".radio-area");
					
					if( _typeObj.optionList != null ) {
						var _obj;
						for( var idx = 0 ; idx < _typeObj.optionList.length; idx++ ) {
							_obj = _typeObj.optionList[idx];
							elRadio.append(_f.html.radioOption(obj, _typeObj, _obj));
						}
					}

					if( _typeObj.defaultParam != null )
						elRadio.find('input:radio [value='+_typeObj.defaultParam+']').attr("checked", true);
					
					if ( _typeObj.callbackClick != null ) 
						$aEvent.addEvent(elRadio,"click",_typeObj.callbackClick);
					
					_f.makeForm.setValidAttr(obj, elRadio);
				},
				checkbox : function(el, obj) {
					var _chkboxOptions = {
						isInline    : true,
						optionsList : null,
						defaultParam : null,
						callbackClick : null,
						jsonReader  : {
							code : "code",
							value  : "value"
						}
					};
					var _typeObj = $.extend(true,{},_chkboxOptions, obj.typeOpt );
					el.append(_f.html.form.checkbox(obj));
					var elCheckbox = el.find(".checkbox-area");
					
					if( _typeObj.optionList != null ) {
						var _obj;
						for( var idx = 0 ; idx < _typeObj.optionList.length; idx++ ) {
							_obj = _typeObj.optionList[idx];
							elCheckbox.append(_f.html.checkboxOption(obj, _typeObj, _obj));
						}
					}

					if( _typeObj.defaultParam != null ) {
					
						for( var idx = 0 ; idx < _typeObj.defaultParam.length; idx++  ) {
							elCheckbox.find('input:chekbox [value='+_typeObj.defaultParam[idx]+']').attr("checked", true);
						}
					}
						
					
					if ( _typeObj.callbackClick != null ) 
						$aEvent.addEvent(elCheckbox,"click",_typeObj.callbackClick);
					
					_f.makeForm.setValidAttr(obj, elCheckbox);
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
				},
				getFormValues : function( el, formList ) {
					
					var rtnObj = {};
					var obj;
					for( var idx = 0 ; idx < formList.length; idx++ ) {
						obj = formList[idx];
						
						if ( obj.type == 'custom' )
							continue;
							
						if ( obj.type == 'date' ) {
							rtnObj[obj.id] = el.find("#"+obj.id).val();
						} else if ( obj.type == 'radio' ){
							rtnObj[obj.id] = el.find(':radio[name="'+obj.id+'"]:checked').val();
						} else if ( obj.type == 'checkbox' ){
							var inVal = [];
							el.find(":checkbox:checked").each(function() { 
						        inVal.push($(this).val());
						   });
							rtnObj[obj.id] = JSON.stringify(inVal);
						} else {
							rtnObj[obj.id] = el.find("#"+obj.id).val(); //text , textarea, select
						}	
					}
					return rtnObj;
				},
				setFormValues : function(el,formList, obj) {
					var fObj;
					for( var idx = 0 ; idx < formList.length; idx++ ) {
						fObj = formList[idx];
						if ( fObj.type == 'custom' )
							continue;
						if ( fObj.type == 'date' ){
							el.find("#"+fObj.id).val(_f.null2Str(obj[fObj.id]));
						}else if( fObj.type == 'radio') {
							el.find(':radio[name="'+fObj.id+'"]:radio[value="'+_f.null2Str(obj[fObj.id])+'"]').attr("checked",true);
						}else if( fObj.type == 'checkbox') {
							var inVal ;
							try {
								inVal = $.parseJSON(_f.null2Str(obj[fObj.id]));
							}catch ( exception ) {
								inVal = [];
							}

							for( var jdx = 0 ; jdx < inVal.length; jdx++ ) {
								el.find(':checkbox[name="'+fObj.id+'"]:checkbox[value="'+inVal[jdx]+'"]').attr("checked",true);
							}
						}else {
							el.find("#"+fObj.id).val(_f.null2Str(obj[fObj.id])); //text , textarea, select
						}
					}
				}
			},
			rowBox : {
				options : {
					boxClass : null,
					title : null,
					iconCls : null,
					buttons : []
				},
				render : function(el, obj) {
					
					var _opt = $.extend(true,{},this.options, obj );
					var _elHeader, _elBtnGroup, _elBody;
					el.html(_f.html.rowBox(_opt));
					
					_elHeader = el.find(".box").find("header");
					_elBtnGroup = _elHeader.find(".toolbar nav");
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
						elBoxBtn  : _elBtnGroup,
						addButton : function( obj ) {
							_f.button.render(_elBtnGroup, $.extend(true, {btnCls:"btn-default btn-xs"}, obj));
						},
						addATagButton : function(obj) {
							_f.aTagButton.render(_elBtnGroup, $.extend(true, {btnCls:"btn-default btn-xs"}, obj));
						},
					};
				}
			},
			dropDown : {
				options : {
					btnClass : 'btn-primary',
					value    : "",
					list     : [],
					jsonReader : {
						id   : "code",
						name : "value" 
					},
					callbackFunc : null,
				},
				render : function(el, obj) {
					
					var _this = {};
					var _liOption = {
						id   : "",
						name :""
					};
					
					var _opt = $.extend(true,{},this.options, obj );
					
					var tmpl = _.template(TmplDropDown);
					el.html(tmpl(_opt));
					var _elBtn = el.find('button.dropdown-toggle');
					var _elBtnLabel = _elBtn.find("span.select-text");
					var _elUL  = el.find('.dropdown-menu');
					
					var _funcAddElement = function( obj ) {
						var _obj = $.extend(true,{},_liOption, obj );
						_obj.jsonReader = _opt.jsonReader;
						_elUL.append(_f.html.li(_obj));
					};
					
					var _funcAddEvent = function() {
						_elBtnLabel.html($(this).text());
						if( _opt.callbackFunc != null ) {
							_opt.callbackFunc({
								id : $(this).attr("id")
							});
						}
					}
					
					_this.addElement = function( obj ){
						_funcAddElement(obj);
						_elUL.find("li").click(_funcAddEvent);
					};
					_this.clearElement = function() {
						_elUL.empty();
					};
					_this.addAllElement = function(arry) {

						_this.clearElement();
						if( arry != undefined && arry != null && arry.length > 0 ) {
							for( var idx = 0 ; idx < arry.length; idx++ ) {
								_funcAddElement(arry[idx]);
							}
						}
						_elUL.find("li").click(_funcAddEvent);
					};
					
					_this.selectElement = function(idx) {
						_elUL.find('li').eq(idx).click();
					};
					
					_this.selectElementById = function(id) {
						_elUL.find('li#'+id).click();
					};
					
					_this.addAllElement(_opt.list);
					
					return _this;
				}
			},
			areaBox :  {
				options : {
					contents : ""
				},
				render : function( el , obj ) {
					
					var _opt = $.extend(true,{},this.options, obj );
					el.html(_f.html.areaBox());
					var elBox = el.find(".area-color");
					elBox.html($aUtil.toHtmlFormat(_opt.contents));
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
		_this.button     = _f.button;
		_this.makeForm   = _f.makeForm;
		_this.rowBox     = _f.rowBox;
		_this.dropDown   = _f.dropDown;
		_this.relocationEl = _f.relocationEl;
		_this.addRow     = _f.addRow;
		_this.areaBox    = _f.areaBox;
		
		return _this;
	}; 
	
	return new _funcs();
});