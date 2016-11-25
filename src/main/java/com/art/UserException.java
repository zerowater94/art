package com.art;

public class UserException extends RuntimeException 
{
	private static final long serialVersionUID = 19999999999000L;
	
	public UserException(Exception ex)
	{
		super(ex);
	}
	
	public UserException(String err)
	{
		super(err);
	}
	
	public UserException()
	{
		super("UserException..");
	}
}
