package com.art.app.file.util;


import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;

import com.art.app.file.domain.AttachFileVO;
import com.art.app.file.domain.ExcelHeaderVO;
import com.art.app.file.domain.ExcelSheetVO;
import com.art.app.file.domain.ExcelVO;
import com.art.fw.exception.ArtException;


/**
 * Excel download를 위한 utility
 * @author zerowater
 *
 */

public class ExcelParsingUtil
{
	protected Logger logger ;

	public ExcelParsingUtil( Logger logger ) 
	{
		this.logger = logger;
	}
	
	public void readExcelData(ExcelVO paramVO , AttachFileVO fileVO) throws Exception
	{
		List<Map<String,String>> dataList = null;
		Map<String,String> rowData = null;
		List<ExcelSheetVO> sheetList = null;
		List<ExcelHeaderVO> columnList = null;
		ExcelHeaderVO columnVO = null;
		File excelFile = null;
		Workbook w = null;
		Sheet sheet = null;
		Row row = null;
		Cell cell = null;
		int sheetIndex = 0 ;
		int rowCount = 0 ;
		int colCount = 0 ; 
//		boolean isEndData = false;
		try
		{
			excelFile = new File(fileVO.getFilePath()+File.separator+fileVO.getFileName());
			if( !excelFile.exists() )
				throw new ArtException("file not found ( excel ) , ["+fileVO.getFilePath()+File.separator+fileVO.getFileName()+"]");
			
			sheetList = paramVO.getSheetList();
			if( sheetList == null || sheetList.size() == 0 )
				throw new ArtException("No setting excel Sheet info");
			
			dataList = new ArrayList<Map<String,String>>();
			try
			{
				w =  new XSSFWorkbook(new FileInputStream(excelFile));
			}catch ( Exception formatEx)
			{
				w =  new HSSFWorkbook(new FileInputStream(excelFile));
			}
			// while() // excel.. 
			for( ExcelSheetVO sheetVO :  sheetList ) 
			{
				sheet = w.getSheetAt(sheetIndex);
				rowCount = sheet.getLastRowNum();
				columnList = sheetVO.getColModels();
				colCount = columnList.size();
				
				for( int rowInx = (sheetVO.getReadStartRow()-1) ; rowInx <= rowCount; rowInx++  )
				{
					row = sheet.getRow(rowInx);
					rowData = new Hashtable<String,String>();
					for( int colInx = 0; colInx < colCount; colInx++ )
					{
						columnVO = columnList.get(colInx);
						cell = row.getCell(colInx);
						if( cell == null )
						{
//							isEndData = true;
//							continue;
							rowData.put(columnVO.getId(), "");
						}else 
						{
							rowData.put(columnVO.getId(), this.getCellData(cell));
						}
					}
					dataList.add(rowData);
//					if( !isEndData )
//						dataList.add(rowData);
//					else
//						break;
				}

				sheetVO.setDataList(dataList);
				sheetIndex++;
			}
			
		}catch ( Exception ex )
		{
			throw ex;
		}finally
		{
			if( w != null )
				w.close();
		}
	}

	
	private String getCellData( Cell cell ) 
	{
		switch ( cell.getCellType()) {
        	case Cell.CELL_TYPE_NUMERIC:
        		return cell.getNumericCellValue()+"";
        	case Cell.CELL_TYPE_BLANK:
        		return "";
        	case Cell.CELL_TYPE_BOOLEAN:
        		return cell.getBooleanCellValue()+"";
        	case Cell.CELL_TYPE_FORMULA:
        		return cell.getCellFormula()+"";
        	case Cell.CELL_TYPE_ERROR:
        		return cell.getErrorCellValue()+"";
        	case Cell.CELL_TYPE_STRING:
        		return cell.getStringCellValue()+"";
	        default:
	        	return cell.getStringCellValue()+"";
		}
	}
}