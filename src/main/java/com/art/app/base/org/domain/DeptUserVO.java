package com.art.app.base.org.domain;


public class DeptUserVO extends UserVO 
{
	private String deptId = "";
	private String positioncode = "";
	private String deptTypeCode = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getDeptId() { return deptId; }
	public String getPositionCode() { return positioncode; }
	public String getDeptTypeCode() { return deptTypeCode; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	
	public void setDeptId(String deptId) 
	{
		if ( deptId != null )
			this.deptId = deptId;
	}
	
	public void setPositionCode(String positionCode)
	{
		if (positionCode != null)
			this.positioncode = positionCode;
	}
	
	public void setDeptTypeCode(String deptTypeCode)
	{
		if (deptTypeCode != null)
			this.deptTypeCode = deptTypeCode;
	}
}
