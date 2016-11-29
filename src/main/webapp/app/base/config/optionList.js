define([ 'abstractView', 'basicInfo'
         , 'text!base/config/optionList.html'
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
					}
				});
				$a.t.mainEditor.showEditor();
				$a.t.mainEditor.getContents().html("this is options..");
			},

			makeSearchArea : function() {
				
				var searchCategory = [{ id:"category", type:"select", blankOption:true, label:{
						text:$a.getMsg("lbl.category")
					},
				},{ id:"optionValue",  type:"text",  label:{
						text:$a.getMsg("lbl.value")
					}
				}];
				
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
					title    : "임시 그리드",
					colModel : [{ dataIndx : "category", title: "Category", width: "20%", editable: false   },
					            { dataIndx : "optionId", title: "Id", width: "20%", editable: false  },
					            { dataIndx : "optionCode", title: "Code", width: "30%", editable: false  },
					            { dataIndx : "optionValue", title: "Value", width: "30%", editable: false }]
				});
				
				console.log(_els.optionGrid);
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
			_els.areaGridOption = thisEl.find("#grid-order-list");
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
