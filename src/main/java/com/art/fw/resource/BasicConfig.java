package com.art.fw.resource;

import java.util.Map;
import java.util.Properties;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.core.joran.spi.JoranException;

/**
 * configure 파일을 load 한다 ( Server 기동시 )
 * applicaitonContextApp.xml 파일에 정의됨 
 * 
 * @author zerowater
 *
 */
public class BasicConfig extends AbstractBasic
{
	private static BasicRes basicRes = null;
	private static BasicMsg basicMsg = null;
	
	private static String[] locales = null;
	private static String defaultLocale = "";
	
	public static final String DEF_MSG_MODULE = "common";
	
	/**********************************************************************
	 * 
	 *  basic Properties....( app.properties )
	 * 
	 ***********************************************************************/

	/**
	 * BasicResource  설정
	 * @param path
	 * @throws Exception
	 */
	public void setLoadBasicRes(String path) throws Exception
	{
		BasicConfig.basicRes = new BasicRes();
		BasicConfig.basicRes.reloadProperties(path);
		// locales 및 default locale set
		BasicConfig.locales = BasicConfig.getProperty("LOCALES").split(",");
		BasicConfig.defaultLocale = BasicConfig.getProperty("DEFAULT_LOCALE");
	}
	
	public static String getProperty(String key)
	{
		return BasicRes.getString(key);
	}
	
	public static int getPropertyInt(String key)
	{
		return BasicRes.getInt(key);
	}
	
	public static Properties getProperties()
	{
		return BasicRes.getProperties();
	}
	
	/**
	 * Default  locale을 리턴한다.
	 * @return
	 */
	public static String getDefaultLocale()
	{
		return BasicConfig.defaultLocale;
	}
	
	public static String[] getLocales()
	{
		return BasicConfig.locales;
	}
	
	/**********************************************************************
	 * 
	 *  Log Back....
	 * 
	 ***********************************************************************/
	public void setLoadLogBack(String path) throws Exception
	{
		LoggerContext lc = null;
        JoranConfigurator configurator = null;
        try {
        	
        	lc = (LoggerContext) LoggerFactory.getILoggerFactory();
        	configurator = new JoranConfigurator();
            configurator.setContext(lc);
            lc.reset();

            configurator.doConfigure(super.getResourceStream(path));
            
        } catch (JoranException e) {
            e.printStackTrace();
        }
	}
	
	/**********************************************************************
	 * 
	 *  message...
	 * 
	 ***********************************************************************/
	public void setPropertyMsg(boolean bln)
	{
		if( BasicConfig.basicMsg == null  )
			BasicConfig.basicMsg = new BasicMsg(); 
		BasicConfig.basicMsg.setPropertyMsg(bln);
	}
	
	/**
	 * Message를 로드 하기 위한 Path를 설정 한다.
	 * @param path
	 */
	public void setLoadMessagePath(String path) throws Exception
	{
		if( BasicConfig.basicMsg == null  )
			BasicConfig.basicMsg = new BasicMsg(); 
		BasicConfig.basicMsg.setMsgFilePath(path);
		
		for( String locale : BasicConfig.locales)
			BasicConfig.basicMsg.reloadMessage(BasicConfig.DEF_MSG_MODULE, locale);
	}
	
	public static String getMsg(String key)
	{
		return BasicConfig.getMsg(key, BasicConfig.DEF_MSG_MODULE, BasicConfig.defaultLocale);
	}
	
	public static String getMsg(String key, String module)
	{
		return BasicConfig.getMsg(key, module, BasicConfig.defaultLocale);
	}
	
	public static String getDefaultMsg(String key, String locale)
	{
		return BasicConfig.getMsg(key, BasicConfig.DEF_MSG_MODULE, locale);
	}
	
	public static String getMsg(String key, String module, String locale)
	{
		String value = BasicConfig.getMessageObj(module, locale).getProperty(key);
		if( value == null )
			return "";
		else
			return value;
	}
	
	
	public static Properties getMessageDefaultObj() 
	{
		return BasicConfig.getMessageObj(BasicConfig.DEF_MSG_MODULE, BasicConfig.getDefaultLocale());
	}
	
	public static Properties getMessageDefaultObj(String locale) 
	{
		return BasicConfig.getMessageObj(BasicConfig.DEF_MSG_MODULE, locale);
	}
	
	public static Properties getMessageObj(String module) 
	{
		return BasicConfig.getMessageObj(module, BasicConfig.defaultLocale);
	}
	public static Properties getMessageObj(String module, String locale) 
	{
		Map<String,Properties> rtnMap = BasicMsg.getMessageMap(locale);
		
		if( rtnMap == null || rtnMap.get(module) == null  )
		{
			BasicConfig.basicMsg.reloadMessage(module, BasicConfig.getDefaultLocale());
			rtnMap = BasicMsg.getMessageMap(locale);
		}
			
		return rtnMap.get(module);
	}
}
