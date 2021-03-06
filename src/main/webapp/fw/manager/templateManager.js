define(['jquery','mngEvent',
        'wgHelper',
        'fw/manager/widget/mainEditor',
        'fw/manager/widget/mainDetail',
        'fw/manager/widget/mainBar',
        'fw/manager/widget/search',
        'fw/manager/widget/mainMembers',
        'fw/manager/widget/showMsg',
        'fw/manager/widget/popover',
        'fw/manager/widget/toolbar'
        ], function ($, $aEvent, $aWg, _vEditor,_vDetail, _vMainBar, _vSearch, 
        		_vMainMembers, _vShowMsg, _vPopover, _vToolbar) {
	
	'use strict';
		
	var _this = {};
	
	var msg = {
		blankStr   : "::::::",
		search     : "Search",
		addItem    : "Add Item",
		editName   : "Change Name",
		deleteItem : "Delete Item",
		moveUp     : "Move Up",
		moveDown   : "Move Down",
		close      : "close"
	};
		
	
	var _f = {
		initialize : function( obj ) {
				
			_this.mainEditor = _vEditor ; 
			_this.mainDetail = _vDetail ; 
			_this.mainBar    = _vMainBar ; 
			_this.search = _vSearch; 
			_this.mainMembers = _vMainMembers;
			_this.showMsg = _vShowMsg; 
			_this.popover = _vPopover ; 
			_this.toolbar = _vToolbar; 
			
			requirejs(['../../libs/pq-grid/pqgrid.min'], function(  ) {
				requirejs(['../../fw/manager/widget/pqGrid'], function( _vGrid ) {
					_this.grid = _vGrid ;
					_this.grid.initialize();
				});
			});
						
			_this.mainBar.initialize();
			_this.mainEditor.initialize();
			_this.mainEditor.initMsg(msg);
			_this.mainDetail.initialize();
			_this.search.initMsg(msg);
			_this.mainMembers.initialize();
			_this.showMsg.initialize();
			_this.popover.initialize();
		}
	};
	
	_this.initialize = function(obj) {
		
		$aWg.setElements(obj.els);
		$aWg.setMessage($.extend(true, msg, obj.msg));
		$.extend(true, _this, $aWg);
		_f.initialize(obj);
	};

	return _this;
	
});