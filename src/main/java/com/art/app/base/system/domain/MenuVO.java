package com.art.app.base.system.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class MenuVO extends AbstractVO 
{
	private String menuId = "";
	private String parentMenuId = "";
	private String menuName = "";
	private String menuIcon = "";
	private String menuUrl = "";
	private String menuMethod = "";
	
	/****************************************************
	 * getter
	 *****************************************************/
	public String getMenuId() { return menuId; }
	public String getParentMenuId() { return parentMenuId; }
	public String getMenuName() { return menuName; }
	public String getMenuIcon() { return menuIcon; }
	public String getMenuUrl() { return menuUrl; }
	public String getMenuMethod() { return menuMethod; }
	
	/****************************************************
	 * setter
	 *****************************************************/
	public void setMenuId(String str) 
	{
		if( str != null) 
			this.menuId = str;
	}
	public void setParentMenuId(String str) 
	{
		if( str != null) 
			this.parentMenuId = str;
	}
	public void setMenuName(String str) 
	{
		if( str != null) 
			this.menuName = str;
	}
	public void setMenuIcon(String str)
	{
		if (str != null)
			this.menuIcon = str;
	}
	public void setMenuUrl(String str) 
	{
		if( str != null) 
			this.menuUrl = str;
	}
	public void setMenuMethod(String str)
	{
		if (str != null )
			this.menuMethod = str;
	}
}
