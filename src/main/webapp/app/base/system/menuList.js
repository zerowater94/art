define([ 'basicInfo'
         , 'text!app/base/system/menuList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	var app = {};
	
	var menuApp = $a.ctl({
		render : function(obj) {
			$.extend(true, this.pm, obj);
			this.setupArea();
			this.setupMenuArea();
			this.makeEditor();
			this.searchMenuListAndMakeTree();
		},
		setupArea : function() {
			this.areaMenus	  = this.$el.find("#area-menu-list");
			this.areaMenuDetail = this.$el.find("#area-menu-detail");
		},
		setupMenuArea : function() {
			var _self = this;
			_self.rowBoxMenus = $a.t.rowBox.render(_self.areaMenus, {
				title : $a.getMsg("lbl.menuMng"),
				buttons : [{
					name : $a.getMsg("lbl.add"),
					callbackFunc : function() {
						_self.showMenuEditor();
					},
				}]
			});
			_self.areaMenuTree = _self.rowBoxMenus.elBoxBody;
		},
		searchMenuListAndMakeTree : function() {
			var _self = this;
			$a.send({
				url : $a.getDefaultUrl() + "/base/system/menu/list",
				type : "get",
				data : {},
				success : function(data) {
					_self.makeTreeMenu(data);
				}
			});
		},
		convertManuDisplayName : function(treeData) {
			var obj;
			for (var idx = 0; idx < treeData.length; idx++) {
				obj = treeData[idx];
				obj.menuDisplayName = obj.menuName
				if (!$a.u.isNull(obj.menuUrl) ) {
					obj.menuDisplayName += " - [ "+obj.menuUrl+" ]";
				}
			}
		},
		makeTreeMenu : function(data) {
			var _self = this;
			_self.convertManuDisplayName(data);
			_self.treeMenu = $a.t.tree.render(this.areaMenuTree, {
				data : data,
				height : 100,
				jsonKey : {
					id : "menuId",
					name : "menuDisplayName",
					parentId : "parentMenuId",
				},
				clickAction : function(treeDeptObj) {
					_self.selectedTreeMenu(treeDeptObj);
				},
				rootAddAction : function() {
					_self.showMenuEditor();
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
		makeEditor : function() {
			var _self = this;
			_self.editor = $a.t.mainEditor.render({
				title : $a.getMsg("lbl.orgUserMng"),
				buttons :[{
					name :$a.getMsg("lbl.save"), 
					callbackFunc : function() {
						_self.saveMenu();
					}
				}],
				formList:[{ 
					id:"menuId",  type:"text", label:$a.getMsg("lbl.menuId"), 
		            validation : {
		            	readOnly : true
					},
		        },{ 
		        	id:"parentMenuId",  type:"text", label:$a.getMsg("lbl.parentMenuId"), 
		        	validation : {
		        		readOnly : true
		        	},
		        },{ 
		        	id:"menuName", type:"text", label:$a.getMsg("lbl.menuName"), 
		        	validation : {
			      		required   : true,
			      		maxLength  : 100,
			      		minLength  : 6
			      	},
				},{ 
					id:"menuUrl", type:"text", label:$a.getMsg("lbl.menuUrl")
				},{ 
					id:"menuOrder", type:"seelct", label:$a.getMsg("lbl.order")
				}],
			});
		},
		selectedTreeMenu : function(treeData) {
			this.selectedMenuData = treeData;
			this.showMenuEditor(treeData);
		},
		showMenuEditor : function(paramData) {
			var _self = this;
			var isInput = false;
			if ($a.u.isNull(paramData) || $a.u.isNull(paramData.menuId)) {
				isInput = true;
			}
			console.log(paramData);
			_self.editor.showEditor({
				data : paramData,
				isInputMode : isInput
			});
		},
		saveMenu : function(){
			var _self = this;
			var formData = _self.editor.getValues();
			$a.send({
				url : $a.getDefaultUrl() + "/base/system/menu",
				method : (formData.menuId == "")?"post":"put",
				data : formData,
				success : function(data){
					$a.show.success($a.getMsg("msg.success.insert"));
					_self.searchMenuListAndMakeTree();
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
		},
		setupApplication : function() {
			app = {};
			app.menu = new menuApp(this.$el);
			app.menu.render(this.pm);
		},
	});

});
