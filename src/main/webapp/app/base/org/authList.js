define([ 'basicInfo'
         , 'text!app/base/org/authList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	var app = {};
	var authGroupTypeObj = $a.getConstants("AUTH_GROUP_TYPE");
	
	var authGroupApp = $a.ctl({
		render : function(obj) {
			$.extend(true, this.pm, obj);
			this.setupAuthGroup();
			this.searchAuthGroupListAndMakeTree();
			this.makeEditor();
		},
		setupAuthGroup : function() {
			
			var _self = this;
			_self.rowBoxAuthGroups = $a.t.rowBox.render(_self.$el, {
				title : $a.getMsg("lbl.authGroup"),
				buttons : [{
					name : $a.getMsg("lbl.add"),
					callbackFunc : function() {
						_self.showEditor();
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
					console.log(data);
					_self.makeTreeAuthGroup(data);
				}
			});
		},
		makeTreeAuthGroup : function(data) {
			var _self = this;
			_self.treeAuthGroup = $a.t.tree.render(_self.areaAuthGroupTree, {
				data : data,
				height : 100,
				jsonKey : {
					id : "authGroupId",
					name : "authGroupName",
					parentId : "parentAuthGroupId"
				},
				clickAction : function(treeDeptObj) {
					_self.selectedTreeMenu(treeDeptObj);
				},
				rootAddAction : function() {
					_self.showEditor();
				},
				rightActions : {
					addItem : {
						onClick : function(selectedItem) {
							var selectedDeptData = _self.treeMenu.getRowData(selectedItem);
							_self.showMenuEditor({
								parentMenuId : selectedDeptData.menuId
							});
						}
					},
					deleteItem : {
						onClick : function(selectedItem) {
							var selectedDeptData = _self.treeMenu.getRowData(selectedItem);
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
		makeEditor : function() {
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
						optionList : authGroupTypeList
					}
				},{ 
					id:"description", type:"textarea", label:$a.getMsg("lbl.description")
				}],
			});
		},
		showEditor : function(paramData) {
			var _self = this;
			var isInput = false;
			if ($a.u.isNull(paramData) || $a.u.isNull(paramData.authGroupId)) {
				isInput = true;
			}
			_self.editor.showEditor({
				data : paramData,
				isInputMode : isInput
			});
		},
		save : function(){
			var _self = this;
			var formData = _self.editor.getValues();
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
			console.log("this is auth grant.");
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
