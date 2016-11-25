package com.art.fw.domain;

public class ResultVO // extends CommonVO
{
	private boolean result = false;
	private String resultCode = "";
	private String resultMessage = "";
	private String resultRetValue = "";
	private int execCnt = 0 ;
	private String url = "" ;
	
	private String secureKey = "";
	private int indexKey = -1;
	private int indexIv = -1;
	
	
	/********************************************************
	 * 
	 * setter
	 * 
	 ********************************************************/
	public void setResult(boolean bln)
	{
		this.result = bln;
	}
	
	public void setResultCode(String str)
	{
		if( str != null )
			this.resultCode = str;
	}
	
	public void setResultMessage(String str)
	{
		if( str != null )
			this.resultMessage = str;
	}
	
	public void setExecCnt(int cnt)
	{
		execCnt = cnt;
	}
	
	public void setUrl(String str)
	{
		if( str != null )
			this.url = str;
	}
	
	public void setResultRetValue(String str) 
	{
		if( str != null )
			this.resultRetValue = str;
	}	
	
	public void setSecureKey(String str)
	{
		if( str != null )
			this.secureKey = str;
	}
	
	public void setIndexKey(int inx)
	{
		this.indexKey = inx;
	}
	
	public void setIndexIv(int inx)
	{
		this.indexIv = inx;
	}

	/********************************************************
	 * 
	 * getter
	 * 
	 ********************************************************/
	public boolean getResult() { return result;  }
	public String getResultCode() { return resultCode; }
	public String getResultMessage() { return resultMessage ; }
	public int getExecCnt() { return execCnt; }
	public String getUrl() { return url; }
	public String getResultRetValue() { return resultRetValue; }
	public String getSecureKey() { return this.secureKey; }
	public int getIndexKey() { return this.indexKey; }
	public int getIndexIv() { return this.indexIv;}
	
}
