package com.art.fw.exception;

import com.art.fw.domain.ResultVO;

public class ArtException extends RuntimeException 
{
	private static final long serialVersionUID = 19999999999000L;
	private ResultVO errObj = null;
	
	public ArtException(Exception ex)
	{
		super(ex);
	}
	
	public ArtException(String err)
	{
		super(err);
	}
	
	public ArtException(ResultVO errVO)
	{
		super(errVO.getResultMessage());
		this.errObj = errVO;
	}
	
	public ArtException()
	{
		super("ArtException..");
	}
	
	public ResultVO getResultVO()
	{
		return this.errObj;
	}
}
