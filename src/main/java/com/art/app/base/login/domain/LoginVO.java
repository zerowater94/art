package com.art.app.base.login.domain;

import java.util.Iterator;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import com.art.app.common.basic.domain.AbstractVO;
import com.art.fw.domain.JSONObj;

public class LoginVO extends AbstractVO
{
	private String loginId = "";
	private String password = "";
	private String loginType = "";
	
	public LoginVO(JSONObj obj) throws Exception
	{
		try
		{
			this.setterVariable(obj);
		}catch ( Exception ex )
		{
			logger.error(ex.getMessage());
			throw ex;
		}
	}
	
	private void setterVariable(JSONObj obj ) throws Exception
	{
		@SuppressWarnings("unchecked")
		Iterator<String> it = obj.keys();
		String key = "";
		String mtdName = "";
		BeanWrapper beanSetter = new BeanWrapperImpl(this);
		logger.debug("######################## add parameter ####################");
		while( it.hasNext() )
		{
			key = it.next();
			mtdName = key;
			
			if( !key.equals("jsonData"))
			{
				if( beanSetter.isWritableProperty(mtdName) ) 
				{
					beanSetter.setPropertyValue(mtdName, obj.get(key));
					logger.debug(mtdName + " : "+obj.get(key));
				}
			}
		}
		logger.debug("######################## END - add parameter ####################");
	}
	
	/********************************************************
	 * 
	 * setter
	 * 
	 ********************************************************/
	public void setLoginId(String str)
	{
		if( str != null )
			this.loginId = str;
	}
	
	public void setPassword(String str)
	{
		if( str != null )
			this.password = str;
	}
	
	public void setLoginType(String str)
	{
		if( str != null )
			this.loginType = str;
	}
	
	/********************************************************
	 * 
	 * getter
	 * 
	 ********************************************************/
	public String getLoginId() { return this.loginId; }
	public String getPassword() { return this.password; }
	public String getLoginType() { return this.loginType; }
}
