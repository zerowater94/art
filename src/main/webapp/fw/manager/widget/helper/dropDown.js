define([  'text!fw/manager/tmpl/dropDown.html'
        ], function (Tmpl) {
	
	'use strict';
	
	var _pm = {
		btnClass : 'btn-primary',
		value    : "",
		list     : [],
		jsonReader : {
			id   : "code",
			name : "value" 
		},
		callbackFunc : null,
	};
	
	var _f = {
		html   : {
			li    : function( obj ) {
				return '<li id='+obj[obj.jsonReader.id]+'><a href="javascript:void(0)">'+obj[obj.jsonReader.name]+'</a></li>';
			},
		},
		render : function( el, obj ) {
			
			var _this = {};
			var _liOption = {
				id   : "",
				name :""
			};
			
			var _opt = $.extend(true,{}, _pm, obj );
			
			var tmpl = _.template(Tmpl);
			el.html(tmpl(_opt));
			var _elBtn = el.find('button.dropdown-toggle');
			var _elBtnLabel = _elBtn.find("span.select-text");
			var _elUL  = el.find('.dropdown-menu');
			
			var _funcAddElement = function( obj ) {
				var _obj = $.extend(true,{},_liOption, obj );
				_obj.jsonReader = _opt.jsonReader;
				_elUL.append(_f.html.li(_obj));
			};
			
			var _funcAddEvent = function() {
				_elBtnLabel.html($(this).text());
				if( _opt.callbackFunc != null ) {
					_opt.callbackFunc({
						id : $(this).attr("id")
					});
				}
			}
			var _clearElement = function() {
				_elUL.empty();
			};
			var _fAddAllElement = function(arry) {

				_clearElement();
				if( arry != undefined && arry != null && arry.length > 0 ) {
					for( var idx = 0 ; idx < arry.length; idx++ ) {
						_funcAddElement(arry[idx]);
					}
				}
				_elUL.find("li").click(_funcAddEvent);
			};
			
			_fAddAllElement(_opt.list);
			
			return {
				addElement   : function( obj ){
					_funcAddElement(obj);
					_elUL.find("li").click(_funcAddEvent);
				},
				clearElement : _clearElement,
				addAllElement : _fAddAllElement,
				selectElement : function(idx) {
					_elUL.find('li').eq(idx).click();
				},
				selectElementById : function(id) {
					_elUL.find('li#'+id).click();
				},
			};
		}
	};
	
	return {
		render : _f.render
	};
});