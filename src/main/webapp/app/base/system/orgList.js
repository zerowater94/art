define([ 'basicInfo'
         , 'text!app/base/system/orgList.html'
       ], function ( $a, _tmpl) {
	
	'use strict';
	
	var aaa = {
			bb : "BB"
	};
	
	var funcs = function( thisEl ) {
		
		var _this = {};
		var _pm  = {} ; // param
		var _els = {}; // elements
		var _vws = {};  // view or widget
		var _dts = {};

		var _f = {
			createPage : function() {
				var tmpl = _.template(_tmpl);
				thisEl.html(tmpl());
				
				_els.areaOrg		 = thisEl.find("#area-org");
				_els.areaUsers		 = thisEl.find("#area-users");
				_els.areaOrgComp 	 = _els.areaOrg.find("#area-org-comp");
				_els.areaOrgDept	 = _els.areaOrg.find("#area-org-dept");
				_els.areaUsersSearch = _els.areaUsers.find("#area-user-search");
				_els.areaUsersList   = _els.areaUsers.find("#area-users-list");
			},
			setupMainBar : function(){
				
			},
			setupOrg : function() {

				$a.t.rowBox.render(_els.areaOrgComp, {
					title : $a.getMsg("lbl.orgCompMng"),
					buttons    : [{ name : $a.getMsg("lbl.add"),
									id   : 'btn-comp-add',
									callbackFunc : function(){
										_f.showInputEditor({
											codeType : _dts.codeTypeObj.GROUP,
											codeOrd  : 0,
										});
									},
								},{ name : $a.getMsg("lbl.delete"),
									id   : 'btn-comp-delete',
									callbackFunc : _f.deleteCodeGroup,
								},],
				} );
				
				$a.t.rowBox.render(_els.areaOrgDept, {
					title : $a.getMsg("lbl.orgDeptMng"),
				} );
			},
			setupUserSearch : function() {
				_vws.searchUser = $a.t.search.render(_els.areaUsersSearch,{
					title      : $a.getMsg("lbl.orgUserMng"),
					buttons    : [],
					formList   : [{ id:"userName",    type:"text", label:$a.getMsg("lbl.userName")}],
					searchFunc : _f.searchGroupCodeList
				});
			},
			makeGrid : function() {
				_vws.gridUsers = $a.t.grid.render(_els.areaUsersList, {
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
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		_this.render = function(obj) {
			$.extend( true, _pm ,obj);
			_f.createPage();
			_f.setupMainBar();
			_f.setupOrg();
			_f.setupUserSearch();
			_f.makeGrid();
		};
		
		return _this;
	};
	
	
	return funcs;

});
