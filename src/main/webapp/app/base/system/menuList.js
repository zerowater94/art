define([ 'basicInfo'
         , 'text!base/system/optionList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	return function( thisEl ) {
		
		var _this = {};
		var _pm = {} ; // param
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
			delimiter : $a.getConstants('DELIMITER')
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
					callbackFunc : _f.showEditor 
			    });
			},
			/**
			 * Option Build에 대해서 추가 버튼을 클릭 했을경우,
			 * building 하기 위한 옵션 설정 항목이 추가된다
			 */
			addOptionBuild : function() {
				
				_els.elForms.editor.optionBuilder.show();
				
				var _param = {
					label:null,
					type : "select",
					inputCls : "middle-btn",
					typeOpt : {
						optionList : $a.t.makeForm.formList(),
						blankOption : false,
						defaultParam : 'text'
					}
				};
				var _addBuildForm = $a.t.makeForm.addNewForm(_els.elForms.editor.optionBuilder,_param);
				var _param = $a.t.makeForm.getNewFormObj({
					inputCls : "w-40 option-input",
					validation : {
						readOnly : true
					} 
				});
				
				$a.t.makeForm.appendFormEl(_addBuildForm, _param);
				$a.e.addEvent(_addBuildForm.find("input.option-input"), "blur", _f.makeOptionBuilder);
				
				var _btnMinus  = $a.t.button.render(_addBuildForm, {
					name :'<i class="fa fa-minus"></i>',
					btnCls:"btn-default btn-xs m-l-5",
					callbackFunc : function() {
						_addBuildForm.closest(".form-group").remove();
						var builderCnt = _els.elForms.editor.optionBuilder.find(".form-group").length;
						if( builderCnt == 0 )
							_els.elForms.editor.optionBuilder.hide();
						_f.makeOptionBuilder();
					}
				} );
				var _btnExpand = $a.t.button.render(_addBuildForm, { 
					name :'<i class="fa fa-expand"></i>',
					btnCls:"btn-default btn-xs"
			    });
				var _btnHelp  = $a.t.button.render(_addBuildForm, { 
					name :'<i class="fa fa-question"></i>',
					btnCls:"btn-default btn-xs"
			    });
				
				_f.makePopoverHelp(_btnHelp);
				_f.makePopoverOptionInput(_btnExpand);
				_btnExpand.hide();
				_btnHelp.hide();
				
				$a.e.addEvent(_addBuildForm.find("select"), "change", function(e){
					var selVal = $(e.target).val();
					if( selVal == 'select' || selVal == 'radio' || selVal == 'checkbox' ) {
						_addBuildForm.find("input").attr("readonly", false);
						_btnExpand.show();
						_btnHelp.show();
					}else {
						_addBuildForm.find("input").attr("readonly", true);
						_btnExpand.hide();
						_btnHelp.hide();
					}
					_f.makeOptionBuilder();
				});
				_f.makeOptionBuilder();
			},
			makeOptionBuilder : function() {
				
				var formGroup = _els.elForms.editor.optionBuilder.children(".form-group");
				var formValue = _els.elForms.editor.optionValue.find("input");
				var form;
				var builderCnt = formGroup.length;
				var elSelect, elInput , optionVal = '' ;
				for( var idx = 0 ; idx < builderCnt; idx++ ) {
					if( idx > 0 )
						optionVal += _dts.delimiter.D1;
					form = formGroup.eq(idx);
					elSelect = form.find("select");
					elInput  = form.find("input.option-input");
					optionVal += elSelect.val();
					if ( !$a.u.isEmpty(elInput.val()) ) {
						optionVal += _dts.delimiter.D2;
						optionVal += elInput.val();
					}
				}
				formValue.val(optionVal);
			},
			setupEditor : function() {
				
				var _param = {
					title : $a.getMsg("lbl.addOption"),
					callBackHide : function() {

					},
					callBackShow : function() {
						// $(e.target).hide();
					},
					buttons :[{
						name :$a.getMsg("lbl.save"), 
						callbackFunc : function(e) {
							var mainEditor = $a.getMainEditor();
							if( $a.v.isValidBatchData(mainEditor) ) {
								_f.insertData();
							}
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
		                      { id:"optionCode",    type:"text",   label:$a.getMsg("lbl.code"), 
						        validation : {
						        	required  :true,
						        	maxLength : 100,
						        	notKor    : true
						        },
						      },
		                      { id:"optionValue",   type:"text",   label:$a.getMsg("lbl.value"), inputCls : 'addon-btn' ,
						    	validation : {
						    		maxLength : 50,
						    		readOnly  : true,
						    	},
							    addedBtn : {
							    	name :'<i class="fa fa-plus"></i>',btnCls:"btn-default btn-xs m-l-10", id:'add-builder' ,
							    	callbackFunc : function(e) {
										_f.addOptionBuild();
									}
							    }
						      },
		                      { id:"optionBuilder", type:"custom", label:null },
		                      { id:"useYn",         type:"select", label:$a.getMsg("lbl.useYn"), 
		                    	validation : {
						        	required  :true
						        },
		                    	typeOpt : {
		                    		blankOption:false,
		                    		optionList:$a.d.values.useYn
		                    	}
		                      },
		                      { id:"description", type:"textarea", label:$a.getMsg("lbl.description"),
		                    	typeOpt : {
		                    		rows : 5
		                    	},
		                      },
		                    ],
				};
				_els.elForms.editor = $a.t.mainEditor.render(_param);
				_els.elForms.editor.optionBuilder.hide();
				
				// popover 생성.
				_f.makePopover(_els.elForms.editor.category.find("#add-category"));
			},
			showEditor : function(e) {
				$a.t.mainEditor.showEditor();
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
			makePopoverHelp : function( el ) {

				_vws.inputHelpPopover = $a.t.popover.render(el,{
					title : $a.getMsg("lbl.help"),
					contextCss : {
						minWidth : "400px"
					},
					popoverCss : "popover-help",
					direction  : "bottom",
					shownFunc : function(event, popOverEl) {

						var _inputType = $(event.target).closest(".form-group").find("select").val();
						requirejs(['text!base/system/tmpl/tmpl-'+_inputType+'.html'], function( helpTmpl ) {
							var tmpl = _.template(helpTmpl);
							popOverEl.html(tmpl);
						});
					}
				});
			},
			
			makePopoverOptionInput : function( el ) {
								
				_vws.optionInputPopover = $a.t.popover.render(el,{
					title : $a.getMsg("lbl.makeRuleDetail"),
					contextCss : {
						minWidth : "450px",
					},
					popoverCss : "popover-optionValue",
					shownFunc : function(event, popOverEl) {
						
						var _elSetEl = $(event.target).closest(".form-group").find(".option-input");
						
						var elRowBox = $a.t.rowBox.render(popOverEl, {
							buttons : [{
								name :$a.getMsg("lbl.add"), 
								btnCls:"btn-default btn-xs",
								callbackFunc : function(e) {
									_f.addPopoverOptionInput(elRowBox.elBoxBody);
								}
							},{
								name :$a.getMsg("lbl.apply"), 
								btnCls:"btn-default btn-xs",
								callbackFunc : function(e) {
									_f.applyOptionValue(elRowBox.elBoxBody, _elSetEl);
								}
							},]
						});
						
						elRowBox.elBoxBody.addClass("edit-area wrap-scrollable").css({
							maxHeight : "250px"
						});
					}
				});
				console.log(_vws.optionInputPopover)
			},
			addPopoverOptionInput : function( elRowBox ) {
				
				var cnt = elRowBox.find(".form-group").length;
				var _param = $a.t.makeForm.getNewFormObj({
					label : (cnt+1),
					type : 'text',
					labelCls : "w-10",
					inputCls : "w-40 middle-btn",
				});
				var elDtlOpt = $a.t.makeForm.addNewForm(elRowBox,_param);
				_param.inputCls = "w-50";
				$a.t.makeForm.appendFormEl(elDtlOpt,_param);
				$a.t.button.render(elDtlOpt,{
					name :'<i class="fa fa-minus"></i>',
					btnCls:"btn-default btn-xs m-l-5",
					callbackFunc : function(e) {
						elDtlOpt.closest(".form-group").remove();
						_f.reorderOptinLabel(elRowBox);
					}
				});
				
				_f.reorderOptinLabel(elRowBox);
				elDtlOpt.children("input").eq(0).focus();
			},
			reorderOptinLabel : function( elRowBox ) {
				var cnt = elRowBox.find(".form-group").length;
				for( var idx = 0 ; idx <= cnt; idx++ ) {
					elRowBox.children(".form-group").eq(idx).find("label").html((idx+1));
				}
			},
			applyOptionValue : function( elRowBox , elSetValue ) {
				var cnt = elRowBox.find(".form-group").length;
				var obj = {};
				var row, optKey, optVal;
				for( var idx = 0 ; idx <= cnt; idx++ ) {
					row = elRowBox.children(".form-group").eq(idx);
					optKey = row.children("input").eq(0).val();
					optVal = row.children("input").eq(1).val();
					obj[optKey] = optVal;
				}
				elSetValue.val(JSON.stringify(obj));
				_vws.optionInputPopover.close();
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
						$a.t.mainEditor.showEditor(rowData);
					},
				});
				
				_f.searchOptionList();
			},
			insertData : function() {
				
				console.log($a.t.mainEditor.getValues());
				
				var mainEditor = $a.t.mainEditor.getMainBody();
				var formData = $a.t.mainEditor.getValues();
				formData.siteId = "site-a";
				formData.compId = "comp-1";
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
