define([ 'abstractView', 'basicInfo', 'basicUtil'
       ], function ( AbstractView , BasicInfo, BasicUtil ) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		var _this = this;
		
		var _pm = {
			viewName : null 
		} ; // param
		var _els = {
				
		} ; // elements
		var _f = {
			
			makeGrid : function() {
				
				thisEl.html("<div></div>");
				_els.grid = thisEl.find("div");
				
				var _g = _els.grid.pqGrid(_pm);
				
				BasicInfo.addWinResizeEvent("resize-"+thisEl.selector+"-grid", function(){
					
					console.log("execute grid resize : " + thisEl.width());
					_els.grid.pqGrid('option', 'width', thisEl.width()).pqGrid('refresh');
				});
				
				_els.grid.on( "pqpagerchange", function( event, ui ) {
					if( ui.rPP != undefined  ) {
						_els.grid.pqGrid( "option", "pageModel.curPage", 1 );
					}
				} );
			},
			
			reloadData : function( data ) {
				
				var reloadData ;
		        if( data == undefined ) {
		        	reloadData = {
		            	dataModel : {
		            		data : [],
		            		location : "local"
		            	}
		            }
				}else {
					reloadData = data;
				}
		
				_els.grid.pqGrid('option', reloadData).pqGrid('refreshDataAndView');
				
			}
		}
		
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
			
			_f.makeGrid();
		};
		
		_this.returns = {
			reloadData : _f.reloadData
		};
		
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});