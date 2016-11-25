package com.art.fw.util;

import javax.servlet.http.HttpServletRequest;

/**
 * 
 * Desc	    : Request 처리 API
 * @Author  : 
 * @Date    : 2012. 3. 8.
 * @Version : 1.0
 */
public class RequestUtil {

   

	/**
	 * Client IP 를 가져오기 위한 method
	 * 
	 * @param HttpServletRequest
	 * @return client IP
	 */
	public static String getClientIp(HttpServletRequest request) {
		
		String ip = request.getHeader("X-Forwarded-For");
    	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
    	    ip = request.getHeader("Proxy-Client-IP"); 
    	} 
    	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
    	    ip = request.getHeader("WL-Proxy-Client-IP"); 
    	} 
    	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
    	    ip = request.getHeader("HTTP_CLIENT_IP"); 
    	} 
    	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
    	    ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
    	} 
    	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
    	    ip = request.getRemoteAddr(); 
    	}
    	return ip;
	}
	
	/**
	 * 모바일 여부를 체크 한다. 
	 */
	public synchronized static boolean isMobile (HttpServletRequest request)
	{
		String userAgent = request.getHeader("user-agent");
		boolean chk1 = userAgent.matches(".*(iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson).*");
		boolean chk2 = userAgent.matches(".*(LG|SAMSUNG|Samsung).*");
		return (chk1 || chk2);
	}
	
	/**
	 * User Agent를 약어 형태로 리턴한다.
	 * @param request
	 * @return
	 */
	public synchronized static String getUserAgentAbbrName( HttpServletRequest request )
	{
		String userAgent = request.getHeader("user-agent");
		
		if( userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1)
			return "IE";
		else if( userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1)
			return "Opera";
		else if( userAgent.indexOf("Firefix") > -1 )
			return "FireFox";
		else if( userAgent.indexOf("Chrome") > -1 )
			return "Chrome";
		else if( userAgent.indexOf("Safari") > -1 )
			return "Safari";
		else
			return userAgent;
	}
	
}
