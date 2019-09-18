package com.art.app.common.basic.service;

import java.util.List;

import com.art.fw.domain.ResultVO;

public interface CommonService<T> 
{
	public List<T> getList(T param) throws Exception;
	
	public T getData(T param) throws Exception;
	
	public ResultVO insert(T param) throws Exception;
	
	public ResultVO update(T param) throws Exception;
	
	public ResultVO delete(T param) throws Exception;
}
