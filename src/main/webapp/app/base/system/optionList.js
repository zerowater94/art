define([ 'basicInfo'
         , 'text!base/system/optionList.html'
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
			},
			build : {},
		}; // elements
		var _vws = {};  // view or widget
		var _dts = {
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
				_els.areaGridOption = thisEl.find("#grid-list");
			},
			setupMainBar : function(){

				$a.t.mainBar.addButton({ 
					name :$a.getMsg("lbl.add"), 
					callbackFunc : _f.showInputEditor 
			    });
			},
			isBuildOptType : function(type) {
				return (_dts.builOptType[type] !== undefined );
			},
			/**
			 * Option Build에 대해서 추가 버튼을 클릭 했을경우,
			 * building 하기 위한 옵션 설정 항목이 추가된다
			 */
			makeOptionBuild : function() {
				var _elBuilder = _els.elForms.editor.optionBuilder;
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
			setOptionBuilder : function(arry) {
				var elBuilder = _els.elForms.editor.optionBuilder;
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
			addOptionItem : function( obj ) {
				
				var _param = {
					label:null,
					type : "select",
					inputCls : "front-btn item-type",
					typeOpt : {
						optionList : $a.t.makeForm.formList(),
						blankOption : false,
						defaultParam : 'text'
					}
				};
				var _areaOptItem = $a.t.makeForm.addNewForm(_els.elBuiliderBox,_param);
				_param = $a.t.makeForm.getNewFormObj({
					inputCls : "w-50 item-expl"
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
						_f.addOptionItemCategories(_areaItemCategories);
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
							_f.addOptionItemCategories(_areaItemCategories, _optionList[idx]);
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
			addOptionItemCategories : function( categoryEl, categoryObj ) {
				
				var _param = $a.t.makeForm.getNewFormObj({
					label : null,
					inputCls : "w-30 front-btn category-key",
					validation: {
						required : true,
					}
				});
				var elDtlOpt = $a.t.makeForm.addNewForm(categoryEl,_param);
				_param.inputCls = "w-40 category-val";
				$a.t.makeForm.appendFormEl(elDtlOpt,_param);

				if( categoryObj !== undefined ) {
					var categoryFormGroup = categoryEl.children(".form-group").last();
					categoryFormGroup.find(".category-key").val(categoryObj.code);
					categoryFormGroup.find(".category-val").val(categoryObj.value);
				}
				
				$a.t.button.render(elDtlOpt,{
					name :'<i class="fa fa-minus"></i>',
					btnCls:"btn-default btn-xs m-l-5",
					callbackFunc : function(e) {
						elDtlOpt.closest(".form-group").remove();
					}
				});
				elDtlOpt.children("input").eq(0).focus();
			},
			getOptionValues : function() {
				var elBuilder = _els.elForms.editor.optionBuilder;
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
							categoryKey = categoryForm.find(".category-key").val();
							categoryVal = categoryForm.find(".category-val").val();
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
						      },
		                      { id:"description", type:"textarea", label:$a.getMsg("lbl.description"),
		                    	typeOpt : {
		                    		rows : 5
		                    	},
		                      },
		                      { id:"optionBuilder", type:"custom", label:null },
		                    ],
				};
				_els.elForms.editor = $a.t.mainEditor.render(_param);
				_els.elForms.editor.optionBuilder.hide();
				
				// popover 생성.
				_f.makePopover(_els.elForms.editor.category.find("#add-category"));
				
				_f.makeOptionBuild();
			},
			showInputEditor : function(e) {
				$a.t.mainEditor.showEditor({
					shown : function() {
						_f.setOptionBuilder([]);
					}
				});
			},
			addCategory : function( popOverEl ) {
				
				if ( $a.v.isValidBatchData(popOverEl) ) {
					
					var inputCategory = _els.elForms.editor.category.find("#category");
					var searchCategory = _els.areaSearch.find("#category");
					var inputVal = popOverEl.find("#category").val();
					inputCategory.append("<option value='"+inputVal+"'>"+inputVal+"</option>");
					searchCategory.append("<option value='"+inputVal+"'>"+inputVal+"</option>");
					inputCategory.val(inputVal);
					_vws.categoryPopover.close();
				}
				
			},
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
						
						$a.t.button.render(_els.elForms.category.category,{
							name :$a.getMsg("lbl.add"), 
							btnCls:"btn-default btn-xs m-l-10",
							callbackFunc :  function() {
								_f.addCategory(popOverEl);
							} ,
						});
						
						_els.elForms.category.category.find("input").keypress(function(e){
							if (e.keyCode == 13){
								_callbackFunc(e);
						    }  
						});
					}
				});
			},
			makeSearchArea : function() {
				
				var searchCategory = [{ id:"category", type:"select", blankOption:true, label:$a.getMsg("lbl.category")},
				                      { id:"optionValue",  type:"text",  label:$a.getMsg("lbl.value")}];
				_els.searhcForm = $a.t.search.render(_els.areaSearch,{
					formList   : searchCategory,
					searchFunc : _f.searchOptionList
				});
			},
			searchOptionList : function() {
				
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/option/list",
					type : "get",
					data : {
						
					},
					success : function(data) {
						_els.optionGrid.reloadData({
							dataModel : {
								data : data
							}
						});
					}
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
					}
				});
			},
			makeGrid : function() {
				
				_els.optionGrid = $a.t.grid.render(_els.areaGridOption, {
					colModel : [{ dataIndx : "category", title: "Category", width: "20%", editable: false   },
					            { dataIndx : "optionId", title: "Id", width: "20%", editable: false  },
					            { dataIndx : "optionCode", title: "Code", width: "30%", editable: false  },
					            { dataIndx : "optionValue", title: "Value", width: "30%", editable: false }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						
						rowData.shown = function() {
							var builderArray;
							try {
								builderArray = $.parseJSON(rowData.optionBuilder);
							}catch ( ex ) {
								builderArray = [];
							}
							_f.setOptionBuilder(builderArray);
						}
						$a.t.mainEditor.showEditor(rowData);
						
					},
				});
				
				_f.searchOptionList();
			},
			insertData : function() {
				
				var mainEditor = $a.t.mainEditor.getMainBody();
				if( !$a.v.isValidBatchData(mainEditor) ) 
					return;
				
				var formData = $a.t.mainEditor.getValues();
				formData.siteId = "site-a";
				formData.compId = "comp-1";
				formData.optionBuilder = _f.getOptionValues(); // builder
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/option/insert",
					data : formData,
					success : function(data) {
						$a.show.success($a.getMsg("msg.success.insert"));
						_f.searchOptionList();
						$a.t.mainEditor.hideEditor();
					}
				});
				
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
			_f.makeGrid();
			_f.setupEditor();
		};
		
		return _this;
	};
	
});
