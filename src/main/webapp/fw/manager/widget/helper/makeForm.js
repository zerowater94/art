define(['mngEvent', 'basicUtil' ,
	'fw/manager/widget/helper/button',
	'fw/manager/widget/helper/makeFormFile'
        ], function ($aEvent, $aUtil, $aWgButton, $aWgFile ) {
	
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
		typeOpt  : null
	};
	
	var _msg = {
		blankStr   : "::::::",
		search     : "Search",
	};
	
	var _html = {
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
			
			if( obj.type == 'textarea' || obj.type == 'sortable')
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
			search : function(obj) {
				
			},
			sortable : function(obj) {
				return "<div class='area-color'><ul id='"+obj.id+"' class='sortable'></ul></div>";
			},
			sortableEl : function(obj, typeObj) {
				var text = '<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>';
				text += obj[typeObj.jsonReader.value];
				text += '<button type="button" class="close">×</button>';
				
				return '<li class="ui-state-default" data-id="'+obj[typeObj.jsonReader.id]+'">'+text+'</li>';
			}
		}	
	};
	
	var _returnForms = function (formArea, formEl, etc) {
		return $.extend(true,etc, {
			area : formArea,
			formEl : formEl,
			readOnly : function( bln ) {
				if (bln) {
					formEl.attr("readOnly","true").attr("disabled", true).addClass("disabled");
				} else {

					formEl.attr("readOnly",false).attr("disabled", false).removeClass("disabled");
				}
			}
		});
	}
	
	var _forms = {
		text : function( el, obj ) {
			
			var _textOptions = {
				enterAction : null
			};
			var _typeObj = $.extend(true,{},_textOptions, obj.typeOpt );
			
			el.append(_html.form.text(obj));
			
			var elInput = el.find("input");
			
			if( obj.addedBtn != null ) {
				el.append(_html.addBtnGroup());
				$aWgButton.render(el.find(".input-group-btn"), obj.addedBtn);
			}
			
			if (_typeObj.enterAction != null) {
				$aEvent.addEnterEvent(elInput, _typeObj.enterAction);
			}
			
			_f.setValidAttr(obj, elInput);
			
			return _returnForms(el, elInput);
		},
		select : function( el, obj ) {

			var _selOptions = {
				optionList : null,
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
			el.append(_html.form.select(obj));
			
			var elSelect = el.find("select");
			
			if( obj.addedBtn != null ) {
				el.append(_html.addBtnGroup());
				$aWgButton.render(el.find(".input-group-btn"), obj.addedBtn);
			}
			
			var _reloadOptions = function( _paramData ) {
				elSelect.empty();
				if( _typeObj.blankOption ) {
					elSelect.append("<option value=''>"+_typeObj.blankStr+"</option>");
				}
				if( _paramData.optionList != null ) {
					var _obj;
					for( var idx = 0 ; idx < _paramData.optionList.length; idx++ ) {
						_obj = _paramData.optionList[idx];
						
						if( typeof _obj == 'object')
							elSelect.append("<option value='"+_obj[_typeObj.jsonReader.code]+"'>"+_obj[_typeObj.jsonReader.value]+"</option>");
						else
							elSelect.append("<option value='"+_obj+"'>"+_obj+"</option>");
					}
				}

				if( _paramData.defaultParam != null )
					elSelect.val(_paramData.defaultParam);
				
			};
			
			_reloadOptions(_typeObj);
			
			if ( _typeObj.callbackChange != null ) 
				$aEvent.addEvent(elSelect,"change",_typeObj.callbackChange);
			
			_f.setValidAttr(obj, elSelect);
			
			return _returnForms(el, elSelect, {
				reloadOptions : _reloadOptions
			});
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
			el.append(_html.form.radio(obj));
			var elRadio = el.find(".radio-area");
			
			if( _typeObj.optionList != null ) {
				var _obj;
				for( var idx = 0 ; idx < _typeObj.optionList.length; idx++ ) {
					_obj = _typeObj.optionList[idx];
					elRadio.append(_html.radioOption(obj, _typeObj, _obj));
				}
			}

			if( _typeObj.defaultParam != null )
				elRadio.find('input:radio [value='+_typeObj.defaultParam+']').attr("checked", true);
			
			if ( _typeObj.callbackClick != null ) 
				$aEvent.addEvent(elRadio,"click",_typeObj.callbackClick);
			
			_f.setValidAttr(obj, elRadio);
			
			return _returnForms(el, elRadio);
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
			el.append(_html.form.checkbox(obj));
			var elCheckbox = el.find(".checkbox-area");
			
			if( _typeObj.optionList != null ) {
				var _obj;
				for( var idx = 0 ; idx < _typeObj.optionList.length; idx++ ) {
					_obj = _typeObj.optionList[idx];
					elCheckbox.append(_html.checkboxOption(obj, _typeObj, _obj));
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
			
			return _returnForms(el, elCheckbox);
		},
		textarea : function( el, obj ) {
			
			var _textareaOptions = {
				rows : 5
			};
			
			var _typeObj = $.extend(true,{},_textareaOptions, obj.typeObj );
			el.append(_html.form.textarea(obj));
			var elInput = el.find("textarea");
			elInput.attr("rows",_typeObj.rows);
			_f.setValidAttr(obj, elInput);
			
			return _returnForms(el, elInput);
		},
		date : function( el, obj ) {
			
			el.append(_html.form.date(obj));
			
			return _returnForms(el);
		},
		search : function( el, obj ) {
			var _searchOption = {
				searchFunc : null,
				callbackFunc : null,
				btnSearchName : '<i class="fa fa-search"></i>'
			};
			
			var _typeObj = $.extend(true,{}, _searchOption, obj.typeOpt );
			
			el.append(_html.form.text(obj));
			
			var elInput = el.find("input");
			el.append(_html.addBtnGroup());
			$aWgButton.render(el.find(".input-group-btn"), {
				name : _typeObj.btnSearchName,
				btnCls : "btn-default btn-xs m-l-10 btn-search"
			});

			$aEvent.addEvent(el.find(".btn-search"), "click", _typeObj.searchFunc);
			$aEvent.addEnterEvent(elInput, _typeObj.searchFunc);
			
			_f.setValidAttr(obj, elInput);
			
			return _returnForms(el, elInput);
		},
		sortable : function(el, obj) {
			var _sortableOptions = {
				dataList : null,
				jsonReader  : {
					id    : "id",
					value : "value"
				}
			};
			
			el.append(_html.form.sortable(obj));
			var elInput = el.find("ul");
			elInput.sortable();
			_f.setValidAttr(obj, elInput);

			return _returnForms(el, elInput);
		},
		etcInfo : function( el, obj ) {
			el.append(_html.form.text(obj));
			var elInput = el.find("input");
			el.append(_html.addBtnGroup());
			if (!obj.validation.readOnly) {
				
				$aWgButton.render(el.find(".input-group-btn"), {
					name :'<i class="fa fa-plus"></i>',
					btnCls:"btn-default btn-xs",
					callbackFunc : function() {
		        		_f.addNewEtcInfo( el.parent("#area-"+obj.id).find("#"+obj.id+"-keyValue"));
		        	}
				});
			}
			
			obj.validation.readOnly = true;
			_f.setValidAttr(obj, elInput);
			
			return _returnForms(el, elInput);
		},
		custom : function(el, obj ) {
			
			el.append(_html.addDiv(obj));
			
			return _returnForms(el);
		},
	};
	
	var _f = {
		initMsg : function( obj ) {
			
			$.extend(true, _msg, obj);
		},
		null2Str : function( value, defaultValue ) {
			
			if ( value !== undefined && value != null )
				return value;
			
			if( defaultValue !== undefined )
				return defaultValue;
			
			return "";
		},
		formList : function() {
			
			var formObj = _html.form;
			var rtnList = [];
			for(var key in formObj) {
				rtnList.push(key);
			}
			return rtnList;
		},
		getNewFormObj : function( obj ) {
			return $.extend(true,{}, _pm, obj);
		},
		appendNewFormGroup : function(el, obj) {
			if ( obj.type == 'etc-info' ) {
				el.append(_html.formInputArea(obj));
				el = el.find('#area-'+obj.id);
			}
			el.append(_html.formInputGroup(obj));
			return el.children(".form-group").last(); //.addClass("form-inline");
		},
		appendFormLabelAndForm : function(areaForm, obj) {
			// add label
			if( obj.label != null ) {
				areaForm.html(_html.addLabel(obj));
			}
			return _f.appendFormEl(areaForm, obj);
		},
		addNewForm : function( el, obj ) {
			
			var _opt = $.extend(true,{}, _pm, obj );
			var areaForm = _f.appendNewFormGroup(el, _opt); 
			var _rtnFormInfo = _f.appendFormLabelAndForm(areaForm, _opt);
			
			// etc info일 경우( 가변코드 관리 )
			if ( _opt.type == 'etc-info') {
				_f.addNewForm( el, {
					id: _opt.id+"-keyValue", type:"custom", label:null
				}).area.addClass("area-color"); // 재귀 함수 
			}
			
			return _rtnFormInfo;
		},
		changeFormEl : function(areaForm , obj ) {
			areaForm.empty();
			var _opt = $.extend(true,{}, _pm, obj );
			return _f.appendFormLabelAndForm(areaForm, _opt);
		},
		appendFormEl : function( elFormGroup, obj ) {
			
			if ( obj.type == 'select' ) {
				return _forms.select(elFormGroup, obj);
			} else if ( obj.type == 'radio' ) {
				return _forms.radio(elFormGroup, obj);
			} else if ( obj.type == 'checkbox' ) {
				return _forms.checkbox(elFormGroup, obj);
			} else if ( obj.type == 'textarea' ) {
				return _forms.textarea(elFormGroup, obj);
			} else if ( obj.type == 'date' ) {
				return _forms.date(elFormGroup, obj);
			} else if (obj.type == 'search' ) {
				return _forms.search(elFormGroup, obj);
			} else if ( obj.type == 'etc-info' ) {
				return _forms.etcInfo(elFormGroup, obj);
			} else if ( obj.type == 'custom' ) {
				return _forms.custom(elFormGroup, obj);
			} else if ( obj.type == 'sortable' ) {
				return _forms.sortable(elFormGroup, obj);
			} else {
				return _forms.text(elFormGroup, obj);
			}
		},
		addNewEtcInfo : function( el, obj, formObj ) {
			var elParam = $.extend(true,{}, _pm, {
				label     : null,
				inputCls  : "w-30 front-btn etcInfo-key",
				validation: {
					required : true,
					readOnly : false
				}
			});
			var elAreaEtcInfo = this.addNewForm(el, elParam).area;
			
			if (!$aUtil.isNull(formObj) && !$aUtil.isNull(formObj.validation)) {
				elParam.validation.readOnly = formObj.validation.readOnly;
			}
			elParam.inputCls = "w-70 etcInfo-val";
			if (!elParam.validation.readOnly) {
				elParam.addedBtn = {
						name :'<i class="fa fa-minus"></i>',
						btnCls:"btn-default btn-xs m-l-5",
						callbackFunc : function(e) {
							elAreaEtcInfo.closest(".form-group").remove();
						}
					}; 
			} 
			
			this.appendFormEl(elAreaEtcInfo,elParam);
			
			if( obj !== undefined ) {
				elAreaEtcInfo.find(".etcInfo-key").val(obj.code);
				elAreaEtcInfo.find(".etcInfo-val").val(obj.value);
			}
			
			elAreaEtcInfo.children("input").eq(0).focus();
		},
		setValidAttr : function( obj,  _elInput ) {
			
			var _objValid = obj.validation;
			
			if( _objValid.required != undefined && _objValid.readOnly ) {
				_elInput.attr("readOnly","true");
				_elInput.attr("disabled", true);
				_elInput.addClass("disabled");
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
				} else if ( obj.type == 'sortable') {
					var arrayVal = [];
					var formSortable = el.find("#"+obj.id);
					formSortable.find("li").each(function() {
						var deptObj = {};
						deptObj[obj.typeOpt.jsonReader.id] = $(this).attr("data-id");
						deptObj[obj.typeOpt.jsonReader.value] = $(this).text();
						arrayVal.push(deptObj);
				   });
					
					rtnObj[obj.id] = arrayVal;
				} else if (obj.type == 'search') {
					rtnObj[obj.id] = el.find("#"+obj.id).attr("data-value");
				} else {
					rtnObj[obj.id] = el.find("#"+obj.id).val(); //text , textarea, select
				}	
			}
			return rtnObj;
		},
		setFormValue : function(formEl, formObj, formValue) {

			if ( formObj.type == 'custom' ) {
				return;
			}

			if ( formObj.type == 'date' ){
				formEl.find("#"+formObj.id).val(_f.null2Str(formValue));
			} else if( formObj.type == 'radio') {
				formEl.find(':radio[name="'+formObj.id+'"]:radio[value="'+_f.null2Str(formValue)+'"]').attr("checked",true);
			} else if( formObj.type == 'checkbox') {
				var inVal ;
				try {
					inVal = $.parseJSON(_f.null2Str(formValue));
				}catch ( exception ) {
					inVal = [];
				}

				for( var jdx = 0 ; jdx < inVal.length; jdx++ ) {
					formEl.find(':checkbox[name="'+formObj.id+'"]:checkbox[value="'+inVal[jdx]+'"]').attr("checked",true);
				}
			} else if( formObj.type == 'etc-info') {
				var inVal ;
				try {
					inVal = $.parseJSON(_f.null2Str(formValue));
				}catch ( exception ) {
					inVal = [];
				}
				var elEtcInfo = formEl.find("#"+formObj.id+"-keyValue");
				elEtcInfo.empty();
				for( var jdx = 0 ; jdx < inVal.length; jdx++ ) {
					_f.addNewEtcInfo(elEtcInfo, inVal[jdx], formObj);
				}
			} else if ( formObj.type == 'sortable') {
				var arrayVal = formValue;
				
				if ($aUtil.isNull(arrayVal)) {
					arrayVal = [];
				}
				var elSortable = formEl.find("#"+formObj.id);
				elSortable.empty();
				var _paramData = formObj.typeOpt;
				for( var jdx = 0 ; jdx < arrayVal.length; jdx++ ) {
					elSortable.append(_html.form.sortableEl(arrayVal[jdx], _paramData));
				}

				if (formObj.validation !== undefined && formObj.validation.readOnly ) {
					elSortable.addClass("disabled");
					elSortable.find("li").find("span").remove();
					elSortable.find("li").find("button.close").remove();
				} else {
					elSortable.find("li").addClass("pointers");
					elSortable.find("li").find("button.close").click(function(e){
						$(this).closest("li").remove();
					});
				}
			} else if ( formObj.type == 'search') {
				var objVal = formValue;
				if (typeof formValue != 'object' ) {
					objVal = {
						value : formValue,
						text  : formValue
					};
				}
				formEl.find("#"+formObj.id).attr("data-value", _f.null2Str(objVal.value, "") );
				formEl.find("#"+formObj.id).val(_f.null2Str(objVal.text, "") ); //text , textarea, select
			} else {
				var defaultValue;
				if( formObj.typeOpt !== undefined && formObj.typeOpt !== null )
					defaultValue = formObj.typeOpt.defaultParam;

				formEl.find("#"+formObj.id).val(_f.null2Str(formValue, defaultValue) ); //text , textarea, select
			}
		},
		setFormValues : function(el,formList, obj) {
			var fObj;
			for( var idx = 0 ; idx < formList.length; idx++ ) {
				fObj = formList[idx];
				_f.setFormValue(el, fObj, obj[fObj.id]);
			}
		}
	};
	
	return {
		initMsg       : _f.initMsg,
		formList      : _f.formList,
		getNewFormObj : _f.getNewFormObj,
		appendFormEl  : _f.appendFormEl,
		addNewForm    : _f.addNewForm,
		changeFormEl  : _f.changeFormEl, 
		execBatch     : _f.execBatch,
		getFormValues : _f.getFormValues,
		setFormValue  : _f.setFormValue,
		setFormValues : _f.setFormValues,
		addNewEtcInfo : _f.addNewEtcInfo,
	};
});