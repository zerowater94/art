package com.art.app.base.user.domain;

import com.art.fw.domain.SessionInfoVO;

public class UserBasicVO extends SessionInfoVO
{
	private String systemRole = "";
	
	
	/************************************************************************
	 * 
	 * getter..
	 * 
	 ***********************************************************************/
	public String getSystemRole() { return this.systemRole; }
	
	
	
	/************************************************************************
	 * 
	 * setter..
	 * 
	 ***********************************************************************/
	public void setSystemRole(String str)
	{
		if ( str != null )
			this.systemRole =str;
	}
	
}
