define(['jquery','mngEvent',
        'wgHelper',
        'fw/manager/widget/mainEditor',
        'fw/manager/widget/mainDetail',
        'fw/manager/widget/mainBar',
        'fw/manager/widget/search',
        'fw/manager/widget/showMsg',
        'fw/manager/widget/popover',
        'fw/manager/widget/toolbar',
        'fw/manager/widget/tree'
        ], function ($, $aEvent, $aWg, _vEditor,_vDetail, _vMainBar, _vSearch, _vShowMsg, _vPopover, _vToolbar, _vTree) {
	
	'use strict';
		
	var _this = {};
	
	var _f = {
		initialize : function( obj ) {
				
			_this.mainEditor = _vEditor ; 
			_this.mainDetail = _vDetail ; 
			_this.mainBar    = _vMainBar ; 
			_this.search = _vSearch; 
			_this.showMsg = _vShowMsg; 
			_this.popover = _vPopover ; 
			_this.toolbar = _vToolbar; 
			_this.tree    = _vTree;
			
			requirejs(['../../libs/pq-grid/pqgrid.min'], function(  ) {
				requirejs(['../../fw/manager/widget/pqGrid'], function( _vGrid ) {
					_this.grid = _vGrid ;
					_this.grid.initialize();
				});
			});
						
			_this.mainBar.initialize();
			_this.mainEditor.initialize();
			_this.mainDetail.initialize();
			_this.showMsg.initialize();
			_this.popover.initialize();
			_this.tree.initialize();
		}
	};
	
	_this.initialize = function(obj) {
		
		$aWg.setElements(obj.els);
		$aWg.setMessage(obj.msg);
		$.extend(true, _this, $aWg);
		_f.initialize(obj);
	};

	return _this;
	
});