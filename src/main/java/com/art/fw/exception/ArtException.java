package com.art.fw.exception;

public class ArtException extends RuntimeException 
{
	private static final long serialVersionUID = 19999999999000L;
	
	public ArtException(Exception ex)
	{
		super(ex);
	}
	
	public ArtException(String err)
	{
		super(err);
	}
	
	public ArtException()
	{
		super("ArtException..");
	}
}
