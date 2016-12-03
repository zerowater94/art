package com.art.app.base.system.dao;

import java.util.List;

import com.art.app.base.system.domain.OptionVO;

public interface OptionDao
{
	public List<OptionVO> selectList( OptionVO param ) throws Exception;
	
	public List<OptionVO> selectCategoryList(OptionVO param) throws Exception;
	
	public int insert(OptionVO param) throws Exception;
}
