package com.art.app.base.system.service;

import java.util.List;

import com.art.app.base.system.domain.CodeVO;
import com.art.fw.domain.ResultVO;

public interface CodeService 
{
	public List<CodeVO> getList(CodeVO param) throws Exception;

	public CodeVO getMaxOrder(CodeVO param) throws Exception;
	
	public ResultVO insert(CodeVO param) throws Exception;
	
	public ResultVO update(CodeVO param) throws Exception;
	
	public ResultVO updateOrder(List<CodeVO> param) throws Exception;
	
	public ResultVO delete(CodeVO param) throws Exception;
}
