define([ 'basicInfo'
         , 'text!app/base/system/optionList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	return function( thisEl ) {
		
		var _this = {};
		var _pm = {
			builder : {
				type : "text",
				expl : "",
				categories : []
			}
		} ; // param
		var _els = {
			elForms : {
				editor : null,
				category : null
			}
		}; // elements
		var _vws = {
			
		};  // view or widget
		var _dts = {
			selectedData : null,
			categoryList : null,
			delimiter : $a.getConstants('DELIMITER'),
			builOptType : {
				select: null,
				radio : null,
				checkbox : null,
			}
		};
	
		var _f = {
			createPage : function() {
				var tmpl = _.template(_tmpl);
				thisEl.html(tmpl());
				_els.areaSearch     = thisEl.find("#area-search");
				_els.areaSearchResult = thisEl.find(".area-search-result");
				_els.areaGridOption = thisEl.find("#grid-list");
				_els.areaGridOption.addClass('wrap-scrollable');
				$a.e.addWinResizeEvent('resize-option-area',function(){
					_els.areaGridOption.css({
						height:$a.getMainArea().height()-50
					});
				});
			},
			setupMainBar : function(){

				$a.t.mainBar.addButton({ 
					name :$a.getMsg("lbl.add"), 
					callbackFunc : _f.showInputEditor 
			    });
			},
			makeSearchArea : function() {
				
				_vws.dropDownCategory = $a.t.dropDown.render(_els.areaSearch,{
					jsonReader : {
						id   : 'category',
						name : 'category',
					},
					callbackFunc : _f.searchOptionList
				});
			},
			searchCategoryList : function() {
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/option/category/list",
					type : "get",
					data : {
					},
					success : function(data) {
						_dts.categoryList = data;
						
						if( data.length == 0 ) {
							_els.areaGridOption.html($a.getMsg("msg.addOption"));
							return;
						}
						_vws.dropDownCategory.addAllElement(_dts.categoryList);
						_vws.dropDownCategory.selectElement(0);
					}
				});
			},
			/**
			 * Main Editor 화면 setup 정보 
			 */
			setupEditor : function() {
				
				var _param = {
					title : $a.getMsg("lbl.addOption"),
					callBackHide : function() {

					},
					buttons :[{
						name :$a.getMsg("lbl.save"), 
						callbackFunc : function(e) {
							var mainEditor = $a.getMainEditor();
							_f.insertData();
						}
					}],
					formList:[{ id:"category", type:"select", label:$a.getMsg("lbl.category"), 
						      	validation : {
						      		required   :true, 
						        	notKor    : true
						      	},
						      	typeOpt : {
						      		optionList:_dts.categoryList,
						      		jsonReader:{code:'category', value:'category'}
						      	},
						        addedBtn : {
						        	name :'<i class="fa fa-plus"></i>',btnCls:"btn-default btn-xs m-l-10", id:'add-category'
						        } },
		                      { id:"optionCode", type:"text", label:$a.getMsg("lbl.code"), 
						        validation : {
						        	required  :true,
						        	maxLength : 100,
						        	notKor    : true
						        },
						      },
		                      { id:"useYn",  type:"select", label:$a.getMsg("lbl.useYn"), 
		                    	validation : {
						        	required  :true
						        },
		                    	typeOpt : {
		                    		blankOption:false,
		                    		optionList:$a.d.values.useYn
		                    	}
		                      },
		                      { id:"optionValue",   type:"text",   label:$a.getMsg("lbl.value"), 
						    	validation : {
						    		maxLength : 2000,
						    		readOnly  : true,
						    	},
						    	addedBtn : {
						        	name :'<i class="fa fa-expand"></i>',btnCls:"btn-default btn-xs m-l-10", id:'show-optionValue'
						        },
						      },
		                      { id:"description", type:"textarea", label:$a.getMsg("lbl.description"),
		                    	typeOpt : {
		                    		rows : 5
		                    	},
		                      },
		                      { id:"optionBuilder", type:"custom", label:null, formGroupCls:"" },
		                    ],
				};
				_els.elForms.editor = $a.t.mainEditor.render(_param);
				_els.elForms.editor.optionBuilder.area.hide();
				
				// popover 생성.
				_f.makePopover(_els.elForms.editor.category.area.find("#add-category"));
				_f.makePopoverExpand(_els.elForms.editor.optionValue.area.find("#show-optionValue"));
				_f.makeOptionBuild();
			},
			closeEditor : function() {
				$a.t.mainEditor.hideEditor();
				$a.t.popover.closeAllPopover();
			},
			showEditor : function( obj ) {
				
				$a.t.mainEditor.showEditor(obj);
				$a.t.popover.closeAllPopover();
			},
			/**
			 * options이 존재 하는 input type인지 체크 한다
			 *  selectbox, radio, checkbox..
			 */
			isBuildOptType : function(type) {
				return (_dts.builOptType[type] !== undefined );
			},
			/**
			 * Option Build에 대해서 추가 버튼을 클릭 했을경우,
			 * building 하기 위한 옵션 설정 항목이 추가된다
			 */
			makeOptionBuild : function() {
				var _elBuilder = _els.elForms.editor.optionBuilder.area;
				_elBuilder.show();
				var _vRowBox = $a.t.rowBox.render(_elBuilder,{
					title : $a.getMsg("lbl.makeRuleDetail"),
					buttons : [{
						name :$a.getMsg("lbl.add"), 
						callbackFunc : function(e) {
							_f.addOptionItem();
						}
					}],
				});
				_els.elBuiliderBox = _vRowBox.elBoxBody;
			},
			/**
			 * 선택된 Options의 생성 규칙 입력 form을 생성한다.
			 */
			setOptionBuilder : function(arry) {
				var elBuilder = _els.elForms.editor.optionBuilder.area;
				_els.elBuiliderBox.empty();
				if ( arry == undefined )
					return;
				
				var len = arry.length;
				var obj ;
				for( var idx = 0 ; idx < len; idx++ ) {
					obj = $.extend(true,{},_pm.builder, arry[idx]);
					_f.addOptionItem(obj);
				}
			},
			/**
			 * 생성 규칙을 추가 한다.
			 */
			addOptionItem : function( obj ) {
				
				var _param = {
					label:null,
					type : "select",
					inputCls : "front-btn item-type",
					formGroupCls:"form-inline",
					typeOpt : {
						optionList : $a.t.makeForm.formList(),
						blankOption : false,
						defaultParam : 'text'
					}
				};
				var _areaOptItem = $a.t.makeForm.addNewForm(_els.elBuiliderBox,_param).area;
				_param = $a.t.makeForm.getNewFormObj({
					inputCls : "w-50 end-btn item-expl",
				});
				$a.t.makeForm.appendFormEl(_areaOptItem,_param);
				
				var _btnMinus  = $a.t.button.render(_areaOptItem, {
					name :'<i class="fa fa-minus"></i>',
					btnCls:"btn-default btn-xs m-l-5",
					callbackFunc : function(e) {
						_areaOptItem.closest(".form-group").remove();
					}
				} );
				
				var  _areaItemCategories;
				var _btnAddItem = $a.t.button.render(_areaOptItem, { 
					name :'<i class="fa fa-plus"></i>',
					btnCls:"btn-default btn-xs",
					callbackFunc : function(e) {
						$a.t.makeForm.addNewEtcInfo(_areaItemCategories);
					}
			    });
				
				_param.id = "area-item-options";
				_param.type = "custom";
				$a.t.makeForm.appendFormEl(_areaOptItem,_param);
				
				_areaItemCategories = _areaOptItem.find("#area-item-options");
				_areaItemCategories.addClass("area-color").addClass("item-categories");
				
				_btnAddItem.hide();
				_areaItemCategories.hide();
				_areaOptItem.find("select.item-type").focus();
				
				if ( obj !== undefined) {
					_areaOptItem.find("select.item-type").val(obj.type);
					_areaOptItem.find("input.item-expl").val(obj.expl);
					var _optionList;
					if( _f.isBuildOptType(obj.type) ) {
						_btnAddItem.show();
						_areaItemCategories.show();
						_optionList = obj.categories;
						for( var idx = 0; idx < _optionList.length; idx++ ) {
							$a.t.makeForm.addNewEtcInfo(_areaItemCategories, _optionList[idx]);
						}
					}
				}
				
				$a.e.addEvent(_areaOptItem.find("select"), "change", function(e){
					var selVal = $(e.target).val();
					if( _f.isBuildOptType(selVal) )  {
						_btnAddItem.show();
						_areaItemCategories.show();
					}else {
						_btnAddItem.hide();
						_areaItemCategories.hide();
					}
				});
			},
			/**
			 * 생성한 규칙을 JSONObject String 형태로 리턴한다.
			 */
			getOptionValues : function() {
				var elBuilder = _els.elForms.editor.optionBuilder.area;
				var elFormGroups = elBuilder.find(".form-group select");
				var cnt = elFormGroups.length;
				var formGroup, elSelect, elExpl, elItems, elCategories;
				var categoryFormGroup, categoryForm, categoryKey, categoryVal;
				var rtnObj = [], optObj;
				for ( var idx = 0; idx < cnt; idx++ ) {
					formGroup = elFormGroups.closest(".form-group").eq(idx);
					elSelect = formGroup.find(".item-type");
					elExpl   = formGroup.find(".item-expl");
					optObj = {
						type : elSelect.val(),
						expl : elExpl.val()
					};
					
					if( _f.isBuildOptType(elSelect.val()) )  {
						elCategories = formGroup.find(".item-categories");
						categoryFormGroup = elCategories.children(".form-group");
						optObj.categories = [];
						for( var jdx = 0 ; jdx < categoryFormGroup.length; jdx++ )  {
							categoryForm = categoryFormGroup.eq(jdx);
							categoryKey = categoryForm.find(".etcInfo-key").val();
							categoryVal = categoryForm.find(".etcInfo-val").val();
							optObj.categories.push({
								code  : categoryKey,
								value : categoryVal
							});
						}
					}
					elCategories = formGroup.find(".item-categories");
					rtnObj.push(optObj);
				}

				return JSON.stringify(rtnObj);
			},
			
			showInputEditor : function(e) {
				_dts.selectedData = null;
				_f.showEditor({
					shown : function() {
						_f.setOptionBuilder([]);
					}
				});
			},
			/**
			 * 추가된 Category 정보를 각 항목에 적용한다.
			 */
			addCategory : function( popOverEl ) {
				if ( $a.v.isValidBatchData(popOverEl) ) {
					var inputCategory = _els.elForms.editor.category.area.find("#category");
					var inputVal = popOverEl.find("#category").val();
					inputCategory.append("<option value='"+inputVal+"'>"+inputVal+"</option>");
					inputCategory.val(inputVal);
					_vws.dropDownCategory.addElement({
						category : inputVal
					});
					_vws.categoryPopover.close();
				}
			},
			/**
			 * Category 추가를 위한 PopOver 화면을 생성한다.
			 */
			makePopover : function( el ) {
				
				_vws.categoryPopover = $a.t.popover.render(el,{
					title : $a.getMsg("lbl.addCategory"),
					contextCss : {
						minWidth : "350px"
					},
					popoverCss : "popover-category",
					shownFunc : function(event, popOverEl) {
						
						popOverEl.addClass("edit-area");
						var _param = [{ id:"category", type:"text", label:$a.getMsg("lbl.category"),inputCls : 'addon-btn', 
										validation : {
											required  :true,
											maxLength : 30,
											notKor    : true
										} }];
						_els.elForms.category = $a.t.makeForm.execBatch(popOverEl,_param);
						var elPopoverCategory = popOverEl.find("#area-category");
						
						$a.t.button.render(_els.elForms.category.category.area,{
							name :$a.getMsg("lbl.add"), 
							btnCls:"btn-default btn-xs m-l-10",
							callbackFunc :  function() {
								_f.addCategory(popOverEl);
							} ,
						});
						
						_els.elForms.category.category.area.find("input").keypress(function(e){
							if (e.keyCode == 13){
								_callbackFunc(e);
						    }  
						});
					}
				});
			},
			makePopoverExpand : function( el ) {
				_vws.popoverExpand = $a.t.popover.render(el,{
					title : $a.getMsg("lbl.value"),
					contextCss : {
						minWidth : "450px",
					},
					popoverCss : "popover-optionValue",
					shownFunc : function(event, popOverEl) {
						
						var val = _els.elForms.editor.optionValue.area.find("#optionValue").val();
						if( !$a.u.isEmpty(val) ) {
							var valObj = $.parseJSON(val);
							$.each(valObj, function(key, func) {
								popOverEl.append("<div>"+key +" : "+ func+"</div>");
							});
						}
					}
				});
			},
			searchOptionList : function( selectDropDownObj ) {
				
				alert(_els.areaSearch.find(".select-text").text());
				alert(_els.areaSearch.find(".select-text").attr("select-id"));
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/option/list",
					type : "get",
					data : {
						category : selectDropDownObj.id
					},
					success : function(data) {
						_els.areaGridOption.empty();
						_els.areaSearchResult.html($a.getMsg("lbl.searchResultCount").replace("{#1}",data.length));
						if( data.length == 0 ) {
							_els.areaGridOption.html($a.getMsg("msg.noData"));
							return ;
						}
						
						for( var idx = 0 ; idx < data.length; idx++ ) {
							_f.addOptionBox(data[idx], idx);
						}
					}
				});
				_f.closeEditor();
			},
			/**
			 * Category 정보를 추가 또는 변경한다.
			 */
			insertData : function() {
				
				var mainEditor = $a.t.mainEditor.getMainBody();
				if( !$a.v.isValidBatchData(mainEditor) ) 
					return;
				
				var formData = $a.t.mainEditor.getValues();
				formData.siteId = "site-a";
				formData.compId = "comp-1";
				formData.optionId = (_dts.selectedData==null)?"":_dts.selectedData.optionId;
				formData.optionBuilder = _f.getOptionValues(); // builder
				$a.send({
					url  : $a.getDefaultUrl()+"/base/system/option/save",
					type : (_dts.selectedData==null)?"post":"put", 
					data : formData,
					success : function(data) {
						$a.show.success($a.getMsg("msg.success.insert"));
						_f.searchOptionList({
							id : formData.category
						});
						_f.closeEditor();
					}
				});
			},
			insertValueData : function( obj,formGroup, formList ) {
				
				if( !$a.v.isValidBatchData(formGroup) ) 
					return;
				
				var formData = $a.t.makeForm.getFormValues(formGroup, formList);
				
				$a.send({
					url  : $a.getDefaultUrl()+"/base/system/option/save/value",
					type : "put", 
					data : {
						optionId : obj.optionId,
						useYn    : formData.useYn,
						optionValue : JSON.stringify(formData)
					},
					success : function(data) {
						$a.show.success($a.getMsg("msg.success.update"));
						_f.searchOptionList({
							id : formData.category
						});
						_f.closeEditor();
					}
				});
			},
			/**
			 * Category 정보를 추가 또는 변경한다.
			 */
			deleteData : function(obj) {
				
				$a.print.confirm($a.getMsg("msg.confirm.delete"), function(){
					
					$a.send({
						url  : $a.getDefaultUrl()+"/base/system/option/delete",
						type : "delete", 
						data : obj,
						success : function(data) {
							$a.show.success($a.getMsg("msg.success.delete"));
							_f.searchOptionList({
								id : obj.category
							});
							_f.closeEditor();
						}
					});
				});
			},
			addOptionBox : function(obj, index) {
				_els.areaGridOption.append("<div id='area-"+obj.optionId+"'></div>");
				var vRowBox = $a.t.rowBox.render(_els.areaGridOption.find("#area-"+obj.optionId),{
					title   : obj.optionCode,
					iconCls : (index+1)
				});
				// description / value 영역 분할  
				$a.t.addRow.render(vRowBox.elBoxBody,{
					id   : obj.optionId,
					cols : [{
						colCnt : 4,
						colCls : 'area-opt-desc',
					},{
						colCnt : 8,
						colCls : 'area-opt-value',
					}],
				});
				
				var _elDesc  = vRowBox.elBoxBody.find('.area-opt-desc');
				var _elValue = vRowBox.elBoxBody.find('.area-opt-value');
				
				_f.addOptionBoxDesc(_elDesc, obj);
				var formList = _f.addOptionBoxValue(_elValue, obj);
				
				vRowBox.addButton({
					name :'<i class="fa  fa-save"></i>', 
					callbackFunc : function(e) {
						_f.insertValueData(obj, _elValue, formList);
					}
				});
				vRowBox.addButton({
					name :'<i class="fa fa-pencil"></i>', 
					callbackFunc : function(e) {
						_dts.selectedData = obj;
						_dts.selectedData.shown = function() {
							var builderArray;
							try {
								builderArray = $.parseJSON(_dts.selectedData.optionBuilder);
							}catch ( ex ) {
								builderArray = [];
							}
							_f.setOptionBuilder(builderArray);
						}
						_f.showEditor(_dts.selectedData);
					}
				});
				vRowBox.addButton({
					name :'<i class="fa fa-times"></i>', 
					callbackFunc : function(e) {
						_f.deleteData(obj);
					}
				});
				
				if( $a.u.isEmpty(obj.optionValue) )
					vRowBox.elBoxBtn.find(".fa-save").closest('button').addClass("btn-warning");
				
			},
			/**
			 * Option 별 설명 
			 */
			addOptionBoxDesc : function( elDescription, obj ) {
				
				$a.t.areaBox.render(elDescription, {
					contents : obj.description
				});
			},
			/**
			 * Option별 Value 설정 화면.
			 */
			addOptionBoxValue : function( elValue, obj ) {
				
				elValue.addClass("edit-area");
				
				var formList = [{ 
						type : 'select', id : 'useYn', label : $a.getMsg("lbl.useYn"),
						typeOpt : {
							blankOption:false, optionList:$a.d.values.useYn
						},
						validation : { 
							required : true 
						}
					}
				];
				if( $a.u.isEmpty(obj.optionBuilder) )
					return;
				var builderArray = $.parseJSON(obj.optionBuilder); 
				var buildOpt, elObj ;
				for( var idx = 0 ; idx < builderArray.length; idx++ ) {
					buildOpt = builderArray[idx];
					elObj = {
						type : buildOpt.type, id : obj.optionId+"_"+idx, label : buildOpt.expl,
						validation : { 
							required : true 
						},
						typeOpt : null
					};
					if( _f.isBuildOptType(buildOpt.type) ) {
						elObj.typeOpt = {
							blankOption : false,
		            		optionList  : buildOpt.categories,	
						};
					}
					formList.push(elObj);
				}
				$a.t.makeForm.execBatch(elValue, formList);
				if( !$a.u.isEmpty(obj.optionValue) )
					$a.t.makeForm.setFormValues(elValue, formList, $.parseJSON(obj.optionValue));
				return formList;
			},
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		
		_this.render = function(obj) {
			$.extend( true, _pm ,obj);
			_f.createPage();
			_f.setupMainBar();
			_f.makeSearchArea();
			_f.searchCategoryList();
			_f.setupEditor();
		};
		
		return _this;
	};
	
});
