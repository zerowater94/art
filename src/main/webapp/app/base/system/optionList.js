define([ 'abstractView', 'basicInfo'
         , 'text!base/system/optionList.html'
       ], function ( AbstractView , $a, _tmpl) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		
		var _els = {
				
		} ; // elements
		
		
		var _f = {
			setTitle : function(){

				$a.t.mainBar.addButton({ 
					name :$a.getMsg("lbl.add"), 
					callbackFunc : _f.showEditor 
			    });
			},
			showEditor : function(e) {
				
				$a.t.mainEditor.render({
					title : $a.getMsg("lbl.addOption"),
					callBackHide : function() {
						$(e.target).show();
					},
					callBackShow : function() {
						$(e.target).hide();
					},
					formList:[{ id:"category", type:"select", blankOption:true, label:$a.getMsg("lbl.category"), optionList:[{code:"a", value:"옵션1"},{code:"b", value:"옵션2"}]},
		                      { id:"optionValue",  type:"text",  label:$a.getMsg("lbl.value")},
		                      { id:"optionValue",  type:"text",  label:$a.getMsg("lbl.value")},
		                      { id:"optionValue",  type:"textarea",  label:$a.getMsg("lbl.value")}],
				});
				$a.t.mainEditor.showEditor();
			},

			makeSearchArea : function() {
				
				var searchCategory = [{ id:"category", type:"select", blankOption:true, label:$a.getMsg("lbl.category")},
				                      { id:"optionValue",  type:"text",  label:$a.getMsg("lbl.value")}];
				
				_els.searhcForm = $a.t.search.render(_els.areaSearch,{
					formList   : searchCategory,
					searchFunc : _f.searchOptionList
				});
			},
			searchOptionList : function() {
				
				$a.send({
					url : $a.getDefaultUrl()+"/base/config/option/list",
					type : "get",
					data : {
						
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
			makeGrid : function() {
				
				_els.optionGrid = $a.t.grid.render(_els.areaGridOption, {
					colModel : [{ dataIndex : "category", title: "Category", width: "20%", editable: false   },
					            { dataIndex : "optionId", title: "Id", width: "20%", editable: false  },
					            { dataIndex : "optionCode", title: "Code", width: "30%", editable: false  },
					            { dataIndex : "optionValue", title: "Value", width: "30%", editable: false }]
				});
				
				_f.searchOptionList();
			}
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		_this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
			
			var tmpl = _.template(_tmpl);
			thisEl.html(tmpl());
			
			_els.areaSearch     = thisEl.find("#area-search");
			_els.areaGridOption = thisEl.find("#grid-list");
		};
		
		
		
		_this.reloadContents = function() {
			
			_f.setTitle();
			_f.makeSearchArea();
			_f.makeGrid();
			
			_f.searchOptionList();
		};
		
		_this.returns = {
			
		};
		
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});
