package com.art.fw.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Web service를 통한 요청 Param VO
 * @author zerowater
 *
 */
public class RequestVO extends SessionInfoVO
{
	private String reqSystem = "";
	private String reqType   = "";
	private String reqUserAgent   = ""; // pc/mobile/ 
	private String reqUserAgentAbbrName = ""; // "ie/chrome/FireFox/Safari..
	private String certKey = "";
	private String encData = "";
	
	/*****************************************************************************
	 * 
	 *  getter
	 * 
	 *****************************************************************************/
	
	public String getReqSystem() { return this.reqSystem; }
	public String getReqType() { return this.reqType; }
	@JsonIgnore
	public String getReqUserAgent(){return this.reqUserAgent;}
	@JsonIgnore
	public String getReqUserAgentAbbrName(){ return this.reqUserAgentAbbrName; }
	public String getCertKey() { return this.certKey; }
	public String getEncData() { return this.encData; }
	
	/*****************************************************************************
	 * 
	 *  setter
	 * 
	 *****************************************************************************/
	
	public void setReqSystem(String str)
	{
		if( str != null )
			this.reqSystem = str;
	}
	
	public void setReqType(String str)
	{
		if( str != null )
			this.reqType = str;
	}
	
	public void setReqUserAgent(String str)
	{
		if( str != null ) 
			this.reqUserAgent = str;
	}
	
	public void setReqUserAgentAbbrName(String str)
	{
		if( str != null ) 
			this.reqUserAgentAbbrName = str;
	}
	
	/**
	 * 외부 service 인증을 위한 CertKey
	 * @param str
	 */
	public void setCertKey(String str)
	{
		if( str != null )
			this.certKey = str;
	}
	
	public void setEncData(String str)
	{
		if( str != null )
			this.encData = str;
	}
}
