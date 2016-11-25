define([ 'abstractView', 'basicInfo', 'basicUtil', 'basicTmpl'
       ], function ( AbstractView , BasicInfo, BasicUtil, BasicTmpl) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		
		var _els = {
				
		} ; // elements
		
		var _f = {
			setTitle : function(){

				BasicTmpl.mainBar.addButton({ 
					name :BasicInfo.getMsg("lbl.add"), 
					callbackFunc : _f.showEditor 
			    });
			},
			showEditor : function(e) {

				BasicTmpl.mainEditor.render({
					title : "옵션 추가",
					callBackHide : function() {
						$(e.target).show();
					},
					callBackShow : function() {
						$(e.target).hide();
					}
				});
				BasicTmpl.mainEditor.getContents().html("this is options..");
				
				BasicTmpl.mainEditor.showEditor();
			},
			makeGrid : function() {
				
				BasicTmpl.addRow.render(thisEl, {id:'grid-order-list'});
				_els.dataGrid = BasicTmpl.grid.render(thisEl.find("#grid-order-list"), {
					title    : "임시 그리드",
					colModel : [{ dataIndx : 0, title: "Rank", width: "20%", dataType: "integer", editable: false   },
					            { dataIndx : 1, title: "Company", width: "20%", dataType: "string", editable: false  },
					            { dataIndx : 2, title: "Revenues ($ millions)", width: "30%", dataType: "float", align: "right", editable: false  },
					            { dataIndx : 3, title: "Profits ($ millions)", width: "30%", dataType: "float", align: "right", editable: false }],
					dataModel: {
						data : [[1, 'Exxon Mobil', '339,938.0', '36,130.0'],
					            [2, 'Wal-Mart Stores', '315,654.0', '11,231.0'],
								[3, 'Royal Dutch Shell', '306,731.0', '25,311.0'],
								[4, 'BP', '267,600.0', '22,341.0'],
								[5, 'General Motors', '192,604.0', '-10,567.0'],
								[6, 'Chevron', '189,481.0', '14,099.0'],
								[7, 'DaimlerChrysler', '186,106.3', '3,536.3'],
								[8, 'Toyota Motor', '185,805.0', '12,119.6'],
								[9, 'Ford Motor', '177,210.0', '2,024.0'],
								[10, 'ConocoPhillips', '166,683.0', '13,529.0'],
								[11, 'General Electric', '157,153.0', '16,353.0'],
								[12, 'Total', '152,360.7', '15,250.0'],
								[13, 'ING Group', '138,235.3', '8,958.9'],
								[14, 'Citigroup', '131,045.0', '24,589.0'],
								[15, 'AXA', '129,839.2', '5,186.5'],
								[16, 'Allianz', '121,406.0', '5,442.4'],
								[17, 'Volkswagen', '118,376.6', '1,391.7'],
								[18, 'Fortis', '112,351.4', '4,896.3'],
								[19, 'Crédit Agricole', '110,764.6', '7,434.3'],
								[20, 'American Intl. Group', '108,905.0', '10,477.0']]
					},
				});
			}
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		_this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
			
		};
		
		_this.setElVariable = function() {
			
		};
		
		_this.setEvent = function() {
			
		};
		
		_this.reloadContents = function() {
			
			_f.setTitle();
			_f.makeGrid();
		};
		
		_this.returns = {
			
		};
		
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});
