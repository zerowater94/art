package com.art.app.base.system.dao;

import java.util.List;

import com.art.app.base.system.domain.CodeVO;

public interface CodeDao
{
	public List<CodeVO> selectList( CodeVO param ) throws Exception;
	
	public int insert(CodeVO param) throws Exception;
	
	public int update(CodeVO param) throws Exception;
	
	public int updateValue(CodeVO param) throws Exception;
	
	public int delete(CodeVO param) throws Exception;
}
