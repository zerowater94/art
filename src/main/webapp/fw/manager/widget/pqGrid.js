define(['mngEvent', 'wgHelper'
        ], function (MngEvent, wg) {
	
	'use strict';
	
	return function() {
		
		var _this = {};
		
		var _pm = {
			colModel   : null,
			dataModel  : {
				data : null
			},
			width : "auto",
			title: "No Title",
			showTitle : false, 
			resizable:false,
			draggable:false,
			scrollModel: { autoFit: true },
	        collapsible: { on: true, collapsed: false },
		} ; // param
		
		var _els = {} ; // elements
		var _f = {
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
				
				MngEvent.addWinResizeEvent("resize-"+el.selector+"-grid", function(){
					_g.pqGrid('option', 'width', el.width()).pqGrid('refresh');
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
				var _rtn = {};
				_rtn.reloadData = function(data) {
					
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
				return _rtn;
			}
		};
				
		_this.render = _f.render;

		return _this;
	}; 
	
});