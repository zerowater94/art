package com.art.app.base.org.domain;


public class DeptUserVO extends UserVO 
{
	private String deptId = "";
	private String deptName = "";
	private String positioncode = "";
	private String deptTypeCode = "";
	private int deptOrder = 0;
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getDeptId() { return deptId; }
	public String getDeptName() { return deptName; } 
	public String getPositionCode() { return positioncode; }
	public String getDeptTypeCode() { return deptTypeCode; }
	public int getDeptOrder() { return deptOrder; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	
	public void setDeptId(String deptId) 
	{
		if ( deptId != null )
			this.deptId = deptId;
	}
	
	public void setDeptName(String deptName)
	{
		if (deptName !=null)
			this.deptName = deptName;
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
	
	public void setDeptOrder(int deptOrder)
	{
		this.deptOrder = deptOrder;
	}
}
