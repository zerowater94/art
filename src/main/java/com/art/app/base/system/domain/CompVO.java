package com.art.app.base.system.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class CompVO extends AbstractVO 
{
	private String compCode = "";
	private String compName = "";
	private int compOrd = 0;
	private String useYn = "";
	private String description = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getCompCode() { return compCode; }
	public String getCompName() { return compName; }
	public int getCompOrd() { return compOrd; }
	public String getUseYn() { return useYn; }
	public String getDescription() { return description; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	public void setCompCode(String compCode) 
	{
		if( compCode != null) 
			this.compCode = compCode;
	}
	public void setCompName(String compName) 
	{
		if( compName != null) 
			this.compName = compName;
	}
	public void setCompOrd(int order) 
	{
		this.compOrd = order;
	}
	public void setUseYn(String str) 
	{
		if( str != null) 
			this.useYn = str;
	}
	public void setDescription(String str) 
	{
		if( str != null) 
			this.description = str;
	}
}
