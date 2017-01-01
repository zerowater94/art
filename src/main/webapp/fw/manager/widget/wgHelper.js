define(['mngEvent', 'basicUtil', 
    	'fw/manager/widget/helper/button',
    	'fw/manager/widget/helper/makeForm',
    	'fw/manager/widget/helper/rowBox',
    	'fw/manager/widget/helper/dropDown',
    	'fw/manager/widget/helper/areaBox',
    	'fw/manager/widget/helper/addRow',
    	'fw/manager/widget/helper/relocationEl',
        ], function ($aEvent, $aUtil, $aWgButton, $aWgMakeForm, $aWgRowBox, $aWgDropDown, $aWgAreaBox, $aWgAddRow, $aWgRelocationEl) {
	
	'use strict';
	
	var _this = {};
	
	_this.els =  {
		areaBody : null,
		areaMain : null,
		areaEditor : null,
		areaMainBar : null,
		areaShowMsg : null
	};
	
	_this.msg = {
		blankStr : "::::::",
		search   : "Search"
	};
	
	
	_this.setElements = function( elObj ) {
		$.extend(true, _this.els, elObj);
	};
	
	_this.setMessage  = function( obj ) {
		$.extend(true, {} , _this.msg, obj);
		
		$aWgMakeForm.initMsg(_this.msg);
	};
	
	_this.button      = $aWgButton;
	_this.makeForm    = $aWgMakeForm;
	_this.rowBox      = $aWgRowBox;
	_this.dropDown    = $aWgDropDown;
	_this.relocationEl= $aWgRelocationEl;
	_this.addRow      = $aWgAddRow;
	_this.areaBox     = $aWgAreaBox;
	
	return _this;
});