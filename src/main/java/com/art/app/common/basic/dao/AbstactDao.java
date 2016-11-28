package com.art.app.common.basic.dao;

import java.util.List;


public interface AbstactDao<T> 
{
	public List<T> list( T t ) throws Exception;
}
