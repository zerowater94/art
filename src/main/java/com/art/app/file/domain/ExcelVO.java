package com.art.app.file.domain;

import java.util.ArrayList;
import java.util.List;

import com.art.app.common.basic.domain.AbstractVO;
import com.art.fw.util.DateUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class ExcelVO extends AbstractVO
{
	private String fileName = "";
	private String filePath = "";
	private String displayName = "excel_"+DateUtil.getDate("yyyyMMddHHmmss");
	private List<ExcelSheetVO> sheetList ;
	
	
	public void setFileName(String str)
	{
		if( str != null )
			this.fileName = str;
	}
	
	public void setFilePath(String str)
	{
		if( str != null )
			this.filePath = str;
	}
	
	public void setDisplayName(String str)
	{
		if( str != null )
			this.displayName = str;
	}
	
	public void setSheetList(List<ExcelSheetVO> list)
	{
		this.sheetList = list;
	}
	
	@JsonIgnore
	public void addSheetList(ExcelSheetVO vo )
	{
		if( this.sheetList == null )
			this.sheetList = new ArrayList<ExcelSheetVO>();
		
		this.sheetList.add( vo );
	}
	

	public String getFileName() { return this.fileName; }
	public String getFilePath() { return this.filePath;}
	public String getDisplayName() { return this.displayName; }
	public List<ExcelSheetVO> getSheetList() { return this.sheetList; }
}
