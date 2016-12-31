package com.art.app.common.basic.domain;

import java.sql.Timestamp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.art.fw.util.DateUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class AbstractVO 
{
	protected Logger logger = LoggerFactory.getLogger(this.getClass()) ;
	
	// server name 
	private String serverName = "";
	private int serverPort = 0;
	
	// portal 기본 변수
	private String siteId = "";
	private String compId = "";
	
	
	// 기타 Json string형태의 정보
	private String etcInfo  = "";
	
	
	// 등록일/등록자/변경일/변경자
	private String currUserId = "";
	private String regUserId = "";
	private Timestamp regDtm = null;
	private String updUserId = "";
    private Timestamp updDtm = null;
    
	
	/********************************************************************************
	 * 
	 * setter.
	 * 
	********************************************************************************/
	public void setServerName(String str)
	{
		if( str != null )
			this.serverName = str;
	}
	
	public void setServerPort(int port)
	{
			this.serverPort = port;
	}
	public void setSiteId(String str )
	{
		if( str != null )
			this.siteId = str;
	}
	
	public void setCompId(String str)
	{
		if( str != null )
			this.compId = str;
	}
	
	public void setEtcInfo(String str)
	{
		if( str != null )
			this.etcInfo = str;
	}
	
	// 현재 사용자 / 등록일/등록자/변경일/변경일자
	public void setCurrUserId(String str)
	{
		if( str != null )
			this.currUserId = str;
	}
	
	public void setRegUserId(String str)
	{
		if( str != null )
			this.regUserId = str;
	}
	

	public void setRegDtm(Timestamp tm )
	{
		this.regDtm = tm;
	}
	
	public void setUpdUserId(String str)
	{
		if( str != null )
			this.updUserId = str;
	}
	
	
	public void setUpdDtm(Timestamp tm )
	{
		this.updDtm = tm;
	}
	
	/********************************************************************************
	 * 
	 * getter.
	 * 
	********************************************************************************/
	@JsonIgnore
	public String getServerName() { return this.serverName; }
	@JsonIgnore
	public int getServerPort() { return this.serverPort; }
	public String getSiteId() { return this.siteId; }
	public String getCompId() { return this.compId; }
	
	public String getEtcInfo() { return this.etcInfo; }
	
	
	// 현재 시간 및 사용자/등록일/등록자/변경일/변경자
	public String getCurrUserId() { return this.currUserId; }
	public Timestamp getCurrDateTime() { return DateUtil.getCurrentTimestamp(); }
	public String getRegUserId() { return this.regUserId; }
	public String getUpdUserId() { return this.updUserId; }
	public Timestamp getRegDtm() { return regDtm; }
	public Timestamp getUpdDtm() { return updDtm; }
}
