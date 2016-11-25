requirejs.config({
    baseUrl: 'app',
   // urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
    	'jquery'      	    : '../libs/jquery/jquery-1.11.3.min',
    	'jquery-ui'      	: '../libs/jquery/jquery-ui.min',
    	'underscore'		: '../libs/require/underscore-min',
    	'text'	  		    : '../libs/require/text',
    	'moment'            : '../libs/moment/moment.min',
    	'backbone'  		: '../libs/backbone/backbone-min',
	    'bootstrap-file'    : '../libs/fileinput/js/fileinput.min',
	    'bootstrap' 		: '../libs/bootstrap/js/bootstrap.min',
	    'bootstrap-dialog'  : '../libs/bootstrap/js/bootstrap-dialog',
		'blockUi'           : '../libs/jquery.blockui/jquery.blockUI',
		'alertify'			: '../libs/alertify/js/alertify.min',
		'amChart'			: '../libs/amcharts/amcharts',
		'amSerial'			: '../libs/amcharts/serial',
		'amPie' 			: '../libs/amcharts/pie',
		'grid' 			    : '../libs/pq-grid/pqgrid.min',
		'basicUtil' 		: '../fw/util/basicUtil',
	    'basicValid' 		: '../fw/util/basicValidator'	,
	    'basicView'         : '../common/view/basicView',
	    'basicTmpl'         : '../common/view/basicTemplate',
	    'basicInfo' 		: '../common/basicInfo'	,
	    'abstractView'      : '../common/view/abstractBackBone',
    },
    shim: {
        'bootstrap' : {
            deps: ['jquery']
        },
        'jquery-ui' : {
        	deps: ['bootstrap']
        },
        'amSerial' : {
            deps: ['amChart']
        },
        'amPie' : {
            deps: ['amChart']
        },
        'pqGrid' : {
            deps: ['jquery','jquery-ui']
        }
    },
});
