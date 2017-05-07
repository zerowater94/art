define([ 'basicInfo'
         , 'text!app/base/org/userList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	var app = {};
	
	var userApp = $a.ctl({
		render : function(obj){
			$.extend(true, this.pm, obj);
			this.areaUserSearch   = this.$el.find("#area-user-search");
			this.areaUserListGrid = this.$el.find("#area-users-list");
			this.makeUserSearch();
			this.makeUserListGrid();
			this.makeEditor();
		},
		makeUserSearch : function(){
			var _self = this;
			var viewParam = {
				title      : $a.getMsg("lbl.orgUserMng"),
				buttons    : [{ name : $a.getMsg("lbl.add"),
								id   : 'btn-comp-add',
								callbackFunc :function(){ 
									_self.showEditor();
								},
							}],
				formList   : [{ id:"userName",    type:"text", label:$a.getMsg("lbl.userName")}],
				searchFunc : function() {
					_self.searchUserList();
				}	
			};
			this.rowBoxUser = $a.t.search.render(this.areaUserSearch,viewParam);
		},
		gridRender:{
			userStatus : function(ui){
            	if ($a.u.isNull(ui.cellData)) {
            		return "";
            	} else {
            		return $a.getMsg("USER_STATUS_"+ui.cellData);
            	}	
            }
		},
		makeUserListGrid : function() {
			var _self = this;
			var gridParam = {
				height:150,
				colModel : [{dataIndx : "loginId",     title: $a.getMsg("lbl.loginId"),      width: 100, editable: false},
				            {dataIndx : "userName",    title: $a.getMsg("lbl.userName"),     width: 100, editable: false},
				            {dataIndx : "userNickName",title: $a.getMsg("lbl.userNickName"), width: 200, editable: false  },
				            {dataIndx : "userStatus",  title: $a.getMsg("lbl.userStatus"),   width: 100, editable: false, 
				             render:_self.gridRender.userStatus} ],
				rowClick : function( event, ui ) {
					var rowData = ui.rowData;
					_self.showEditor(rowData);
				},
				rowSelect: function( event, ui ) {
					
				}	
			};
			this.gridUsers = $a.t.grid.render(this.areaUserListGrid, gridParam);
		},
		makeEditor : function() {
			var _self = this;
			var param = {
				title : $a.getMsg("lbl.orgUserMng"),
				buttons :[{
					name :$a.getMsg("lbl.save"), 
					callbackFunc : function() {
						_self.saveUser();
					}
				}],
				formList:[{ id:"loginId",  type:"text", label:$a.getMsg("lbl.loginId"), 
		                	validation : {
					        	required  : true,
					      		maxLength : 30,
					      		minLength : 8,
					      		notKor    : false
					        },
					        addedBtn : {name :$a.getMsg("lbl.checkDuplicated")+'<i class="fa fa-check"></i>',btnCls:"btn-default btn-xs m-l-10", id:'check-loginid'
					        	, callbackFunc : function() {
					        		_self.checkDupLoginId();
					        	} }
		                  },{ id:"userName", type:"text", label:$a.getMsg("lbl.userName"), 
					      	validation : {
					      		required   : true,
					      		maxLength  : 100,
					      		minLength  : 6
					      	},
					      },{ id:"userNickName", type:"text", label:$a.getMsg("lbl.userNickName"), 
					          validation : {
					        	maxLength : 100
					        },
					      },
		                  { id:"description", type:"textarea", label:$a.getMsg("lbl.description"),
		                	typeOpt : {
		                		rows : 5
		                	},
		                  },
		                  { id:"deptList", type:"sortable", label:$a.getMsg("lbl.ownDept"), typeOpt : {
		                	  jsonReader : {
		                		  id : "deptId",
		                		  value : "deptName"
		                	  }
		                  } },
		                  { id:"etcInfo", type:"etc-info", label:$a.getMsg("lbl.etcInfo"), }
                ],
			};

			_self.editor = $a.t.mainEditor.render(param);
			_self.editorForms = _self.editor.getForms();
			_self.btnCheckLoginId = _self.editorForms.loginId.area.find("#check-loginid");
			_self.formLoginId = _self.editorForms.loginId.area.find("#loginId");
		},
		showEditor : function(userObj) {
			var _self = this;
			_self.editor.showEditor({
				data : userObj
			});
			
			if ( $a.u.isNull(userObj) ) {
				_self.selectedUserData = null;
				_self.btnCheckLoginId.show();
				_self.formLoginId.removeClass("disabled");
			} else {
				_self.selectedUserData = userObj;
				_self.btnCheckLoginId.hide();
				_self.formLoginId.addClass("disabled");
			}
		},
		addEditorActions : function() {
			var _self = this;
			_self.btnCheckLoginId.addClass("disabled");
			_self.formLoginId.off().keyup(function(e){
				$a.u.inputNoneKor($(this));
				if( $(this).val().length < 8 ) {
					_self.btnCheckLoginId.addClass("disabled");
				} else {
					_self.btnCheckLoginId.removeClass("disabled");
				}
			});
			
		},
		checkDupLoginId : function() {
			var _self = this;
			var elLoginId = _self.editorForms.loginId.area.find("#loginId");
			if ( $a.u.isEmpty(elLoginId.val()) ) {
				return;
			}
			var param = {
				url : $a.getDefaultUrl()+"/base/org/user/loginid/aaaaa",
				type : "get",
				data : {
					siteId : "PUBLIC"
				},
				success : function(data) {
					
					if (!$a.u.isNull(data)) {
						$a.print.alert($a.getMsg("msg.existDuplicateData"), function(){
							elLoginId.val("mmmmm");
						});
						_self.editorForms.loginId.area.val("");
					} else {
						$a.print.alert($a.getMsg("msg.canUse"), function(){
							elLoginId.val("mmmmm");
						});
					}
				}
			};
			$a.send(param);
		},
		searchUserList : function() {
			var _self = this;
			$a.send({
				url : $a.getDefaultUrl()+"/base/org/user/list",
				type : "get",
				data : {
					siteId : "PUBLIC"
				},
				success : function(data) {
					_self.gridUsers.reloadData(data);
				}
			});
		},
		saveUser : function() {
			var _self = this;
			if( !_self.editor.isValidFormData() ) 
				return;
			var isUpdate = !$a.u.isNull(_self.selectedUserData);
			var formData = _self.editor.getValues();
			formData.siteId = "PUBLIC";
			if (isUpdate) {
				formData.userId = _self.selectedUserData.userId;
			}

			$a.send({
				url : $a.getDefaultUrl()+"/base/org/user",
				type : isUpdate?"put":"post",
				data : formData,
				success : function(data) {
					$a.show.success($a.getMsg("msg.success.insert"));
					_self.searchUserList();
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
			
			this.areaUsers	  = this.$el.find("#area-users");
		},
		setupApplication : function() {
			app = {};
			app.user = new userApp(this.areaUsers);
			app.user.render(this.pm);
			app.user.addEditorActions();
			app.user.searchUserList();
		},
	});
});
