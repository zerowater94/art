package com.art.app.base.system.domain;

public class DeptUserVO extends DeptVO 
{
	private String nickName = "";
	private String userStatus = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getNickName() { return nickName; }
	public String getUserStatus() { return userStatus; }
	
	/****************************************************
	 * getter
	 *****************************************************/
	
	public void setNickName(String nickName) 
	{
		if (nickName != null)
			this.nickName = nickName;
	}
	
	public void setUserStatus(String userStatus)
	{
		if (userStatus != null)
			this.userStatus = userStatus;
	}
}
