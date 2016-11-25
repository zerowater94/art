package com.art.app.file.domain;

import com.art.fw.util.CommonUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ExcelHeaderVO 
{
	private String name = "";
	private String id = "";
	private String width = "20";
	private String align = "left";
	
	public void setName(String str)
	{
		if( str != null )
			this.name = str;
	}
	
	public void setId(String str)
	{
		if( str != null )
			this.id = str;
	}
	
	public void setWidth(String str)
	{
		if( str != null )
			this.width = str;
	}
	
	public void setAlign(String str)
	{
		if( str != null )
			this.align = str;
	}
	
	
	public String getName() { return name; }
	public String getId() { return id; }
	public String getWidth() { return width; }
	
	@JsonIgnore
	public int getColWidth() 
	{
		String w = this.getWidth();
		int rtnInt = 0 ;
		try
		{
			if( w.indexOf("%") > -1 ){
				
				w = CommonUtil.replace(w, "%", "");
				rtnInt = Integer.parseInt(w)*2;
			}else if( w.indexOf("px") > -1 ) {
				w = CommonUtil.replace(w, "px", "");
				rtnInt = Integer.parseInt(w);
			}else if( w.indexOf("pt") > -1 ) {
				w = CommonUtil.replace(w, "pt", "");
				rtnInt = Integer.parseInt(w);
			}else
				rtnInt = Integer.parseInt(w);
				
		}catch ( Exception ex )
		{
			rtnInt = 20;
		}
		return rtnInt;
	}
	public String getAlign() { return align; }
}