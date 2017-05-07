package com.art.fw.domain;

import java.sql.Timestamp;

/**
 * @author zerowater
 *
 */
public class SessionInfoVO 
{
	private String sessionId = "";
	private String siteId = "";
	private String loginId = "";
	private String userId = "";
	private String userName = "";
	private String userConnIp = "";
	private String locale = "";
	private boolean mobileBln = false;
	private String reqUserAgent = "";
	private long maxInactiveInterval = 0;
	private Timestamp createDate = null;
	
	
	/************************************************************************
	 * 
	 * getter..
	 * 
	 ***********************************************************************/
	public String getSessionId() { return this.sessionId; }
	public String getSiteId() { return this.siteId; }
	public String getLoginId() { return this.loginId; }
	public String getUserId() { return this.userId; }
	public String getUserName() { return this.userName; }
	public String getUserConnIp() { return this.userConnIp; }
	public String getLocale() { return this.locale; }
	public boolean isMobile() { return this.mobileBln; }
	public String getReqUserAgent() { return this.reqUserAgent; }
	public long getMaxInactiveInterval(){ return this.maxInactiveInterval; }
	public Timestamp getCreateDate() { return this.createDate; }
	
	
	/************************************************************************
	 * 
	 * setter..
	 * 
	 ***********************************************************************/
	public void setSiteId(String siteId)
	{
		if (siteId != null)
			this.siteId = siteId;
	}
	public void setLoginId(String loginId) 
	{
		if( loginId != null )
			this.loginId = loginId;
	}
	
	public void setSessionId(String str)
	{
		if( str != null )
			this.sessionId = str;
	}
	
	public void setUserName(String str)
	{
		if( str != null )
			this.userName = str;
	}
	
	public void setUserId( String str)
	{
		if( str != null )
			this.userId = str;
	}
	
	public void setUserConnIp(String str)
	{
		if( str != null )
			this.userConnIp = str;
	}
	
	public void setLocale(String str)
	{
		if( str != null )
			this.locale = str;
	}
	
	public void setMobileBln(boolean bln )
	{
		this.mobileBln = bln;
	}
	
	public void setReqUserAgent( String str)
	{
		if( str != null )
			this.reqUserAgent = str;
	}
	
	public void setMaxInactiveInterval(long interval)
	{
		this.maxInactiveInterval = interval;
	}
	
	public void setCreateDate(Timestamp tm)
	{
		this.createDate = tm;
	}
	
}
