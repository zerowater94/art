define(['jquery'], function ($) {
    
    var _this = this;
    
    _this.inputOnlyNumber = function(obj)  {
        obj.val(obj.val().replace(/[^0-9]/g,""));
    };


    _this.inputOnlyEng = function(obj) {
        obj.val(obj.val().replace(/[^\!-z]/g,""));
    };

    _this.isEmpty = function(data)
    {
    	if( data == undefined || data == null )
    		return true;
    	
        for (var i=0; i < data.length; i++)
        {
            if (data.substring(i, i+1) != " ")
            {
                return false;
            }
        }
        return true;
    };

    _this.getLength = function(s,b,i,c)
    {
    	if( s == undefined || s == null )
    		return 0;
    	
        for( b=i=0; c=s.charCodeAt(i++); b+=c>>11?3:c>>7?2:1);
        return b;
    };

    _this.isEnglish = function(str)
    {
        var reEng = /^[a-z]+$/;
        return reEng.test(str);
    };

    _this.isNumber = function(str)
    {
        var reEng = /^[0-9]+$/;
        return reEng.test(str);
    };

    _this.isEngNumber = function(str)
    {
        var reEng = /[a-zA-Z0-9]/g;
        return reEng.test(str);
    };

    _this.isDate = function(str)
    {
        var chkDate = str.replace(/[/\-.:]/g,"");
        // pattern yyyymmdd ()()() 기준
        var reDate = /(?:19|20\d{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])/;
        return reDate.test(chkDate);
    };

    _this.compareDateToDay = function(compareDate)
    {
        return _this.compareDate(compareDate, $.datepicker.formatDate('yy/mm/dd', new Date()));
    };

    _this.compareDate = function(beforeDate, afterDate)
    {
        var bDate = beforeDate.replace(/[/\-.:]/g,"");
        var aDate = afterDate.replace(/[/\-.:]/g,"");

        if( !_this.isDate(bDate) || !_this.isDate(aDate) )
            return false;

        if( aDate >= bDate )
            return true;
        else
            return false;
    };

    _this.isInHangul = function(str)
    {
        var tempStr = "";
        var temp = 0;
        var onechar;	 
        tempStr = new String(str);
        temp = tempStr.length;

        for(var k=0; k<temp;k++)
        {
            onechar = tempStr.charAt(k);	 
            if(escape(onechar).length > 4)
            {
               return true;	 
            }
        }
        return false;
    };

    _this.isNonHangul = function(str)
    {
        var reEng = /[a-zA-Z0-9\/-=&_+]+\|{0,1}/g;
        return reEng.test(str);

    };

    _this.addCommaStr = function(data)
    {
        data = data.replace(/[A-Za-z$-,]/g, "");
        data = data.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return data;
    };


    _this.removeCommaStr = function(data)
    { 
        data = data.replace(/[A-Za-z$-,]/g, "");
        return data;
    };

    _this.setClientIPAddr = function(jsSelector)
    {
        $.getJSON("http://jsonip.com?callback=?", function (data)   {
            jsSelector.val(data.ip);
        });
    };

    _this.convertHangul = function(val)
    {
        var han = new Array("","일","이","삼","사","오","육","칠","팔","구");  
        var dan = new Array("","십","백","천");
        var unit = new Array('','만 ','억 ','조 ','경 ');

        var num = this.removeCommaStr(val);
        var out = "";
        var danIdx = 0;
        var unitIdx = 0 ;
        var str = "";
        var index = 0 ;
        var unitAmt = "";

        for (var i = num.length; i > 0; i--)     {
            str = "";

            str += han[num[(i-1)]];
            // 단위별로 0일 경우 처리를 위해서


            // 단처리
            if( num[(i-1)] > 0 ) {
                str += dan[danIdx];
            }		
            danIdx++;

            if( danIdx%4 == 0) {
                danIdx = 0;
            }

            // 단위 처리
            if( index%4 == 0) {
                str+= unit[unitIdx];

                if( unitAmt != '' && parseFloat(unitAmt,10) == 0 )  {
                    out = out.replace(unit[(unitIdx-1)], "");
                }

                unitIdx++;
                unitAmt = "";
            }
            unitAmt = num[(i-1)]+unitAmt;

//						if( index%3 == 0)
//						{
//							str+= " ";
//						}
            index++;
            out =  str + out;
        }
        return out;
    };

    /**
     * replaceAll
     * @param str
     * @param searchStr
     * @param replaceStr
     */
    _this.replaceAll = function (str, searchStr, replaceStr)
    {
        var tempStr = str;
        var rtnStr = "";
        var cnt = 0;
        var itmp ;
        while( tempStr.indexOf(searchStr) != -1)
        {
            itmp = tempStr.indexOf(searchStr);
            rtnStr += tempStr.substring(0, itmp);
            rtnStr += replaceStr;
            tempStr = tempStr.substring(itmp+searchStr.length);
        }
        rtnStr += tempStr;

        return rtnStr;
    };


    /**
     * 특수문자를 html태그로 변환.
     * @param str
     * @returns
     */
    _this.toHtmlFormat = function (str)
    {
        var self = this;
        if( str == undefined || str == "" || str == null )
            return "&nbsp;";

        str = self.replaceAll(str, "&"  ,"&amp");
        str = self.replaceAll(str, "<"  ,"&lt");
        str = self.replaceAll(str, ">"  ,"&gt");
        str = self.replaceAll(str, "\n" ,"<br>");
        str = self.replaceAll(str, " "  ,"&nbsp;");

        return str;
    };

    /**
     * HTML to TEXT
     * @param str
     * @returns
     */
    _this.htmlToText = function (str)
    {
        var self = this;
        if( str == undefined || str == "" || str == null )
            return "";

        str = self.replaceAll(str, "\"", "&quot;");
        str = self.replaceAll(str, "<"  ,"&lt");
        str = self.replaceAll(str, ">"  ,"&gt");
        str = self.replaceAll(str, "'", "\'");
        str = self.replaceAll(str, "\n", "<br>");
        str = self.replaceAll(str, "\r", "<br>");
        str = self.replaceAll(str, "\r\n", "<br>");

        return str;
    };

    /**
     * HTML to Text
     * <br>제외
     * @param str
     */
    _this.htmlToText2 = function(str)
    {
        var self = this;
        if( str == undefined || str == "" || str == null )
            return "";

        str = self.replaceAll(str, "\"", "&quot;");
        str = self.replaceAll(str, "<"  ,"&lt");
        str = self.replaceAll(str, ">"  ,"&gt");
        str = self.replaceAll(str, "'", "\'");

        return str;
    };


    _this.htmlToJSText = function (str)
    {
        var self = this;
        if( str == undefined || str == "" || str == null )
            return "";

        str = self.replaceAll(str, "\"", "\\\"");
        str = self.replaceAll(str, "'", "\\'");
        str = self.replaceAll(str, "\n", "\\n");
        str = self.replaceAll(str, "\r", "\\n");
        str = self.replaceAll(str, "\r\n", "\\n");

        return str;
    };

    /**
     * comma를 추가 한다.
     */
    _this.addComma = function(data)
    { 
        data = data.replace(/[A-Za-z$-,]/g, "");
        data = data.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return data;
    };

    /**
     * comma를 삭제 한다.
     */
    _this.delComma = function(data)
    { 
        data = data.replace(/[A-Za-z$-,]/g, "");
        return data;
    };

    /**
    * UUID를 리턴한다.
    */
    _this.generateUUID = function (){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now();; //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
    

    /**
     * file size 를 byte 단위 형태로 표시 한다.
     * bytes : 총 byte
     * isReal : 1024 or 1000
     * byteExp : K - 2, M- 3....
     */
    _this.convertFileSize = function(bytes, isReal, byteExp ) {
   	 
       	 var kUnit = 1000;
       	 if( isReal != undefined && isReal )
       		 kUnit = 1024;
       	 
       	 var exp = Math.log(bytes) / Math.log(kUnit) | 0;
       	 if( byteExp != undefined )
       		 exp = byteExp;
   	 
	     var result = (bytes / Math.pow(kUnit, exp)).toFixed(2);

	     return result + ' ' + (exp == 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B');
    };
    
    /**
     * 사용자의 단위를 실제 byte로 계산 한다
     * 1000 --> 1024
     */
    _this.converFileSizeToByte = function( bytes ) {
   	 
   	 	var exp = Math.log(bytes) / Math.log(1000) | 0;
	     var result = (bytes / Math.pow(1000, exp)).toFixed(2);
	     
	     return result * Math.pow(1024, exp) ;
    }; 
    
    /**
     * URL중에서 ? 뒤의 get parameter에 대해서 JSON Object 형태로 변환해서 리턴한다.
     */
    _this.getUrlParams = function(url) {
    	
    	if( url == undefined || _this.isEmpty(url) )
    		return "";

    	var paramString = url;
    	if( paramString.indexOf("?") > -1 ) {
    		paramString = url.substring(url.indexOf("?")+1);
    	}
    	
    	
    	if( paramString == "" )
    		return {};
    	
    	return JSON.parse('{"' + decodeURI(paramString.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
    		
    };

    /**
    * array 에서 keyObj를 찾아서 index를 리턴한다.
    */
    _this.findIndex = function (arry, keyObj)
    {
        for (var i = 0; i < arry.length; i++) {

            var isSameData = false;
            for(var key in keyObj) {
                if (arry[i][key] == keyObj[key]) {
                    isSameData = true;
                }else {
                    isSameData = false;
                    break;
                }
            }

            if( isSameData )
                return i;
        }
        return -1;
    };
    /**
     * 특정 날짜를 가져온다
     */
    _this.getDate = function(gap, c, f) {
    	var toDay = new Date();
    	var year = toDay.getFullYear();
    	var month = toDay.getMonth();
    	var day = toDay.getDate();
    	
    	if( gap !== undefined ) {
    		
    		if( c == undefined ) {
    			c = "D";
    		}
    		
    		if( c == "D") {
    			day = day+gap;
    		} else if ( c == "M") {
    			month = month+gap;
    		}else if ( c == "Y") {
    			year = year+gap;
    		}
    	}
    	
    	if( f !== undefined )
    		return _this.getDateFormat(new Date(year, month, day), f);
    	else
    		return new Date(year, month, day);
    	
    };
    
    _this.getDateFormat = function( d, f ) 
    {
    	if (!d.valueOf()) return " ";
    	
    	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    	
    	if ( String.zf === undefined ) {
    		String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
			String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
			Number.prototype.zf = function(len){return this.toString().zf(len);};
    	}
    	
    	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
	        switch ($1) {
	            case "yyyy": return d.getFullYear();
	            case "yy": return (d.getFullYear() % 1000).zf(2);
	            case "MM": return (d.getMonth() + 1).zf(2);
	            case "dd": return d.getDate().zf(2);
	            case "E": return weekName[d.getDay()];
	            case "HH": return d.getHours().zf(2);
	            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
	            case "mm": return d.getMinutes().zf(2);
	            case "ss": return d.getSeconds().zf(2);
	            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
	            default: return $1;
	        }
	    });
    }
    
    /**
     * array 에서 keyObj를 찾아서 object를 리턴한다..
     */
     _this.findObject = function (arry, keyObj)
     {
    	 
         if( arry == null )
             return null;
         
         for (var i = 0; i < arry.length; i++) {

             var isSameData = false;
             for(var key in keyObj) {

                 if (arry[i][key] == keyObj[key]) {
                     isSameData = true;
                 }else {
                     isSameData = false;
                     break;
                 }
             }

             if( isSameData )
                 return arry[i];
         }
         return null;
     };


    return _this;
});


