package com.art.app.base.org.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class AuthGroupVO extends AbstractVO 
{
	private String authGroupId = "";
	private String authGroupName = "";
	private String authGroupType = "";
	private String parentAuthGroupId = "";
	private String description = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getAuthGroupId() { return authGroupId; }
	public String getAuthGroupName() { return authGroupName; }
	public String getAuthGroupType() { return authGroupType; }
	public String getParentAuthGroupId() { return parentAuthGroupId; }
	public String getDescription() { return description; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	public void setAuthGroupId(String str)
	{
		if (str != null)
			this.authGroupId = str;
	}
	public void setAuthGroupName(String str)
	{
		if (str != null)
			this.authGroupName = str;
	}
	public void setAuthGroupType(String str)
	{
		if (str != null )
			this.authGroupType = str;
	}
	public void setParentAuthGroupId(String str)
	{
		if (str != null)
			this.parentAuthGroupId = str;
	}
	public void setDescription(String str) 
	{
		if( str != null) 
			this.description = str;
	}
}
