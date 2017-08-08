define([ 'basicInfo'
         , 'text!app/base/org/authList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	var app = {};
	var authGroupTypeObj = $a.getConstants("AUTH_GROUP_TYPE");
	var authAssignTypeObj = $a.getConstants("AUTH_ASSIGN_TYPE");
	var positionList = $a.code.list("USER_POSITION_CODE");
	var gradeList = $a.code.list("USER_GRADE_CODE");
	
	var authGroupApp = $a.ctl({
		render : function(obj) {
			$.extend(true, this.pm, obj);
			this.setupAuthGroup();
			this.searchAuthGroupListAndMakeTree();
		},
		setupAuthGroup : function() {
			
			var _self = this;
			_self.rowBoxAuthGroups = $a.t.rowBox.render(_self.$el, {
				title : $a.getMsg("lbl.authGroup"),
				buttons : [{
					name : $a.getMsg("lbl.add"),
					callbackFunc : function() {
						_self.makeAndShowEditor();
					},
				}]
			});
			_self.areaAuthGroupTree = _self.rowBoxAuthGroups.elBoxBody;
		},
		searchAuthGroupListAndMakeTree : function() {
			var _self = this;
			$a.send({
				url : $a.getDefaultUrl() + "/base/org/auth/group/list",
				type : "get",
				data : {
					compId : "PUBLIC"
				},
				success : function(data) {
					_self.makeTreeAuthGroup(data);
				}
			});
		},
		makeTreeAuthGroup : function(data) {
			var _self = this;
			_self.treeAuthGroup = $a.t.tree.render(_self.areaAuthGroupTree, {
				data : data,
				height : 70,
				jsonKey : {
					id : "authGroupId",
					name : "authGroupName",
					parentId : "parentAuthGroupId"
				},
				clickAction : function(treeAuthGroupObj) {
					app.authGrant.selectedTreeAuthGrant(treeAuthGroupObj);
				},
				rootAddAction : function() {
					_self.makeAndShowEditor();
				},
				rightActions : {
					addItem : {
						onClick : function(selectedItem) {
							var selectedData = _self.treeAuthGroup.getRowData(selectedItem);
							_self.makeAndShowEditor({
								parentAuthGroupId : selectedData.authGroupId
							});
						}
					},
					deleteItem : {
						onClick : function(selectedItem) {
							var selectedDeptData = _self.treeAuthGroup.getRowData(selectedItem);
							_self.deleteMenu(selectedDeptData);
						}
					}
				},
				rightAfterActions : {
					moveUp : function(selectedDeptData) {
						_self.changeTreeData(true);
					},
					moveDown : function(selectedDeptData) {
						_self.changeTreeData(true);
					}
				},
			});
		},
		toArrayAuthGroupType : function() {
			
			return  [{
				code : authGroupTypeObj.AUTH_GROUP_DIRECTORY,
				value : $a.getMsg("AUTH_GROUP_TYPE_"+authGroupTypeObj.AUTH_GROUP_DIRECTORY)
			},{
				code : authGroupTypeObj.AUTH_GROUP,
				value : $a.getMsg("AUTH_GROUP_TYPE_"+authGroupTypeObj.AUTH_GROUP)
				
			}];
		},
		makeAndShowEditor : function(paramData) {
			var _self = this;
			var authGroupTypeList = _self.toArrayAuthGroupType();
			_self.editor = $a.t.mainEditor.render({
				title : $a.getMsg("lbl.authGroup"),
				buttons :[{
					name :$a.getMsg("lbl.save"), 
					callbackFunc : function() {
						_self.save();
					}
				}],
				formList:[{ 
					id:"authGroupId",  type:"text", label:$a.getMsg("lbl.authGroupId"), 
		            validation : {
		            	readOnly : true
					},
		        },{ 
		        	id:"parentAuthGroupId",  type:"text", label:$a.getMsg("lbl.parentAuthGroupId"), 
		        	validation : {
		        		readOnly : true
		        	},
		        },{ 
		        	id:"authGroupName", type:"text", label:$a.getMsg("lbl.authGroupName"), 
		        	validation : {
			      		required   : true,
			      		maxLength  : 100,
			      		minLength  : 6
			      	},
				},{ 
					id:"authGroupType", type:"select", label:$a.getMsg("lbl.authGroupType"),
					typeOpt : {
						optionList : authGroupTypeList,
						blankOption:false
					}
				},{ 
					id:"description", type:"textarea", label:$a.getMsg("lbl.description")
				}],
			});

			_self.editorForms = _self.editor.getForms();
			_self.showEditor(paramData);
		},
		showEditor : function(paramData) {
			var _self = this;
			var param = {
				data : $.extend(true,{},paramData)
			};
			_self.editorForms.authGroupType.readOnly(false);
			
			if ($a.u.isNull(paramData) || $a.u.isNull(paramData.authGroupId)) {
				param.isInputMode = true;
				param.data.authGroupType = authGroupTypeObj.AUTH_GROUP;
			}
			
			if ($a.u.isNull(paramData) ) {
				param.data.authGroupType = authGroupTypeObj.AUTH_GROUP_DIRECTORY;
				_self.editorForms.authGroupType.readOnly(true);
			}
			
			_self.editor.showEditor(param);
		},
		save : function(){
			var _self = this;
			var formData = _self.editor.getValues();
			formData.compId = "PUBLIC";
			$a.send({
				url : $a.getDefaultUrl() + "/base/org/auth/group",
				method : (formData.authGroupId == "")?"post":"put",
				data : formData,
				success : function(data){
					$a.show.success($a.getMsg("msg.success.insert"));
					_self.searchAuthGroupListAndMakeTree();
				}		
			});
		},
	});
	
	var authGrantApp = $a.ctl({
		render : function(obj) {
			$.extend(true, this.pm, obj);
			this.areaGrantMembers = this.$el.find("#area-auth-grant-members-header");
			this.areaGrantMenus = this.$el.find("#area-auth-grant-menus-header");
			this.areaGrantMembersGrid = this.$el.find("#area-auth-grant-members-grid");
			this.areaGrantMenusGrid = this.$el.find("#area-auth-grant-menus-grid");
			this.setupAuthGrant();
			this.makeAuthGrantListGrid();
			this.makeAuthMenuListGrid();
		},
		setupAuthGrant : function() {
			var _self = this;
			_self.rowBoxAuthGrants = $a.t.rowBox.render(_self.areaGrantMembers, {
				title : $a.getMsg("lbl.authGrant"),
				buttons : [{
					name : $a.getMsg("lbl.add"),
					id : "btnAddAuthGrant",
					callbackFunc : function() {
						_self.makeAndShowEditor()
					},
				}]
			});
			_self.rowBoxAuthMenus = $a.t.rowBox.render(_self.areaGrantMenus, {
				title : $a.getMsg("lbl.authGrantTarget"),
				buttons : [{
					name : $a.getMsg("lbl.add"),
					id : "btnAddAuthTarget",
					callbackFunc : function() {
						_self.showMembers();
					},
				}]
			});
			_self.rowBoxAuthGrants.elBoxBody.remove();
			_self.rowBoxAuthMenus.elBoxBody.remove();
			_self.btnAddAuthGrant = _self.rowBoxAuthGrants.elBoxBtn.find("#btnAddAuthGrant");
			_self.btnAddAuthTargt = _self.rowBoxAuthMenus.elBoxBtn.find("#btnAddAuthTarget");
			_self.showHideButtons(false);
		},
		makeAuthGrantListGrid : function() {
			var _self = this;
			_self.gridAuthAssign = $a.t.grid.render(_self.areaGrantMembersGrid, {
				height : 220,
				resizeHeight : false,
				colModel : [ {
					dataIndx : "authGrantType",
					title : $a.getMsg("lbl.authGroupType"),
					width : 50,
					editable : false
				}, {
					dataIndx : "authAssignId",
					title : $a.getMsg("lbl.authAssignName"),
					width : 100,
					editable : false
				} ],
				rowClick : function(event, ui) {
					var rowData = ui.rowData;
					_self.searchUserDetail(rowData);
				},
				rowSelect : function(event, ui) {

				},
				rightActions : {
					deleteItem : {
						onClick : function(selectedItem) {
							var selectedData = $a.u.null2Obj(_self.gridUsers.getSelection().rowData);
							_self.deleteMember(selectedData);
						}
					}
				}
			});
		},
		makeAuthMenuListGrid : function() {
			var _self = this;
			_self.gridAuthMenu = $a.t.grid.render(_self.areaGrantMenusGrid, {
				height : 370,
				colModel : [ {
					dataIndx : "userName",
					title : $a.getMsg("lbl.userName"),
					width : 100,
					editable : false
				}, {
					dataIndx : "userGrade",
					title : $a.getMsg("lbl.userGrade"),
					width : 50,
					editable : false
				}, {
					dataIndx : "userRole",
					title : $a.getMsg("lbl.userRole"),
					width : 50,
					editable : false
				} ],
				rowClick : function(event, ui) {
					var rowData = ui.rowData;
					_self.searchUserDetail(rowData);
				},
				rowSelect : function(event, ui) {

				},
				rightActions : {
					deleteItem : {
						onClick : function(selectedItem) {
							var selectedData = $a.u.null2Obj(_self.gridUsers.getSelection().rowData);
							_self.deleteMember(selectedData);
						}
					}
				}
			});
		},
		showMembers : function() {
			$a.t.mainMembers.reloadShow({
				dblClickAction : function(obj) {
					_self.addMembers(obj);
				}
			});
		},
		addMembers : function(memObj) {
			var _self = this;
			if (memObj.group) {
				return;
			}
			
			console.log("aaaaa");

//			if (app.dept.selectedDeptData == null) {
//				$a.print.alert($a.getMsg("msg.noSelectedDeptData"));
//				return;
//			}
//
//			$a.send({
//				url : $a.getDefaultUrl() + "/base/org/members",
//				type : "post",
//				data : {
//					deptId : app.dept.selectedDeptData.deptId,
//					userId : memObj.memberId
//				},
//				success : function(data) {
//					$a.show.success($a.getMsg("msg.success.insert"));
//					_self.searchUserListByDept();
//				}
//			});
		},
		selectedTreeAuthGrant : function(authGroupObj) {
			var _self = this;
			_self.selectedAuthGroup = authGroupObj;
			_self.searchAuthAssignList(authGroupObj);
			_self.showHideButtons(true);
		},
		showHideButtons : function(isShow) {
			var _self = this;
			if ( isShow ) {
				_self.btnAddAuthGrant.show();
				_self.btnAddAuthTargt.show();
				_self.btnAddAuthGrant.removeClass("disabled");
				_self.btnAddAuthTargt.removeClass("disabled");
			} else {
				_self.btnAddAuthGrant.hide();
				_self.btnAddAuthTargt.hide();
				_self.btnAddAuthGrant.addClass("disabled");
				_self.btnAddAuthTargt.addClass("disabled");
			}
		},
		searchAuthAssignList : function(authGroupObj) {
			var _self = this;
			$a.send({
				url : $a.getDefaultUrl() + "/base/org/auth/grant/list",
				type : "get",
				data : {
					authGroupId : authGroupObj.authGroupId
				},
				success : function(data) {
					_self.gridAuthAssign.reloadData(data);
				}
			});
		},
		toArrayAuthAssignType : function() {
			var rtnList = [];
			for(var key in authAssignTypeObj) {
				rtnList.push({
					code : authAssignTypeObj[key],
					value : $a.getMsg("AUTH_ASSIGN_"+authAssignTypeObj[key])
				});
			}
			return rtnList;
		},
		makeAndShowEditor : function(paramData) {
			var _self = this;
			var authAssignTypeList = _self.toArrayAuthAssignType();
			_self.editor = $a.t.mainEditor.render({
				title : $a.getMsg("lbl.authGrant"),
				buttons :[{
					name :$a.getMsg("lbl.save"), 
					callbackFunc : function() {
						_self.saveAuthGrantId();
					}
				}],
				formList:[{ 
					id:"authAssignType",  type:"select", label:$a.getMsg("lbl.authAssignType"), 
		            validation : {
		            	required : true
					},
					typeOpt : {
						optionList : authAssignTypeList,
						blankOption:false,
						callbackChange : function() {
							_self.changeAssignType();
						}
					}
		        }, 
		        _self.getAuthMemberIdObj(authAssignTypeList[0].code),
		        {
		        	id : "description",
					type : "textarea",
					label : $a.getMsg("lbl.description"),
					typeOpt : {
						rows : 5
					},
		        }] 
			});

			_self.editorForms = _self.editor.getForms();
			_self.editor.showEditor(paramData);
		},
		getAuthMemberIdObj : function(authAssignType) {
			var _self = this;
			var formObj = {
				id : "authMemberId" , label : $a.getMsg("lbl.authMemberId"),
				validation : {
					required : true
				}
			};

			if( authAssignType == authAssignTypeObj.AUTH_ASSIGN_USER
					|| authAssignType == authAssignTypeObj.AUTH_ASSIGN_DEPT ) {
				formObj.type = "search";
				formObj.typeOpt = {
					searchFunc : function() {
						$a.t.mainMembers.reloadShow({
							dblClickAction : function(obj) {
								_self.setAuthMembers(obj);
							}
						});
					},
					callbackFunc : null,	
				};
			} else if (authAssignType == authAssignTypeObj.AUTH_ASSIGN_ROLE) {
				formObj.type = "select";
				formObj.typeOpt = {
					optionList : positionList
				};
			} else if (authAssignType == authAssignTypeObj.AUTH_ASSIGN_GRADE) {
				formObj.type = "select";
				formObj.typeOpt = {
					optionList :gradeList
				};
			}
			console.log(positionList);
			return formObj;
		},
		changeAssignType : function() {
			var _self = this;
			var values = _self.editor.getValues();
			var chgFormObj = _self.getAuthMemberIdObj(values.authAssignType);
			_self.editorForms.authMemberId = $a.t.makeForm.changeFormEl(_self.editorForms.authMemberId.area,chgFormObj);
			_self.editor.changeFormObj("authMemberId", chgFormObj);
		},
		setAuthMembers : function(memberObj) {
			var _self = this;
			var values = _self.editor.getValues();
			_self.editor.setValue(_self.getAuthMemberIdObj(values.authAssignType),{
				value : memberObj.memberId,
				text : memberObj.memberName
			});
		},
		saveAuthGrantId : function() {
			var _self = this;
			if ($a.u.isNull(_self.selectedAuthGroup)) {
				$a.getMsg("msg.noSelectedData");
				return;
			}
			if( !_self.editor.isValidFormData() ) {
				return;
			}	
			var paramData = _self.editor.getValues();
			paramData.authGroupId = _self.selectedAuthGroup.authGroupId;
			$a.send({
				url : $a.getDefaultUrl() + "/base/org/auth/grant",
				type : "POST",
				data : paramData,
				success : function() {
					$a.show.success($a.getMsg("msg.success.insert"));
					_self.searchAuthAssignList(_self.selectedAuthGroup);
				}
			});
		},
	});
	
	return $a.ctl({
		render : function(obj) {
			$.extend(true, this.pm, obj);
			this.setupMainContents();
			this.setupMainBar();
			this.setupApplication();
		},
		setupMainBar : function(){
			var _self = this;
		},
		setupMainContents : function() {
			var tmpl = _.template(_tmpl);
			this.$el.html(tmpl());
			this.areaAuthGroup = this.$el.find("#area-auth-group-list");
			this.areaAuthGrant = this.$el.find("#area-auth-grant-list"); 
		},
		setupApplication : function() {
			app = {};
			app.authGroup = new authGroupApp(this.areaAuthGroup);
			app.authGrant = new authGrantApp(this.areaAuthGrant);
			app.authGroup.render(this.pm);
			app.authGrant.render(this.pm);
		},
	});

});
