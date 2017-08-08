package com.art.app.base.org.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class AuthAssignVO extends AbstractVO 
{
	private String authAssignId = "";
	private String authGroupId = "";
	private String authMemberId = "";
	private String authAssignType = "";
	private String description = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getAuthAssignId() { return authAssignId; }
	public String getAuthGroupId() { return authGroupId; }
	public String getAuthMemberId() { return authMemberId; }
	public String getAuthAssignType() { return authAssignType; }
	public String getDescription() { return description; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	public void setAuthAssignId(String str)
	{
		if (str != null)
			this.authAssignId = str;
	}
	public void setAuthGroupId(String str) 
	{
		if (str != null )
			this.authGroupId = str;
	}
	public void setAuthMemberId(String str)
	{
		if (str != null)
			this.authMemberId = str;
	}
	public void setAuthAssignType(String str)
	{
		if (str != null )
			this.authAssignType = str;
	}
	public void setDescription(String str) 
	{
		if( str != null) 
			this.description = str;
	}
}
