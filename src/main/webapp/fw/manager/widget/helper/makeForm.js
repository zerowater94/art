define(['mngEvent', 'basicUtil' ,
	'fw/manager/widget/helper/button'
        ], function ($aEvent, $aUtil, $aWgButton ) {
	
	'use strict';
	
	var _pm = {
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
	};
	
	var _msg = {};
	
	var _f = {
		initMsg : function( obj ) {
			
			$.extend(true, _msg, obj);
		},
		null2Str : function( value ) {
			if( value == undefined || value == null )
				return "";
			else
				return value;
		},
		html   : {
			formInputArea : function(obj) {
				
				return "<div id='area-"+obj.id+"'></div>";
			},
			formInputGroup : function(obj) {
				
				return "<div class='form-group "+obj.formGroupCls+"'></div>";
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
			addDiv : function( obj ) {
				return "<div id='"+obj.id+"'></div>";
			},
			form : {
				text : function( obj ) {
					
					var html = '';
					html += '<input type="text" class="form-control '+obj.inputCls+'" id="'+obj.id+'" placeholder="'+obj.placeholder+'">';
					return html;
				},
				textarea : function( obj ) {
					
					var html = '';
					html += '<textarea class="form-control" id="'+obj.id+'"></textarea>';
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
			}
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
			return $.extend(true,{}, _pm, obj);
		},
		addNewForm : function( el, obj ) {
			
			var _areaForm, _elRtnForm, _elInput, _elLabel;  
			var _opt = $.extend(true,{}, _pm, obj );
			
			if ( _opt.type == 'etc-info') {
				el.append(_f.html.formInputArea(_opt));
				el = el.find('#area-'+_opt.id);
			}
			el.append(_f.html.formInputGroup(_opt));
			var areaForm = el.children(".form-group").last(); //.addClass("form-inline");
			
			// add label
			if( obj.label != null ) {
				areaForm.html(_f.html.addLabel(_opt));
			}
			_f.appendFormEl(areaForm, _opt);
			
			// etc info일 경우( 가변코드 관리 )
			if ( _opt.type == 'etc-info') {
				_f.addNewForm( el, {
					id: _opt.id+"-keyValue", type:"custom", label:null
				}).addClass("area-color"); // 재귀 함수 
			}
			
			return areaForm;
		},
		appendFormEl : function( elFormGroup, obj ) {
			
			if ( obj.type == 'select' ) {
				_f.select(elFormGroup, obj);
			} else if ( obj.type == 'radio' ) {
				_f.radio(elFormGroup, obj);
			} else if ( obj.type == 'checkbox' ) {
				_f.checkbox(elFormGroup, obj);
			} else if ( obj.type == 'textarea' ) {
				_f.textarea(elFormGroup, obj);
			} else if ( obj.type == 'date' ) {
				_f.date(elFormGroup, obj);
			} else if ( obj.type == 'etc-info' ) {
				_f.etcInfo(elFormGroup, obj);
			} else if ( obj.type == 'custom' ) {
				_f.custom(elFormGroup, obj);
			} else {
				_f.text(elFormGroup, obj);
			}
		},
		addNewEtcInfo : function( el, obj ) {
			var elParam = $.extend(true,{}, _pm, {
				label     : null,
				inputCls  : "w-30 front-btn etcInfo-key",
				validation: {
					required : true,
				}
			});
			var elEtcInfo = this.addNewForm(el, elParam);
			elParam.inputCls = "w-70 etcInfo-val";
			elParam.addedBtn = {
				name :'<i class="fa fa-minus"></i>',
				btnCls:"btn-default btn-xs m-l-5",
				callbackFunc : function(e) {
					elEtcInfo.closest(".form-group").remove();
				}
			}; 
			this.appendFormEl(elEtcInfo,elParam);
			
			if( obj !== undefined ) {
				elEtcInfo.find(".etcInfo-key").val(obj.code);
				elEtcInfo.find(".etcInfo-val").val(obj.value);
			}
			
			elEtcInfo.children("input").eq(0).focus();
		},
		setValidAttr : function( obj,  _elInput ) {
			
			var _objValid = obj.validation;
			
			if( _objValid.required != undefined && _objValid.readOnly ) {
				_elInput.attr("readOnly","true");
				_elInput.attr("disabled", true);
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
				$aWgButton.render(el.find(".input-group-btn"), obj.addedBtn);
			}
			
			_f.setValidAttr(obj, elInput);
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
				$aWgButton.render(el.find(".input-group-btn"), obj.addedBtn);
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
			
			_f.setValidAttr(obj, elSelect);
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
			
			_f.setValidAttr(obj, elRadio);
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
			
			_f.setValidAttr(obj, elCheckbox);
		},
		textarea : function( el, obj ) {
			
			var _textareaOptions = {
				rows : 5
			};
			
			var _typeObj = $.extend(true,{},_textareaOptions, obj.typeObj );
			el.append(_f.html.form.textarea(obj));
			var elInput = el.find("textarea");
			elInput.attr("rows",_typeObj.rows);
			_f.setValidAttr(obj, elInput);
		},
		date : function( el, obj ) {
			
			el.append(_f.html.form.date(obj));
		},
		etcInfo : function( el, obj ) {
			el.append(_f.html.form.text(obj));
			var elInput = el.find("input");
			el.append(_f.html.addBtnGroup());			
			$aWgButton.render(el.find(".input-group-btn"), {
				name :'<i class="fa fa-plus"></i>',
				btnCls:"btn-default btn-xs",
				callbackFunc : function() {
	        		_f.addNewEtcInfo( el.parent("#area-"+obj.id).find("#"+obj.id+"-keyValue"));
	        	}
			});
			obj.validation.readOnly = true;
			_f.setValidAttr(obj, elInput);
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
				_rtnElObj[_obj.id] = _f.addNewForm( el, _obj);
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
				}else if ( obj.type == 'etc-info') {
					var inVal = [];
					var formEtcInfo = el.find("#"+obj.id+"-keyValue");
					formEtcInfo.find(".form-group").each(function() {
						inVal.push({
							code  : $(this).find(".etcInfo-key").val() ,
							value : $(this).find(".etcInfo-val").val() ,
						});
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
				} else if( fObj.type == 'radio') {
					el.find(':radio[name="'+fObj.id+'"]:radio[value="'+_f.null2Str(obj[fObj.id])+'"]').attr("checked",true);
				} else if( fObj.type == 'checkbox') {
					var inVal ;
					try {
						inVal = $.parseJSON(_f.null2Str(obj[fObj.id]));
					}catch ( exception ) {
						inVal = [];
					}

					for( var jdx = 0 ; jdx < inVal.length; jdx++ ) {
						el.find(':checkbox[name="'+fObj.id+'"]:checkbox[value="'+inVal[jdx]+'"]').attr("checked",true);
					}
				} else if( fObj.type == 'etc-info') {
					var inVal ;
					try {
						inVal = $.parseJSON(_f.null2Str(obj[fObj.id]));
					}catch ( exception ) {
						inVal = [];
					}
					var elEtcInfo = el.find("#"+fObj.id+"-keyValue");
					elEtcInfo.empty();
					for( var jdx = 0 ; jdx < inVal.length; jdx++ ) {
						_f.addNewEtcInfo(elEtcInfo, inVal[jdx]);
					}
				} else {
					el.find("#"+fObj.id).val(_f.null2Str(obj[fObj.id])); //text , textarea, select
				}
			}
		}
	};
	
	return {
		initMsg       : _f.initMsg,
		formList      : _f.formList,
		getNewFormObj : _f.getNewFormObj,
		appendFormEl  : _f.appendFormEl,
		addNewForm    : _f.addNewForm,
		text          : _f.text,
		select        : _f.select,
		radio         : _f.radio,
		checkbox      : _f.checkbox,
		textarea      : _f.textarea,
		date          : _f.date,
		custom        : _f.custom,
		execBatch     : _f.execBatch,
		getFormValues : _f.getFormValues,
		setFormValues : _f.setFormValues,
	};
});