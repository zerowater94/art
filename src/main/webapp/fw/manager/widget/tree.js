define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
	
	var _f = {
		options : {
			id   : $.guid,
			data : [],
			jsonKey : {
				id : "id",
	            name : "name", 
	            parentId : "parentId",
	            order    : "order",
	            label    : "label",
	            rootId   : "ROOT",
	            hasChild : false,
	            labelClass : null,
	            icon : null,
			},
			rightActions : null,
			rightAfterActions : null,
			height : 200,
			resizeHeight : true,
			clickAction : null,
			dblClickAction : null,
		},
		els : {
			areaBody : null,
			areaMain : null
		},
		msg : {
			addItem    : "Add Item",
			editName   : "Change Name",
			deleteItem : "Delete Item",
			moveUp     : "Move Up",
			moveDown   : "Move Down"
		},
		init : function() {
			_f.els.areaBody = $aWg.els.areaBody;
			_f.els.areaMain = $aWg.els.areaMain;
		},
		initMsg : function( obj ) {
			$.extend(true, _f.msg, obj);
		},
		iconClass : {
			open  : 'glyphicon-minus-sign',
			close : 'glyphicon-plus-sign'
		},
		treeContextMenus : {}, // tree context menus..
	};
	
	
	var treeContextMenu = function(el, param, treeData) {
		
		var keys = param.jsonKey;
		var funcReorder = function( selectedItem, direction ){
			var currEl = selectedItem.closest("li");
			var currUl = currEl.closest("ul");
			var currIndex = currEl.index();
			var targetEl ; 

			if( direction == 'up') {
				if ( currIndex <= 0 ) {
					return;
				}
				targetEl = currUl.find("> li").eq(currIndex-1);
				currEl.after(targetEl);
				treeData[currEl.attr('item-id')][keys.order]--;
				treeData[targetEl.attr('item-id')][keys.order]++;
			} else if (direction == 'down') {
				if( (currIndex+1) >= currUl.find("> li").length ){
					return;
				}
				targetEl = currUl.find("> li").eq(currIndex+1);
				currEl.before(targetEl);
				treeData[currEl.attr('item-id')][keys.order]++;
				treeData[targetEl.attr('item-id')][keys.order]--;
			}
		};
		
		var ctxMenuParam = {
			actions : $.extend(true,{
				editName : {
					onClick : function(selectedItem) {
						var currEl = selectedItem.closest("li");
						var name = selectedItem.html();
						selectedItem.html("<input type='text' value='"+name+"'>");
						selectedItem.find("input").blur(function(e){
							selectedItem.html($(this).val());
							treeData[currEl.attr('item-id')][keys.name] = $(this).val();
							if ( param.rightAfterActions.editName !== undefined ) {
								param.rightAfterActions.editName(selectedItem);
							}
						}).focus();
					},
				},
				deleteItem : {
					onClick : function( selectedItem ) {
						var currEl = selectedItem.closest("li");
						var subliLen = currEl.find();
						delete treeData[currEl.attr('item-id')];
						if( currEl.find('ul').length > 0 ) {
							var toDelEls = currEl.find('ul').find("li");
							var len = toDelEls.length;
							for( var idx = 0 ; idx < len; idx++ ) {
								delete treeData[toDelEls.eq(idx).attr('item-id')];
							}
						}
						selectedItem.closest("li").remove();
						if ( param.rightAfterActions.deleteItem !== undefined ) {
							param.rightAfterActions.deleteItem(selectedItem);
						}
					}
				},
				moveUp : {
					onClick : function(selectedItem) {
						funcReorder(selectedItem, 'up');
						if ( param.rightAfterActions.moveUp !== undefined ) {
							param.rightAfterActions.moveUp(selectedItem);
						}
					}
				},
				moveDown : {
					onClick : function(selectedItem) {
						funcReorder(selectedItem, 'down');
						if ( param.rightAfterActions.moveDown !== undefined ) {
							param.rightAfterActions.moveDown(selectedItem);
						}
					} 
				}
			}, param.rightActions),
			closed : function(selectedItem) {
				selectedItem.removeClass("selected");
			}
		};
		
		return $aWg.contextMenu.render(el.find("li").find("label"),ctxMenuParam );
	};
	
	var treeMaker = function(treeEl , param) {
		var _treef = {
			topUl   : null,
			keys    : param.jsonKey,
			treeData: {},
			html  : {
				ul : function(id) {
					return "<ul ul-item-id='"+id+"'></ul>";
				},
				li : function(rowData) {
					return "<li item-id='"+rowData[_treef.keys.id]+"'><label>"+rowData[_treef.keys.name]+"</label></li>";
				},
				liHasChild : function() {
					return "<i class='indicator glyphicon "+_f.iconClass.open+"'></i>";
				},
				emptyli : function() {
					return '<li><label>No Tree Data</label></li>';
				},
			},
			makeTopUl : function() {
				treeEl.html(this.html.ul(this.keys.rootId));
				treeEl.addClass("wrap-scrollable");
				
				if( param.resizeHeight ) {
					$aEvent.addWinResizeEvent("resize-"+treeEl.selector+"-tree", function(){
						treeEl.css({
							height : _f.els.areaMain.height()-param.height,
						});
					});
				} else {
					treeEl.height(param.height);
				}
				this.topUl = treeEl.find("ul");
				this.topUl.addClass("tree");
			},
			makeEmptyTree : function() {
				this.topUl.append(this.html.emptyli());
			},
			isRootElement : function( parentId ) {
				return (parentId == null || parentId == '' || parentId == this.keys.rootId );
			},
			getParentRowData : function( rowData ) {
				var _self = this;
				var pRowData = _self.treeData[rowData[_self.keys.parentId]];
				
				if (pRowData == undefined) {
					
					if( _self.isRootElement(rowData[_self.keys.parentId]) ) {
						pRowData = {};
						pRowData.__ul_    = _self.topUl;
						rowData.__level_  = 0;
						rowData.isRootRow = true;
					}
				}else {
					if( !pRowData.__hasChild_ ) {
						pRowData.__hasChild_ = true;
						pRowData.__el_.prepend(_self.html.liHasChild());
						pRowData.__el_.append(_self.html.ul(pRowData[_self.keys.id]));
						pRowData.__el_.addClass("branch");
						pRowData.__ul_ = pRowData.__el_.find("ul");
					} 
				}
				return pRowData;
			},
			addElementNotParent : function( rowData ) {
				var _self = this;
				if( rowData.__loopCnt_ == undefined )
					rowData.__loopCnt_ = 0;
				rowData.__loopCnt_++;
				if( rowData.__loopCnt_  >= 3 ) {
					// 3번 이상 체크후 루트에 붙임.
					_self.topUl.append(_self.html.li(rowData));
					rowData.__el_ = _self.topUl.find("li [item-id='"+rowData[_self.keys.id]+"']");
				}
			},
			addElement : function(parentRowData, rowData) {
				var _self = this;
				var parentUl = parentRowData.__ul_;
				parentUl.append(_self.html.li(rowData));
				rowData.__el_ = parentUl.find("li[item-id='"+rowData[_self.keys.id]+"']");
				
				if ( rowData.isRootRow ) { // Root 
					rowData.__el_.addClass("root-branch");
				} else   {
					rowData.__level_ = parentRowData.__level_+1; // 현재 레벨 세팅
				}
				rowData.__hasChild_ = false;
				rowData[_self.keys.order] = rowData.__el_.index()+1; // order 1 부터 시작
				rowData[_self.keys.level] = rowData.__level_;
			},
			makeTree : function() {
				var _self = this;
				var remainData = param.data;
				var pUl, rootData , pRowData, rowData ;
				var isEnd = false;
				
				while ( !isEnd ) {
					rowData = remainData[0];
					pRowData = this.getParentRowData(rowData);
					if( pRowData == undefined || pRowData == null ) {
						_self.addElementNotParent(rowData);
					} else {
						_self.addElement(pRowData, rowData);
					}

					if( rowData.__el_ === undefined ) {
						remainData.push(rowData)
					} else {
						_self.treeData[rowData[_self.keys.id]] = rowData;
					}
					
					remainData.splice(0,1); // 첫번째 Object 삭제.
					if ( remainData.length == 0 )
						isEnd = true;
				}
			},
			toggleTreeGroup : function( elEl ) {
				var iconEl = elEl.find("> i");
				if (iconEl.hasClass(_f.iconClass.open) ) {
					iconEl.removeClass(_f.iconClass.open);
					iconEl.addClass(_f.iconClass.close);
				} else {
					iconEl.removeClass(_f.iconClass.close);
					iconEl.addClass(_f.iconClass.open);
				}
				elEl.children().children().toggle();
			},
			toggleLabelSelected : function(el, labelEl ){
				el.find("li").find("label.selected").removeClass("selected");
				labelEl.addClass("selected");
			},
			addEvent : function( ) {
				var _self = this;
				treeEl.find("li").find("i.indicator").click(function(){
					_self.toggleTreeGroup($(this).closest("li"));
				});
				treeEl.find("li").find("label").click(function(){
					_self.toggleLabelSelected(treeEl, $(this));
					if( param.clickAction != null ) {
						param.clickAction(_self.treeData[$(this).closest("li").attr("item-id")]);
					}
					
				}).contextmenu(function(e){
					e.preventDefault();
					if (e.ctrlKey) {
						e.stopPropagation();
						return;
					};
					_self.toggleLabelSelected(treeEl, $(this));
					
			    });
			},
		};
		
		_treef.makeTopUl();
		
		if ( param.data == undefined || param.data.length == 0 ) {
			_treef.makeEmptyTree();
		} else {
			_treef.makeTree();
			_treef.addEvent();
		}
		
		var ctxMenu = new treeContextMenu(treeEl, param, _treef.treeData);
		
		return {
			getTreeData : function(){
				return _treef.treeData;
			}
		};
	};
	
	

	return {
		initialize : _f.init,
		initMsg    : _f.initMsg,
		render : function(el, paramObj ) {
			var param = $.extend(true, {}, _f.options, paramObj);
			return new treeMaker(el, param );
		}
	};
	
});