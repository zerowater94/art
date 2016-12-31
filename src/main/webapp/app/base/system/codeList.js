define([ 'basicInfo'
         , 'text!base/system/codeList.html'
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
		var _dts = {};
	
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
				$a.t.mainBar.addButton({ 
					name : $a.getMsg("lbl.addCodeGroup"), 
					callbackFunc : function(e){
						_f.showInputEditor({
							codeType : $a.getConstants("CODE_TYPE","GROUP")
						});
					} 
			    });
				$a.t.mainBar.addButton({ 
					name : $a.getMsg("lbl.addCode"), 
					callbackFunc : function(e){
						_f.showInputEditor({
							codeType : $a.getConstants("CODE_TYPE","CODE")
						});
					} 
			    });
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
						codeType : $a.getConstants("CODE_TYPE","GROUP")
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
			searchCodeList : function() {
				var paramData = _vws.searchCode.getValues();
				paramData.codeType =  $a.getConstants("CODE_TYPE","CODE");
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/code/list",
					type : "get",
					data : paramData,
					success : function(data) {
						_els.optionGrid.reloadData({
							dataModel : {
								data : data
							}
						});
					}
				});
			},
			makeGrid : function() {
				
				_vws.gridGroup = $a.t.grid.render(_els.areaGridGroup, {
					colModel : [{ dataIndx : "code",     title: $a.getMsg("lbl.code"),     width: 50, editable: false   },
					            { dataIndx : "codeValue",title: $a.getMsg("lbl.codeValue"), width: 200, editable: false  }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						$a.t.mainEditor.showEditor(rowData);
					},
				});
				
				_vws.gridCode = $a.t.grid.render(_els.areaGridCode, {
					colModel : [{ dataIndx : "code",     title: $a.getMsg("lbl.code"),     width: '30%', editable: false   },
					            { dataIndx : "codeValue",title: $a.getMsg("lbl.codeValue"), width: '70%', editable: false  }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						$a.t.mainEditor.showEditor(rowData);
					},
				});
			},
			showInputEditor : function(obj) {
				_dts.selectedData = null;
				_f.showEditor(obj);
			},
			setupEditor : function() {
				
				var codeTyps = [{
					code :$a.getConstants("CODE_TYPE","GROUP"), value : $a.getMsg("lbl.codeGroup")
				},{
					code :$a.getConstants("CODE_TYPE","CODE"), value : $a.getMsg("lbl.code")
				}];
				var _param = {
					title : $a.getMsg("lbl.addCode"),
					callBackHide : function() {

					},
					buttons :[{
						name :$a.getMsg("lbl.save"), 
						callbackFunc : function(e) {
							console.log($a.t.mainEditor.getValues());
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
		                      { id:"description", type:"textarea", label:$a.getMsg("lbl.description"),
		                    	typeOpt : {
		                    		rows : 5
		                    	},
		                      },
		                    ],
				};
				_els.forms.editor = $a.t.mainEditor.render(_param);
			},
			closeEditor : function() {
				$a.t.mainEditor.hideEditor();
			},
			showEditor : function( obj ) {
				
				$a.t.mainEditor.showEditor(obj);
				_els.forms.editor.codeGroup.show();
				console.log($a.t.mainEditor.getValues());
				if ( $a.t.mainEditor.getValues().codeType == $a.getConstants("CODE_TYPE","GROUP"))
					_els.form.editor.codeGroup.hide();
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
