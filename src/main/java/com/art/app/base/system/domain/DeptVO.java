package com.art.app.base.system.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class DeptVO extends AbstractVO 
{
	private String deptId = "";
	private String deptCode = "";
	private String deptName = "";
	private String parentDeptId = "";
	private String parentDeptName = "";
	private String useYn = "";
	private int deptLvl = 0;
	private int deptOrd = 0;
	private String description = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getDeptId() { return deptId; }
	public String getDeptCode() { return deptCode; }
	public String getDeptName() { return deptName; }
	public String getParentDeptId() { return parentDeptId; }
	public String getParentDeptName() { return parentDeptName; }
	public String getUseYn() { return useYn; }
	public int getDeptLvl() { return deptLvl; }
	public int getDeptOrd() { return deptOrd; }
	public String getDescription() { return description; }
	
	/****************************************************
	 * getter
	 *****************************************************/
	
	public void setDeptId(String deptId) 
	{
		if ( deptId != null )
			this.deptId = deptId;
	}
	
	public void setDeptCode(String deptCode)  
	{
		if ( deptCode != null )
			this.deptCode = deptCode;
	}
	public void setDeptName(String deptName) 
	{
		if ( deptName != null )
			this.deptName = deptName;
	}
	public void setParentDeptId(String pDeptId) 
	{
		if ( pDeptId != null )
			this.parentDeptId = pDeptId;
	}
	public void setParentDeptName(String pDeptName)
	{
		if (pDeptName != null )
			this.parentDeptName = pDeptName;
	}
	public void setUseYn(String useYn) 
	{
		if ( useYn != null )
			this.useYn = useYn;
	}
	public void setDeptLvl(int deptLvl) 
	{
		this.deptLvl = deptLvl;
	}
	public void setDeptOrd(int deptOrd) 
	{
		this.deptOrd = deptOrd;
	}
	public void setDescription(String description) 
	{
		if ( description != null )
			this.description = description;
	}

}
