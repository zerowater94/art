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
			li : function(rowData, keys) {
				return "<li item-id='"+rowData[keys.id]+"'>"+rowData[keys.name]+"</li>";
			}
		},
		isRootElement : function( pmObj, parentKey ) {
			return (parentKey == null || parentKey == '' || parentKey == pmObj.jsonKey.rootId );
		},
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
					if( rowData.__loopCnt_  < 3 ) {
						remainData.push(rowData);
					} else {
						// 3번 이상 체크후 루트에 붙임.
						topUl.append(_f.html.li(rowData, keys));
						rowData.__el_ = topUl.find("li [item-id='"+rowData[keys.id]+"']");
					}
					
					
				} else {
					pUl.append(_f.html.li(rowData, keys));
					rowData.__el_ = pUl.find("li [item-id='"+rowData[keys.id]+"']");
					if ( pData !== undefined ) {
						pData.__hasChild_++; // 하위 개수 증가
						rowData.__level_ = pData.__level_+1; // 현재 레벨 세팅
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
		_f.makeTree(el, obj);
	};
			
	_this.initialize = _f.init;
	_this.render = _tree;

	return _this;
	
});