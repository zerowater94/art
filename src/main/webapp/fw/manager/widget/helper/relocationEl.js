define(['mngEvent', 'basicUtil' 
        ], function ($aEvent, $aUtil) {
	
	'use strict';
	
	return function( container, elParent) {
    	
    	var cntnEl = elParent;
    	var position = cntnEl.position();
    	var winW = container.width();
    	var winH = container.height();
    	var cntnW = cntnEl.width();
    	var cntnH = cntnEl.height();

    	var minLeft = -1*(cntnW - 200) ; // 100만큼 보이게 ( 최소 )
    	var minTop = 0; // 
    	
    	var maxLeft = winW-200; // 100만큼 보이게 ( 최소 )
    	var maxTop = winH-cntnH; // Header이기 때문에 ( 헤더가 사라지게는 하지 않는다 ), 30( bs modal top margin) + header높이
    	
    	if( position.left < minLeft ) {
    		cntnEl.css({
            	left:minLeft+"px",
            });
    	}

    	if( position.left > maxLeft ) {
    		cntnEl.css({
            	left:maxLeft+"px",
            });
    	}

    	if( position.top < minTop ) {
    		cntnEl.css({
            	top:minTop+"px",
            });
    	}
    	
    	if( position.top > maxTop ) {
    		cntnEl.css({
            	top:maxTop+"px",
            });
    	}
    };
});