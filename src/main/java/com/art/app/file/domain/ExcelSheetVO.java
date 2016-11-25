package com.art.app.file.domain;

import java.util.List;
import java.util.Map;

import com.art.app.common.basic.domain.AbstractVO;


public class ExcelSheetVO extends AbstractVO
{
	private String sheetName = "sheet1";
	private int sheetIndex  ;
	private int readStartRow = 2 ; // default는 2번째 라인부터 읽기 시작한다. ( 상단은 header )
	private List<ExcelHeaderVO> colModels = null;
	private List<Map<String,String>> dataList = null;
	
	
	public void setSheetIndex( int inx )
	{
		this.sheetIndex = inx;
	}
	
	public void setSheetName(String str)
	{
		if( str != null )
			this.sheetName = str;
	}
	
	public void setReadStartRow(int row )
	{
		this.readStartRow = row;
	}
	
	public void setColModels(List<ExcelHeaderVO> list)
	{
		this.colModels = list;
	}
	
	public void setDataList(List<Map<String,String>> datas)
	{
		this.dataList = datas;
	}
	
	
	public int getSheetIndex() { return this.sheetIndex; }
	public String getSheetName() { return this.sheetName; }
	public int getReadStartRow() { return this.readStartRow; }
	public List<ExcelHeaderVO> getColModels() { return this.colModels; }
	public List<Map<String,String>> getDataList() { return this.dataList; }
}
