package com.art.app.common.basic.domain;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class SearchVO 
{
	// 검색 조건 정보
	private String searchCondition = "";
	private String searchKeyword = "";
	private int pageSize = -1;
	private int currentPage = 0 ;
	private String sortBy = ""; // 정렬 기준
	private String sortType = ""; // 정렬 방향
	
	private List<Map<String,String>> sortTypeList = null; // 다중 sort.. 
	
	// from ~ to date timestamp 
	private Timestamp searchSDate = null;
	private Timestamp searchEDate = null;
	
	// paging 
	private int sPageIndex = 0 ;
	private int ePageIndex = 0 ;

	
	/********************************************************************************
	 * 
	 * setter.
	 * 
	********************************************************************************/
	/******************************************************************************
	 * 검색 조건
	 ******************************************************************************/
	public void setSearchCondition(String str)
	{
		if( str != null )
			this.searchCondition = str;
	}
	
	public void setSearchKeyword(String str)
	{
		if( str != null )
			this.searchKeyword = str;
	}
	
	public void setPageSize(int size )
	{
		this.pageSize = size;
	}
	
	public void setCurrentPage(int page)
	{
		this.currentPage = page;
	}
	
	
	public void setSortBy( String str)
	{ 
		if( str != null )
			this.sortBy = str; 
	}
	
	public void setSortType( String str )
	{
		if( str != null )
			this.sortType = str;
	}
	
	public void setSortTypeList ( List<Map<String,String>> list)
	{
		if( list != null )
			this.sortTypeList = list;
	}
	
	public void setSearchSDate(Timestamp tm )
	{
		this.searchSDate = tm;
	}
	
	public void setSearchEDate(Timestamp tm )
	{
		this.searchEDate = tm;
	}
	
	
	/********************************************************************************
	 * 
	 * getter.
	 * 
	********************************************************************************/
	
	/******************************************************************************
	 * 검색
	 ******************************************************************************/
	//@JsonIgnore
	public String getSearchCondition() { return this.searchCondition; } 
	//@JsonIgnore
	public String getSearchKeyword() { return this.searchKeyword; }
	//@JsonIgnore
	public int getPageSize() { return this.pageSize; }
	//@JsonIgnore
	public int getCurrentPage() { return this.currentPage; }
	public String getSortBy() { return this.sortBy; }
	public String getSortType() { return this.sortType; }
	public List<Map<String,String>> getSortTypeList() {return this.sortTypeList; }
	// 검색 시작 시간
	@JsonIgnore
	public Timestamp getSearchSDateTimestamp() 
	{ 
		return searchSDate;
	}
	// 검색 종료 시간
	@JsonIgnore
	public Timestamp getSearchEDateTimestamp() 
	{ 
		return searchEDate;
	}
	
	/******************************************************************************
	 * mybatis에서 활용할 상수 값을 Map 형태로 리턴 한다.
	 ******************************************************************************/
	
	/******************************************************************************
	 * paging
	 ******************************************************************************/
	@JsonIgnore
	public int getSPageIndex() { return this.sPageIndex; }
	@JsonIgnore
	public int getEPageIndex() { return this.ePageIndex; }
}
