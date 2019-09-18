define(['mngEvent', 'basicUtil', 
    	'fw/manager/widget/helper/button',
    	'fw/manager/widget/helper/makeForm',
    	'fw/manager/widget/helper/rowBox',
    	'fw/manager/widget/helper/dropDown',
    	'fw/manager/widget/helper/areaBox',
    	'fw/manager/widget/helper/addRow',
    	'fw/manager/widget/helper/contextMenuBs',
    	'fw/manager/widget/helper/styleSwitcher',
    	'fw/manager/widget/helper/relocationEl',
        'fw/manager/widget/helper/tree'
        ], function ($aEvent, $aUtil, $aWgButton, $aWgMakeForm, $aWgRowBox, $aWgDropDown, 
        		$aWgAreaBox, $aWgAddRow, $aContextMenu, $aStyleSwitcher, $aWgRelocationEl, $aWgTree) {
	
	'use strict';
	
	var _this = {};
	
	_this.els =  {
		areaBody : null,
		areaMain : null,
		areaEditor : null,
		areaMainBar : null,
		areaSearchUser : null,
		areaShowMsg : null,
		styleSwitcher : null,
	};
	
	_this.button      = $aWgButton;
	_this.makeForm    = $aWgMakeForm;
	_this.rowBox      = $aWgRowBox;
	_this.dropDown    = $aWgDropDown;
	_this.relocationEl= $aWgRelocationEl;
	_this.addRow      = $aWgAddRow;
	_this.areaBox     = $aWgAreaBox;
	_this.contextMenu = $aContextMenu;
	_this.styleSwitcher = $aStyleSwitcher;
	_this.tree        =  $aWgTree;
	
	
	_this.setElements = function( elObj ) {
		$.extend(true, _this.els, elObj);
		_this.styleSwitcher.initialize(_this.els.styleSwitcher);
		_this.tree.initialize(_this.els);
	};
	
	_this.setMessage  = function( msgObj  ) {
		
		_this.makeForm.initMsg(msgObj);
		_this.contextMenu.initMsg(msgObj);
		_this.tree.initMsg(msgObj);
	};


	return _this;
});