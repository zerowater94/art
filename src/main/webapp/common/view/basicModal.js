window.basicModal = function(thisEl) {
	
	var _this = this;
	
	var _pm = {};
	var _els = {
		modal : null,
		body  : null,
	};
	
	var options = {
		title: 'dialog',
        dlgClassName : 'bg-primary',
        sizeClassName : 'modal-sm',
        backdrop : "static",
        keyboard:false,
        useScrollable : true,
        headerColor    : '',
        bodyMinHeight : 120,
        bodyHeight : null, 
        id   : $.guid++,
        tabIndex : $.guid++,
        style  : null,
        contents:"fill contents please....",
        footer : null,
        closeBtnLabel : "close",
        closeFunction : null , 
        shownFunction : null	
	};
	var _elModal = null;
	
	var _f = {
		addDragAction : function() {
			
			_els.modalContents.draggable({
                handle: _els.modalHeader,
                scroll: false,
                stop  : function(){
                	_els.modal.modal('handleUpdate');
                	_f.reLocationModal();
                		
                }
            });
		},
		reLocationModal : function() {
	    	
	    	var cntnEl = _els.modalContents;
	    	var position = cntnEl.position();
	    	var winW = $(window).width();
	    	var winH = $(window).height();
	    	var cntnW = cntnEl.width();
	    	var cntnH = cntnEl.height();
	    	var headerH = _els.modal.find(".modal-header").height();
	    	
	    	var minLeft = -1*(((winW-cntnW)/2)+cntnW) + 100 ; // 100만큼 보이게 ( 최소 )
	    	var minTop = -1*(30+headerH ); // Header이기 때문에 ( 헤더가 사라지게는 하지 않는다 ), 30( bs modal top margin) + header높이
	    	
	    	var maxLeft = winW-((winW-cntnW)/2)-100; // 100만큼 보이게 ( 최소 )
	    	var maxTop = winH-100; // Header이기 때문에 ( 헤더가 사라지게는 하지 않는다 ), 30( bs modal top margin) + header높이
	    	
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
	    }	
	};
	_this.render = function( paramObj ) {
		
		$.extend(true, _pm, options, paramObj );

		basicInfo.send({
            url : "common/view/tmpl/modal.html",
            dataType : "html",
            success : function(data) {
            	thisEl.html(data);
            }
        });
		_els.modal = thisEl.find(".modal");
		_els.modalHeader   = _els.modal.find(".modal-header");
		_els.modalContents = _els.modal.find(".modal-content");
		_els.modalBackDrop = _els.modal.find(".modal-backdrop");

		_els.modalBody = _els.modal.find(".modal-body");
		_els.modalHeader.addClass(_pm.dlgClassName);
		_els.modalHeader.find("h4").html(_pm.title);
    	// set body contents.
    	_els.modalBody.html(_pm.contents);
    	
		_f.addDragAction();
		
	};

	_this.showModal = function( obj ) {
		
		var _param = $.extend(true, {}, {
            backdrop : "static",
            keyboard:false
        },obj);
		
		var _modal = _els.modal.modal(_param).on('hidden.bs.modal', function () {
        	
        	if( _pm.closeFunction != null ) {
        		_pm.closeFunction();
        	}

            // draggable로 인한 height width조정
        	_els.modalContents.css({
            	left:"0px",
            	top:"0px"
            });
            
            // resize event remove
            basicInfo.removeWinResizeEvent("modal-resize_"+_els.modal.selector);
        }).on('shown.bs.modal', function() {
        	
        	
			if( _pm.bodyHeight == null ){

				_pm.bodyHeight = $(window).height()-200;
				
				basicInfo.addWinResizeEvent("modal-resize_"+_els.modal.selector, function(){
					
					_els.modalBody.css({
                    	maxHeight : $(window).height()-200
                    });

					if( _els.modalBackDrop.length > 0 )
						_els.modal.modal('handleUpdate');
					
					_f.reLocationModal(_elModal);
				});
			}
			
			_els.modalBody.css({
                maxHeight : _pm.bodyHeight,
                minHeight : _pm.bodyMinHeight
            });
			
			
			if( _pm.useScrollable )
				_els.modalBody.addClass("wrap-scrollable");
			
			if( _pm.shownFunction != null ) {
				_pm.shownFunction();
        	}
            basicInfo.winResize()
        })
        
		return _modal;

	};
	_this.clsoeModal = function() {
		_elModal.modal('hide');
	};

	_this.getContentsWidth = function() {
		
		return _els.modalContents.width();
	};
	
	_this.getContentsEl = function() {
		return _els.modalContents;
	}
	
	return _this;
};