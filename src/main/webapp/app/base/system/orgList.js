define([ 'basicInfo'
         , 'text!app/base/system/orgList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	var app = {};
	
	var compApp = $a.ctl({
		render : function(obj) {
			$.extend(true, this.pm, obj);
			this.areaCompTitle = this.$el.find("#area-comp-title");
			this.areaCompList  = this.$el.find("#area-comp-list");
			this.makeCompTitle();
			this.makeCompList();
			this.searchCompList();
		},
		makeCompTitle : function() {
			var _self = this;
			_self.rowBoxComp = $a.t.rowBox.render(_self.areaCompTitle, {
				title : $a.getMsg("lbl.orgCompMng"),
				buttons    : [{ name : $a.getMsg("lbl.add"),
								id   : 'btn-comp-add',
								callbackFunc :function(){ 
									_self.gridComp.resetSelection();
									_self.setupEditorComp();
									app.dept.clearDeptData();
								},
							},{ name : $a.getMsg("lbl.save"),
								id   : 'btn-save-order',
								callbackFunc : function(){
									 _self.updateOrder();
								},
							}],
			} );
			_self.rowBoxComp.elBoxBody.remove();
			var rowBoxBtns     = _self.rowBoxComp.elBoxBtn;
			_self.btnAddComp   = rowBoxBtns.find("#btn-comp-add");
			_self.btnOrderUp   = rowBoxBtns.find("#btn-order-up");
			_self.btnOrderDown = rowBoxBtns.find("#btn-order-down");
			_self.btnSaveOrder = rowBoxBtns.find("#btn-save-order");
			_self.btnDeleteComp = rowBoxBtns.find("#btn-comp-delete");
			_self.btnSaveOrder.hide();
			
		},
		makeCompList : function(  ) {
			var _self = this;
			_self.gridComp = $a.t.grid.render(_self.areaCompList, {
				height:150,
				resizeHeight:false,
				colModel : [{ dataIndx : "compCode",  title: $a.getMsg("lbl.compCode"),    width: 100, editable: false   },
				            { dataIndx : "compName",  title: $a.getMsg("lbl.compName"),    width: 200, editable: false  }],
				rowClick : function( event, ui ) {
					var rowData = ui.rowData;
					_self.setupEditorComp(rowData);
				},
				rowSelect: function( event, ui ) {
					var rowData = ui.rowData;
					app.dept.setCompanyInfo(rowData);
				},
				rightAction : {
					moveUp : function( selectedItem ) {
						if( _self.gridComp.rowUp() )
							_self.btnSaveOrder.addClass("btn-warning").show();
					},
					moveDown : function( selectedItem ) {
						if( _self.gridComp.rowDown() )
							_self.btnSaveOrder.addClass("btn-warning").show();
					},
					deleteItem : function(selectedItem) {
						_self.selectedCompData = $a.u.null2Obj(_self.gridComp.getSelection().rowData);
						_self.deleteCompany();
					},
				},
			});
		},
		setupEditorComp : function(param) {
			var _self = this;
			
			_self.selectedCompData = $a.u.null2Obj(param);
			_self.compEditor = $a.t.mainEditor.render({
				title : $a.getMsg("lbl.orgCompMng"),
				buttons :[{
					name :$a.getMsg("lbl.save"), 
					callbackFunc : function() {
						_self.saveCompany();
					}
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
			_self.compEditor.showEditor({
				data : param
			});
			
		},
		closeEditor : function() {
			this.compEditor.hideEditor();
		},
		searchCompList : function(  ) {
			var _self = this;
			$a.send({
				url : $a.getDefaultUrl()+"/base/system/comp/list",
				type : "get",
				data : {
					siteId : "PUBLIC"
				},
				success : function(data) {
					_self.gridComp.reloadData(data);
				}
			});
		},
		saveCompany : function(){
			var _self = this;
			if( !_self.compEditor.isValidFormData() ) 
				return;
			
			var formData = $.extend(true, {},_self.selectedCompData , _self.compEditor.getValues());
			formData.siteId = "PUBLIC";
			$a.send({
				url : $a.getDefaultUrl()+"/base/system/comp",
				type : ( _self.selectedCompData == null )?"post":"put",
				data : formData,
				success : function(data) {
					$a.show.success($a.getMsg("msg.success.insert"));
					_self.searchCompList();
					_self.closeEditor();
					
				}
			});
		},
		deleteCompany : function() {
			var _self = this;
			if ( _self.selectedCompData == null ) {
				$a.print.alert($a.getMsg("msg.noSelectedData"));
				return;
			}
			 $a.print.confirm($a.getMsg("msg.confirm.delete"),function(){
				 $a.send({
					url  : $a.getDefaultUrl()+"/base/system/comp",
					type : "delete", 
					data : _self.selectedCompData,
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
					_self.btnSaveOrder.removeClass("btn-warning").hide();
				}
			});
		},
		
	});
	
	var deptApp = $a.ctl({
		render : function( obj ) {
			$.extend(true, this.pm, obj);
			this.rowBoxDept();
			
		},
		rowBoxDept : function() {
			var _self = this;
			var _editorParam = {
				title : $a.getMsg("lbl.orgDeptMng"),
				buttons    : [{ name : $a.getMsg("lbl.add"),
								id   : 'btn-dept-add',
								callbackFunc :function(){ 
									_self.setupEditorDept();
								},
							},{ name : $a.getMsg("lbl.save"),
								id   : 'btn-dept-save',
								callbackFunc : function(){
									 _self.updateOrder();
								},
							},{ name : $a.getMsg("lbl.origin"),
								id   : 'btn-dept-origin',
								callbackFunc : function() {
									_self.changeTreeData(false);
									_self.searchDeptList();
								},
							}],	
			};
			_self.rowBoxDept   = $a.t.rowBox.render(this.$el,_editorParam);
			_self.areaDeptTree = _self.rowBoxDept.elBoxBody ;
			var rowBoxBtns     = _self.rowBoxDept.elBoxBtn;
			_self.btnAddDept   = rowBoxBtns.find("#btn-dept-add");
			_self.btnSaveDept  = rowBoxBtns.find("#btn-dept-save");
			_self.btnOriginDept  = rowBoxBtns.find("#btn-dept-origin");
			_self.btnAddDept.hide();
			_self.btnSaveDept.addClass("btn-warning");
			_self.changeTreeData(false);
		},
		changeTreeData : function( isChanged ) {
			if( isChanged ) {
				this.btnOriginDept.show();
				this.btnSaveDept.show();
			} else {
				this.btnOriginDept.hide();
				this.btnSaveDept.hide();
			}
		},
		setCompanyInfo : function( selectedCompData ) {
			this.selectedCompData = selectedCompData;
			this.searchDeptList();
		},
		searchDeptList : function() {
			var _self = this;
			this.initializeDeptData();
			$a.send({
				url : $a.getDefaultUrl()+"/base/system/dept/list",
				type : "get",
				data : {
					compId : _self.selectedCompData.compId
				},
				success : function(data) {
					_self.makeTreeDept(data);
				}
			});
		},
		selectedTreeDept : function(treeDeptObj) {
			this.setupEditorDept(treeDeptObj);
		},
		makeTreeDept : function(data) {
			var _self = this;
			$a.t.tree.render(this.areaDeptTree,{
				data : data,
				height : 300,
				jsonKey : {
					id : "deptId",
		            name : "deptName", 
		            parentId : "parentDeptId",
		            rootId : _self.selectedCompData.compId,
				},
				clickAction : function( treeDeptObj ) {
					_self.selectedTreeDept(treeDeptObj);
				},
				rightActions : {
					addItem : {
						onClick : function(selectedDeptData) {
							$a.t.styleSwitcher.active(true);
							_self.setupEditorDept(selectedDeptData);
						}
					},
				},
				rightAfterActions : {
					moveUp : function( selectedDeptData ) {
						_self.changeTreeData(true);
					},
					moveDown : function( selectedDeptData ) {
						_self.changeTreeData(true);
					}
				},
			});
		},
		clearDeptData : function() {
			this.selectedPDeptData = null;
			this.selectedDeptData = null;
			this.areaDeptTree.empty();
			this.btnAddDept.hide();
			this.btnSaveDept.hide();
		},
		initializeDeptData: function() {
			this.btnAddDept.show();
			
			this.selectedPDeptData = this.selectedCompData;
			this.selectedPDeptData.deptName = this.selectedCompData.compName;
			this.selectedPDeptData.deptId = this.selectedCompData.compId;
		},
		setupEditorDept : function(param) {
			var _self = this;
			_self.selectedDeptData = $a.u.null2Obj(param);
			_self.deptEditor = $a.t.mainEditor.render({
				title : $a.getMsg("lbl.orgDeptMng"),
				buttons :[{
					name :$a.getMsg("lbl.save"), 
					callbackFunc : function() {
						_self.saveDept();
					}
				}],
				formList:[{ id:"parentDeptName", type:"text", label:$a.getMsg("lbl.parentDeptName"), 
					      	validation : {
					      		readOnly   : true
					      	}
				      	},{ id:"deptCode", type:"text", label:$a.getMsg("lbl.deptCode"), 
					      	validation : {
					      		required   : true,
					      		notKor     : true,
					      		maxLength  : 30
					      	},
					      },{ id:"deptName", type:"text", label:$a.getMsg("lbl.deptName"), 
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
			_self.deptEditor.showEditor(param);
			console.log(param);
			if (_self.selectedDeptData == null ) {
				_self.deptEditor.setValues({
					parentDeptName : _self.selectedCompData.deptName
				});
			} else {
				_self.deptEditor.setValues(_self.selectedDeptData);
			}
		},
		saveDept : function() {
			var _self = this;
			if( !_self.deptEditor.isValidFormData() ) 
				return;
			
			var formData = $.extend(true, {},_self.selectedDeptData , _self.deptEditor.getValues());
			formData.compId = _self.selectedCompData.compId;
			formData.pDeptId = _self.selectedPDeptData.deptId;
			$a.send({
				url : $a.getDefaultUrl()+"/base/system/dept",
				type : ( _self.selectedDeptData == null )?"post":"put",
				data : formData,
				success : function(data) {
					$a.show.success($a.getMsg("msg.success.insert"));
					_self.searchDeptList();
					_self.deptEditor.hideEditor();
					
				}
			});
		},
		deleteDept : function() {
			var _self = this;
			if ( _self.selectedDeptData == null ) {
				$a.print.alert($a.getMsg("msg.noSelectedData"));
				return;
			}
		},
	});
	
	var userApp = $a.ctl({
		render : function(obj){
			$.extend(true, this.pm, obj);
			this.areaUserSearch   = this.$el.find("#area-user-search");
			this.areaUserListGrid = this.$el.find("#area-users-list");
			this.makeUserSearch();
			this.makeUserListGrid();
		},
		makeUserSearch : function(){
			var _self = this;
			this.rowBoxUser = $a.t.search.render(this.areaUserSearch,{
				title      : $a.getMsg("lbl.orgUserMng"),
				buttons    : [],
				formList   : [{ id:"userName",    type:"text", label:$a.getMsg("lbl.userName")}],
				searchFunc : function() {
					_self.searchGroupCodeList();
				}
			});
		},
		makeUserListGrid : function() {
			this.gridUsers = $a.t.grid.render(this.areaUserListGrid, {
				height:150,
				colModel : [{ dataIndx : "userName",  title: $a.getMsg("lbl.userName"),    width:100, editable: false   },
				            { dataIndx : "userGrade",  title: $a.getMsg("lbl.userGrade"),    width:50, editable: false  },
				            { dataIndx : "userRole",  title: $a.getMsg("lbl.userRole"),    width:50, editable: false  }],
				rowClick : function( event, ui ) {
					var rowData = ui.rowData;
					_f.showEditor();
				},
				rowSelect: function( event, ui ) {
					
				}
			});
		},
	});
	
	return $a.ctl({
		render : function(obj) {
			var _self = this;
			$.extend(true, _self.pm, obj);
			_self.setupMainContents();
			_self.setupMainBar();
			_self.setupApplication();
		},
		setupMainBar : function(){
			var _self = this;
		},
		setupMainContents : function() {
			var tmpl = _.template(_tmpl);
			this.$el.html(tmpl());
			
			this.areaComp	  = this.$el.find("#area-comp");
			this.areaDept	  = this.$el.find("#area-dept");
			this.areaUsers	  = this.$el.find("#area-users");
		},
		setupApplication : function() {
			app = {};
			app.comp = new compApp(this.areaComp);
			app.dept = new deptApp(this.areaDept);
			app.user = new userApp(this.areaUsers);
			app.comp.render(this.pm);
			app.dept.render(this.pm);
			app.user.render(this.pm);
		},
	});
});
