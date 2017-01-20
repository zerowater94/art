define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
		
	var _this = {};
	
	var _pm = {
		data : [],
		jsonReader : {
			id : "id",
            name : "name", 
            parentId : "parentId",
            rootId : "ROOT",
            child : null,
            labelClass : null,
            icon : null,
		},
		
	} ; // param
	
	var _els = {
		areaBody : null,
		areaMain : null
	} ; // elements
	
	
	
	var _f = {
		init : function() {
			
		},
		html   : {
			
		},
		isRootElement : function( pmObj, parentKey ) {
			return (parentKey == null || parentKey == '' || parentKey == pmObj.jsonReader.rootId );
		},
		parseTreeData : function( pmObj, data ) {
			
			if ( data == undefined || data == null )
				return [];
			var idx;
			var treeData = {}, treeStruet ; obj;
			for( idx = 0; idx < data.length; idx++ ) {
				obj = data[idx];
				if( _f.isRootElement(pmObj, obj[pmObj.jsonReader.rootId] ) )
					treeData.nodeName = obj
			}
		},
		render : function(el, obj){
			var _opt = $.extend(true, {}, _pm, obj);
			
		}
	};
			
	_this.initialize = function() {
		_els.areaBody   = $aWg.els.areaBody;
		_els.areaMain   = $aWg.els.areaMain;
	};
	_this.render = _render;

	return _this;
	
});