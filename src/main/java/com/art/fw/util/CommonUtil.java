package com.art.fw.util;


import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;


public class CommonUtil 
{

	/*======================================================================================================
	 * 
	 * Null 처리  
	 * 
	 ======================================================================================================*/

    /**
     * 만약 값이 Null 값일 경우 "" 값으로 변경해준다.
     * @param value
     * @return (String)
     */
    public static String null2str(String value) 
    {
        return null2str(value, "");
    }

    /**
     * 만약 값이 Null 값일 경우 defaultValue 값으로 변경해준다.
     * @param value	
     * @param defaultValue
     * @return (String)
     */
    public static String null2str(String value
    							 , String defaultValue) 
    {
        return (isNull(value) ? defaultValue : value);
    }

    /**
     * 만약 값이 Null 값일 경우 defaultValue 값으로 변경해준다.
     * @param value
     * @param defaultValue
     * @return (String)
     */
    public static int null2str(String	value
    						  , int 	defaultValue) 
    {
        return (isNull(value) ? defaultValue : Integer.parseInt(value));
    }
    
    /**
     * value 가 NULL 인지 여부
     * @param value
     * @return (boolean) isNull
     */
    public static boolean isNull(String value)
    {
    	boolean isNull = false;
    	
    	if( null == value || "".equals(value) )
        {
    		isNull = true;
        }
    	else
    	{
    		isNull = false;
    	}
    	
    	return isNull;
    }
    
	/*======================================================================================================
	 * 
	 * 문자
	 * 
	 ======================================================================================================*/
    
    
    /**
     * 문자열 str중에 특정 문자 Replace div1을 div2로 replace
     * @param String, String, String
     * @return String
     */
    public static String replace (String str, String div1, String div2)
    {
        int itmp = 0;
        if (str == null) return "";

        String tmp = str;
        StringBuffer sb = new StringBuffer();
        sb.append("");
        while (tmp.indexOf(div1) > -1)
        {
            itmp = tmp.indexOf(div1);
            sb.append(tmp.substring(0,itmp));
            sb.append(div2);
            tmp = tmp.substring(itmp+div1.length());
        }
        sb.append(tmp);
        return sb.toString();
    }

    /**
     * befreStr이 null인경우 특정 문제 afterStr로 return
     * @param beforeStr String
     * @param afterStr String
     * @return String
     */
    public static String replace ( String beforeStr, String afterStr )
    {
        if ( beforeStr == null ) return afterStr;
        else return beforeStr;
    }
    
    /**
     * 자를 문자열이 자를 길이보다 적을 경우 에러 방지
     * 
     * @param str
     * @param begin 
     * @param end
     * @return (String) substring 으로 잘린 문자열
     */
	public static String subString(String str, int begin, int end)
	{
		String rtnStr = "";

		if (end > str.length())
		{
			rtnStr = "";
		}
		else
		{
			rtnStr = str.substring(begin, end);
		}

		return rtnStr;
	}

    /**
     * 자를 문자열이 자를 길이보다 적을 경우 에러 방지
     * 
     * @param str
     * @param begin
     * @return (String) substring 으로 잘린 문자열
     */
	public static String subString(String str, int begin)
	{
		String rtnStr = "";

		if (begin > str.length())
		{
			rtnStr = "";
		}
		else
		{
			rtnStr = str.substring(begin);
		}

		return rtnStr;
	}
	
	

    /**
     * 특수문자를 html태그로 변환.
     * @param str
     * @return (String) html포멧
     */
    public static String toHtmlFormat(String str) 
    {
        if (isNull(str))
            return "&nbsp;" ;

        str = replace(str, "&"  ,"&amp");
        str = replace(str, "<"  ,"&lt");
        str = replace(str, ">"  ,"&gt");
        str = replace(str, "\n" ,"<br>");
        str = replace(str, " "  ,"&nbsp;");

        return str;
    }
    
    /**
     * HTML TO TEXT
     */
    public static String htmlToText(String str)
    {
        if (str == null) return "";

        String tmpStr = str;

        if (tmpStr.indexOf("\"") > -1) tmpStr= replace(tmpStr, "\"", "&quot;");
        if (tmpStr.indexOf("<") > -1) tmpStr = replace(tmpStr, "<", "&lt;");
        if (tmpStr.indexOf(">") > -1) tmpStr = replace(tmpStr, ">", "&gt;");
        if (tmpStr.indexOf("'") > -1) tmpStr = replace(tmpStr, "'", "\'");
        if (tmpStr.indexOf("\r\n") > -1) tmpStr = replace(tmpStr, "\r\n", "<br>");
        if (tmpStr.indexOf("\n") > -1) tmpStr = replace(tmpStr, "\n", "<br>");
        if (tmpStr.indexOf("\r") > -1) tmpStr = replace(tmpStr, "\r", "<br>");
        return tmpStr;
    }

    /**
     * HTML TO TEXT
     * <br>제외
     */
    public static String htmlToText2(String str)
    {
        if (str == null) return "";

        String tmpStr = str;

        if (tmpStr.indexOf("\"") > -1) tmpStr= replace(tmpStr, "\"", "&quot;");
        if (tmpStr.indexOf("<") > -1) tmpStr = replace(tmpStr, "<", "&lt;");
        if (tmpStr.indexOf(">") > -1) tmpStr = replace(tmpStr, ">", "&gt;");
        if (tmpStr.indexOf("'") > -1) tmpStr = replace(tmpStr, "'", "\'");
        return tmpStr;
    }
    
    /**
     * TEXT TO HTML 
     */
    public static String textToHtml(String str)
    {
        if (str == null) return "";

        String tmpStr = str;

        if (tmpStr.indexOf("&quot;") > -1) tmpStr= replace(tmpStr, "&quot;", "\"");
        if (tmpStr.indexOf("&lt;") > -1) tmpStr = replace(tmpStr, "&lt;", "<");
        if (tmpStr.indexOf("&gt;") > -1) tmpStr = replace(tmpStr, "&gt;", ">");
        //if (tmpStr.indexOf("\r") > -1) tmpStr = replace(tmpStr, "\r", "<br>");

        return tmpStr;
    }
    
    public static String htmlToJSText(String str)
    {
        if (str == null) return "";

        String tmpStr = str;

        if (tmpStr.indexOf("\"") > -1) tmpStr= replace(tmpStr, "\"", "\\\"");
        if (tmpStr.indexOf("\r\n") > -1) tmpStr = replace(tmpStr, "\r\n", "\\n");
        if (tmpStr.indexOf("\r") > -1) tmpStr = replace(tmpStr, "\r", "\\n");
        if (tmpStr.indexOf("\n") > -1) tmpStr = replace(tmpStr, "\n", "\\n");
        if (tmpStr.indexOf("'") > -1) tmpStr = replace(tmpStr, "'", "\\'");

        return tmpStr;
    }

    /**
     * 문자열 길이 체크 
     * @param str
     * @return 문자열 길이 
     */
    public static int getLength(String str)
    {
    	return getLength(str, false);
    }

    /**
     * 문자열 길이 체크  
     * @param str
     * @param isUTF8
     * @return 문자열 길이 
     */
    public static int getLength(String str, boolean isUTF8)
    {
        if(isNull(str)) return 0 ;
        
        int retLength = 0;
        int asc;
        
        for ( int i = 1; i<=str.length(); i++)
        {
            asc = (int)str.charAt(i-1);
            if ( asc > 127)
            {
            	if (isUTF8)
            		retLength += 3;
            	else
            		retLength += 2;             	
            }
            else
            {
                retLength++;
            }
        }
        return retLength ;
    }
    
    /**
     * 문자열 자르기 
     * @param str
     * @param byteLength
     * @return (String)
     */
    public static String getCuttedString(String str, int byteLength)
    {
    	return getCuttedString(str, byteLength, false);
    }
    
    /**
     * 문자열 자르기 
     * @param str
     * @param byteLength
     * @param isUTF8
     * @return (String)
     */
    public static String getCuttedString(String str, int byteLength, boolean isUTF8)
    {
    	str = null2str(str);
    	
        String temp = "";
        String tempstr = "";

        int retLength = 0;
        int asc;

        for ( int i = 1; i<=str.length(); i++)
        {
            asc = (int)str.charAt(i-1);
            temp = CommonUtil.subString(str,i-1, i);
            if ( asc > 127)
            {
            	if (isUTF8)
            		retLength += 3;
            	else
            		retLength += 2;
            }
            else
            {
            	retLength++;
            }

            if(retLength > byteLength) {
                tempstr += ".." ;
                break ;
            }
            tempstr += temp ;
        }
        return tempstr ;
    }
    
    /**
     * Comma 제거
     * @param str
     * @return (String)
     */
    public static String removeComma(String str)
    {
        str = null2str(str);

        if (str.indexOf(",") != -1)
        {
            StringBuffer buf = new StringBuffer();
            for (int i = 0; i < str.length(); i++)
            {
                char c = str.charAt(i);
                if (c != ',')  buf.append(c);
            }
            return buf.toString();
        }
        return str;
    }
    
    /**
     * 배열로 리턴  split 함수
     * 
     * @param str
     * @param delim
     * @return String[]
     */
    public static String[] split(String str, String delim)
    {
        List<String> arry = new ArrayList<String>();
        for(StringTokenizer tokenizer = new StringTokenizer(str, delim); 
        tokenizer.hasMoreTokens(); 
        		arry.add(tokenizer.nextToken()));
        String ret[] = (String[])arry.toArray();
        return ret;
    }
    
    
    /**
     * StringTokenizer의 구분자를 이용한 문자열 자르기에서 
     * 구분자를 여러자 사용할수 있도록 한다.
     * @param value
     * @param gubun
     * @return
     */
    public static String[] getMultiTokens(String value, String gubun )
	{
		boolean isMore = true;
		String remainStr = value;
		String[] rtnArry = null;
		List<String> tokenArray = new ArrayList<String>();
		while(isMore)
		{
			if( remainStr.indexOf(gubun) >=  0)
			{
				tokenArray.add(remainStr.substring(0,remainStr.indexOf(gubun)));
				remainStr = remainStr.substring(remainStr.indexOf(gubun)+gubun.length());
			}else
			{
				tokenArray.add(remainStr);
				isMore = false;
			}
		}
		rtnArry = tokenArray.toArray(new String[tokenArray.size()]);
		return rtnArry;
	}
    
    /**
	 * String을 특정 구분자로 잘라서 리턴한다.
	 * @param str
	 * @param gubun
	 * @return
	 */
    public static List<String> getListFromStr(String str, String gubun)
    {
    	return CommonUtil.getListFromStr(str, gubun, false);
    }
	public static List<String> getListFromStr(String str, String gubun, boolean isTrim)
	{
		boolean isMore = true;
		String remainStr = str;
		List<String> list = new ArrayList<String>();
		
		if( str != null )
		{
			while(isMore)
			{
				if( remainStr.indexOf(gubun) >=  0)
				{
					if( isTrim )
						list.add(remainStr.substring(0,remainStr.indexOf(gubun)).trim());
					else
						list.add(remainStr.substring(0,remainStr.indexOf(gubun)));
					remainStr = remainStr.substring(remainStr.indexOf(gubun)+gubun.length());
				}else
				{
					list.add(remainStr);
					isMore = false;
				}
			}
		}
		return list;
	}
	
    /**
     * 왼쪽으로 length만큼 fstr을 채워서 리턴한다.
     * @param str
     * @param length
     * @param fstr
     * @return
     */
    public static String lpad(String str, int length, String fstr)
    {
    	String rtnStr = "";
    	int nullLength = 0;
		if( str != null && str.length() > 0 )
		{
			rtnStr = str;
			//nullLength = length-(CommonUtil.toEnc(str, DB_CHAR_SET)).getBytes().length;
			nullLength = length-str.getBytes().length;
			// nullLength = length-str.length();
		}else
			nullLength = length;
    	if( fstr.length() > 1 )
    		fstr = fstr.substring(0,1);
    	for( int inx=0; inx < nullLength; inx++ )
    	{
    		rtnStr = fstr+rtnStr;
    	}
    	return rtnStr;
    }
    
    /**
     * 오른쪽으로 length만큼 fstr을 채워서 리턴한다.
     * @param str
     * @param length
     * @param fstr
     * @return
     */
    public static String rpad(String str, int length, String fstr)
    {
    	String rtnStr = "";
    	int nullLength = 0;
		if( str != null && str.length() > 0 )
		{
			rtnStr = str;
			//nullLength = length-(CommonUtil.toEnc(str, DB_CHAR_SET)).getBytes().length;
			nullLength = length-str.getBytes().length;
			// nullLength = length-str.length();
		}else
			nullLength = length;
    	
    	if( fstr.length() > 1 )
    		fstr = fstr.substring(0,1);
    	for( int inx=0; inx < nullLength; inx++ )
    	{
    		rtnStr += fstr;
    	}
    	return rtnStr;
    }
    
    public static int getInStr(String str, String gubunja)
    {
    	return str.split("\\"+gubunja,-1).length-1;
    }

	/*======================================================================================================
	 * 
	 * 숫자
	 * 
	 ======================================================================================================*/
    
    /**
     * 숫자 판단
     * @param str
     * @return (boolean) 숫자 여부
     */
	public static boolean isNumber(String str) 
	{  
		boolean check = true;
		for(int i = 0; i < str.length(); i++) 
		{
			// Character클래스의 isDigit() 메소드를 이용하여 문자이면 
			// check에 false를 대입하고 break를 이용하여 for문을 빠져나옴
			if(!Character.isDigit(str.charAt(i))) 
			{
				check = false;
				break; 
			}
		}
		return check;  
	}
	
	
	/**
	 * 영어 인지 판단
	 * @param str
	 * @return
	 */
	public static boolean isEnglish(String str)
	{
		boolean check = true;
		char[] charArray=str.toCharArray();
		for( int inx = 0; inx < charArray.length; inx++ )
		{
			if( !(charArray[inx] >= 'A' && charArray[inx] <= 'Z' || charArray[inx] >= 'a' && charArray[inx] <= 'z') )
			{
				check = false;
				break;
			}
		}
		return check;
	}
	
	/**
     * 숫자를 3자리마다 ,를 붙여 return
     * @param num
     * @return (String)
     */
    public static String parseDecimal(String str, int point, String blank)
    {
    	String rtnStr = "";
    	rtnStr = parseDecimal(str, point);
    	if( rtnStr.equals("0") )
    		rtnStr = blank;
    	return rtnStr;
    }
	
	 /**
     * 숫자를 3자리마다 ,를 붙여 return
     * @param num
     * @return (String)
     */
    public static String parseDecimal(int num)
    {
        DecimalFormat df = new DecimalFormat("###,###,###.##");
        return df.format(num);
    }
	
    
    /**
     * 문자가 15자리 이상 ( 소수점 일경우에는 12자리 이상이면 데이터가 가동됨 )
     * 12자리로 나누워서 따로 계산후 붙여서 리턴함.
     * @param str
     * @param point
     * @return
     */
	public static String parseDecimal(String str, int point)
	{
		String rtnStr = "";
		String numStr = "";
		String expStr = "";
		int maxLength = 12;
		int subLength = 0;
		
		if( str.indexOf(".") > 0 )
		{
			numStr = str.substring(0,str.indexOf("."));
			subLength = str.indexOf(".");
			
		}else
		{
			numStr = str;
			subLength = numStr.length();
		}
		
		
		if( numStr.length() > 23 ) // 24자리 이상은 리턴하지 않는다.
		{
			numStr = "";
		}else if( numStr.length() > maxLength)
		{
			expStr =  str.substring(0,subLength-maxLength);
			numStr = str.substring(subLength-maxLength);
		}else
			numStr = str;
		
		if( numStr.startsWith("0"))
		{
			numStr = addComma("1"+numStr.substring(1),point);
			numStr = "0"+numStr.substring(1);
		}else
			numStr = addComma(numStr,point);
		
		if( expStr.length() > 0)
		{
			rtnStr = addComma(expStr,point);
			rtnStr += ",";
		}
		rtnStr += numStr;
		
		return rtnStr ;
	}
	
   
    
    /**
     * 숫자를 3자리마다 ,를 붙여 return
     * @param num
     * @return (String)
     */
    private static String addComma(String num, int point)
    {
    	String format = "###,###,###";
    	
    	if( num.equals(""))
    		num = "0";
    	
    	if( point > 0 )
    	{
    		format += ".";
    		for( int inx = 0; inx < point; inx++)
    			format += "#";
    	}
    	
        DecimalFormat df = new DecimalFormat(format);
        return df.format( Double.parseDouble(num));
    }
    
    /*======================================================================================================
	 * 
	 * 비트 연산자 
	 * 
	 ======================================================================================================*/
    
    public static byte[] intToByte(int value)
    {
    	byte[] bytes = new byte[4];
    	bytes[0] = (byte)((value & 0xFF000000) >> 24);
    	bytes[1] = (byte)((value & 0x00FF0000) >> 16);
    	bytes[2] = (byte)((value & 0x0000FF00) >> 8);
    	bytes[3] = (byte)(value & 0x000000FF);
    	return bytes;
    }
    
    public static int byteToInt(byte[] bytes)
    {
    	int value = 0 ;
    	if( bytes.length != 4 )
    		return -1;
    	
    	value |= (((int)bytes[0]) << 24 ) & 0xFF000000;
    	value |= (((int)bytes[1]) << 16 ) & 0x00FF0000;
    	value |= (((int)bytes[2]) << 8 ) & 0x0000FF00;
    	value |= (((int)bytes[3]) ) & 0xFF;
    	return value;
    }
    
    public static int swap(int x) 
    {
		return (int)((swap((short)x) << 16) |
				 (swap((short)(x >> 16)) & 0xffff));
    }
    
    
    /*======================================================================================================
	 * 
	 * random 숫자
	 * 
	 ======================================================================================================*/
    /**
     * 특정 범위 내의 random 숫자를 리턴한다.
     * @param n1
     * @param n2
     * @return
     */
    public static int randomRange(int n1, int n2) 
    {
        return (int) (Math.random() * (n2 - n1 + 1)) + n1;
    }
    
    /*======================================================================================================
	 * 
	 * Encoding
	 * 
	 ======================================================================================================*/
    
    /* 한글화 루틴 */
    public static String toKor(String str) 
    {
	  	return toEnc(str, "EUC-KR");
    }
    
    public static String toUTF8(String str) 
    {
	  	return toEnc(str, "UTF-8");
    }
    
    public static String toEnc(String str, String encode) 
    {
    	String ksString = "";
    	try
    	{
		  	
		  	if(str != null && !str.equals("")) 
		  		ksString = new String(str.getBytes("8859_1"), encode);
		  	
    	}catch ( UnsupportedEncodingException _ignore)
    	{
    		_ignore.printStackTrace();
    	}
    	return ksString;
    }
    
    /* 한글화 루틴 */
    public static String toAscii(String str) throws UnsupportedEncodingException
	{
		String rtnStr = null;
		try
		{
			if (str != null)
				rtnStr = new String(str.getBytes("EUC-KR"), "8859_1");
		}catch(java.io.UnsupportedEncodingException ex)
		{
			throw ex;
		}	
		return rtnStr;
	}
}
