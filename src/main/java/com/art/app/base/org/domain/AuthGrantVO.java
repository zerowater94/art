package com.art.app.base.org.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class AuthGrantVO extends AbstractVO 
{
	private String authGrantId = "";
	private String authAssignId = "";
	private String authGrantType = "";
	private String description = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getAuthGrantId() { return authGrantId; }
	public String getAuthAssignId() { return authAssignId; }
	public String getAuthGrantType() { return authGrantType; }
	public String getDescription() { return description; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	public void setAuthGrantId(String str)
	{
		if (str != null)
			this.authGrantId = str;
	}
	public void setAuthAssignId(String str)
	{
		if (str != null)
			this.authGrantId = str;
	}
	public void setAuthGrantType(String str)
	{
		if (str != null )
			this.authGrantType = str;
	}
	public void setDescription(String str) 
	{
		if( str != null) 
			this.description = str;
	}
}
