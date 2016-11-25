window.basicChart = {
	colors : ["#C72C95","#D8E0BD","#69A55C","#B5B8D3","#F4E23B","#B3DBD4"],
	elOptions : {
		bullet : {
			bulletColor : "#FFFFFF",
			bulletBorderColor : "#27c5ff",
			bulletBorderThickness : 2,
			bulletBorderAlpha : 1,
			bullet : "round",
			lineThickness : 2
		},
		graph : {
			title : null,
			labelText : "[[value]]",
			valueField : null,
			type : "column",
			lineAlpha : 0.2,
			columnWidth : 0.23,
			fillAlphas : 1, // bar bgclor alpha
			lineColor  : null,
			balloonText : "<b><span style='color:#7a81be'>[[title]]</b></span><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
			labelPosition : "middle"
		}
	},
	toggleDepth : function(chart) {
		
		if( chart.depth3D == 0 ) {
			chart.depth3D = 20;
            chart.angle = 30;
		} else {
			chart.depth3D = 0;
            chart.angle = 0;
		}
		chart.validateNow();
	},
	pie : {
		options : {
			type : "pie",
			dataProvider : null,
			clickEvent : null,
			theme : "light",
			titleField : "country",
			valueField : "litres",
			outlineColor :"#FFFFFF",
			outlineAlpha : 0.8,
			outlineThickness : 2,
			labelRadius : -35,
			listeners: [{
				event : "clickSlice",
				method : function(event) {
				      console.log(event.dataItem.dataContext);
			    },
			}],
		},
		render : function(elName, obj) {
			basicInfo.send({
            	url : "libs/amcharts/pie.js",
            	dataType : "script",
            });
			var _opt = $.extend(true, {}, this.options, obj);
			if( _opt.clickEvent != null )
				_opt.listeners[0].method = _opt.clickEvent;
			AmCharts.makeChart(elName, _opt);
		}
	},
	serial : {
		options : {
			type : "serial",
			dataProvider : null,
			categoryField : "year", 
			categoryAxis : { // AXES --> Category
				parseDates : true,
				minPeriod : "DD",
				dashLength : 1,
				minorGridEnabled : true,
				twoLineMode : true,
				dateFormats : [],
				axisColor : "#DADADA"
			},
			valueAxes : [{
				dashLength : 1,
				axisAlpha : 0, 
			}],
			chartCursor : {
				cursorPosition : "mouse",
				pan : false, // set it to fals if you want the cursor to work in "select" mode
//				valueBalloonsEnabled: true,
//			    fullWidth: true,
//			    cursorAlpha: 0.1,
//			    valueLineBalloonEnabled: true,
//			    valueLineEnabled: true,
//			    valueLineAlpha: 0.5
			},
			listeners: [{
				event : "clickGraphItem",
				method : function(event) {
					console.log(event.item.index);
					console.log(event.item.category);
			    },
		  }]
		},
		render : function(elName, obj) {
			basicInfo.send({
            	url : "libs/amcharts/serial.js",
            	dataType : "script",
            });
			var _opt = $.extend(true, {}, this.options, obj);
			return AmCharts.makeChart(elName, _opt);
			
		}
	},
	barStack : {
		options : {
			type : "serial",
			dataProvider : null,
			categoryField : "year", 
			plotAreaBorderAlpha : 0.2,
			rotate : true,
			creditsPosition : "top-right", // lecense logo..
			categoryAxis : { // AXES --> Category
				gridAlpha : 0.1,
				axisAlpha : 0,
				gridPosition : "start"  // grid line is placed 
			},
			valueAxes : [{
				stackType : "regular", // bar type, regular/none/100%/3d
				gridAlpha : 0.1,
				axisAlpha : 1, 
			}],
			legend : {   
				position : "bottom",   // 범례 위치
				borderAlpha : 0.3,
				horizontalGap : 10,
				switchType : "v"
			},
			graphs : [],
			chartCursorSettings : {
				valueBalloonsEnabled: true,
			    fullWidth: true,
			    cursorAlpha: 0.1,
			    valueLineBalloonEnabled: true,
			    valueLineEnabled: true,
			    valueLineAlpha: 0.5
			},
			listeners: [{
				event : "clickGraphItem",
				method : function(event) {
					console.log(event.item.index);
					console.log(event.item.category);
			    },
		  }]
		},
		render : function(elName, obj) {
			basicInfo.send({
            	url : "libs/amcharts/serial.js",
            	dataType : "script",
            });
			var _opt = $.extend(true, {}, this.options, obj);
			return AmCharts.makeChart(elName, _opt);
			
		}
	},
	
};