package com.art;

import java.sql.Connection;

import com.art.fw.exception.AuthException;

public class TestException {

	public static void main(String[] args) 
	{
		TestException tc = null;
		try
		{
			tc = new TestException();
			
			tc.ignoreException("");
		}catch ( AuthException nex )
		{
			nex.printStackTrace();
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
	}
	
	
	public void ignoreException(String str) throws Exception
	{
		if( str == null || str.equals("") )
	        throw new AuthException();
		System.out.println(Integer.parseInt(str));
	}
	
	
	public void throwException() throws Exception 
	{
		TestExceptionSub tcsub = new TestExceptionSub();
		System.out.println(tcsub.getStringToInfo("AAA"));
	}
	
	public int execException() throws Exception 
	{
		int resultCode = 0;
		TestExceptionSub tcsub = null;
		try
		{
			tcsub = new TestExceptionSub();
			System.out.println(tcsub.getStringToInfo("AAA"));
		}catch ( NullPointerException nullEx)
		{
			System.out.println(nullEx.getMessage());
			resultCode = -2;
		}catch ( NumberFormatException nex )
		{
			System.out.println(nex.getMessage());
			resultCode = -1;
		}catch ( Exception ex )
		{
			throw ex;
		}
		return resultCode;
	}
	
	public int execUserException() throws Exception 
	{
		int resultCode = 0;
		TestExceptionSub tcsub = null;
		
		try
		{
			tcsub = new TestExceptionSub();
			
			
			int sum = tcsub.plus("9", "2");
			System.out.println(sum);
			
			if( sum > 10 )
				return 0 ;
			
			System.out.println(tcsub.plus("2aa", "2"));
			
			
		}catch ( UserException uex)
		{
			System.out.println(uex.getMessage());
			resultCode = -3;
		}catch ( NumberFormatException nex )
		{
			System.out.println(nex.getMessage());
			resultCode = -1;
		}catch ( Exception ex )
		{
			throw ex;
		}
		return resultCode;
	}
	
	
	public void textConnection() throws Exception
	{
		Connection conn = null;
		try
		{
			conn = null;
			conn.setAutoCommit(true);
			
			conn.commit();
		}catch ( Exception ex )
		{
			conn.rollback();
			throw ex;
		}finally
		{
			if( conn != null )
				conn.close();
		}
	}
}
