requirejs.config({
    baseUrl: '',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
    	'jquery'      	    : 'libs/jquery/jquery-1.11.3.min',
    	'jquery-ui'      	: 'libs/jquery/jquery-ui.min',
    	'underscore'		: 'libs/require/underscore-min',
    	'text'	  		    : 'libs/require/text',
    	'moment'            : 'libs/moment/moment.min',
    	'backbone'  		: 'libs/backbone/backbone-min',
	    'bootstrap-file'    : 'libs/fileinput/js/fileinput.min',
	    'bootstrap' 		: 'libs/bootstrap/js/bootstrap.min',
	    'bootstrap-dialog'  : 'libs/bootstrap/js/bootstrap-dialog',
	    'bootstrap-menu'    : 'libs/bootstrap/js/BootstrapMenu.min',
		'blockUi'           : 'libs/jquery.blockui/jquery.blockUI',
		'alertify'			: 'libs/alertify/js/alertify.min',
		'amChart'			: 'libs/amcharts/amcharts',
		'amSerial'			: 'libs/amcharts/serial',
		'amPie' 			: 'libs/amcharts/pie',
	    'mngEvent' 		    : 'fw/manager/eventManager',
	    'mngRouter' 		: 'fw/manager/routerManager',
		'basicUtil' 		: 'fw/util/basicUtil',
	    'basicValid' 		: 'fw/util/basicValidator'	,
	    'basicInfo' 		: 'common/basicInfo',
	    'wgHelper' 			: 'fw/manager/widget/wgHelper',
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
        },
    },
});
