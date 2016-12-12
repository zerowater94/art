define(['jquery','mngEvent',
        'wgHelper','grid',
        '../../fw/manager/widget/mainEditor',
        '../../fw/manager/widget/mainDetail',
        '../../fw/manager/widget/mainBar',
        '../../fw/manager/widget/search',
        '../../fw/manager/widget/showMsg',
        '../../fw/manager/widget/popover',
        '../../fw/manager/widget/toolbar'
        ,'../../fw/manager/widget/pqGrid'
        ], function ($, MngEvent, wg,grid, _vEditor,_vDetail, _vMainBar, _vSearch, _vShowMsg, _vPopover, _vToolbar,_vGrid) {
	
	'use strict';
	
	return new function() {
		
		var _this = {};
		
		var _els = {
			areaMain : null,
			areaEditor : null,
			areaMainBar : null,
			areaShowMsg : null
		};
		
		var _f = {
			init : {
				widget : function( obj ) {
					
					_this.mainEditor = new _vEditor();
					_this.mainDetail = new _vDetail();
					_this.mainBar    = new _vMainBar();
					_this.search = new _vSearch();
					_this.showMsg = new _vShowMsg();
					_this.popover = new _vPopover();
					_this.toolbar = new _vToolbar();
					_this.grid = new _vGrid();
					
					wg.initialize(obj.msg);
					$.extend(true, _this, wg);
					
					_this.mainBar.initialize(_els);
					_this.mainEditor.initialize(_els);
					_this.mainDetail.initialize(_els);
					_this.showMsg.initialize(_els);
					_this.popover.initialize(_els);
					
//					requirejs(['../../fw/manager/widget/pqGrid'], function( _vGrid ) {
//						_this.grid = new _vGrid();
//					});
				}
			}
		};
		
		_this.initialize = function(obj) {
			
			$.extend(true, _els, obj.els);
			_f.init.widget(obj);
		};

		return _this;
		
	};
	
});