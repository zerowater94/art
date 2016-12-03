package com.art.app.common.component;

import java.io.InputStream;
import java.util.Hashtable;
import java.util.Map;

import com.art.fw.resource.BasicConfig;

public class BasicInfo extends BasicConfig
{
	private static String customCssPath = null;
	private static Map<String,BasicFailMsg> failMsgMap = null;
	
	public void setLoadCustomCss(String path) throws Exception
	{
		BasicInfo.customCssPath = path;
	}
	
	public void setInitMsg(boolean isUseBln) 
	{
		if( BasicInfo.failMsgMap == null )
			BasicInfo.failMsgMap = new Hashtable<String, BasicFailMsg>();
		
		for( String locale : BasicInfo.getLocales())
		{
			BasicFailMsg failMsg = new BasicFailMsg();
			failMsg.setInsert(BasicInfo.getDefaultMsg("msg.fail.insert", locale));
			failMsg.setUpdate(BasicInfo.getDefaultMsg("msg.fail.update", locale));
			failMsg.setDelete(BasicInfo.getDefaultMsg("msg.fail.delete", locale));
			failMsg.setPoorParam(BasicInfo.getDefaultMsg("msg.fail.poorParam", locale));
			failMsg.setDaoError(BasicInfo.getDefaultMsg("msg.fail.execDao", locale));
			BasicInfo.failMsgMap.put(locale, failMsg);
		}
	}
	
	public static InputStream getCustomCss(String resFile) throws Exception
	{
		return BasicInfo.getResourceStream(BasicInfo.customCssPath+java.io.File.separator+resFile);
	}
	
	
	public static BasicFailMsg fail(String locale)
	{
		return failMsgMap.get(locale);
	}
	
	public class BasicFailMsg
	{
		private String msgInsert = "fail to Insert";
		private String msgUpdate = "fail to Update";
		private String msgDelete = "fail to Delete";
		private String msgPoorParam = "Insufficient paremeter";
		private String msgDaoError = "accure to execute database ";
		
		private void setInsert(String str ) 
		{
			if( str != null && !str.equals(""))
				this.msgInsert = str;
		}
		
		private void setUpdate(String str ) 
		{
			if( str != null && !str.equals(""))
				this.msgUpdate = str;
		}
		
		private void setDelete(String str ) 
		{
			if( str != null && !str.equals(""))
				this.msgDelete = str;
		}
		
		private void setPoorParam(String str ) 
		{
			if( str != null && !str.equals(""))
				this.msgPoorParam = str;
		}
		
		private void setDaoError(String str)
		{
			if( str != null && !str.equals(""))
				this.msgDaoError = str;
		}
		
		public String insert() { return this.msgInsert; }
		public String update() { return this.msgUpdate; }
		public String delete() { return this.msgDelete; }
		public String poorParam() { return this.msgPoorParam; }
		public String daoError() { return this.msgDaoError; }
	}
}
