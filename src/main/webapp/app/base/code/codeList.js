define([ 'abstractView', 'basicInfo', 'basicUtil', 'basicTmpl', '../../../common/view/basicEditor'
       ], function ( AbstractView , BasicInfo, BasicUtil, BasicTmpl, BasicEditor) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		
		var _els = {
				
		} ; // elements
		
		var _f = {
				
			setTitle : function(){

				BasicTmpl.mainBar.addButton({ 
					name :BasicInfo.getMsg("lbl.add"), 
					callbackFunc : _f.showEditor 
			    });
			},
			showEditor : function(e) {
				
				BasicTmpl.mainEditor.render({
					title : "코드 추가",
					callBackHide : function() {
						$(e.target).show();
					},
					callBackShow : function() {
						$(e.target).hide();
					}
				});
				BasicTmpl.mainEditor.getContents().html("this is code..");
				BasicTmpl.mainEditor.showEditor();
			},
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		 _this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
		};
		
		_this.setElVariable = function() {
			
		};
		
		_this.setEvent = function() {
		};
		
		_this.reloadContents = function() {
			
			_f.setTitle();
		};
		
		_this.returns = {
			
		};
		
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});
