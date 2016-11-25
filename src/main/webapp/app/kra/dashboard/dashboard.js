define([ 'abstractView', 'basicInfo', 'basicUtil', 'basicTmpl'
         , 'text!kra/dashboard/dashboard.html'
         , '../../../common/view/basicChart'
         , '../../../common/view/basicGrid'
         , 'amChart'
         , 'amSerial'
         , 'amPie'
         , 'pqGrid'
       ], function ( AbstractView , BasicInfo, BasicUtil, BasicTmpl, Tmpl, ViewChart, ViewGrid) {
	

	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		var _els = {
				
		} ; // elements
		var _f = {
			
			makeLineChart : function() {
				
				var chartData = [
		                 {
		                     "lineColor": "#ffc321",
		                     "date": "2012-01-01",
		                     "duration": 408
		                 },
		                 {
		                     "date": "2012-01-02",
		                     "duration": 482
		                 },
		                 {
		                     "date": "2012-01-03",
		                     "duration": 562
		                 },
		                 {
		                     "date": "2012-01-04",
		                     "duration": 379
		                 },
		                 {
		                     "lineColor": "#fd813c",
		                     "date": "2012-01-05",
		                     "duration": 501
		                 },
		                 {
		                     "date": "2012-01-06",
		                     "duration": 443
		                 },
		                 {
		                     "date": "2012-01-07",
		                     "duration": 405
		                 },
		                 {
		                     "date": "2012-01-08",
		                     "duration": 309,
		                     "lineColor": "#CC0000"
		                 },
		                 {
		                     "date": "2012-01-09",
		                     "duration": 287
		                 },
		                 {
		                     "date": "2012-01-10",
		                     "duration": 485
		                 },
		                 {
		                     "date": "2012-01-11",
		                     "duration": 890
		                 },
		                 {
		                     "date": "2012-01-12",
		                     "duration": 810
		                 }
		             ];
		             var chart;

		          // SERIAL CHART
	                 chart = new AmCharts.AmSerialChart();
	                 chart.dataProvider = chartData;

	                 chart.categoryField = "date";
	                 chart.dataDateFormat = "YYYY-MM-DD";

	                 var balloon = chart.balloon;
	                 balloon.cornerRadius = 6;
	                 balloon.adjustBorderColor = false;
	                 balloon.horizontalPadding = 10;
	                 balloon.verticalPadding = 10;

	                 // AXES
	                 // category axis
	                 var categoryAxis = chart.categoryAxis;
	                 categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
	                 categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
	                 categoryAxis.autoGridCount = false;
	                 categoryAxis.gridCount = 50;
	                 categoryAxis.gridAlpha = 0;
	                 categoryAxis.gridColor = "#000000";
	                 categoryAxis.axisColor = "#555555";
	                 // we want custom date formatting, so we change it in next line
	                 categoryAxis.dateFormats = [{
	                     period: 'DD',
	                     format: 'DD'
	                 }, {
	                     period: 'WW',
	                     format: 'MMM DD'
	                 }, {
	                     period: 'MM',
	                     format: 'MMM'
	                 }, {
	                     period: 'YYYY',
	                     format: 'YYYY'
	                 }];

	                 // as we have data of different units, we create two different value axes
	                 // Duration value axis
	                 var durationAxis = new AmCharts.ValueAxis();
	                 durationAxis.gridAlpha = 0.05;
	                 durationAxis.axisAlpha = 0;
	                 // the following line makes this value axis to convert values to duration
	                 // it tells the axis what duration unit it should use. mm - minute, hh - hour...
	                 durationAxis.duration = "mm";
	                 durationAxis.durationUnits = {
	                     DD: "d. ",
	                     hh: "h ",
	                     mm: "min",
	                     ss: ""
	                 };
	                 chart.addValueAxis(durationAxis);


	                 // GRAPHS
	                 // duration graph
	                 var durationGraph = new AmCharts.AmGraph();
	                 durationGraph.title = "duration";
	                 durationGraph.valueField = "duration";
	                 durationGraph.type = "line";
	                 durationGraph.valueAxis = durationAxis; // indicate which axis should be used
	                 durationGraph.lineColorField = "lineColor";
	                 durationGraph.fillColorsField = "lineColor";
	                 durationGraph.fillAlphas = 0.3;
	                 durationGraph.balloonText = "[[value]]";
	                 durationGraph.lineThickness = 1;
	                 durationGraph.legendValueText = "[[value]]";
	                 durationGraph.bullet = "square";
	                 durationGraph.bulletBorderThickness = 1;
	                 durationGraph.bulletBorderAlpha = 1;
	                 chart.addGraph(durationGraph);

	                 // CURSOR
//	                 var chartCursor = new AmCharts.ChartCursor();
//	                 chartCursor.zoomable = false;
//	                 chartCursor.categoryBalloonDateFormat = "YYYY MMM DD";
//	                 chartCursor.cursorAlpha = 0;
//	                 chart.addChartCursor(chartCursor);
	                 
	                 var chartCursor = new AmCharts.ChartCursor();
	                 chartCursor.cursorPosition = "mouse";
	                 chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
	                 chart.addChartCursor(chartCursor);


	                 var chartScrollbar = new AmCharts.ChartScrollbar();
	                 chart.addChartScrollbar(chartScrollbar);

	                 // WRITE
	                 chart.write("chartdiv");
			}, 
			makeLineChart2 : function() {
				var chartData = [
	                 {
	                     "lineColor": "#ffc321",
	                     "date": "2012-01-01",
	                     "visits": 408,
	                     "visits2": 408
	                 },
	                 {
	                     "date": "2012-01-02",
	                     "visits": 482,
	                     "visits2": 408
	                 },
	                 {
	                     "date": "2012-01-03",
	                     "visits": 562,
	                     "visits2": 408
	                 },
	                 {
	                     "date": "2012-01-04",
	                     "visits": 379,
	                     "visits2": 408
	                 },
	                 {
	                     "lineColor": "#fd813c",
	                     "date": "2012-01-05",
	                     "visits": 501,
	                     "visits2": 408
	                 },
	                 {
	                     "date": "2012-01-06",
	                     "visits": 443,
	                     "visits2": 408
	                 },
	                 {
	                     "date": "2012-01-07",
	                     "visits": 405,
	                     "visits2": 408
	                 },
	                 {
	                     "date": "2012-01-08",
	                     "visits": 309,
	                     "visits2": 408
	                 },
	                 {
	                     "date": "2012-01-09",
	                     "visits": 287,
	                     "visits2": 408
	                 },
	                 {
	                     "date": "2012-01-10",
	                     "visits": 485,
	                     "visits": 408
	                 },
	                 {
	                     "date": "2012-01-11",
	                     "visits": 890,
	                     "visits": 408
	                 },
	                 {
	                     "date": "2012-01-12",
	                     "visits": 810,
	                     "visits": 408
	                 }
	             ];
				
				var makeData = function() {
					
					var chartData = [];
					var firstDate = new Date();
	                firstDate.setDate(firstDate.getDate() - 500);

	                for (var i = 0; i < 500; i++) {
	                    // we create date objects here. In your data, you can have date strings
	                    // and then set format of your dates using chart.dataDateFormat property,
	                    // however when possible, use date objects, as this will speed up chart rendering.
	                    var newDate = new Date(firstDate);
	                    newDate.setDate(newDate.getDate() + i);

	                    var visits = Math.round(Math.random() * 40) - 20;

	                    chartData.push({
	                        date: newDate,
	                        visits: visits
	                    });
	                }
	                console.log(chartData);
	                return chartData;
				};
				
				var chartData = makeData();
				var _param = {
					dataProvider : chartData,
					categoryField : "date",
					bulletSize : 5,
	    			graphs : [],
	    			categoryAxis : {
	    				dateFormats :  [{
	                        period: 'fff',
	                        format: 'JJ:NN:SS'
	                    }, {
	                        period: 'ss',
	                        format: 'JJ:NN:SS'
	                    }, {
	                        period: 'mm',
	                        format: 'JJ:NN'
	                    }, {
	                        period: 'hh',
	                        format: 'JJ:NN'
	                    }, {
	                        period: 'DD',
	                        format: 'DD'
	                    }, {
	                        period: 'WW',
	                        format: 'DD'
	                    }, {
	                        period: 'MM',
	                        format: 'MMM'
	                    }, {
	                        period: 'YYYY',
	                        format: 'YYYY'
	                    }]
	    			}
				};
				
				
				
				_param.graphs.push($.extend(true,new AmCharts.AmGraph(),{
					title : "red line",
					valueField : "visits",
					bullet : "round",
					bulletBorderColor : "#FFFFFF",
					bulletBorderThickness : 2,
					bulletBorderAlpha : 1, 
					lineThickness : 2,
					lineColor : "#5fb503",
					negativeLineColor : "#efcc26",
					hideBulletsCount : 50
				}));
				_param.graphs.push($.extend(true,new AmCharts.AmGraph(),{
					title : "red line",
					valueField : "visits2",
					bullet : "round",
					bulletBorderColor : "#FFFFFF",
					bulletBorderThickness : 2,
					bulletBorderAlpha : 1, 
					lineThickness : 2,
					lineColor : "#5fb503",
					negativeLineColor : "#efcc26",
					hideBulletsCount : 50
				}));
				
				_param.chartScrollbar = new AmCharts.ChartScrollbar();
				
					
				var chart = basicChart.serial.render("chartdiv",_param);
				
				
				chart.zoomToIndexes(chartData.length - 20, chartData.length - 1);
			},
			makePieChart : function() {
				
				 var chartData = [{
		                country: "Czech Republic",
		                litres: 301.90
		            }, {
		                country: "Ireland",
		                litres: 201.10
		            }, {
		                country: "Germany",
		                litres: 165.80
		            }, ];
				 
				 basicChart.pie.render("chartdiv", {
					 dataProvider : chartData,
					 titleField : "country",
					 valueField : "litres",
					 clickEvent : function(event){
						 console.log(event.dataItem.dataContext);
					 }
				 });
				 
				 var chart = new AmCharts.AmSerialChart();
				 console.log(chart);
				 
			},
			makeBarStackChart : function() {
				var chartData = [{
	                 "year": 2003,
	                 "europe": 2.5,
	                 "namerica": 2.5,
	                 "asia": 2.1,
	                 "lamerica": 0.3,
	                 "meast": 0.2,
	                 "africa": 0.1
	             }, {
	                 "year": 2004,
	                 "europe": 2.6,
	                 "namerica": 2.7,
	                 "asia": 2.2,
	                 "lamerica": 0.3,
	                 "meast": 0.3,
	                 "africa": 0.1
	             }, {
	                 "year": 2005,
	                 "europe": 2.8,
	                 "namerica": 2.9,
	                 "asia": 2.4,
	                 "lamerica": 0.3,
	                 "meast": 0.3,
	                 "africa": 0.1
	             }];
				var _param = {
					dataProvider : chartData,
					categoryField : "year",
					graphs : [],
				};
				_param.graphs.push($.extend(true,new AmCharts.AmGraph(), basicChart.elOptions.graphOptions,{
					title : "Europe",
					valueField : "europe",
					lineColor : basicChart.colors[0]
				}));
				_param.graphs.push($.extend(true,new AmCharts.AmGraph(), basicChart.elOptions.graphOptions,{
					title : "Asia-Pacific",
					valueField : "asia",
					lineColor : basicChart.colors[1]
				}));
				_param.graphs.push($.extend(true,new AmCharts.AmGraph(), basicChart.elOptions.graphOptions,{
					title : "Latin America",
					valueField : "lamerica",
					lineColor : basicChart.colors[2]
				}));
				_param.graphs.push($.extend(true,new AmCharts.AmGraph(), basicChart.elOptions.graphOptions,{
					title : "Middle-East",
					valueField : "meast",
					lineColor : basicChart.colors[3]
				}));
				
				var chart = basicChart.barStack.render("chartdiv",_param);
				
				basicChart.toggleDepth(chart);
				

				_els.areaToolbar.find("button").off().click(function(){
					basicChart.toggleDepth(chart);
					$("#chartdiv").find("a[title='JavaScript charts']").css({
						opacity : "0.1",
						right   : "0px",
						left    : "auto",
						top     : "0px",
					}).removeAttr("href");

					console.log(chart.chartDiv);
				});
				
				console.log(chart);
				
				$("#chartdiv").find("a[title='JavaScript charts']").css({
					opacity : "0.1",
					right   : "0px",
					left    : "auto",
					top     : "0px",
				}).removeAttr("href");
				
			},
			makeBarLineChart : function() {
				var chartData = [{
                    "year": 2005,
                    "income": 23.5,
                    "minor": 15.5,
                    "expenses": 18.1,
                    "color": "#04D215",
                },
                {
                    "year": 2006,
                    "income": 26.2,
                    "minor": 15.5,
                    "expenses": 22.8,
                    "color": "#FF0F00",
                },
                {
                    "year": 2007,
                    "income": 30.1,
                    "minor": 15.5,
                    "expenses": 23.9,
                    "color": "#CD0D74",
                },
                {
                    "year": 2008,
                    "income": 29.5,
                    "minor": 15.5,
                    "expenses": 25.1,
                    "color": "#CD0D74",
                },
                {
                    "year": 2009,
                    "income": 24.6,
                    "minor": 15.5,
                    "expenses": 25,
                    "color": "#CD0D74",
                }];
				var _param = {
					dataProvider : chartData,
					categoryField : "year",
					graphs : [],
					position : "bottom",
					rotate   : false,
					startDuration : 1,
					valueAxes : [{
						stackType : "none", // bar type, regular/none/100%/3d
					}]
				};
				_param.graphs.push($.extend(true,new AmCharts.AmGraph(), basicChart.elOptions.graph,{
					title : "Minor",
					valueField : "minor",
					"fillColorsField": "color",

				}));
//				_param.graphs.push($.extend(true,new AmCharts.AmGraph(), basicChart.elOptions.graph,{
//					title : "Income",
//					valueField : "income",
//					lineColor : basicChart.colors[1]
//				}));
				_param.graphs.push($.extend(true,new AmCharts.AmGraph(), basicChart.elOptions.graph,{
					type  : "line",
					title : "Expenses",
					fillAlphas : 0,
					valueField : "expenses",
					lineColor : basicChart.colors[2]
				},$.extend(true, basicChart.elOptions.bullet,{

					bullet : "round",
					bulletColor : basicChart.colors[2],
					bulletBorderThickness : 3,
				})));
				
				
				var chart = basicChart.barStack.render("chartdiv",_param);
				
				// LEGEND
                var legend = new AmCharts.AmLegend();
                 legend = new AmCharts.AmLegend();
                 legend.position = "top";
                 legend.align = "center";
                 legend.markerType = "square";
                 legend.valueText = "aassssssssssssssssssss";
                 chart.addLegend(legend);
				
				basicChart.toggleDepth(chart);
				

				_els.areaToolbar.find("button.btn-success").off().click(function(){
					basicChart.toggleDepth(chart);
					$("#chartdiv").find("a[title='JavaScript charts']").css({
						opacity : "0.1",
						right   : "0px",
						left    : "auto",
						top     : "0px",
					}).removeAttr("href");

					console.log(chart.chartDiv);
				});
				
				_els.areaToolbar.find("button.btn-primary").off().click(function(){
					_f.showModal();
				});
				
				console.log(chart);
				
				$("#chartdiv").find("a[title='JavaScript charts']").css({
					opacity : "0.1",
					right   : "0px",
					left    : "auto",
					top     : "0px",
				}).removeAttr("href");
				
			},
			makeGrid : function() {
				
				var data = [[1, 'Exxon Mobil', '339,938.0', '36,130.0'],
				            [2, 'Wal-Mart Stores', '315,654.0', '11,231.0'],
							[3, 'Royal Dutch Shell', '306,731.0', '25,311.0'],
							[4, 'BP', '267,600.0', '22,341.0'],
							[5, 'General Motors', '192,604.0', '-10,567.0'],
							[6, 'Chevron', '189,481.0', '14,099.0'],
							[7, 'DaimlerChrysler', '186,106.3', '3,536.3'],
							[8, 'Toyota Motor', '185,805.0', '12,119.6'],
							[9, 'Ford Motor', '177,210.0', '2,024.0'],
							[10, 'ConocoPhillips', '166,683.0', '13,529.0'],
							[11, 'General Electric', '157,153.0', '16,353.0'],
							[12, 'Total', '152,360.7', '15,250.0'],
							[13, 'ING Group', '138,235.3', '8,958.9'],
							[14, 'Citigroup', '131,045.0', '24,589.0'],
							[15, 'AXA', '129,839.2', '5,186.5'],
							[16, 'Allianz', '121,406.0', '5,442.4'],
							[17, 'Volkswagen', '118,376.6', '1,391.7'],
							[18, 'Fortis', '112,351.4', '4,896.3'],
							[19, 'Crédit Agricole', '110,764.6', '7,434.3'],
							[20, 'American Intl. Group', '108,905.0', '10,477.0']];

				
				var viewGrid = new basicGrid(_els.areaGrid);
				var grid = viewGrid.render( {
					colModel : [{ dataIndx : 0, title: "Rank", width: "20%", dataType: "integer", editable: false   },
					            { dataIndx : 1, title: "Company", width: "20%", dataType: "string", editable: false  },
					            { dataIndx : 2, title: "Revenues ($ millions)", width: "30%", dataType: "float", align: "right", editable: false  },
					            { dataIndx : 3, title: "Profits ($ millions)", width: "30%", dataType: "float", align: "right", editable: false }],
					dataModel : { 
						data: data 
					},
					pageModel: {type: "local", rPP:20, strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
		            rowClick: function( event, ui ) {
		            	
		            	 var rowIndx = ui.rowIndx,
		                    colIndx = ui.colIndx,
		                    dataIndx = ui.dataIndx,
		                    cellData = ui.rowData[dataIndx];
		            	 
		            	console.log(ui);
		            }

				});


				console.log(_els.areaGrid.width());
				console.log(_els.areaGrid.closest("div").width());
				
				console.log(grid);
				var gridResize = function() {
					grid.pqGrid('option', 'width', _els.areaGrid.width()).pqGrid('refresh');
				}
				
				BasicInfo.addWinResizeEvent("resize-"+_els.areaGrid.selector+"-grid", function(){

					gridResize();
				});
				
				var data2 = [[1, 'Exxon Mobil', '339,938.0', '36,130.0'],
				            [2, 'Wal-Mart Stores', '315,654.0', '11,231.0'],
							[3, 'Royal Dutch Shell', '306,731.0', '25,311.0'],
							[4, 'BP', '267,600.0', '22,341.0'],
							[5, 'General Motors', '192,604.0', '-10,567.0'],
							[6, 'Chevron', '189,481.0', '14,099.0'],
							[7, 'DaimlerChrysler', '186,106.3', '3,536.3'],
							[8, 'Toyota Motor', '185,805.0', '12,119.6'],
							[9, 'Ford Motor', '177,210.0', '2,024.0']];
				console.log(data2);
				
				setTimeout(function(){
					console.log("realod... ");
					
					viewGrid.reloadData(data2);
//					grid.pqGrid('option', 'dataModel.data', data2).pqGrid('refreshDataAndView');
					
				}, 1000);
				
			},
			getGridParam : function(aaaData){
				return {
		            location: "remote",            
		            dataType: "JSON",
		            method: "GET",
		            url: "index.jsp",
		            postData: {
		            	aaa : aaaData
		            },
		            getData: function (dataJSON) {    
		            	console.log('------------------------------');
		            	console.log(dataJSON);
		                return { curPage: dataJSON.curPage, totalRecords: dataJSON.totalRecords, data: dataJSON.data };                
		            }
		        }
			},
			makeGrid2 : function() {
				
				_els.viewGrid2 = new basicGrid(_els.areaGrid2);
				_els.grid2 = _els.viewGrid2.render( {
					colModel : [{ dataIndx : 0, title: "Rank", width: "20%", dataType: "integer", editable: false   },
					            { dataIndx : 1, title: "Company", width: "20%", dataType: "string", editable: false  },
					            { dataIndx : 2, title: "Revenues ($ millions)", width: "30%", dataType: "float", align: "right", editable: false  },
					            { dataIndx : 3, title: "Profits ($ millions)", width: "30%", dataType: "float", align: "right", editable: false }],
					dataModel : _f.getGridParam('aaa'),
			        pageModel: { type: "remote", rPP: 20, strRpp: "{0}" },
		            rowClick: function( event, ui ) {
		            	
		            	 var rowIndx = ui.rowIndx,
		                    colIndx = ui.colIndx,
		                    dataIndx = ui.dataIndx,
		                    cellData = ui.rowData[dataIndx];
		            	 
		            	console.log(ui);
		            }

				});
				
				_els.areaGrid2.find(".pq-grid-header").removeClass("ui-state-default");
				
			},
			showModal : function() {
				
				var _modal = new basicModal(_els.areaModal);
				_modal.render({
					contents : "<div class='row'><div class='col-lg-12'  id='area-modalGrid'><div></div>",
					shownFunction : function() {
						console.log(_modal.getContentsWidth());
						grid.pqGrid('option', 'width',_modal.getContentsWidth()).pqGrid('refresh');
					}
				});
				
				
				_modal.showModal();
				
				var elGrid = _els.areaModal.find("#area-modalGrid");
				
				
				var data = [[1, 'Exxon Mobil', '339,938.0', '36,130.0'],
				            [2, 'Wal-Mart Stores', '315,654.0', '11,231.0'],
							[3, 'Royal Dutch Shell', '306,731.0', '25,311.0'],
							[4, 'BP', '267,600.0', '22,341.0'],
							[5, 'General Motors', '192,604.0', '-10,567.0'],
							[6, 'Chevron', '189,481.0', '14,099.0'],
							[7, 'DaimlerChrysler', '186,106.3', '3,536.3'],
							[8, 'Toyota Motor', '185,805.0', '12,119.6'],
							[9, 'Ford Motor', '177,210.0', '2,024.0'],
							[10, 'ConocoPhillips', '166,683.0', '13,529.0'],
							[11, 'General Electric', '157,153.0', '16,353.0'],
							[12, 'Total', '152,360.7', '15,250.0'],
							[13, 'ING Group', '138,235.3', '8,958.9'],
							[14, 'Citigroup', '131,045.0', '24,589.0'],
							[15, 'AXA', '129,839.2', '5,186.5'],
							[16, 'Allianz', '121,406.0', '5,442.4'],
							[17, 'Volkswagen', '118,376.6', '1,391.7'],
							[18, 'Fortis', '112,351.4', '4,896.3'],
							[19, 'Crédit Agricole', '110,764.6', '7,434.3'],
							[20, 'American Intl. Group', '108,905.0', '10,477.0']];

				var viewGrid = new basicGrid(elGrid);
				var grid = viewGrid.render({
					colModel : [{ dataIndx : 0, title: "Rank", width: "20%", dataType: "integer", editable: false   },
					            { dataIndx : 1, title: "Company", width: "20%", dataType: "string", editable: false  },
					            { dataIndx : 2, title: "Revenues ($ millions)", width: "30%", dataType: "float", align: "right", editable: false  },
					            { dataIndx : 3, title: "Profits ($ millions)", width: "30%", dataType: "float", align: "right", editable: false }],
					dataModel : { 
						data: data 
					},
		            rowClick: function( event, ui ) {
		            	
		            	 var rowIndx = ui.rowIndx,
		                    colIndx = ui.colIndx,
		                    dataIndx = ui.dataIndx,
		                    cellData = ui.rowData[dataIndx];
		            	 
		            	console.log(ui);
		            }

				});
				
				
				
				console.log(viewGrid);
				var gridResize = function() {
					console.log(_modal.getContentsWidth());
					grid.pqGrid('option', 'width',_modal.getContentsWidth()).pqGrid('refresh');
				}
				gridResize();
				
			},
			creatModal : function() {
				basicInfo.send({
	            	url : "libs/bootstrap/js/bootstrap-dialog.js",
	            	dataType : "script",
	            });
				basicInfo.send({
	            	url : "common/view/basicModal.js",
	            	dataType : "script",
	            });
				
			},
			searchMainData : function(){
				
				console.log("))))))))))))))))))))))0");
				var param = {
						url : basicInfo.getDefaultUrl()+"/main/dashboard/get/main",
//						url : "/app/search/api/KRADashBoardAPI_1.jsp",
						type : "get",
						data : {
							colId : "!!",
							mode : "main",
							startDate : '2016-01-01',
							endDate : '2016-01-01',
							seedId : '2016-01-01'
						},
						success : function(data){
							console.log(data);
						}
					};
				basicInfo.send(param);
			},
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		 _this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
			
			var tmpl = _.template(Tmpl);
			thisEl.html(tmpl({
			}));
			
			BasicTmpl.toolbar.render(thisEl.find("#area-toolbar"), {
				id : 'toolbar-option'
			});
			
			_els.areaToolbar = thisEl.find("#toolbar-option");
			_els.areaGrid    = thisEl.find("#area-grid");
			_els.areaGrid2   = thisEl.find("#area-grid2");
			_els.toolbar = _els.areaToolbar.find(".toolbar");
			_els.areaModal = thisEl.find("#area-modal");
			
			BasicTmpl.button.render(_els.toolbar, {name :BasicInfo.getMsg("lbl.add"), btnCls : "btn-success btn-sm btn-grad",callbackFunc : function(){
//				_els.grid2.pqGrid( "option", {dataModel : _f.getGridParam('ccc')}).pqGrid( "refreshDataAndView" );
				console.log("AAA");
				_els.viewGrid2.reloadData();
				console.log("AAA");
			}});
			BasicTmpl.button.render(_els.toolbar, {name :"모달", btnCls : "btn-primary btn-sm btn-grad"});
		};
		
		_this.setElVariable = function() {
			
			_els.areaChart = thisEl.find("#chartdiv");
		};
		
		_this.setEvent = function() {
		};
		
		_this.reloadContents = function() {

			window.basicInfo = BasicInfo;
//			_f.makeLineChart();
//			_f.makeLineChart2();
//			_f.makePieChart();
//			_f.makeBarStackChart();
			_f.makeBarLineChart();
			
			_f.makeGrid();
			_f.makeGrid2();
			_f.creatModal();
			_f.searchMainData();
			
		};
		
		_this.returns = {
			
		};
		
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});
