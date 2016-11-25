package com.art.fw.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * Date format 관련 Util
 * @author zerowater
 *
 */
public class DateUtil 
{
    
    /*======================================================================================================
	 * 
	 * 날짜 / 시간 
	 * 
	 ======================================================================================================*/
	
	public static Timestamp getCurrentTimestamp() 
	{
    	return new Timestamp(System.currentTimeMillis());
    }
    
    /**
     * yyyy-MM-dd 형식으로 오늘 날짜 가져옴 
     * @return (String)
     */
    public static String getDate() 
    {
        return getDate("yyyy-MM-dd");
    }

    /**
     * 포맷에 맞는 오늘 날짜를 가져온다.
     * @param isLong (true : yyyy-MM-dd HH:mm:ss, false : yyyy-MM-dd)
     * @return (String)
     */ 
    public static String getDate(boolean isLong) 
    {
    	String format = "yyyy-MM-dd"; 
    	
    	if (isLong)
    	{
    		format = "yyyy-MM-dd HH:mm:ss";
    	}
    	else
    	{
            format = "yyyy-MM-dd";    		
    	}

        return getDate(format); 
    }
    
    /**
     * 포맷에 맞는 오늘 날짜를 가져온다.
     * @param format
     * @return (String)
     */
    public static String getDate(String format) 
    {
    	if(CommonUtil.isNull(format))
        {
    		format = "yyyy-MM-dd"; 
        }

        SimpleDateFormat formatter = new SimpleDateFormat (format);
        String dateString = formatter.format(new java.util.Date());

        return dateString;
    }
    
    
    /**
     * Timestamp를 지정된 날짜 형식으로 return
     * @param : ts - Timestamp
     * @param : format - 지정된 날자 형식 String
     * @return String
     */
    public static String getDate(Timestamp ts)
    {
    	return getDate(ts,"yyyy-MM-dd");
    }
    public static String getDate(Timestamp ts, String format)
    {
        if( ts == null )
            return "";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(ts);
    }
    
    
    /**
     * 문자열 date를 지정된 날짜 형식으로 return 
     * @param strDate yyyy-mm-dd hh:mm:ss.fffffffff 형의 날짜 데이타
     * @return long
     */
    public static String getDate(String strDate, String format)
    {
    	if( CommonUtil.isNull(strDate))
    		return "";
    	else
    		return DateUtil.getDate(Timestamp.valueOf(strDate), format);
    }
    
    /**
     * 특정일 기준으로 특정년,월,일 이전 또는 이후의 날짜를 리턴하기 위한 메소드
     * strDate를 기준으로 field의 amount만큼 더한날짜.
     * @param strDate String
     * @param field String
     * @param amount int (이후 : 1,2,4..., 이전 -1, -2, -3...)
     * @return String
     */
    public static String getDate(String strDate, String field, int amount)
    {
        Calendar calendar = Calendar.getInstance();
        setDate( calendar, strDate, field, amount);
        return getDate(new Timestamp(calendar.getTime().getTime()));
    }
    
    public static String getDate(String format,  String strDate, String field, int amount)
    {
        Calendar calendar = Calendar.getInstance();
        setDate( calendar, strDate, field, amount);
        return getDate(new Timestamp(calendar.getTime().getTime()), format);
    }
    
    
    
    /**
     * 문자열 date를 long형으로 바꿔준다.
     * @param strDate yyyy-mm-dd hh:mm:ss.fffffffff 형의 날짜 데이타
     * @return long
     */
    public static long getTime(String strDate)
    {
    	return Timestamp.valueOf(strDate).getTime();
    }
    
    /**
     * 날짜를 비교 하기 위한 메소드
     * date가 compareDate보다 
     *    이후 이면 true
     *    이전 이면 false
     * @param date
     * @param compareDate
     * @return
     */
    public static boolean after(String date, String compareDate ) 
    {
    	Calendar sDate = Calendar.getInstance();
    	Calendar eDate = Calendar.getInstance();
    	setDate( sDate, date, "", 0);
    	setDate( eDate, compareDate, "", 0);
    	return sDate.after(eDate);
    }
    
    public static boolean before(String date, String compareDate ) 
    {
    	Calendar sDate = Calendar.getInstance();
    	Calendar eDate = Calendar.getInstance();
    	setDate( sDate, date, "", 0);
    	setDate( eDate, compareDate, "", 0);
    	
    	return sDate.before(eDate);
    }
    
    public static boolean equalDate(String date, String compareDate)
    {
    	Calendar sDate = Calendar.getInstance();
    	Calendar eDate = Calendar.getInstance();
    	setDate( sDate, date, "", 0);
    	setDate( eDate, compareDate, "", 0);
    	return sDate.equals(eDate);
    }
    
    /**
     * 마지막 날짜를 리턴한다.
     * @param date
     * @return
     */
    public static String getLastDate(String date)
    {
    	return getLastDate(date, "yyyy-MM-dd");
    }
    public static String getLastDate(String date, String format)
    {
    	 Calendar cal = Calendar.getInstance();
    	 setDate(cal, date,"",0);
    	 int lastDate = cal.getActualMaximum(Calendar.DATE);
    	 cal.set(Calendar.DATE, lastDate);
    	 return getDate(new Timestamp(cal.getTime().getTime()), format);
    }
    
    
    /**
     * fromDate ~ endDate 사이의 날짜 월 등을 리턴한다.
     * @param fromDate
     * @param endDate
     * @return
     */
    public static List<String> getDatesBetween(String fromDate, String endDate, String format)
    {
    	Calendar eDate = Calendar.getInstance();
    	DateUtil.setDate( eDate, endDate, "", 0);
    	
    	Calendar sDate = Calendar.getInstance();
    	DateUtil.setDate( sDate, fromDate, "", 0);
    	
    	List<String> rtnList = new ArrayList<String>();
    	
    	while( sDate.before(eDate) || sDate.equals(eDate) )
    	{
    		rtnList.add(DateUtil.getDate(new Timestamp(sDate.getTime().getTime()), format));
    		sDate.add(Calendar.MONTH, 1);
    	}
    	
    	return rtnList;
    }

    /**
     * 특정일 기준으로 특정년,월,일 이전 또는 이후의 날짜를 리턴하기 위한 메소드
     * @param strDate String 기준이 되는 날자
     * @param field String 변경할 field, Y :년, M : 월, D:날
     * @param amount int 변경될 수.
     */
    private static void setDate( Calendar calendar, String strDate, String field, int amount)
    {
        int year = 0;
        int month = 0;
        int day = 0;
        //if( strDate.indexOf("-") > 0 )
        String val = strDate;
        if( val.length() > 8 )
        {
        	val = val.trim();
        	if( val.indexOf("-") > 0 )
        		val = val.replaceAll("-", "");
        	if( val.indexOf("/") > 0 )
        		val = val.replaceAll("/", "");
        	if( val.indexOf(":") > 0 )
        		val = val.replaceAll(":", "");
        }
        
        if( val.length() == 8 )
        {
        	year = Integer.parseInt(val.substring(0,4));
            month = Integer.parseInt(val.substring(4,6));
            day = Integer.parseInt(val.substring(6,8));
        }
        
        calendar.set(year, month - 1, day);
        if( field.equals("Y") )
            calendar.add(Calendar.YEAR, amount);
        else if( field.equals("M") )
            calendar.add(Calendar.MONTH, amount);
        else if( field.equals("D") )
            calendar.add(Calendar.DATE,amount);
    }
}
