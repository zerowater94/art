package com.art.app.file.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.art.app.file.domain.AttachFileVO;
import com.art.fw.util.DateUtil;

public class FileUploadUtil 
{
	
	private String defFilePath = "";
	private boolean useMakeNameBln = false;
	
	
	public void setDefFilePath(String str)
	{
		this.defFilePath = str;
	}
	
	public void setUseMaskeName(boolean bln)
	{
		this.useMakeNameBln = bln;
	}
	
	public String getDefFilePath()
	{
		return this.defFilePath;
	}

	public boolean isUseMaskName()
	{
		return this.useMakeNameBln;
	}
	
	public AttachFileVO saveToFile(InputStream uploadIs, String fileFullPath, String fileName) 
	{
		OutputStream out = null;
        int read = 0;
        byte[] bytes = new byte[1024];
        AttachFileVO fileVO = null;
        File toSaveFile = null;
        String maskName = "";
        File dir = null;
        try 
        {
        	fileVO = new AttachFileVO();
        	fileVO.setDisplayName(fileName);
            dir = new File(fileFullPath);

            if (!dir.isDirectory()) 
            	dir.mkdirs();
           // dir.mkdir();
			if (!dir.canWrite()) 
				throw new IllegalArgumentException("Not writable: " + dir);
			
            if( this.isUseMaskName() )
            	maskName = DateUtil.getDate("yyyyMMddHHmmss")+System.nanoTime()+"";
            else
            	maskName = fileVO.getDisplayName();
            
            toSaveFile = new File(fileFullPath+File.separator+maskName);
            out = new FileOutputStream(toSaveFile);

            while ((read = uploadIs.read(bytes)) != -1) 
            {
                out.write(bytes, 0, read);
            }
            out.flush();
            out.close();
            
            fileVO.setFileSize(toSaveFile.length());
            fileVO.setFilePath(fileFullPath);
            fileVO.setFileName(toSaveFile.getName()); // 임시 디렉 토리의 파일명.
            // 
        } catch (IOException e) 
        {
            e.printStackTrace();
        }finally
        {
        	if( uploadIs != null )
        		try { uploadIs.close(); } catch ( Exception _ignore ) { _ignore.printStackTrace();}
        }
        return fileVO;
    }
}
