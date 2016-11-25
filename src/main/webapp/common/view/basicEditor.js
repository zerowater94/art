
define([ 'abstractView', 'basicInfo' , 'basicUtil'
         , 'text!../../common/view/tmpl/basicEditor.html'
       ], function (AbstractView , BasicInfo , BasicUtil, _tmpl ) 
{
    'use strict';
    
    
    
    var _funcs = function(thisEl) {
		
		var _this = this;
		var _pm   = {
			title : "제목",
			callBackHide : null,
			callBackShow : null
		};
		var _els  = {};
		var _vws  = {};
		var _dts  = {
		};
		
		var _f = {
			
			changeZIndex : function(  ) {
				
				var thisZindex = 1150;
				
				if( _pm.callParentElement != null  ) {
					var pZindex = parseInt(_pm.callParentElement.css('z-index'),10);
					if( pZindex > thisZindex ) 
						thisZindex = pZindex;
				} 
				
				thisEl.css({
					zIndex : thisZindex
				});
				
			},
			showEditor : function() {
				
				thisEl.show();
				
				BasicInfo.getMainArea().closest(".area-inner").animate({
		            marginRight: thisEl.width(),
		        }, 500 );
				
				thisEl.animate({
		            right: 2, 
		            opacity:1,
		            display:'block'
		        }, 500 );
				
				setTimeout(function(){
					if ( _pm.callBackShow != null )
						_pm.callBackShow();
				}, 500);

				BasicInfo.addWinResizeEvent("window-resize_"+thisEl.selector, function(){
	        		
//					thisEl.height($(window).height() - 130) ;
	        	});
//				BasicInfo.winResize();
	        	
			},
			hideEditor : function() {
				
				BasicInfo.getMainArea().closest(".area-inner").animate({
					marginRight: "0px"
		        }, 500 );
				
				thisEl.animate({
		            right: -(thisEl.width()+10),
		            opacity:0,
		        }, 500 );
				
				setTimeout(function(){
					
					if ( _pm.callBackHide != null )
						_pm.callBackHide();
					
					thisEl.hide();
				}, 500);
				
				BasicInfo.removeWinResizeEvent("window-resize_"+thisEl.selector);
	        	
			},
			getContents : function() {
				return _els.editBody;
			},
		};
		
		
		/**************************************************************
		 * 
		 *  common structure
		 *  
		 ***************************************************************/
		
		_this.setParam = function(obj) {
			
			$.extend(true, _pm, obj);
		};
		
		_this.createPage = function() {
			
			thisEl = BasicInfo.getMainEditor();
			
//			var tmpl = _.template(_tmpl);
//			thisEl.html(tmpl({
//				title : "제목", // BasicInfo.getMsg("lbl.manageOption")
//			}));
			
			thisEl.width(320);

			thisEl.css({
				position: "absolute",
				right : -(thisEl.width())
			});
			
			thisEl.hide();
		};
		
		_this.setElVariable = function() {
			
			_els.editPanel = thisEl.find(".panel");
			_els.editTitle = _els.editPanel.find(".panel-title");
			_els.editBody = _els.editPanel.find(".panel-body");
		};
		
		_this.setEvent = function() {
			
			BasicInfo.addEvent(_els.editPanel.find(".close"), "click", _f.hideEditor);
			
		};
		
		_this.createView = function() {
			
			
		};
		
		_this.reloadContents = function() {

			_els.editTitle.text(_pm.title);
			_els.editPanel.addClass("panel-default");
			_f.changeZIndex();
			_f.showEditor();
		};
		
		
		
		_this.returns = {
			hideEditor : _f.hideEditor,
			getContents : _f.getContents
		};

		return _this;
	} ;
	
	return AbstractView.extend({
		executor : _funcs
	});
	  
});