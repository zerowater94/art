package com.art.app.common.basic.domain;

import java.util.List;

public class ListPageVO 
{
	//bootgrid
	private int current = 0 ;
	private int total = 0 ;
	private List<?> rows = null; 
	
	
	/********************************************************
	 * 
	 * setter
	 * 
	 ********************************************************/
	public void setCurrent(int page)
	{
		this.current = page;
	}
	public void setTotal(int total)
	{
		this.total = total;
	}
	
	public void setRows(List<?> list)
	{
		this.rows = list;
	}
	
	/********************************************************
	 * 
	 * getter
	 * 
	 ********************************************************/
	public int getCurrent() { return current; }
	public int getTotal() { return total; }
	public List<?> getRows() { return rows; }
}
