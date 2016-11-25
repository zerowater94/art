package com.art.fw.resource;

import java.util.Properties;

class BasicRes extends AbstractBasic
{
	private static Properties appProp = null;
	
	
	/**
	 * app.properties 항목을 load한다.
	 * @param filePath
	 */
	public void reloadProperties( String filePath )
	{
		appProp = super.getProperties(filePath);
	}
	/**
	 * app.properties 내용을 리턴한다.
	 * @return
	 */
	public static String getString(String code)
	{
		return BasicRes.appProp.getProperty(code);
	}
	
	/**
	 * app.properties 내용을 int 형태로 리턴한다.
	 * @param code
	 * @return
	 */
	public static int getInt(String code)
	{
		try
		{
			return Integer.parseInt(BasicRes.getString(code));
		}catch ( Exception ex )
		{
			return 0;
		}
	}
	
	public static Properties getProperties()
	{
		return BasicRes.appProp;
	}

}
