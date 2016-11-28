package com.art.app.common.component;

import java.util.Hashtable;
import java.util.Map;

/**
 * 공통 상수 처리 클래스 ( enum 활용 )
 * @author zerowater
 *
 */
public class BasicConstants 
{
	/***************************************************************
	 * return constants..
	 ****************************************************************/
	public static Map<String,Map<String,Object>> getConstantsMap()
	{
		Map<String,Map<String,Object>> constantMap = null;
		Class<?>[] enums = null;
		String enumName = "";
		try
		{
			constantMap = new Hashtable<String, Map<String,Object>>();
			enums = BasicConstants.class.getClasses();
			for( Class<?> enumCls : enums )
			{
				enumName = enumCls.getSimpleName();
				constantMap.put(enumName, new Hashtable<String,Object>());
				for(Object obj : enumCls.getEnumConstants()) 
				{
					constantMap.get(enumName).put(obj+"", obj.getClass().getDeclaredField("code").get(obj));
				}
			}

		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
		
		return constantMap;
	}
	
	/***************************************************************
	  * 결과 코드 정리
	 ****************************************************************/
	public enum RESULT 
	{
		SUCCESS("00"), 
		NO_AUTH("11"), INSUFFICIENT_PARAM("12"), 
		NO_LOGIN_ID("21"), INCOLLECT_PWD("22"), EXPIRED_CHG_PWD("23"),
		UNKNOWN_ERROR("99");
		
		public String code;
       private RESULT(String value) { this.code = value; }
	} 
	
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
	 * 구분자 
	 ****************************************************************/
	public enum DELIMITER
	{
		D1("~|_"), D2("-|_"), D3("=|_");
		public String code ; 
        private DELIMITER(String value) {this.code = value; }
	}
}
