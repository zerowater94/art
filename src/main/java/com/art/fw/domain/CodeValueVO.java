package com.art.fw.domain;

public class CodeValueVO 
{
	private String code = "";
	private String value = "";
	
	public CodeValueVO(String code, String value)
	{
		this.code = code;
		this.value = value;
	}
	
	public void setCode(String str)
	{
		if( str != null )
			this.code = str;
	}
	
	public void setValue(String str)
	{
		if( str != null )
			this.value = str;
	}
	
	public String getCode() { return this.code; }
	public String getValue() { return this.value; }
}
