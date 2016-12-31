define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
		
	var _this = {};
	var _pm = {
		title : null,
		contextCss : {
			minWidth : "300px"
		},
		popoverCss: "art-popover",
		id        : $.guid,
		direction : 'left',
		shownFunc : null
	} ; // param
	
	var _els = {} ; // elements
	var _f = {
		init : function(elObj) {
			_els.areaBody   = elObj.areaBody;
			_els.areaMain   = elObj.areaMain;
		},
		render : function(el, obj){
			
			var _opt = $.extend(true,{},_pm, obj );
			var _elPopoverCntn, _elCloseBtn;
			
			if ( _els.areaBody.find("."+_opt.popoverCss).length == 0 ) {
				_els.areaBody.append('<div class="'+_opt.popoverCss+'"></div>');
			}
			var _elContainer = _els.areaBody.find("."+_opt.popoverCss);
			var pOver = el.popover({
                container: _elContainer,
                html: true,
                title: function() {
                    return _opt.title+'<span class="close">&times;</span>';
                },
                delay: {show: 150, hide: 0},
                placement: function(context, src){
                    $(context).css(_opt.contextCss);
                    $(context).addClass(_opt.popoverCss);
                    return _opt.direction;
                },
            }).click(function(event) {
            	event.preventDefault();
            	_elContainer.find(".popover."+obj.popoverCss).not($(this)).popover('hide'); //결재선 다른 팝오버 숨김 
            }).on('shown.bs.popover', function(e) { 
            	
                // 팝오버 내용 생성
                _elPopoverCntn = _elContainer.find(".popover-content");
                _elCloseBtn = _elContainer.find(".popover .close");
                _elCloseBtn.off().click(function(){
                	pOver.popover('hide');
                });
                if( _opt.shownFunc != null ) {
                	_opt.shownFunc(e, _elPopoverCntn);
                }
                
                _elContainer.find(".popover").draggable({
                	scroll: false ,
                	stop : function(){
                		$aWg.relocationEl(_els.areaBody, $(this));
                	}
                });
            });
			
			return {
				close : function() {
					pOver.popover('hide');
				}
			};
		},
		closeAllPopover : function() {
			_els.areaBody.find(".popover").popover('hide'); 
		}
	};
			
	_this.initialize = _f.init;
	_this.render = _f.render;
	_this.closeAllPopover = _f.closeAllPopover;

	return _this;
});