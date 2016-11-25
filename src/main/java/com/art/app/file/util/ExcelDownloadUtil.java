package com.art.app.file.util;


import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;

import com.art.app.file.domain.ExcelHeaderVO;
import com.art.app.file.domain.ExcelSheetVO;
import com.art.app.file.domain.ExcelVO;
import com.art.fw.util.DateUtil;

import jxl.JXLException;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

/**
 * Excel download를 위한 utility
 * @author zerowater
 *
 */

public class ExcelDownloadUtil
{
	private Logger logger ;

	public ExcelDownloadUtil( Logger logger  ) 
	{
		this.logger = logger;
	}
	
	/**
	 * Excel File을 생성한다.
	 * @throws Exception
	 */
	public ExcelVO makeExcelFile( ExcelVO excelVO  ) throws Exception
	{
		String filePath = System.getProperty("java.io.tmpdir");
		ExcelVO rtnVO = null;
		File excelFile = null;
		WritableWorkbook workbook = null;
		WritableSheet sheet ;
		int sheetIndex = 0 ;
		try
		{
			rtnVO = new ExcelVO();
			rtnVO.setFilePath(filePath);
			rtnVO.setFileName(DateUtil.getDate("yyyyMMddHHmmss")+System.nanoTime());
			
			logger.debug(DateUtil.getDate("yyyyMMddHHmmss"));
			logger.debug(""+System.nanoTime());
			logger.debug(filePath+File.separator+rtnVO.getFileName());
			excelFile = new File(filePath+File.separator+rtnVO.getFileName());
			workbook = Workbook.createWorkbook(excelFile);
			
			for( ExcelSheetVO sheetVO : excelVO.getSheetList())
			{
				sheet = workbook.createSheet(sheetVO.getSheetName(), sheetVO.getSheetIndex());
				sheetVO.setSheetIndex(sheetIndex);
				this.addExcelSheet(sheet, sheetVO);
				sheetIndex++;
			}
			
			workbook.write();
            workbook.close();
     
		}catch(JXLException e) 
		{
			e.printStackTrace();
			throw e;
        }catch(IOException ex) 
        {
        	throw ex;
        }catch(Exception ex) 
        {
        	ex.printStackTrace();
        	throw ex;
        }
		return rtnVO;
	}
	
	/**
	 * 만들어진 Excel 파일을 리턴한다.
	 * @param sheetVO
	 * @return
	 * @throws Exception
	 */
	public File getMakeExcelFile( ExcelVO sheetVO ) throws Exception
	{
		this.logger.debug("file download ... "+ sheetVO.getFilePath()+File.separator+sheetVO.getFileName() + ".. "+ sheetVO.getDisplayName());
		return new File(sheetVO.getFilePath()+File.separator+sheetVO.getFileName());
	}
	
	
	/**************************************************************************************
	 * Excel sheet별 파일 생성
	 * ************************************************************************************/
	private void addExcelSheet(WritableSheet sheet, ExcelSheetVO sheetVO ) throws Exception
	{
		List<ExcelHeaderVO> headers = null;
		List<Map<String,String>> dataList = null;
		 
		int colCnt = 0 ;
		int rowCnt = 0 ;
		try
		{
			
			headers = sheetVO.getColModels();
			for( ExcelHeaderVO headerVO : headers)
			{
				sheet.addCell(new Label(colCnt,0,headerVO.getName(),this.getCellFormatHeader()));
				logger.debug(colCnt +" : "+ headerVO.getColWidth());
				sheet.setColumnView(colCnt, headerVO.getColWidth());
				colCnt++;
			}
			rowCnt ++; // header..
			// data list.. 
			if( sheetVO.getDataList() != null )
			{
				dataList = sheetVO.getDataList();
				for( Map<String , String> data : dataList)
				{
					colCnt = 0;
					for( ExcelHeaderVO headerVO : headers)
					{
			            sheet.addCell(new Label(colCnt,rowCnt,data.get(headerVO.getId()),this.getCellFormatBody(headerVO.getAlign())));
			            colCnt++;
					}
					rowCnt++;
				}
			}
		}catch ( Exception ex )
		{
			throw ex;
		}
	}
	
	/**************************************************************************************
	 * Excel sheet의 cell 의 header 및 body default format
	 * ************************************************************************************/
	private WritableCellFormat getCellFormatHeader() throws Exception
	{
		WritableCellFormat  format = null;
		try
		{
			format = new WritableCellFormat();
			format.setBackground(jxl.format.Colour.IVORY );
			format.setBorder(jxl.format.Border.ALL,jxl.format.BorderLineStyle.THIN );
	        format.setAlignment(jxl.format.Alignment.CENTRE);
		}catch ( Exception ex )
		{
			throw ex;
		}
		
		return format;
	}
	
	private WritableCellFormat getCellFormatBody(String align) throws Exception
	{
		WritableCellFormat  format = null;
		try
		{
			format = new WritableCellFormat();
			format.setBackground(jxl.format.Colour.WHITE );
			format.setBorder(jxl.format.Border.ALL,jxl.format.BorderLineStyle.THIN );
			if( align.toUpperCase().equals("CENTER") )
				format.setAlignment(jxl.format.Alignment.CENTRE);
			else if( align.toUpperCase().equals("RIGHT") )
				format.setAlignment(jxl.format.Alignment.RIGHT);
			else
				format.setAlignment(jxl.format.Alignment.LEFT);
		}catch ( Exception ex )
		{
			throw ex;
		}
		
		return format;
	}
}