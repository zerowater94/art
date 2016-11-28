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
	
	// 등록일/등록자/등록부서/변경일/변경자
	private String creatorUid = "";
	private String creatorName = "";
	private String creatorDeptId = "";
	private String creatorDeptName = "";
	private Timestamp createDate = null;
	private String updaterUid = "";
	private String updaterName = "";
	private String updaterDeptId = "";
	private String updaterDeptName = "";
    private Timestamp updateDate = null;
    
	
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
	
	/******************************************************************************
	 * 등록일/등록자/변경일/변경일자
	 ******************************************************************************/
	public void setCreatorUid(String str)
	{
		if( str != null )
			this.creatorUid = str;
	}
	
	public void setCreatorName(String str)
	{
		if( str != null )
			this.creatorName = str;
	}
	
	public void setCreatorDeptId(String str)
	{
		if( str != null )
			this.creatorDeptId = str;
	}
	
	public void setCreatorDeptName(String str)
	{
		if( str != null )
			this.creatorDeptName = str;
	}

	public void setCreateDate(Timestamp tm )
	{
		this.createDate = tm;
	}
	
	public void setUpdaterUid(String str)
	{
		if( str != null )
			this.updaterUid = str;
	}
	
	public void setUpdaterName(String str)
	{
		if( str != null )
			this.updaterName = str;
	}
	
	public void setUpdaterDeptId(String str)
	{
		if( str != null )
			this.updaterDeptId = str;
	}
	
	public void setUpdaterDeptName(String str)
	{
		if( str != null )
			this.updaterDeptName = str;
	}
	
	public void setUpdateDate(Timestamp tm )
	{
		this.updateDate = tm;
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
	
	/******************************************************************************
	 * 등록일/등록자/변경일/변경자
	 ******************************************************************************/
//	@JsonIgnore
	public String getCreatorUid() { return this.creatorUid; }
//	@JsonIgnore
	public String getCreatorName() { return this.creatorName; }
//	@JsonIgnore
	public String getCreatorDeptId() { return this.creatorDeptId; }
//	@JsonIgnore
	public String getCreatorDeptName() { return this.creatorDeptName; }
//	@JsonIgnore
	public String getUpdaterUid() { return this.updaterUid; }
//	@JsonIgnore
	public String getUpdaterName() { return this.updaterName; }
//	@JsonIgnore
	public String getUpdaterDeptId() { return this.updaterDeptId; }
//	@JsonIgnore
	public String getUpdaterDeptName() { return this.updaterDeptName; }
	
	
	/**
	 * 등록일은 Default format 또는 특정 포맷으로 리턴한다.
	 * @return
	 */
//	@JsonIgnore
	public Timestamp getCreateDateTimestamp() 
	{ 
		if( this.createDate == null )
			return null;
		else
			return createDate;
	}
//	@JsonIgnore
	public String getCreateDate() 
	{ 
		return getCreateDate("");
	}
//	@JsonIgnore
	public String getCreateDate(String dateFormat) 
	{ 
		if( this.createDate == null )
			return null;
		else
			return DateUtil.getDate(this.createDate, dateFormat);
	}
	
	/**
	 * 변경일은 Default format 또는 특정 포맷으로 리턴한다.
	 * @return
	 */
//	@JsonIgnore
	public Timestamp getUpdateDateTimestamp() 
	{ 
		if( this.updateDate == null )
			return null;
		else
			return updateDate;
	}
//	@JsonIgnore
	public String getUpdateDate() 
	{ 
		return getUpdateDate("");
	}
//	@JsonIgnore
	public String getUpdateDate(String dateFormat) 
	{ 
		if( this.updateDate == null )
			return null;
		else
			return DateUtil.getDate(this.updateDate, dateFormat);
	}
	
}
