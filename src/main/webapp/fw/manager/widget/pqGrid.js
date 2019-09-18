define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
	
	var _f = {
		options : {
			colModel   : null,
			dataModel  : {
				data : null
			},
			width  : "100%",
			height : 200,
			resizeHeight : true,
			title: "No Title",
			showTitle : false, 
			resizable:false,
			draggable:false,
			selectionModel : {type: 'row', mode: 'single'},
			scrollModel: { autoFit: true },
	        collapsible: { on: true, collapsed: false },
	        rightActions : null,
	        rightAfterActions : null
		},
		dataOptions : {
			dataModel : {
        		data : [],
        		location : "local"
        	}
		},
		els : {
			areaBody : null,
			areaMain : null
		},
		init : function() {
			_f.els.areaBody   = $aWg.els.areaBody;
			_f.els.areaMain   = $aWg.els.areaMain;
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
		gridContextMenu : null,
		makeGrid : function( el , param ) {
			
			el.html("<div></div>");
			var _g = el.find("div");
			_g.pqGrid(param);

			$aEvent.addWinResizeEvent("resize-"+el.selector+"-grid", function(){
				_g.pqGrid('option', {
					width :el.width(),
					height : (param.resizeHeight)?_f.els.areaMain.height()-param.height:param.height,
				}).pqGrid('refresh');
				
			});

			_g.on( "pqpagerchange", function( event, ui ) {
				if( ui.rPP != undefined  ) {
					_g.pqGrid( "option", "pageModel.curPage", 1 );
				}
			} );
			
			return _g;
		},
		reloadData : function(grid, dataList) {
			var gridParam = $.extend(true,{},_f.dataOptions, {
				dataModel : {
					data : dataList
				}
			}) ;

	        grid.pqGrid('option', gridParam).pqGrid('refreshDataAndView');
	        return gridParam.dataModel.data;
		}
	};
	
	var funcContextMenu = function(grid, param, actions) {
		var ctxMenuParam = {
			actions : $.extend(true,{
				moveUp : {
					onClick : function(selectedItem) {
						actions.rowUp();
					},
				},
				moveDown : {
					onClick : function(selectedItem) {
						actions.rowDown();
					} 
				} ,
			},param.rightActions),
			closed : function(selectedItem) {
				selectedItem.removeClass("selected");
			}
		};
		
		$aWg.contextMenu.render($(grid.selector).find(".pq-grid-cell"),ctxMenuParam);
	};
	
	var funcGrid = function( el, param ) {
		
		var grid = _f.makeGrid(el, param);
		var dataList;
		var rowCount = 0 ;
		
		var actions =  {
			reloadData : function(datas){
				dataList = _f.reloadData(grid, datas);
				rowCount = dataList.length;
			} ,
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
				for( var idx = 0 ; idx < param.colModel.length; idx++ ) {
					dataInx.push(param.colModel[idx].dataIndx);
				}
				return grid.pqGrid( "getData",  { dataIndx: dataInx } );
			},
			resetSelection : function() {
				grid.pqGrid('setSelection', null);
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
		
		var ctxMenu = new funcContextMenu(grid, param, actions);
		
		return actions;
	};
	
	return {
		initialize : _f.init,
		render : function(el, paramObj ){
			var param = $.extend(true,{},_f.options, paramObj );
			return new funcGrid(el, param );
		}
	};
});