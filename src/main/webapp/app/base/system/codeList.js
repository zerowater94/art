define([ 'abstractView', 'basicInfo',  '../../../common/view/basicEditor'
       ], function ( AbstractView , $a, BasicEditor) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		
		var _els = {
				
		} ; // elements
		
		var _f = {
				
			setTitle : function(){

//				BasicTmpl.mainBar.addButton({ 
//					name :$a.getMsg("lbl.add"), 
//					callbackFunc : _f.showEditor 
//			    });
			},
			showEditor : function(e) {
				
				$a.t.mainEditor.render({
					title : "코드 추가",
					callBackHide : function() {
						$(e.target).show();
					},
					callBackShow : function() {
						$(e.target).hide();
					}
				});
				$a.t.mainEditor.getContents().html("this is code..");
				$a.t.mainEditor.showEditor();
			},
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		 _this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
			
			thisEl.html("this is code page..");
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
