define([  'backbone'  ], function ( Backbone) {

	'use strict';
	
	return Backbone.View.extend({
		render : function( obj ) {
			
			var _this = this;
			var _fs = null;
			try {
				
				_fs = new _this.executor(_this.$el);
				_fs.setParam(obj);
				_fs.createPage();
				_fs.setElVariable();
				_fs.setEvent();
				_fs.reloadContents();
				
				$.extend(true, _this, _fs.returns );
				
			}catch ( ex )
			{
				console.error(ex.stack);
				BasicInfo.printing.alert(ex);
			}
		},
	});
});
