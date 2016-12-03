define([ 'abstractView', 'basicInfo', 'basicValid'
         , 'text!base/system/optionList.html'
       ], function ( AbstractView , $a, $aValid, _tmpl) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		
		var _els = {
				
		} ; // elements
		
		
		var _dts = {
			categoryList : null,
		};
		
		
		var _f = {
			setTitle : function(){

				$a.t.mainBar.addButton({ 
					name :$a.getMsg("lbl.add"), 
					callbackFunc : _f.showEditor 
			    });
			},
			setupEditor : function() {
				$a.t.mainEditor.render({
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
							
							if( $aValid.isValidBatchData(mainEditor) ) {
								_f.insertData();
							}
						}
					}],
					formList:[{ id:"category",      type:"select", label:$a.getMsg("lbl.category"), required:true, optionList:_dts.categoryList, jsonReader:{code:'category', value:'category'}},
		                      { id:"optionCode",    type:"text",   label:$a.getMsg("lbl.code"), required:true,etc:{'max-length':10,'not-kor':true}},
		                      { id:"optionValue",   type:"text",   label:$a.getMsg("lbl.value"), etc:{'max-length':10,'not-kor':true,'readOnly':true}, inputCls : 'addon-btn' },
		                      { id:"optionBuilder", type:"custom", label:null },
		                      { id:"useYn",         type:"select", label:$a.getMsg("lbl.useYn"), blankOption:false,  optionList:$a.d.values.useYn},
		                      { id:"useYn",         type:"textarea", label:$a.getMsg("lbl.description")},
		                    ],
				});
				// category 추가 버튼
				_els.areaFormCategory = $a.t.mainEditor.getContents().find("#area-category");
				_els.areaFormValue = $a.t.mainEditor.getContents().find("#area-optionValue");
				_els.areaFormBuilder = $a.t.mainEditor.getContents().find("#optionBuilder");
				$a.t.button.render(_els.areaFormCategory,{
					name :'<i class="fa fa-plus"></i>', 
					btnCls:"btn-default btn-xs m-l-10",
					id   : 'add-category',
				});
				
				_els.areaFormCategory.find('.input-group').css({
					maxWidth:"80%"
				});
				
				$a.t.button.render(_els.areaFormValue,{
					name :'<i class="fa fa-plus"></i>', 
					btnCls:"btn-default btn-xs m-l-10",
					id   : 'add-builder',
					callbackFunc : function(e) {
						
						$a.t.addForm.select(_els.areaFormBuilder,{label:null});
					}
				});
				
				// popover 생성.
				_els.btnAddCategory = $a.t.mainEditor.getContents().find("#add-category");
				_f.makePopover(_els.btnAddCategory);
			},
			showEditor : function(e) {
				
				$a.t.mainEditor.showEditor();
			},
			makePopover : function( el ) {
				
				
				var categoryPopover = $a.t.popover.render(el,{
					title : $a.getMsg("lbl.addCategory"),
					contextCss : {
						minWidth : "350px"
					},
					shownFunc : function(el) {
						
						el.addClass("edit-area");
						$a.t.addForm.execBatch(el,[{ id:"category", type:"text", required:true, inputCls : 'addon-btn', label:$a.getMsg("lbl.category"),etc:{'max-length':30,'not-kor':true}}]);
						var elPopoverCategory = el.find("#area-category");
						
						var _callbackFunc = function(e) {
							
							if ( $aValid.isValidBatchData(el) ) {
								
								var inputCategory = $a.t.mainEditor.getContents().find("#category");
								var searchCategory = _els.areaSearch.find("#category");
								var inputVal = el.find("#category").val();
								inputCategory.append("<option value='"+inputVal+"'>"+inputVal+"</option>");
								searchCategory.append("<option value='"+inputVal+"'>"+inputVal+"</option>");
								inputCategory.val(inputVal);
								categoryPopover.close();
							}
						};
						
						$a.t.button.render(elPopoverCategory,{
							name :$a.getMsg("lbl.add"), 
							btnCls:"btn-default btn-xs m-l-10",
							callbackFunc : _callbackFunc ,
						});

						elPopoverCategory.find("input").keypress(function(e){
							
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
						console.log(rowData);
					},
				});
				
				_f.searchOptionList();
			},
			insertData : function() {
				
				var mainEditor = $a.t.mainEditor.getContents();
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/option/insert",
					data : {
						siteId : "site-a",
						compId : "comp-1",
						category : mainEditor.find("#category").val(),
						optionId : "option-3",
						optionCode : mainEditor.find("#optionCode").val(),
						optionValue : mainEditor.find("#opionValue").val() ,
						optionBuilder : mainEditor.find("#optionBuilder").val(),
					},
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
		_this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
			
			var tmpl = _.template(_tmpl);
			thisEl.html(tmpl());
			
			_els.areaSearch     = thisEl.find("#area-search");
			_els.areaGridOption = thisEl.find("#grid-list");
		};
		
		_this.reloadContents = function() {
			
			_f.setTitle();
			_f.makeSearchArea();
			_f.searchCategoryList();
			_f.makeGrid();
			_f.setupEditor();
		};
		
		_this.returns = {
			
		};
		
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});
