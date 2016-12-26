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
	
	return new function() {
		
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
					
					_this.mainEditor = new _vEditor();
					_this.mainDetail = new _vDetail();
					_this.mainBar    = new _vMainBar();
					_this.search = new _vSearch();
					_this.showMsg = new _vShowMsg();
					_this.popover = new _vPopover();
					_this.toolbar = new _vToolbar();
					requirejs(['../../libs/pq-grid/pqgrid.min'], function(  ) {
						requirejs(['../../fw/manager/widget/pqGrid'], function( _vGrid ) {
							_this.grid = new _vGrid();
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
		
	};
	
});