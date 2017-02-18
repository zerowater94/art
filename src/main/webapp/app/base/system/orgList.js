define([ 'basicInfo'
         , 'text!app/base/system/orgList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	
	var funcs = function( thisEl ) {
		
		var _this = {};
		var _pm  = {} ; // param
		var _els = {}; // elements
		var _dts = {
			selectedData : {
				comp : null,
				dept : null,
				user : null
			}
		};
		var _vws = {}; // view or widget
		var _f = {
			createPage : function() {
				var tmpl = _.template(_tmpl);
				thisEl.html(tmpl());
				_els.areaOrg		 = thisEl.find("#area-org");
				_els.areaUsers		 = thisEl.find("#area-users");
				_els.areaOrgComp 	 = _els.areaOrg.find("#area-org-comp");
				_els.areaOrgCompList = _els.areaOrg.find("#area-org-comp-list");
				_els.areaOrgDept	 = _els.areaOrg.find("#area-org-dept");
				_els.areaUsersSearch = _els.areaUsers.find("#area-user-search");
				_els.areaUsersList   = _els.areaUsers.find("#area-users-list");
			},
			setupMainBar : function(){
				
			},
			reloadGrid : function(data){
				_vws.comp.gridComp.reloadData({
					dataModel : {
						data : data
					}
				});
			},
			insertComp : function(){
				
				if( !$a.t.mainEditor.isValidFormData() ) 
					return;
				
				var formData = $.extend(true, {},_dts.selectedData.comp , $a.t.mainEditor.getValues());
				formData.siteId = "PUBLIC";
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/comp",
					type : ( _dts.selectedData.comp == null )?"post":"put",
					data : formData,
					success : function(data) {
						$a.show.success($a.getMsg("msg.success.insert"));
						_vws.comp.searchCompList();
						_f.closeEditor();
						
					}
				});
			},
			closeEditor : function() {
				$a.t.mainEditor.hideEditor();
			},
			setupEditorComp : function(param) {
				
				(param == undefined || param == null)?_dts.selectedData.comp = null : _dts.selectedData.comp =  param;
				
				_els.editor = $a.t.mainEditor.render({
					title : $a.getMsg("lbl.orgCompMng"),
					buttons :[{
						name :$a.getMsg("lbl.save"), 
						callbackFunc : _f.insertComp
					}],
					formList:[{ id:"compCode", type:"text", label:$a.getMsg("lbl.compCode"), 
				      	validation : {
				      		required   : true,
				      		notKor     : true,
				      		maxLength  : 30
				      	},
				      },{ id:"compName", type:"text", label:$a.getMsg("lbl.compName"), 
				          validation : {
				        	required  :true,
				        	maxLength : 30
				        },
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
				});
				$a.t.mainEditor.showEditor(param);
				
			},
		}; // functions..
		
		_vws.comp = {
			makeCompTitle : function() {
				var _self = this;
				_self.rowBoxComp = $a.t.rowBox.render(_els.areaOrgComp, {
					title : $a.getMsg("lbl.orgCompMng"),
					buttons    : [{ name : $a.getMsg("lbl.add"),
									id   : 'btn-comp-add',
									callbackFunc :function(){ 
										_self.gridComp.resetSelection();
										_f.setupEditorComp();
									},
								},{ name : $a.getMsg("lbl.up"),
									id   : 'btn-order-up',
									callbackFunc : function(){
										if( _self.gridComp.rowUp() )
											_self.btnSaveOrder.addClass("btn-warning");
									},
								},{ name : $a.getMsg("lbl.down"),
									id   : 'btn-order-down',
									callbackFunc : function(){
										if( _self.gridComp.rowDown() )
											_self.btnSaveOrder.addClass("btn-warning");
									},
								},{ name : $a.getMsg("lbl.save"),
									id   : 'btn-save-order',
									callbackFunc : function(){
										 _self.updateOrder();
									},
								},{ name : $a.getMsg("lbl.delete"),
									id   : 'btn-comp-delete',
									callbackFunc : function(){
										 _self.deleteCompany();
									},
								},],
				} );
				
				var rowBoxBtns = _self.rowBoxComp.elBoxBtn;
				_self.btnAddComp   = rowBoxBtns.find("#btn-comp-add");
				_self.btnOrderUp   = rowBoxBtns.find("#btn-order-up");
				_self.btnOrderDown = rowBoxBtns.find("#btn-order-down");
				_self.btnSaveOrder = rowBoxBtns.find("#btn-save-order");
				_self.btnDeleteComp = rowBoxBtns.find("#btn-comp-delete");
				
			},
			makeCompList : function() {
				var _self = this;
				_self.gridComp = $a.t.grid.render(_els.areaOrgCompList, {
					height:150,
					resizeHeight:false,
					colModel : [{ dataIndx : "compCode",  title: $a.getMsg("lbl.compCode"),    width: 100, editable: false   },
					            { dataIndx : "compName",  title: $a.getMsg("lbl.compName"),    width: 200, editable: false  }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						_f.setupEditorComp(rowData);
					},
					rowSelect: function( event, ui ) {
						
					}
				});
			},
			searchCompList : function(  ) {
				$a.send({
					url : $a.getDefaultUrl()+"/base/system/comp/list",
					type : "get",
					data : {
						siteId : "PUBLIC"
					},
					success : _f.reloadGrid
				});
			},
			deleteCompany : function() {
				var _self = this;
				if ( _dts.selectedData.comp == null ) {
					$a.print.alert($a.getMsg("msg.noSelectedData"));
					return;
				}
				 $a.print.confirm($a.getMsg("msg.confirm.delete"),function(){
					 $a.send({
						url  : $a.getDefaultUrl()+"/base/system/comp",
						type : "delete", 
						data : _dts.selectedData.comp,
						success : function(data) {
							$a.show.success($a.getMsg("msg.success.delete"));
							_self.searchCompList();
							_f.closeEditor();
						}
					});
				 });
			},
			updateOrder : function() {
				var _self = this;
				var dataLen = _self.gridComp.getData().length;
				var compData = [];
				for ( var idx = 0 ; idx < dataLen; idx++ ) {
					compData[idx] = _self.gridComp.getRowData(idx)
					compData[idx].compOrd = (idx+1); 
				}
				$a.send({
					url  : $a.getDefaultUrl()+"/base/system/comp/order",
					type : "put", 
					data : compData,
					success : function(data) {
						$a.show.success($a.getMsg("msg.success.update"));
						_self.btnSaveOrder.removeClass("btn-warning");
					}
				});
			},
			render : function(){
				this.makeCompTitle();
				this.rowBoxComp.elBoxBody.remove();
				this.makeCompList();
				this.searchCompList();
			}
		};
		_vws.dept = {
			makeRowBox : function() {
				this.rowBoxDept = $a.t.rowBox.render(_els.areaOrgDept, {
					title : $a.getMsg("lbl.orgDeptMng"),
				} );
			},
			render : function() {
				this.makeRowBox();
			}
		};
		_vws.user = {
			makeRowBox : function(){
				this.searchUser = $a.t.search.render(_els.areaUsersSearch,{
					title      : $a.getMsg("lbl.orgUserMng"),
					buttons    : [],
					formList   : [{ id:"userName",    type:"text", label:$a.getMsg("lbl.userName")}],
					searchFunc : _f.searchGroupCodeList
				});
			},
			makeGrid : function() {
				this.gridUsers = $a.t.grid.render(_els.areaUsersList, {
					height:150,
					colModel : [{ dataIndx : "userName",  title: $a.getMsg("lbl.userName"),    width: 100, editable: false   },
					            { dataIndx : "deptName",  title: $a.getMsg("lbl.deptName"),    width: 200, editable: false  }],
					rowClick : function( event, ui ) {
						var rowData = ui.rowData;
						_f.showEditor();
					},
					rowSelect: function( event, ui ) {
						
					}
				});
			},
			render : function() {
				this.makeRowBox();
				this.makeGrid();
			}
		};
		
		
		/*************************************************
		 * common structure
		 *************************************************/
		_this.render = function(obj) {
			
			$.extend( true, _pm ,obj);
			_f.createPage();
			_f.setupMainBar();
			_vws.comp.render();
			_vws.dept.render();
			_vws.user.render();
			
		};
		
		return _this;
	};
	
	
	return funcs;

});
