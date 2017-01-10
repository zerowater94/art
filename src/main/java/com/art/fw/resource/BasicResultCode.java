package com.art.fw.resource;

import java.lang.reflect.Field;
import java.util.Hashtable;
import java.util.Map;

import com.art.app.common.component.BasicInfo;
import com.art.fw.domain.CodeValueVO;
import com.art.fw.util.CommonUtil;

public class BasicResultCode extends AbstractBasic
{
	private static Map<String, Map<String,CodeValueVO>> resultCodeMap = null;
	private static Map<String,Object> codeMap = null;
	
	
	public static final String SUCCESS            = "00";
	
	public static final String NO_AUTH 			  = "11";
	public static final String INSUFFICIENT_PARAM = "12";
	public static final String ILLEGAL_ACCESS 	  = "13";
	
	public static final String NO_LOGIN_ID        = "21";
	public static final String INCOLLECT_PWD      = "22";
	public static final String EXPIRED_CHG_PWD    = "23";
	
	public static final String ALEADY_DATA        = "31";
	public static final String SQL_ERROR          = "32";
	
	public static final String FAIL_INSERT 	      = "41";
	public static final String FAIL_UPDATE 	      = "42";
	public static final String FAIL_DELETE 		  = "43";
	public static final String UNKNOWN_ERROR      = "99";
	
	
	public static void reloadResultCode()
	{
		BasicResultCode.resultCodeMap = new Hashtable<String, Map<String,CodeValueVO>>();
		Field[] fArry = null;
		String constantName = "";
		String constantCode = "";
		Map<String, CodeValueVO> resultCodeMsg = null;
		try
		{
			fArry = BasicResultCode.class.getFields();
			BasicResultCode.codeMap = new Hashtable<String,Object>();
			for( String locale : BasicConfig.getLocales())
			{
				resultCodeMsg = new Hashtable<String, CodeValueVO>();
				for( Field field : fArry )
				{
					constantName = field.getName();
					constantCode = (String)field.get(constantName);
					resultCodeMsg.put(constantCode, new CodeValueVO(constantCode,BasicResultCode.getMsg(constantName, locale)));
					BasicResultCode.codeMap.put(constantName, constantCode);
				}
				BasicResultCode.resultCodeMap.put(locale, resultCodeMsg);
			}
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
	}
	
	public static Map<String,Object> getResultCodes()
	{
		return BasicResultCode.codeMap;
	}
	
	public static Map<String,CodeValueVO> getResultCodeMap(String locale )
	{
		return BasicResultCode.resultCodeMap.get(locale);
	}
	
	private static String getMsg( String key , String locale )
	{
		switch(key) 
		{
			case "SUCCESS" : 
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.success.exec", locale),"Success");
			case "NO_AUTH":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.poorAuthoriry", locale),"Insufficient authority");
			case "INSUFFICIENT_PARAM":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.poorParam", locale),"Insufficient paremeter");
			case "ILLEGAL_ACCESS":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.illegalAccess", locale),"Illegal Access");
			case "NO_LOGIN_ID":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.uncollectLogin", locale),"Not found login id");
			case "INCOLLECT_PWD":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.uncollectLogin", locale),"incollect password");
			case "EXPIRED_CHG_PWD":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.expiredPwdChange", locale),"expired password period");
			case "ALEADY_DATA":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.existSameData", locale),"aleady exist data");
			case "SQL_ERROR":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.execDao", locale),"accure to execute database");
			case "FAIL_INSERT":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.insert", locale),"msg.fail.insert");
			case "FAIL_UPDATE":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.update", locale),"msg.fail.update");
			case "FAIL_DELETE":
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.fail.delete", locale),"msg.fail.delete");
			default :
				return CommonUtil.null2str(BasicInfo.getDefaultMsg("msg.result.success", locale),"accured unknown error");

		}
	}
}
