package com.art.app.base.system.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class OptionVO extends AbstractVO 
{
	private String category = "";
	private String optionId = "";
	private String optionCode = "";
	private String optionValue = "";
	private String optionBuilder = "";
	private String useYn = "";
	private String desc = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getCategory() { return category; }
	public String getOptionId() { return optionId; }
	public String getOptionCode() { return optionCode; }
	public String getOptionValue() { return optionValue; }
	public String getOptionBuilder() { return optionBuilder; }
	public String getUseYn() { return useYn; }
	public String getDescription() { return desc; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	public void setCategory(String str) 
	{
		if( str != null) 
			this.category = str;
	}
	public void setOptionId(String str) 
	{
		if( str != null) 
			this.optionId = str;
	}
	public void setOptionCode(String str) 
	{
		if( str != null) 
			this.optionCode = str;
	}
	public void setOptionValue(String str) 
	{
		if( str != null) 
			this.optionValue = str;
	}
	public void setOptionBuilder(String str) 
	{
		if( str != null) 
			this.optionBuilder = str;
	}
	public void setUseYn(String str) 
	{
		if( str != null) 
			this.useYn = str;
	}
	public void setDescription(String str) 
	{
		if( str != null) 
			this.desc = str;
	}
	
}
