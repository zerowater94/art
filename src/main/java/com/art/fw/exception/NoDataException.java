package com.art.fw.exception;

public class NoDataException extends RuntimeException 
{
	private static final long serialVersionUID = 19999999999000L;
	
	public NoDataException(Exception ex)
	{
		super(ex);
	}
	
	public NoDataException(String err)
	{
		super(err);
	}
	
	public NoDataException()
	{
		super("Not Found Data Exception..");
	}
}
