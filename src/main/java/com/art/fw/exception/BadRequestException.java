package com.art.fw.exception;

public class BadRequestException extends RuntimeException 
{
	private static final long serialVersionUID = 190999000L;
	
	public BadRequestException(Exception ex)
	{
		super(ex);
	}
	
	public BadRequestException(String err)
	{
		super(err);
	}
	
	public BadRequestException()
	{
		super("BadRequest Exception");
	}
}
