package com.art.app.common.basic.dao;

import java.util.List;


public interface CommonDao<T> 
{
	public List<T> selectList( T param ) throws Exception;
	public T selectData( T param ) throws Exception;
	public int insert( T param ) throws Exception;
	public int update( T param ) throws Exception;
	public int delete( T param ) throws Exception;
}
