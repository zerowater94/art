package com.art.app.kra.domain;

import com.art.app.common.basic.domain.AbstractVO;

public class WSRequestVO extends AbstractVO
{
	private String mode = "";
	private String colId = "";
	private String query = "";
	private String startDate = "";
	private String endDate = "";
	private int startCount = 0;
	private int pageCount = 0;
	private String seedId = "";
	private String themeGubun = "";
	private int topicCount = 0;
	private String topicKeyword = "";
	private String docId = "";
	private String posinegaGubun = "";
	private String cateId = "";
	private String cateName = "";
	
	public String getMode() {return mode;}
	public void setMode(String mode) 
	{
		if( mode != null)
			this.mode = mode;
	}
	
	public String getColId() {return colId;}
	public void setColId(String colId) 
	{
		if( colId != null)
			this.colId = colId;
	}
	
	public String getQuery() {return query;}
	public void setQuery(String query) 
	{
		if( query != null)
			this.query = query;
	}
	
	public String getStartDate() {return startDate;}
	public void setStartDate(String startDate) 
	{
		if( startDate != null)
			this.startDate = startDate;
	}
	
	public String getEndDate() {return endDate;}
	public void setEndDate(String endDate) 
	{
		if( endDate != null)
			this.endDate = endDate;
	}
	
	public int getStartCount() {return startCount;}
	public void setStartCount(int startCount) 
	{
		this.startCount = startCount;
	}
	
	public int getPageCount() {return pageCount;}
	public void setPageCount(int pageCount) 
	{
		this.pageCount = pageCount;
	}
	
	public String getSeedId() {return seedId;}
	public void setSeedId(String seedId) 
	{
		if( seedId != null)
			this.seedId = seedId;
	}
	
	public String getThemeGubun() {return themeGubun;}
	public void setThemeGubun(String themeGubun) 
	{
		if( themeGubun != null)
			this.themeGubun = themeGubun;
	}
	
	public int getTopicCount() {return topicCount;}
	public void setTopicCount(int topicCount) 
	{
		this.topicCount = topicCount;
	}
	
	public String getTopicKeyword() {return topicKeyword;}
	public void setTopicKeyword(String topicKeyword) 
	{
		if( topicKeyword != null)
			this.topicKeyword = topicKeyword;
	}
	
	public String getDocId() {return docId;}
	public void setDocId(String docId) 
	{
		if( docId != null)
			this.docId = docId;
	}
	
	public String getPosinegaGubun() {return posinegaGubun;}
	public void setPosinegaGubun(String posinegaGubun) 
	{
		if( posinegaGubun != null)
			this.posinegaGubun = posinegaGubun;
	}
	
	public String getCateId() {return cateId;}
	public void setCateId(String cateId) 
	{
		if( cateId != null)
			this.cateId = cateId;
	}
	
	public String getCateName() {return cateName;}
	public void setCateName(String cateName) 
	{
		if( cateName != null)
			this.cateName = cateName;
	}
	
	
}
