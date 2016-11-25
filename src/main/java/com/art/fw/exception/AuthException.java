package com.art.fw.exception;

public class AuthException extends RuntimeException 
{
	private static final long serialVersionUID = 190999000L;
	
	public AuthException(Exception ex)
	{
		super(ex);
	}
	
	public AuthException(String err)
	{
		super(err);
	}
	
	public AuthException()
	{
		super("invalid Authority");
	}
}
