define([ 'basicInfo'
         , 'text!app/base/system/codeList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	return function( thisEl ) {
		
		var _this = {};
		var _pm = {} ; // param
		var _els = {
			forms : {
				
			},
		}; // elements
		var _vws = {};  // view or widget
		var _dts = {
			codeTypeObj  : $a.getConstants("CODE_TYPE"),
			selectedData : {
				group    : null,
				code     : null
			},
			editData : null
		};
	
		var _f = {
			createPage : function() {
				var tmpl = _.template(_tmpl);
				thisEl.html(tmpl());
				
				_els.areaSearchGroup = thisEl.find("#area-search-group");
				_els.areaSearchCode  = thisEl.find("#area-search-code");
				_els.areaGridGroup   = thisEl.find("#grid-list-group");
				_els.areaGridCode    = thisEl.find("#grid-list-code");
			},
			setupMainBar : function(){
				
			},
			makeSearchArea : function() {
				
				_vws.searchGroup = $a.t.search.render(_els.areaSearchGroup,{
					title      : $a.getMsg("lbl.codeGroup"),
					buttons    : [{ name : $a.getMsg("lbl.addCodeGroup"),
									id   : 'btn-group-add',
									callbackFunc : function(){
										_f.showInputEditor({
											codeType : _dts.codeTypeObj.GROUP,
											codeOrd  : 0,
										});
									},
								},{ name : $a.getMsg("lbl.delete"),
									id   : 'btn-group-delete',
									callbackFunc : _f.deleteCodeGroup,
								},],
					formList   : [{ id:"codeValue",    type:"text", label:$a.getMsg("lbl.codeValue")}],
					searchFunc : _f.searchGroupCodeList
				});
				
				_vws.searchCode = $a.t.search.render(_els.areaSearchCode,{
					title      : $a.getMsg("lbl.noSelectCodeGroup"),
					buttons    : [{ name : $a.getMsg("lbl.addCode"),
									id   : 'btn-code-add',
									callbackFunc : function(){
										_f.showInputEditor({
											codeType  : _dts.codeTypeObj.CODE,
											codeGroup : _dts.selectedData.group.code 
										});
									},
								},{ name : $a.getMsg("lbl.up"),
									id   : 'btn-order-up',
									callbackFunc : function(){
										if( _vws.gridCode.rowUp() )
											_els.btnSaveOrder.addClass("btn-warning");
									},
								},{ name : $a.getMsg("lbl.down"),
									id   : 'btn-order-down',
									callbackFunc : function(){
										if( _vws.gridCode.rowDown() )
											_els.btnSaveOrder.addClass("btn-warning");
									},
								},{ name : $a.getMsg("lbl.save"),
									id   : 'btn-save-order',
									callbackFunc : function(){
										_f.updateOrder();
									},
								},{ name : $a.getMsg("lbl.delete"),
									id   : 'btn-code-delete',
									callbackFunc : function(){
										_f.deleteData();
									},
								}],
					formList   : [{ id:"code",     type:"text", label:$a.getMsg("lbl.code")},
						  		  { id:"codeValue",type:"text", label:$a.getMsg("lbl.codeValue")}],
					searchFunc : _f.searchCodeList
				});
				_els.btnAddCode   = _els.areaSearchCode.find("#btn-code-add");
				_els.btnOrderUp   = _els.areaSearchCode.find("#btn-order-up");
				_els.btnOrderDown = _els.areaSearchCode.find("#btn-order-down");
				_els.btnSaveOrder = _els.areaSearchCode.find("#btn-save-order");
				_els.btnDeleteCode = _els.areaSearchCode.find("#btn-code-delete");
				_f.setupSelectedCode();
			},
			searchGroupCodeList : function() {
				var paramData = _vws.searchGroup.getValues();
				paramData.codeType =  _dts.codeTypeObj.GROUP;
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/code/list",
					type : "get",
					data : paramData,
					success : function(data) {
						_vws.gridGroup.reloadData({
							dataModel : {
								data : data
							}
						});
						_vws.gridGroup.setSelection(0);
					}
				});
			},
			searchCodeList : function(  ) {
				var paramData = _vws.searchCode.getValues();
				paramData.codeType =  _dts.codeTypeObj.CODE;
				paramData.codeGroup = _dts.selectedData.group.code;
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/code/list",
					type : "get",
					data : paramData,
					success : function(data) {
						_vws.gridCode.reloadData({
							dataModel : {
								data : data
							}
						});
					}
				});
			},
			searchMaxOrder : function( codeGroup ) {
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/code/maxOrder",
					type : "get",
					data : {
						codeType  : _dts.codeTypeObj.CODE,
						codeGroup :  codeGroup
					},
					success : function(data) {
						var maxOrder = data.codeOrd;
						var param = {
							optionList : [],
						};
						var idx = 1;
						for( idx = 1 ; idx <= maxOrder; idx++ ) {
							param.optionList.push(idx);
						}
						if ( _dts.editData.isInputMode ) {
							param.optionList.push(idx);
							_dts.editData.codeOrd = idx;
						} else {
							_dts.editData.codeOrd = _dts.selectedData.code.codeOrd;
						}
						_els.forms.editor.codeOrd.reloadOptions(param);
					}
				});
			},
			makeGrid : function() {
				
				_vws.gridGroup = $a.t.grid.render(_els.areaGridGroup, {
					height:150,
					colModel : [{ dataIndx : "code",     title: $a.getMsg("lbl.code"),     width: 50, editable: false   },
					            { dataIndx : "codeValue",title: $a.getMsg("lbl.codeValue"), width: 200, editable: false  }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						// include rowSelect function.
						_f.showEditor();
					},
					rowSelect: function( event, ui ) {
						_dts.selectedData.group = ui.rowData;
						_dts.editData = ui.rowData;
						_dts.editData.isInputMode = false;
						_f.selectedCodeGroup();
						
					}
				});
				
				_vws.gridCode = $a.t.grid.render(_els.areaGridCode, {
					height:150,
					colModel : [{ dataIndx : "code",     title: $a.getMsg("lbl.code"),     width: '30%', editable: false   },
					            { dataIndx : "codeValue",title: $a.getMsg("lbl.codeValue"), width: '70%', editable: false  },
					            { dataIndx : "codeId"   ,title: $a.getMsg("lbl.codeId")    , hidden: true  }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						_dts.selectedData.code = ui.rowData;
						_dts.editData = ui.rowData;
						_dts.editData.isInputMode = false;
						_f.showEditor();
						_f.setupSelectedCode();
					},
				});
				
				_f.searchGroupCodeList();
			},
			showInputEditor : function(obj) {
				obj.isInputMode = true ;
				_dts.editData = obj;
				_f.showEditor();
			},
			setupEditor : function() {
				var codeTyps = [{
					code :_dts.codeTypeObj.GROUP, value : $a.getMsg("lbl.codeGroup")
				},{
					code :_dts.codeTypeObj.CODE, value : $a.getMsg("lbl.code")
				}];
				var _param = {
					title : $a.getMsg("lbl.addCode"),
					direction    : "bottom",
					callBackHide : function() {

					},
					buttons :[{
						name :$a.getMsg("lbl.save"), 
						callbackFunc : function(e) {
							_f.insertData();
						}
					}],
					formList:[{ id:"codeType", type:"select", label:$a.getMsg("lbl.codeType"), 
						      	validation : {
						      		required   : true,
						      		readOnly   : true,
						      	},
						      	typeOpt : {
						      		optionList : codeTyps,
						      	}
						      },
		                      { id:"codeGroup", type:"text", label:$a.getMsg("lbl.codeGroup"), 
						        validation : {
						        	required  :true,
						      		readOnly   : true,
						        },
						      },
		                      { id:"code",  type:"text", label:$a.getMsg("lbl.code"), 
		                    	validation : {
						        	required  : true,
						        	notKor    : true,
						        	maxLength : 100,
						        }
		                      },
		                      { id:"codeValue",   type:"text",   label:$a.getMsg("lbl.codeValue"), 
						    	validation : {
						    		required  : true,
						    		maxLength : 200,
						    	}
						      },
						      { id:"codeOrd",  type:"select", label:$a.getMsg("lbl.codeOrder"), 
		                    	validation : {
						        	required  :true
						        },
		                    	typeOpt : {
		                    		blankOption:false,
		                    		optionList :[],
		                    	}
		                      },
		                      { id:"useYn",  type:"select", label:$a.getMsg("lbl.useYn"), 
		                    	validation : {
						        	required  :true
						        },
		                    	typeOpt : {
		                    		blankOption:false,
		                    		optionList:$a.d.values.useYn,
		                    		defaultParam : "Y",
		                    	}
		                      },
		                      { id:"description", type:"textarea", label:$a.getMsg("lbl.description"),
		                    	typeOpt : {
		                    		rows : 5
		                    	},
		                      },
		                      { id:"etcInfo", type:"etc-info", label:$a.getMsg("lbl.etcInfo"), }
		                    ],
				};
				_els.forms.editor = $a.t.mainEditor.render(_param);
			},
			closeEditor : function() {
				$a.t.mainEditor.hideEditor();
			},
			showEditor : function(  ) {
				
				_els.forms.editor.codeGroup.area.show();
				if ( _dts.editData.codeType == _dts.codeTypeObj.GROUP ) {
					_dts.editData.title = $a.getMsg("lbl.codeGroup");
					_els.forms.editor.codeGroup.area.hide();
					
					_els.forms.editor.codeOrd.reloadOptions({
						optionList   : [0]
					});
					
				} else {
					_f.searchMaxOrder(_dts.selectedData.group.code);
					_dts.editData.title = $a.getMsg("lbl.code");
				}
				if ( _dts.editData.isInputMode )
					_dts.editData.useYn = "Y";
				$a.t.mainEditor.showEditor(_dts.editData);
			},
			selectedCodeGroup : function() {
				if ( _dts.selectedData.group == null )
					return;
				
				_els.btnAddCode.show();
				_vws.searchCode.changeTitle(_dts.selectedData.group.codeValue);
				_f.searchCodeList();
				
				$a.t.mainEditor.setTitle($a.getMsg("lbl.codeGroup"));
				_dts.selectedData.code = null;
				_f.setupSelectedCode();
				
			},
			setupSelectedCode : function() {
				if ( _dts.selectedData.code == null ) {
					_els.btnOrderUp.hide();
					_els.btnOrderDown.hide();
					_els.btnSaveOrder.hide();
					_els.btnDeleteCode.hide();
				} else {
					_els.btnOrderUp.show();
					_els.btnOrderDown.show();
					_els.btnSaveOrder.show();
					_els.btnDeleteCode.show();
				}
			},
			insertData : function() {
				
				var mainEditor = $a.t.mainEditor.getMainBody();
				if( !$a.v.isValidBatchData(mainEditor) ) 
					return;
				
				var formData = $a.t.mainEditor.getValues();
				formData.siteId = "PUBLIC";
				formData.compId = "PUBLIC";
				formData.codeId = _dts.editData.codeId;
				if ( formData.codeType == _dts.codeTypeObj.GROUP )
					formData.codeGroup = formData.code;
				
				$a.send({
					url  : $a.getDefaultUrl()+"/base/system/code/save",
					type : (_dts.editData.isInputMode)?"post":"put", 
					data : formData,
					success : function(data) {
						$a.show.success($a.getMsg("msg.success.insert"));
						_f.searchGroupCodeList();
						_f.closeEditor();
					}
				});
			},
			updateOrder : function() {
				
				var dataLen = _vws.gridCode.getData().length;
				var codeData = [];
				for ( var idx = 0 ; idx < dataLen; idx++ ) {
					codeData[idx] = _vws.gridCode.getRowData(idx)
					codeData[idx].codeOrd = (idx+1); 
				}
				$a.send({
					url  : $a.getDefaultUrl()+"/base/system/code/save/order",
					type : "put", 
					data : codeData,
					success : function(data) {
						$a.show.success($a.getMsg("msg.success.update"));
						_els.btnSaveOrder.removeClass("btn-warning");
					}
				});
			},
			deleteData : function() {
				if ( _dts.selectedData.code == null ) {
					$a.print.alert($a.getMsg("msg.noSelectedData"));
					return;
				}
				 $a.print.confirm($a.getMsg("msg.confirm.delete"),function(){
					 $a.send({
						url  : $a.getDefaultUrl()+"/base/system/code/delete",
						type : "delete", 
						data : _dts.selectedData.code,
						success : function(data) {
							$a.show.success($a.getMsg("msg.success.delete"));
							_f.searchCodeList();
						}
					});
				 });
				
			},
			deleteCodeGroup : function() {
				if ( _dts.selectedData.group == null ) {
					$a.print.alert($a.getMsg("msg.noSelectedData"));
					return;
				}
				
				$a.print.confirm($a.getMsg("msg.confirm.detele.codeGroup"),function(){
					$a.send({
						url  : $a.getDefaultUrl()+"/base/system/code/delete/group",
						type : "delete", 
						data : _dts.selectedData.group,
						success : function(data) {
							$a.show.success($a.getMsg("msg.success.delete"));
							_f.searchGroupCodeList();
						}
					});
				});
				
			}
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		_this.render = function(obj) {
			$.extend( true, _pm ,obj);
			_f.createPage();
			_f.setupMainBar();
			_f.makeSearchArea();
			_f.setupEditor();
			_f.makeGrid();
		};
		
		return _this;
	};

});
