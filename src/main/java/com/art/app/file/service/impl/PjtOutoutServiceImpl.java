package com.art.app.file.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.art.app.common.basic.service.AbstractService;
import com.art.app.file.domain.AttachFileVO;
import com.art.app.file.domain.ExcelHeaderVO;
import com.art.app.file.domain.ExcelSheetVO;
import com.art.app.file.domain.ExcelVO;
import com.art.app.file.service.PjtOutputService;
import com.art.app.file.util.ExcelDownloadUtil;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@Service
public class PjtOutoutServiceImpl extends AbstractService implements PjtOutputService
{
	@Override
	public List<AttachFileVO> getFileListInDirectory( String rootDir ) throws Exception
	{
		List<AttachFileVO> rtnList = null;
		List<String> toScanFileDir = null;
		File toScanRootDir = null;
		boolean isEnd = false;
		String toScanDirName = "";
		try
		{
			toScanRootDir = new File(rootDir);
			if( !toScanRootDir.isDirectory() )
			{
				throw new BadRequestException("request url is not a directory");
			}
			
			rtnList = new ArrayList<AttachFileVO>();
			toScanFileDir = new ArrayList<String>();
			toScanFileDir.add(rootDir);
			while ( !isEnd)
			{
				if( toScanFileDir.size() == 0 )
				{
					isEnd = true;
				}else 
				{
					toScanDirName = toScanFileDir.get(0);
					toScanFileDir.remove(0);
					rtnList.addAll(this.scanFileList(toScanFileDir, toScanDirName));
					logger.debug(toScanDirName +" --> "+rtnList.size());
				}
			}
			toScanRootDir.listFiles();
			
		}catch ( Exception ex )
		{
			throw ex;
		}
		return rtnList;
	}
	
	public File getExcelFileList( String rootDir  ) throws Exception
	{
		ExcelDownloadUtil excelUtil = null;
		ExcelVO excelVO = null;
		ExcelVO excelRstVO = null;
		ExcelSheetVO sheetVO = null;
		ExcelSheetVO sheet2VO = null;
		ExcelSheetVO sheet3VO = null;
		List<ExcelHeaderVO> colModels = null;
		ExcelHeaderVO headerVO = null;
		List<AttachFileVO> fileList = null;
		AttachFileVO fileVO = null;
		List<Map<String,String>> dataList = null;
		Map<String,String> excelRowData = null;
		File excelFile = null;
		int maxDirDepth = 0 ;
		String[] filePath  = null;
		boolean isPass = false;
		try
		{
			excelUtil = new ExcelDownloadUtil( super.logger );
			excelVO = new ExcelVO();
			sheetVO = new ExcelSheetVO();
			sheet2VO = new ExcelSheetVO();
			sheet3VO = new ExcelSheetVO();

			// excel data
			fileList = this.getFileListInDirectory(rootDir);
			dataList = new ArrayList<Map<String,String>>();
			for( int inx = 0 ; inx < fileList.size(); inx++ )
			{
				isPass = false;
				 fileVO = fileList.get(inx);
				 excelRowData = new Hashtable<String,String>();
				 filePath = CommonUtil.getMultiTokens(fileVO.getFilePath(), File.separator);
//				 filePath = fileVO.getFilePath().split("\\");
				 
				 if (filePath.length > 1 )
				 {
					 if( filePath[0].equals("webapp") )
					 {
						 if( filePath[1].equals("cafe")
								 || filePath[1].equals("global")
								 || filePath[1].equals("ndaum")
								 || filePath[1].equals("WEB-INF") )
						 {
							 isPass = true;
						 }
					 }
				 }
				 
				 if( !isPass )
				 {
					 if(filePath.length > maxDirDepth )
						 maxDirDepth = filePath.length;
					 
					 for( int jnx = 0 ; jnx < filePath.length; jnx++)
					 {
						 excelRowData.put("filePath"+jnx, filePath[jnx]);
					 }
					 
					 excelRowData.put("fileName", fileVO.getFileName());
					 
					
					dataList.add(excelRowData);
				 }
			}
			
			
			excelVO.setFileName("file_list.xls");
			

			// excel header.. 
			colModels = new ArrayList<ExcelHeaderVO>();
			for( int inx = 0 ; inx < maxDirDepth; inx++ )
			{
				headerVO = new ExcelHeaderVO();
				headerVO.setId("filePath"+inx);
				if( inx == 0 )
				{
					headerVO.setName("파일경로");
				}else
				{
					headerVO.setName("");
				}
				
				headerVO.setWidth("10");
				colModels.add(headerVO);
			}
			
			headerVO = new ExcelHeaderVO();
			headerVO.setId("fileName");
			headerVO.setName("파일명");
			headerVO.setWidth("30");
			colModels.add(headerVO);
			headerVO = new ExcelHeaderVO();
			headerVO.setId("fileExp");
			headerVO.setName("설명");
			headerVO.setWidth("100");
			colModels.add(headerVO);
			
			sheetVO.setColModels(colModels);
			sheetVO.setDataList(dataList);
			excelVO.addSheetList(sheetVO);
			excelRstVO = excelUtil.makeExcelFile(excelVO);
			excelFile = new File(excelRstVO.getFilePath()+File.separator+excelRstVO.getFileName());
		}catch ( Exception ex )
		{
			throw ex;
		}
		return excelFile;
	}
	
	
	private List<AttachFileVO> scanFileList(List<String> toScanFileDir, String scanDirName ) throws Exception
	{
		List<String> toInsertDir = null;
		List<AttachFileVO> rtnList = null;
		AttachFileVO fileVO = null;
		File scanDir = null;
		File f = null;
		File[] fList = null;
		String rootPath = "src"+File.separator+"main";
		try
		{
			scanDir = new File(scanDirName);
			fList = scanDir.listFiles();
			if( fList == null || fList.length == 0 )
				return rtnList;
			
			rtnList = new ArrayList<AttachFileVO>();
			toInsertDir = new ArrayList<String>();
			for( int inx = 0 ; inx < fList.length; inx++ )
			{
				fileVO = new AttachFileVO();
				f = fList[inx];
				if (f.isDirectory())
				{
					toInsertDir.add(f.getAbsolutePath());
				}else
				{
					fileVO.setFileFullPathName(f.getAbsolutePath());
					if( f.getParent().indexOf(rootPath) > 0)
					{
						fileVO.setFilePath(f.getParent().substring(f.getParent().indexOf(rootPath)+rootPath.length()+1));
					}else
					{
						fileVO.setFilePath(f.getParent());
					}
					fileVO.setFileName(f.getName());
					rtnList.add(fileVO);
				}
			}
			
			toScanFileDir.addAll(0, toInsertDir);
				
		}catch ( Exception ex )
		{
			throw ex;
		}
		return rtnList;
	}
}
