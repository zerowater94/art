window.basicGrid = function(thisEl) {
	
	var _this = this;
	var _pm = {};
	var _els = {};
	
	var options = {
		colModel   : null,
		dataModel  : {
			data : null
		},
		width : "auto",
		title: "No Title",
		resizable:false,
		draggable:false,
		scrollModel: { autoFit: true },
        collapsible: { on: true, collapsed: false },	
	};
	
	_this.render = function(paramObj ){
		
		$.extend(true, _pm, options, paramObj );
		console.log(_pm);
		thisEl.html("<div></div>");
		_els.grid = thisEl.find("div");
		
		var _g = _els.grid.pqGrid(_pm);
		
		_els.grid.on( "pqpagerchange", function( event, ui ) {
			if( ui.rPP != undefined  ) {
				_els.grid.pqGrid( "option", "pageModel.curPage", 1 );
			}
		} );
		return _g;
	};
	
	
	_this.reloadData = function( data ) {
		
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
	};
	
	return _this;
};