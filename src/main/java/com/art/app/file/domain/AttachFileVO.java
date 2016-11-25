package com.art.app.file.domain;

import com.art.app.common.basic.domain.AbstractVO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AttachFileVO extends AbstractVO 
{
	private String docName = "";
	private String fileId = "";
	private String fileTempName = "" ; // 임시 디렉토리의 파일명
	private String fileName = ""; // Storage 디렉토리의 파일명
	private String displayName = ""; // 원래 파일명
	private String filePath = "";
	private String fileFullPathName = "";
	private String attachContents = ""; // 첨부 파일이 아닌, String 형태의 데이터를 파일로 생성하기 위한 변수
	private byte[] fileByte = null;
	private long fileSize = 0;
	private int downCnt = 0 ;
	
	/********************************************************************************
	 * 
	 * setter.
	 * 
	********************************************************************************/
	public void setDocName(String str)
	{
		if( str != null )
			this.docName = str;
	}
	public void setFileId(String str)
	{
		if( str != null )
			this.fileId = str;
	}
	public void setFileTempName(String str)
	{
		if( str != null )
			this.fileTempName = str;
	}
	public void setFileName(String str)
	{
		if( str != null )
			this.fileName = str;
	}
	public void setDisplayName(String str)
	{
		if( str != null )
			this.displayName = str;
	}
	public void setFilePath(String str)
	{
		if( str!= null )
			this.filePath = str;
	}
	public void setFileFullPathName(String str)
	{
		if( str != null )
			this.fileFullPathName = str;
	}
	public void setFileSize( long size )
	{
		this.fileSize = size;
	}
	public void setFileByte(byte[] b)
	{
		this.fileByte = b;
	}
	public void setDownCnt( int cnt )
	{
		this.downCnt = cnt;
	}
	public void setAttachContents(String str)
	{
		if( str != null )
			this.attachContents = str;
	}
	/********************************************************************************
	 * 
	 * getter.
	 * 
	********************************************************************************/
	public String getDocName(){ return this.docName; }
	public String getFileId() { return this.fileId; }
	public String getFileName() { return this.fileName; }
	public String getFileTempName() { return this.fileTempName ; }
	public String getDisplayName() { return this.displayName; }
	public String getFilePath() { return this.filePath; }
	public String getFileFullPathName() { return this.fileFullPathName; }
	public byte[] getFileByte(){ return this.fileByte; } 
	public long getFileSize() { return this.fileSize; }
	public int getDownCnt() { return this.downCnt; }
	public String getAttachContents() { return this.attachContents; }
}
