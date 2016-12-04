define(['mngEvent', 'wgHelper'
        ], function (MngEvent, wg) {
	
	'use strict';
	
	return function() {
		
		var _this = {};
		var _pm = {
			title : null,
			contextCss : {
				minWidth : "300px"
			},
			id        : $.guid,
			direction : 'left',
			shownFunc : null
		} ; // param
		
		var _els = {} ; // elements
		var _f = {
			init : function(elObj) {

				_els.areaMain   = elObj.areaMain;
				
			},
			render : function(el, obj){
				
				var _opt = $.extend(true,{},_pm, obj );
				
				var _elPopoverCntn, _elCloseBtn;
				
				var pOver = el.popover({
	                container: _els.areaMain,
	                html: true,
	                title: function() {
	                    return _opt.title+'<span class="close">&times;</span>';
	                },
	                delay: {show: 150, hide: 0},
	                content : '<div id="'+_opt.id+'_popover'+'"></div>',
	                placement: function(context, src){
	                    $(context).css(_opt.contextCss);
	                    return _opt.direction;
	                },
	            }).click(function(event) {
	            	event.preventDefault();
//	            	$('#'+el.attr("id")+' [data-toggle="popover"]').not($(this)).popover('hide'); //결재선 다른 팝오버 숨김
	            	
	                
	            }).on('shown.bs.popover', function() { 
	                // 팝오버 내용 생성
	                _elPopoverCntn = _els.areaMain.find("#"+_opt.id+'_popover');
	                _elCloseBtn = _els.areaMain.find(".popover .close");
	                
	                _elCloseBtn.off().click(function(){
	                	pOver.popover('hide');
	                });
	                if( _opt.shownFunc != null ) {
	                	_opt.shownFunc(_elPopoverCntn);
	                }
	            });
				
				return {
					close : function() {
						pOver.popover('hide');
					}
				};
			}
		};
				
		_this.initialize = _f.init;
		_this.render = _f.render;

		return _this;
	}; 
});