package com.art.app.base.system.domain;

import java.util.List;

import com.art.app.common.basic.domain.AbstractVO;

public class UserVO extends AbstractVO 
{
	private String userId = "";
	private String userName = "";
	private String userNickName = "";
	private String loginId = "";
	private String loginPwd = "";
	private String userStatus = "";
	private String description = "";
	private List<DeptUserVO> userDeptList = null;
	
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getUserId() { return userId; }
	public String getUserName() { return userName ; }
	public String getUserNickName() { return userNickName; }
	public String getLoginId() { return loginId; }
	public String getLoginPwd() { return loginPwd; }
	public String getUserStatus() { return userStatus; }
	public String getDescription() { return description; }
	public List<DeptUserVO> getUserDeptList() { return userDeptList; }
	
	/****************************************************
	 * getter
	 *****************************************************/
	
	public void setUserId(String userId) 
	{
		if ( userId != null )
			this.userId = userId;
	}
	
	public void setUserName(String userName)  
	{
		if ( userName != null )
			this.userName = userName;
	}
	public void setuserNickName(String userNickName) 
	{
		if ( userNickName != null )
			this.userNickName = userNickName;
	}
	public void setLoginId(String loginId) 
	{
		if (loginId != null )
			this.loginId = loginId;
	}
	public void setLoginPwd(String loginPwd) 
	{
		if (loginPwd != null)
			this.loginPwd = loginPwd;
	}
	public void setUserStatus(String userStatus) 
	{
		if (userStatus != null )
			this.userStatus = userStatus;
	}
	public void setDescription(String description) 
	{
		if ( description != null )
			this.description = description;
	}
	
	public void setUserDeptList(List<DeptUserVO> userDeptList)
	{
		this.userDeptList = userDeptList;
	}

}
