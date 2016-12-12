define([ 'basicInfo'
         , 'text!base/system/menuList.html'
       ], function ( $a, _tmpl) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		
		var _els = {
				
		} ; // elements
		
		var _f = {
		    createPage	: function() {
		    	
		    	var tmpl = _.template(_tmpl);
				thisEl.html(tmpl());
				
				_els.areaSearch     = thisEl.find("#area-search");
				_els.areaListGrid = thisEl.find("#grid-list");
		    },
			setTitle : function(){

				$a.t.mainBar.addButton({ 
					name :$a.getMsg("lbl.add"), 
					callbackFunc : _f.showEditor 
			    });
			},
			showEditor : function(e) {
				
				$a.t.mainEditor.render({
					title : "메뉴 추가",
					callBackHide : function() {
						$(e.target).show();
					},
					callBackShow : function() {
						$(e.target).hide();
					}
				});
				$a.t.mainEditor.getMainBody().html("this is menu..");
				$a.t.mainEditor.showEditor();
			},
			makeSearchArea : function() {
				
				_els.searhcForm = $a.t.search.render(_els.areaSearch,{
					formList   : [{ id:"category", type:"select", blankOption:true, label:$a.getMsg("lbl.category")},
			                      { id:"optionValue",  type:"text",  label:$a.getMsg("lbl.value")}],
					searchFunc : _f.searchData
				});
			},
			makeGrid : function() {
				
				_els.gridList = $a.t.grid.render(_els.areaListGrid, {
					colModel : [{ dataIndx : "category", title: "Menu Id", width: "20%", editable: false   },
					            { dataIndx : "optionId", title: "Menu Name", width: "20%", editable: false  },
					            { dataIndx : "optionCode", title: "Menu Url", width: "30%", editable: false  },
					            { dataIndx : "optionValue", title: "Menu Desc", width: "30%", editable: false }]
				});
				
			}
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		_this.render = function(obj){
			$.extend( true, _pm ,obj);
			_f.createPage();
			_f.setTitle();
			_f.makeSearchArea();
			_f.makeGrid();
		};
		return _this;
	};
	
	return _funcs;

});
