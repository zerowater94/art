package com.art.app.common.component;

import java.util.Hashtable;
import java.util.Map;

import com.art.fw.resource.BasicResultCode;

/**
 * 공통 상수 처리 클래스 ( enum 활용 )
 * @author zerowater
 *
 */
public class BasicConstants 
{
	private static Map<String,Map<String,Object>> constantsMap = null;
	
	/***************************************************************
	 * return constants..
	 ****************************************************************/
	public static void reloadConstantsMap()
	{
		constantsMap = new Hashtable<String, Map<String,Object>>();
		
		Class<?>[] enums = null;
		String enumName = "";
		try
		{
			constantsMap = new Hashtable<String, Map<String,Object>>();
			enums = BasicConstants.class.getClasses();
			for( Class<?> enumCls : enums )
			{
				enumName = enumCls.getSimpleName();
				constantsMap.put(enumName, new Hashtable<String,Object>());
				for(Object obj : enumCls.getEnumConstants()) 
				{
					constantsMap.get(enumName).put(obj+"", obj.getClass().getDeclaredField("code").get(obj));
				}
			}
			
			constantsMap.put("RESULT", BasicResultCode.getResultCodes());

		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
		
	}
	public static Map<String,Map<String,Object>> getConstantsMap()
	{
		if( BasicConstants.constantsMap == null )
		{
			BasicConstants.reloadConstantsMap();
		}
		return BasicConstants.constantsMap ;
	}
	
	
	/***************************************************************
	  * 결과 코드 정리 --> BasicConfig  로 이동
	 ****************************************************************/
	
	
	/***************************************************************
	  * 시스템 역할
	 ****************************************************************/
	public enum SYS_ROLE 
	{
		SETUP_ADMIN("SETUPADM"), 
		SYSTEM_ADMIN("SYSADM"), 
		WORK_ADMIN("WORKADM"), 
		GENERAL_USER("GENERAL");
		
		public String code;
        private SYS_ROLE(String value) { this.code = value; }
	} 
	
	
	/***************************************************************
	 * 로그인 형태 
	 ****************************************************************/
	public enum LOGIN_TYPE
	{
		LOGIN("login"), SETUP("setup");
		public String code;
        private LOGIN_TYPE(String value) { this.code = value; }
	}
	
	/***************************************************************
	 * 사용자 Status 
	 ****************************************************************/
	public enum USER_STATUS
	{
		NORMAR("101","재직"), 
		RETIREMENT("999","퇴직" );
		public String code;
		public String description;
        private USER_STATUS(String code, String description) 
        { 
        	this.code = code; 
        	this.description = description;
        }
	}
	/***************************************************************
	 * 멤버 형태
	 ****************************************************************/
	public enum MEMBER_TYPE
	{
		GROUP("G","그룹"), 
		USER("U","사용자" );
		public String code;
		public String description;
        private MEMBER_TYPE(String code, String description) 
        { 
        	this.code = code; 
        	this.description = description;
        }
	}
	
	
	/***************************************************************
	 * 구분자 
	 ****************************************************************/
	public enum DELIMITER
	{
		D1("~|_"), D2("-|_"), D3("=|_");
		public String code ; 
        private DELIMITER(String value) {this.code = value; }
	}
	
	/***************************************************************
	 * 코드 그룹
	 ****************************************************************/
	public enum CODE_TYPE
	{
		GROUP("G"), CODE("C");
		public String code ; 
        private CODE_TYPE(String value) {this.code = value; }
	}
	
	/***************************************************************
	 * 부서 형태 
	 ****************************************************************/
	public enum USER_DEPT_TYPE
	{
		ORIGINAL("O","원부서"), 
		ADDITIONAL("A","겸직부서" ),
		DISPATCHED("D","파견부서");
		public String code;
		public String description;
        private USER_DEPT_TYPE(String code, String description) 
        { 
        	this.code = code; 
        	this.description = description;
        }
	}
	
	/***************************************************************
	 *  권한 그룹 형태
	 ****************************************************************/
	public enum AUTH_GROUP_TYPE
	{
		AUTH_GROUP_DIRECTORY("DIRECTORY", "디렉토리"),
		AUTH_GROUP("AUTHGROUP", "권한그룹");
		public String code;
		public String description;
        private AUTH_GROUP_TYPE(String code, String description) 
        { 
        	this.code = code; 
        	this.description = description;
        }
	}
}
