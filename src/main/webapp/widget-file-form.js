var bsFileInput = function(thisEl) {
	
	var _this = this;
	
	var _pm   = {
		language : "ko",
		name : "attachFileName", // 파일폼 이름 ( request의 getParam Name ) 
		fileView : {
			mode : null, // 1 : list /  2: imgView  / 3 : excel upload / 4 : grid..
			attachDocId : null, // attach Doc id
			attachDocType : null,  // attach Doc type
			maxHeight    : null,
			className : null, //
			css : null,
			defaultFiles : null,
			useRemove : false,
			excel : {
                url       : "/common/excel/uploadReadExcel", 
                fileName  : null,
                sheetName : null,
            	sheetList : null
            }
		},
		readOnly : false, // not writable.. ( hide input file )
		inputOnly : false, // not view.. 
        multiple : true,
        heightClass : null, // 파일폼 높이( 미리보기 이후의 class)
        viewFooterAction : false,
        tempPath   : null,
        searchUrl  : "/common/file/getAttachedFileList", 
        downloadUrl: "/common/file/download", 
        deleteAttachedFileUrl: "/common/file/deleteAttachedFile", 
        deleteAttachedDocUrl: "/common/file/deleteAttachedDoc", 
        uploadUrl  : "/common/file/uploadTempAttachFiles", 
        deleteUrl  : "/common/file/deleteTempAttachFiles", 
        uploadExtraData:{}, // 부가 적인 정보
        deleteExtraData:{}, // 삭제시의 부가 정보
        allowedFileExtensions : null,
        overwriteInitial: false, // 새로 선택시 기존 데이터 변경
        autoReplace: false,
        showPreview: true,
        showUpload : false,
        maxFileSize:1000000,   // .. kb  ( 1000 : 1M, 1000000:1G, 50000 : 50M, 500000:500M )
        maxFileTotalSize: -1,   // --> 환경 설정 kb  ( 1000 : 1M, 1000000:1G, 50000 : 50M, 500000:500M, -1 : 무한 )
        minFileCount: 0,
        allowedPreviewTypes: false, // ['image', 'html', 'text', 'video', 'audio', 'flash'],
        maxFileCount : 0,
        mainClass : null, // 찾아 보기 있는 input field 스타일.
        viewPreviewFileIcon : true,
        previewFileIconClass: 'font-hg', //  file-icon-2x',
        dropZoneTitle: 'Drag & drop files here &hellip;',
        dropZoneTitleClass : "file-drop-zone-title", // "sm/md/file-drop-zone-title"
        previewSettings : {
            image: {width: "120px", height: "30px"},
            html: {width: "120px", height: "30px"},
            text: {width: "120px", height: "30px"},
            video: {width: "120px", height: "30px"},
            audio: {width: "120px", height: "30px"},
            flash: {width: "120px", height: "30px"},
            object: {width: "120px", height: "30px"},
            other: {width: "120px", height: "30px"}
        },
        previewFileIconSettings: {
            'doc': '<i class="fa fa-file-word-o text-primary"></i>',
            'docx': '<i class="fa fa-file-word-o text-primary"></i>',
            'xls': '<i class="fa fa-file-excel-o text-danger"></i>',
            'xlsx': '<i class="fa fa-file-excel-o text-danger"></i>',
            'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'pptx': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
            'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
            'html': '<i class="fa fa-file-code-o text-info"></i>',
            'htm': '<i class="fa fa-file-code-o text-info"></i>',
            'txt': '<i class="fa fa-file-text-o text-info"></i>',
            'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
            'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
        },
//        layoutTemplates: {
//            actionUpload : '<button type="button" class="kv-file-upload btn btn-white" title="{uploadTitle}">' +
//            '   {uploadIcon}\n</button>\n',
//            actionDelete : '<button type="button" class="kv-file-remove btn btn-tiny btn-outline btn-xs btn-white" style="font-size:10px;"' +
//            'title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n',
//            actions : '<div class="file-actions">\n' +
//            '    <div class="file-footer-buttons">\n' +
//            '        {other}{delete}' +
//            '    </div>\n' +
//            '    <div class="clearfix"></div>\n' +
//            '</div>',
//            footer : '<div class="file-thumbnail-footer">\n' +
//            '    <div class="file-footer-caption" title="{caption}">{caption}</div>{actions}\n' +
//            '    {progress} \n' +
//            '</div>',
//            zoom : ''
//        },
        slugCallback: function(filename) {
            return filename; // .replace('(', '_').replace(']', '_');
        },
//            otherActionButtons : '<button type="button" class="kv-file-zoom btn btn-white" ' +
//            'title="Zoom" {dataKey}><i class="glyphicon glyphicon-search"></i></button>\n',
//            initialPreviewConfig : [
//                {
//                    caption: 'jellyfish.jpg', 
//                    width: '120px', 
//                    url: 'http://localhost/avatar/delete', // server delete action 
//                    key: 101, 
//                    extra: function() { 
//                        return {id: $('#id').val()};
//                    },
//                }
//            ],
        afterFileUpload : null,
        afterFileUploadBatch : null,
        afterSelectFile : null,
        afterClearFile : null,
        afterClearAllFiles : null,
        afterFileUploadError : null,
        afterFileUploadBatchError : null,
        afterFileRemoved : null,
        ajaxSettings : {
            "async" : false
        }
	};
	var _els  = {};
	var _vws  = {};
	var _dts  = {
		result : false,  // 처리 결과 
		savedFileList : null,
		attachedFileCount : 0 ,  // upload된 file count
		attachedFileSize : 0, // upload 파일 총 size.. 
		changeYn : false,
		uploadedFileList : [] // uploaded file list
	};
	
	var excelUploadParam = {
		sheetList : [{
			sheetName : null,
		    colModels : null,
		    readStartRow : 2 , // 읽기 시작할 로우수. 2번째줄.. 
        	dataList : null
		}]
	};
	
	var locale = {
	        fileSingle: 'file',
	        filePlural: 'files',
	        browseLabel: '찾기 &hellip;',
	        removeLabel: 'Remove',
	        removeTitle: 'Clear selected files',
	        cancelLabel: 'Cancel',
	        cancelTitle: 'Abort ongoing upload',
	        uploadLabel: 'Upload',
	        uploadTitle: 'Upload selected files',
	        msgZoomTitle: 'View details',
	        msgZoomModalHeading: 'Detailed Preview',
	        msgSizeTooLarge: '파일... ',
	        msgFilesTooLess: 'You must select at least <b>{n}</b> {files} to upload.',
	        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.',
	        msgFileNotFound: 'File "{name}" not found!',
	        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
	        msgFileNotReadable: 'File "{name}" is not readable.',
	        msgFilePreviewAborted: 'File preview aborted for "{name}".',
	        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
	        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
	        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
	        msgUploadAborted: 'The file upload was aborted',
	        msgValidationError: 'File Upload Error',
	        msgLoading: 'Loading file {index} of {files} &hellip;',
	        msgProgress: 'Loading file {index} of {files} - {name} - {percent}% completed.',
	        msgSelected: '{n} {files} selected',
	        msgFoldersNotAllowed: 'Drag & drop files only! {n} folder(s) dropped were skipped.',
	        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
	        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
	        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
	        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
	        msgImageResizeError: 'Could not get the image dimensions to resize.',
	        msgImageResizeException: 'Error while resizing the image.<pre>{errors}</pre>',
	        dropZoneTitle: 'Drag & drop files here &hellip;'
	    };
	
	var _f = {
			
        makeFileForm : function(  ) {
            var formFileId = _pm.name+"_"+$.guid++;
            thisEl.html("");
            
           // _f.makeFileViewUi();  // 조회 모드 일 경우 화면을 로딩 한다.
            	
            
            if( !_pm.readOnly ){
            	thisEl.append('<div ><input class="form-control file" id="'+formFileId+'" name="'+_pm.name+'" type="file" '+( (_pm.multiple)?"multiple":"")+'></div>');
                
                _els.formFile = thisEl.find("#"+formFileId);
                // param set
                _pm.uploadExtraData.fileFormName = _pm.name;
                
                // excel 일경우.. 
                if( _pm.fileView.mode == 3 ) {
                	_pm.uploadUrl = _pm.fileView.excel.url;
                	var excelObj = $.extend(false, {} , excelUploadParam , _pm.fileView.excel);
        			_pm.uploadExtraData.excelData = JSON.stringify(excelObj);
                }
                if( _pm.allowedFileExtensions != null )
                	_pm.dropZoneTitle = _pm.dropZoneTitle+" [ " + _pm.allowedFileExtensions+" ]";
                else 
                	_pm.dropZoneTitle = _pm.dropZoneTitle ;
                	
                var maxSizeText = "";
                if( _pm.maxFileTotalSize != null && _pm.maxFileTotalSize > 0 ){
                	
                	maxSizeText +=" [ ~ "+_f.convertFileSize(_pm.maxFileTotalSize*1000) ;
                }
                
                if( _pm.maxFileSize > 0  ){
                	
                	if( maxSizeText == "" ) 
                		maxSizeText +=" [ ~ "+_f.convertFileSize(_pm.maxFileSize*1000)+"" ;
                	else {
                		
                		if( _pm.maxFileTotalSize != _pm.maxFileSize )
                			maxSizeText += ", ("+_f.convertFileSize(_pm.maxFileSize*1000) +"/1) ";
                	}
                	
                	// 파일 input에는 1kb = 1024로 계산 해서 넘겨 준다. 
                	_pm.maxFileSize = _f.converFileSizeToByte(_pm.maxFileSize);
                }
                
                if( maxSizeText != "" ) {
                	
                	maxSizeText += " ]";
                }
                	
                _pm.dropZoneTitle += maxSizeText;
                
                if( _pm.tempPath != null )
                	_pm.uploadExtraData.tempPath = _pm.tempPath;
                
                var fn = _els.formFile.fileinput("refresh", _pm);
//                console.log(_els.formFile.fileinput(""));
            }
        },
        searchFileList : function( ) {
        	/**
             * 문서 ID 와 doc type으로 파일 목록을 검색 한다.
             */
        	
        	// doc id가 없으면 데이터를 검색 하지 않음.
//        	if( _pm.fileView.attachDocId == null 
//        			|| _pm.fileView.attachDocType == null )
//        		return;

            var param = {
                url : _pm.searchUrl +"/" + _pm.fileView.attachDocId+"/"+_pm.fileView.attachDocType, // 첨부 파일 문서만.
                type : "GET",
                success : function(data){
                	
                	if ( $.isArray(data) && data.length > 0 )
                		_dts.savedFileList = data;
                	
                	// file list 일경우... 
                	if( _pm.fileView.mode == 1 ){
                		_f.appendFiles.fileList(data); // 파일 목록 생성.
                	}else if( _pm.fileView.mode == 2 ){
                		_f.appendFiles.viewImage(data); // 이미지 미리 보기.
                	}else if( _pm.fileView.mode == 4 ) {
                		_f.appendFiles.appendGrid(data); // 그리드에 표시. 
                	} 
                }
            };
            
            basicInfo.send(param);
        },
        applyCustomCss : function() {

            // small size 처리가 되면 해당 content도 resizing 한다.
            if( _pm.heightClass != "") {

                thisEl.find(".file-preview-frame").addClass(_pm.heightClass).css({
                    width:"auto",
                    height:"auto"
                });

                thisEl.find(".file-preview-frame").children().each(function(index){

                    if( $( this ).hasClass("file-preview-other-footer")
                       || $( this ).hasClass("file-thumbnail-footer") ) {
                        // footer 에 대한 file-actions 버튼 제어.. 
                        // footer 일경우에는 preview를 제외한다.
                    }else {
                        // foot 가 아닌 div는 preview.
                        // $( this ).addClass(_p.heightClass);
                        // 미리 보기 icon을 숨긴다.
                        //                            if( !_p.viewPreviewFileIcon )
                        //                                $( this ).hide();
                    }
                });
            }

            thisEl.find(".file-drop-zone").addClass("wrap-scrollable").css({
                "max-height" : '250px',
                "min-height" : '50px'
            });
        },
        clear : function( ) {
            _els.formFile.fileinput('clear');
            _els.formFile.fileinput('unlock');
        },
        calcFileSizeSavedFiles : function() {
        	
        	if( _dts.savedFileList == null )
        		return 0;
        	else {
        		
        		var len = _dts.savedFileList.length;
        		var totSize = 0 ;
        		var _fObj ; 
        		for( var idx = 0 ; idx < len; idx++ ) {
        			_fObj = _dts.savedFileList[idx];
        			totSize += parseFloat(_fObj.size);
        		}
        	}
        },
        calcFileSize : function() {
        	
        	var selectFiles = _els.formFile.fileinput('getFileStack',true);
        	
        	

        	_dts.attachedFileSize = _f.calcFileSizeSavedFiles() ;
        	
        	if( selectFiles.length > 0 ) {
        		
        		if( _pm.maxFileCount > 0  ) {
            		
        			var saveFiles = (_dts.savedFileList == null)?0:_dts.savedFileList.length;
        			var totCnt = saveFiles+selectFiles.length;
        			
            		if( _pm.maxFileCount < totCnt  ) {
            			
            			_els.formFile.fileinput('showError',basicInfo.getMsg("msg.validMaxFileCount").replace('{#1}', totCnt+"/"+_pm.maxFileCount));
            			return false;
            		}
            	}
        		
        		var filePreView = thisEl.find(".file-preview-frame");
        		var _fObj ;
        		_dts.attachedFileSize = 0 ;
        		for( var idx = 0; idx < selectFiles.length; idx++ ) {
        			_fObj = selectFiles[idx];
        			filePreView.eq(idx).find(".clearfix").html(_f.convertFileSize( _fObj.size, true));
        			_dts.attachedFileSize += parseFloat(_fObj.size);
            	}
        		
        		var realMaxTotalSize = _f.converFileSizeToByte(_pm.maxFileTotalSize*1000) ;
    		     
        		if( _pm.maxFileTotalSize > 0 && ( _dts.attachedFileSize  > realMaxTotalSize) ) {
        			_els.formFile.fileinput('showError',_f.convertFileSize(realMaxTotalSize, true) + basicInfo.getMsg("attach.msg.7") +" , " +_f.convertFileSize(_dts.attachedFileSize, true) );
        			return false;

        		}else {
        			if( thisEl.find(".has-error").length > 0 )
        				_els.formFile.fileinput('resetErrors');
        		}
        	}
        	return true;
        },
        setupEvent : function() {
        	// 파일 선택후의 액션
            _els.formFile.on("filebatchselected", function(event, data, previewId, index){
            	
            	var bResult = _f.calcFileSize();
//            	if( !bResult ){
//            		_f.clear();
//            	}
                _f.applyCustomCss();
                if( _pm.afterSelectFile != null )
                    _pm.afterSelectFile();
            }).on("fileuploaded", function(event, data, previewId, index){
            	 // 파일 저장후의 액션 ( 하나씩 저장된 후 )
                /** data.response 
                {"RESULT":true,"files":[{"imageWidth":0,"fileName":"201602031026214925454483056","imageData":null,"displayName":"sign.jpg","docId":null,"filePath":"D:\\workspace\\appr\\src\\main\\webapp\\ATTACH_FILE_TEMP\\1310000\\201602031026214925454483056","imageHeight":0,"processorId":null,"compId":null,"fileSize":2308,"registerId":null,"fileOrder":0,"registerName":null,"tempYn":null,"fileType":null,"fileId":null,"registDate":"9999-12-31 23:59:59"}]}
                */
            	
                var rstData = data.response;
                
                if( rstData.files != undefined )
                    _dts.uploadedFileList.push(rstData[0]); // 하나씩 저장이 됨. ( file input에서.)
                
                if( _pm.afterFileUpload != null )
                    _pm.afterFileUpload(rstData);
                
                _dts.result = true;
            }).on("filebatchuploadsuccess", function(event, data){
            	 // 파일 저장후의 액션 ( 전체 저장 완료후 )
                var rstData = data.response;
                _dts.uploadedFileList = rstData;
                
                if( _pm.afterFileUploadBatch != null )
                    _pm.afterFileUploadBatch(rstData);
                
                _dts.changeYn = true; // 변경 여부를 true로 변경한다.
                _dts.result = true; // async로 결과를 세팅한다.
            }).on("filecleared", function(event, data, previewId, index){
            	// 파일 clear 후의 액션
            	_f.calcFileSize();
                _f.applyCustomCss();
                if( _pm.afterClearAllFiles != null )
                    _pm.afterClearAllFiles(data, previewId, index);
            }).on("fileclear", function(event, data, previewId, index){
            	 // 파일 clear 후의 액션
            	_f.calcFileSize();
                _f.applyCustomCss();
                if( _pm.afterClearFile != null )
                    _pm.afterClearFile(data, previewId, index);
            }).on("filereset", function(event, data, previewId, index){
            	 // 파일 clear 후의 액션
            	_f.calcFileSize();
                _f.applyCustomCss();
//                console.log("filereset");
                if( _pm.afterClearAllFiles != null )
                    _pm.afterClearAllFiles(data, previewId, index);
            }).on("fileuploaderror", function(event, data, previewId, index) {
            	 // 에러 발생시.. 
                if( _pm.afterFileUploadError != null )
                    _pm.afterFileUploadError(data, previewId, index);
            }).on("filebatchuploaderror", function(event, data, previewId, index) {
            	// 에러 발생시.. 
                if( _pm.afterFileUploadBatchError != null )
                    _pm.afterFileUploadBatchError(data, previewId, index);
            }).on("fileremoved", function(event, data, previewId, index) {
            	
            	_f.calcFileSize();
            	if( _pm.afterFileRemoved != null )
                    _pm.afterFileRemoved();
            	
            });
        },
		/**
         * file size 를 byte 단위 형태로 표시 한다.
         * bytes : 총 byte
         * isReal : 1024 or 1000
         * byteExp : K - 2, M- 3....
         */
		convertFileSize : function(bytes, isReal, byteExp ) {
       	 
	       	 var kUnit = 1000;
	       	 if( isReal != undefined && isReal )
	       		 kUnit = 1024;
	       	 
	       	 var exp = Math.log(bytes) / Math.log(kUnit) | 0;
	       	 if( byteExp != undefined )
	       		 exp = byteExp;
       	 
		     var result = (bytes / Math.pow(kUnit, exp)).toFixed(2);

		     return result + ' ' + (exp == 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B');
        },
        /**
         * 사용자의 단위를 실제 byte로 계산 한다
         * 1000 --> 1024
         */
        converFileSizeToByte : function( bytes ) {
       	 
       	 	var exp = Math.log(bytes) / Math.log(1000) | 0;
		    var result = (bytes / Math.pow(1000, exp)).toFixed(2);
		     
		    return result * Math.pow(1024, exp) ;
        }
	};
	
	
	
	_this.setParams = function( obj ) {
		$.extend(true, _pm, obj);
		console.log(_pm);
	}
	
	_this.render = function() {
		
		_f.makeFileForm();
		_f.setupEvent();
	}
	
	return _this;
}