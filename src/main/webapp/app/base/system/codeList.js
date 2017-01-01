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
				_els.btnAddGroup = $a.t.mainBar.addButton({ 
					name : $a.getMsg("lbl.addCodeGroup"), 
					callbackFunc : function(e){
						_f.showInputEditor({
							codeType : _dts.codeTypeObj.GROUP
						});
					} 
			    });
				_els.btnAddCode = $a.t.mainBar.addButton({ 
					name : $a.getMsg("lbl.addCode"), 
					callbackFunc : function(e){
						_f.showInputEditor({
							codeType  : _dts.codeTypeObj.CODE,
							codeGroup : _dts.selectedData.group.code 
						});
					} 
			    });
				_els.btnAddCode.hide();
			},
			makeSearchArea : function() {
				
				_vws.searchGroup = $a.t.search.render(_els.areaSearchGroup,{
					title      : $a.getMsg("lbl.codeGroup"),
					formList   : [{ id:"codeGroup",    type:"text", label:$a.getMsg("lbl.codeGroup")}],
					searchFunc : _f.searchGroupCodeList
				});
				
				_vws.searchCode = $a.t.search.render(_els.areaSearchCode,{
					title      : $a.getMsg("lbl.noSelectCodeGroup"),
					formList   : [{ id:"code",     type:"text", label:$a.getMsg("lbl.code")},
						  		  { id:"codeValue",type:"text", label:$a.getMsg("lbl.codeValue")}],
					searchFunc : _f.searchCodeList
				});

			},
			searchGroupCodeList : function() {
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/code/list",
					type : "get",
					data : {
						codeType : _dts.codeTypeObj.GROUP
					},
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
			makeGrid : function() {
				
				_vws.gridGroup = $a.t.grid.render(_els.areaGridGroup, {
					height:150,
					colModel : [{ dataIndx : "code",     title: $a.getMsg("lbl.code"),     width: 50, editable: false   },
					            { dataIndx : "codeValue",title: $a.getMsg("lbl.codeValue"), width: 200, editable: false  }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						// include rowSelect function.
						$a.t.mainEditor.showEditor(rowData);
					},
					rowSelect: function( event, ui ) {
						_dts.selectedData.group = ui.rowData;
						_dts.editData = ui.rowData;
						_dts.editData.isInputMode = false;
						_f.selectedCodeGroup();
						$a.t.mainEditor.setTitle($a.getMsg("lbl.codeGroup"));
					}
				});
				
				_vws.gridCode = $a.t.grid.render(_els.areaGridCode, {
					height:150,
					colModel : [{ dataIndx : "code",     title: $a.getMsg("lbl.code"),     width: '30%', editable: false   },
					            { dataIndx : "codeValue",title: $a.getMsg("lbl.codeValue"), width: '70%', editable: false  }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						_dts.editData = ui.rowData;
						_dts.editData.isInputMode = false;
						$a.t.mainEditor.showEditor(rowData);
						$a.t.mainEditor.setTitle($a.getMsg("lbl.code"));
					},
				});
				
				_f.searchGroupCodeList();
			},
			showInputEditor : function(obj) {
				obj.isInputMode = true ;
				_dts.editData = obj;
				_f.showEditor(obj);
			},
			setupEditor : function() {
				
				var codeTyps = [{
					code :_dts.codeTypeObj.GROUP, value : $a.getMsg("lbl.codeGroup")
				},{
					code :_dts.codeTypeObj.CODE, value : $a.getMsg("lbl.code")
				}];
				var _param = {
					title : $a.getMsg("lbl.addCode"),
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
		                      { id:"useYn",  type:"select", label:$a.getMsg("lbl.useYn"), 
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
		                      { id:"etcInfo", type:"etc-info", label:$a.getMsg("lbl.etcInfo"), }
		                    ],
				};
				_els.forms.editor = $a.t.mainEditor.render(_param);
			},
			closeEditor : function() {
				$a.t.mainEditor.hideEditor();
			},
			showEditor : function( obj ) {
				
				$a.t.mainEditor.showEditor(obj);
				$a.t.mainEditor.setTitle($a.getMsg("lbl.addCode"));
				_els.forms.editor.codeGroup.show();
				if ( obj.codeType == _dts.codeTypeObj.GROUP ) {
					$a.t.mainEditor.setTitle($a.getMsg("lbl.addCodeGroup"));
					_els.forms.editor.codeGroup.hide();
				}
					
			},
			selectedCodeGroup : function() {
				if ( _dts.selectedData.group == null )
					return;
				
				_els.btnAddCode.show();
				_vws.searchCode.changeTitle(_dts.selectedData.group.codeValue);
				_f.searchCodeList();
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
