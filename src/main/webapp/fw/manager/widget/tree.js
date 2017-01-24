define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
		
	var _this = {};
	
	var _pm = {
		data : [],
		jsonKey : {
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
			_els.areaBody   = $aWg.els.areaBody;
			_els.areaMain   = $aWg.els.areaMain;
		},
		html   : {
			ul : function(id) {
				return "<ul ul-item-id='"+id+"'></ul>";
			},
			li : function(id) {
				return "<li item-id='"+id+"'></li>";
			}
		},
		isRootElement : function( pmObj, parentKey ) {
			return (parentKey == null || parentKey == '' || parentKey == pmObj.jsonKey.rootId );
		},
//		parseTreeData : function( pmObj, data ) {
//			
//			if ( data == undefined || data == null )
//				return [];
//			var idx;
//			var treeData = {}, treeStrunct , obj;
//			for( idx = 0; idx < data.length; idx++ ) {
//				obj = data[idx];
//				if( _f.isRootElement(pmObj, obj[pmObj.jsonKey.rootId] ) )
//					treeData.prototype..nodeName = obj
//			}
//		},
		makeTree : function(el, param ){
			el.html(_f.html.ul());
			var topUl = el.find("ul"), pUl, pData, rowData ;
			var treeData = {}, remainData = param.data;
			var isEnd = false, keys = param.jsonKey ;
			while ( !isEnd ) {
				rowData = remainData[0];
				pUl = null;
				pData = treeData[rowData[keys.id]];
				
				if ( pData == undefined ){
					if( _f.isRootElement(rowData, keys.rootId) ) {
						pUl = topUl;
						rowData.__level_=0;
					}
				}else {
					if( !pData.__hasChild_ ) {
						pData.__hasChild_ = true;
						pData.__childCnt_ = 0;
						pData.__el_.append(_f.html.ul(pData[keys.id]));
					} 
					pUl = pData.__el_.find("ul");
				}
				
				if( pUl == null ) {
					
					if( rowData.__loopCnt_ == undefined )
						rowData.__loopCnt_ = 0;
					rowData.__loopCnt_++;
					remainData.push(rowData);
					
				} else {
					pUl.append(_f.html.li(rowData[keys.id]));
					rowData.__el_ = pUl.find("li [item-id='"+rowData[keys.id]+"']");
					if ( pData !== undefined ) {
						pData.__hasChild_++; // 하위 개수 증가
						rowData.__level_ = pData.__level_+1;
					}
					
				}
				
				remainData.splice(0,1); // 첫번째 Object 삭제.
				if ( remainData.length == 0 )
					isEnd = true;
			}

		}
	};
	
	var _tree = function(el, obj) {
		var _o = $.extend(true, {}, _pm, obj);
		
	};
			
	_this.initialize = _f.init;
	_this.render = _tree;

	return _this;
	
});