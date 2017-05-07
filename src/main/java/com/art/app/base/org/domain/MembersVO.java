package com.art.app.base.org.domain;


public class MembersVO extends DeptVO 
{
	private String memberId = "";
	private String memberCode = "";
	private String memberName = "";
	private String parentMemberId = "";
	private String nickName = "";
	private String userStatus = "";
	private boolean groupBln = false;
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getMemberId() { return memberId; }
	public String getMemberCode() { return memberCode; }
	public String getMemberName() { return memberName; }
	public String getParentMemberId() { return parentMemberId; }
	public String getNickName() { return nickName; }
	public String getUserStatus() { return userStatus; }
	public boolean isGroup() { return groupBln; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	public void setMemberId(String memberId)
	{
		if (memberId != null)
			this.memberId = memberId;
	}
	public void setMemberCode(String memberCode)
	{
		if (memberCode != null)
			this.memberCode = memberCode;
	}
	public void setMemberName(String memberName)
	{
		if (memberName != null )
			this.memberName = memberName;
	}
	public void setParentMemberId(String parentMemberId)
	{
		if (parentMemberId != null )
			this.parentMemberId = parentMemberId;
	}
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
	
	public void setIsGroup(boolean isGroup)
	{
		this.groupBln = isGroup;
	}
}
