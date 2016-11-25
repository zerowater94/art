package com.art;

public class TestExceptionSub {

	public int execException(String str)
	{
		return Integer.parseInt(str);
	}
	
	public int throwException(String str) throws NumberFormatException
	{
		return Integer.parseInt(str);
	}
	
	
	public String getStringToInfo(String str) 
	{
		String rtnStr = "1";
		int rtnInt = this.throwException(str);
		rtnStr += rtnInt;
		return rtnStr;
	}
	
	private int stringToInt(String chkInt) throws Exception
	{
		try
		{
			return Integer.parseInt((chkInt+"")); 
		}catch ( Exception ex )
		{
			throw ex;
		}
	}
	
	public int plus( String  str1, String  str2) throws Exception
	{
		int s1 = this.stringToInt(str1);
		int s2 = this.stringToInt(str2);
		
		if( s1 > 10 || s2 > 10 )
			throw new UserException("Can input over 10");
		
		return s1+s2;
	}
	
	public int minus( int s1, int s2)
	{
		return s1 - s2;
	}
	
	public int multiple(int s1, int s2)
	{
		return s1*s2;
	}
	
	public int divide(int s1 , int s2)
	{
		return s1/s2;
	}
}
