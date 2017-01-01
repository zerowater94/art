define(['mngEvent', 'basicUtil' , 
		'fw/manager/widget/helper/button'
        ], function ($aEvent, $aUtil, $aWgButton ) {
	
	'use strict';
	
	var _pm = {
		boxClass : null,
		title : null,
		hideTitle : false,
		iconCls : null,
		buttons : []
	};
	
	var _f = {
		html   : {
			rowBox : function(obj) {
				
				var html = '<div class="box">';
				html += '<header>';
				if( obj.iconCls != null ) { 
					html += '<div class="icons">'+obj.iconCls+'</div>';	
				}
				html += '<h5></h5>';
				html += '<div class="toolbar"><nav style="padding:8px;"></nav></div>';
				html += '</header>';
				html += '<div class="body"></div><div>';
				html += "</div>";
				return html;
			}
		},	
		render : function( el, obj ) {
			
			var _opt = $.extend(true,{}, _pm, obj );
			var _elHeader, _elBtnGroup, _elBody;
			el.html(_f.html.rowBox(_opt));
			
			_elHeader = el.find(".box").find("header");
			_elBtnGroup = _elHeader.find(".toolbar nav");
			_elBody = el.find(".box").find(".body");
			
			if( _opt.boxClass != null )
				el.find(".box").addClass(_opt.boxClass);
			
			var _fChangeTitle = function( title ) {
				_elHeader.find("h5").html(title);
			}
			
			if( _opt.hideTitle ) {						
				_elHeader.remove();
			} 
				
			if( _opt.title != null )
				_fChangeTitle(_opt.title);
			
			for( var idx = 0; idx < _opt.buttons.length; idx++ ) {
				$aWgButton.render(_elBtnGroup, $.extend(true, {btnCls:"btn-default btn-xs"}, _opt.buttons[idx]));
			}

			return {
				elBoxBody : _elBody,
				elBoxBtn  : _elBtnGroup,
				addButton : function( obj ) {
					$aWgButton.render(_elBtnGroup, $.extend(true, {btnCls:"btn-default btn-xs"}, obj));
				},
				changeTitle : _fChangeTitle,
			};
		}
	};
	
	return {
		render : _f.render
	};
});