package com.art.app.file.service;

import java.io.File;
import java.util.List;

import com.art.app.file.domain.AttachFileVO;

public interface PjtOutputService 
{
	public List<AttachFileVO> getFileListInDirectory(String rootDir) throws Exception;
	
	public File getExcelFileList( String rootDir  ) throws Exception;
}
