define(['jquery','../../fw/manager/eventManager',
        'text!../../../fw/manager/tmpl/mainEditor.html'], function ($, MngEvent, _tmplEditor) {
	
	var _this = {};
	
	_this.values = {
		useYn : [{code:"Y",value:"Y"},{code:"N",value:"N"}],
	};
	
	return _this;
});