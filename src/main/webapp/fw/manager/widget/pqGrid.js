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
		title: "No Title",
		showTitle : false, 
		resizable:false,
		draggable:false,
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
					height : _els.areaMain.height()-obj.height,
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

			var grid = _f.makeGrid(el, $.extend(true, {}, _pm, obj));
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
		        grid.pqGrid('option', _obj).pqGrid('refreshDataAndView');
			};
			return {
				reloadData :_reloadData ,
				setSelection : function(rowIndex) {
					grid.pqGrid('setSelection', {rowIndx:rowIndex});
				},
				resetSelection : function() {
					grid.pqGrid('setSelection', {rowIndx:null});
				},
			};
		}
	};
			
	_this.initialize = _f.init;
	_this.render = _f.render;

	return _this;
	
});