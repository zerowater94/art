package com.art.fw.resource;

import java.util.Hashtable;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class BasicMsg extends AbstractBasic
{
	protected Logger logger = LoggerFactory.getLogger(this.getClass()) ;
	private static Map<String, Map<String,Properties>> msgMap = null ; // locale 별 module 별 Properties

	private boolean propertyMsgBln = false;
	private String msgFilePath = "";
	
	/**********************************************************************
	 * 
	 *  getter
	 * 
	 ***********************************************************************/
	/**
	 * 언어별 Message 목록을 리턴한다. 
	 */
	public static Map<String,Properties> getMessageMap(String locale)
	{
		return BasicMsg.msgMap.get(locale);
	}
	
	/**********************************************************************
	 * 
	 *  setter
	 * 
	 ***********************************************************************/
	public void setPropertyMsg(boolean bln)
	{
		this.propertyMsgBln = bln;
	}
	
	public void setMsgFilePath(String path)
	{
		this.msgFilePath = path;
	}
	
	/**********************************************************************
	 * 
	 *  initialize message.
	 * 
	 ***********************************************************************/
	/**
	 * 언어별 Message Load..
	 * @throws Exception
	 */
	public void reloadMessage(String module, String locale) throws Exception
	{
		
		if( this.propertyMsgBln )
			this.reloadPropertyMessage(module, locale, this.msgFilePath);
		else
			this.reloadDatabaseMessage(module, locale);
	}
	
	private void reloadDatabaseMessage(String module, String locale) throws Exception
	{
		
	}
	
	private void reloadPropertyMessage(String module, String locale, String filePath) throws Exception
	{
		if( filePath.equals("") )
			filePath = this.msgFilePath;
		
		if( BasicMsg.msgMap == null ) 
			BasicMsg.msgMap = new Hashtable<String,Map<String,Properties>>();

		if( BasicMsg.msgMap.get(locale) == null )
			BasicMsg.msgMap.put(locale , new Hashtable<String,Properties>());
		
		String propPath = filePath+"/msg_";
		if( !module.equals("") && !module.equals(BasicConfig.DEF_MSG_MODULE)  )
			propPath += "_"+module;
		
		propPath += locale+".properties";
		BasicMsg.msgMap.get(locale).put(module, super.getProperties(propPath));
	}
}
