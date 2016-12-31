define(['jquery','mngEvent',
        'wgHelper',
        '../../fw/manager/widget/mainEditor',
        '../../fw/manager/widget/mainDetail',
        '../../fw/manager/widget/mainBar',
        '../../fw/manager/widget/search',
        '../../fw/manager/widget/showMsg',
        '../../fw/manager/widget/popover',
        '../../fw/manager/widget/toolbar'
        ], function ($, $aEvent, $aWidget,_vEditor,_vDetail, _vMainBar, _vSearch, _vShowMsg, _vPopover, _vToolbar) {
	
	'use strict';
		
	var _this = {};
	
	var _els = {
		areaBody : null,
		areaMain : null,
		areaEditor : null,
		areaMainBar : null,
		areaShowMsg : null
	};
	
	var _f = {
		init : {
			widget : function( obj ) {
				
				_this.mainEditor = _vEditor ; // new _vEditor();
				_this.mainDetail = _vDetail ; // new _vDetail();
				_this.mainBar    = _vMainBar ; // new _vMainBar();
				_this.search = _vSearch; // new _vSearch();
				_this.showMsg = _vShowMsg; // new _vShowMsg();
				_this.popover = _vPopover ; // new _vPopover();
				_this.toolbar = _vToolbar; // new _vToolbar();
				requirejs(['../../libs/pq-grid/pqgrid.min'], function(  ) {
					requirejs(['../../fw/manager/widget/pqGrid'], function( _vGrid ) {
						_this.grid = _vGrid ; // new _vGrid();
						_this.grid.initialize(_els);
					});
				});
				
				$aWidget.initialize(obj.msg);
				_this.mainBar.initialize(_els);
				_this.mainEditor.initialize(_els);
				_this.mainDetail.initialize(_els);
				_this.showMsg.initialize(_els);
				_this.popover.initialize(_els);
			}
		}
	};
	
	_this.initialize = function(obj) {
		
		$.extend(true, _els, obj.els);
		_f.init.widget(obj);
		$.extend(true, _this, $aWidget);
	};

	return _this;
	
});