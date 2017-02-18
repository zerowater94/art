define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
		
	var _this = {};
	
	var _pm = {
		colModel   : null,
		dataModel  : {
			data : null
		},
		width  : "auto",
		height : 200,
		resizeHeight : true,
		title: "No Title",
		showTitle : false, 
		resizable:false,
		draggable:false,
		selectionModel : {type: 'row', mode: 'single'},
		scrollModel: { autoFit: true },
        collapsible: { on: true, collapsed: false },
	} ; // param
	
	var _els = {
		areaBody : null,
		areaMain : null
	} ; // elements
	var _f = {
		init : function() {
			_els.areaBody   = $aWg.els.areaBody;
			_els.areaMain   = $aWg.els.areaMain;
		},
		html   : {
			nvButton : function(obj) {
				var rtnHtml = '<div class="btn-group">';
				rtnHtml += '<a data-toggle="tooltip" data-original-title="'+obj.title+'" data-placement="bottom" class="btn '+obj.linkCss+'" id="'+obj.id+'">';
				rtnHtml += '<i class="'+obj.btnCss+'"></i>';
				rtnHtml += '</a></div>';
				return rtnHtml;
			},
		},
		makeGrid : function( el , obj ) {
			
			el.html("<div></div>");
			var _g = el.find("div");
			_g.pqGrid(obj);

			$aEvent.addWinResizeEvent("resize-"+el.selector+"-grid", function(){
				
				_g.pqGrid('option', {
					width :el.width(),
					height : (obj.resizeHeight)?_els.areaMain.height()-obj.height:obj.height,
				}).pqGrid('refresh');
				
			});
			
			_g.on( "pqpagerchange", function( event, ui ) {
				if( ui.rPP != undefined  ) {
					_g.pqGrid( "option", "pageModel.curPage", 1 );
				}
			} );
			
			return _g;
		},
		render : function(el, obj){
			
			var _opt = $.extend(true, {}, _pm, obj);
			var grid = _f.makeGrid(el, _opt);
			var rowCount = 0 ;
			var _reloadData = function(data) {
				
				var _obj ;
		        if( data == undefined ) {
		        	_obj = {
		            	dataModel : {
		            		data : [],
		            		location : "local"
		            	}
		            }
				}else {
					_obj = data;
				}
		        rowCount = _obj.dataModel.data.length;
		        grid.pqGrid('option', _obj).pqGrid('refreshDataAndView');
			};
			return {
				reloadData :_reloadData ,
				setSelection : function(rowIndex) {
					grid.pqGrid('setSelection', {rowIndx:rowIndex});
				},
				getSelection : function() {
					var selRow = this.getSelectionRows();
					if ( selRow.length > 0 )
						return selRow[0];
					else
						return null;
				},
				getSelectionRows : function() {
					return grid.pqGrid( "selection",   { type:'row', method:'getSelection' }  );
				},
				getRowData : function( rowIndex ) {
					return grid.pqGrid( "getRowData", {rowIndxPage: rowIndex} );
				},
				getData : function() {
					var dataInx = [];
					for( var idx = 0 ; idx < _opt.colModel.length; idx++ ) {
						dataInx.push(_opt.colModel[idx].dataIndx);
					}
					return grid.pqGrid( "getData",  { dataIndx: dataInx } );
				},
				resetSelection : function() {
					grid.pqGrid('setSelection', {rowIndx:null});
				},
				removeRow : function(rowIndex) {
					grid.pqGrid( "deleteRow", { rowIndx: rowIndex } );
				},
				addRow : function(rowIndex, rowData) {
					grid.pqGrid( "addRow", { rowIndx: rowIndex , rowData : rowData} );
				},
				rowUp : function() {
					var uiRow = this.getSelection();
					if( uiRow == null ||uiRow.rowIndx == 0 ) 
						return false;
					this.removeRow(uiRow.rowIndx);
					this.addRow(uiRow.rowIndx-1, uiRow.rowData);
					return true;
				},
				rowDown : function() {
					var uiRow = this.getSelection();
					if( uiRow == null || uiRow.rowIndx >= rowCount-1 ) 
						return false;
					this.removeRow(uiRow.rowIndx);
					this.addRow(uiRow.rowIndx+1, uiRow.rowData);
					return true;
				}
			};
		}
	};
			
	_this.initialize = _f.init;
	_this.render = _f.render;

	return _this;
	
});