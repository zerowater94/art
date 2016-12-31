package com.art.app.base.system.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class CodeVO extends AbstractVO 
{
	private String codeId = "";
	private String codeGroup = "";
	private String code = "";
	private String codeValue = "";
	private int codeOrd = 0;
	private String codeType = "";
	private String useYn = "";
	private String description = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getCodeId() { return codeId; }
	public String getCodeGroup() { return codeGroup; }
	public String getCode() { return code; }
	public String getCodeValue() { return codeValue; }
	public int getCodeOrd() { return codeOrd; }
	public String getCodeType() { return this.codeType; }
	public String getUseYn() { return useYn; }
	public String getDescription() { return description; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	public void setCodeId(String str) 
	{
		if( str != null) 
			this.codeId = str;
	}
	public void setCodeGroup(String str) 
	{
		if( str != null) 
			this.codeGroup = str;
	}
	public void setCode(String str) 
	{
		if( str != null) 
			this.code = str;
	}
	public void setCodeValue(String str) 
	{
		if( str != null) 
			this.codeValue = str;
	}
	public void setCodeOrd(int order) 
	{
		this.codeOrd = order;
	}
	
	public void setCodeType(String str)
	{
		if( str != null )
			this.codeType = str;
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
