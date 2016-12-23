package com.art.app.base.system.service;

import java.util.List;

import com.art.app.base.system.domain.OptionVO;
import com.art.fw.domain.ResultVO;

public interface OptionService 
{
	public List<OptionVO> getList(OptionVO param) throws Exception;

	public List<OptionVO> getCategoryList(OptionVO param) throws Exception;
	
	public ResultVO insert(OptionVO param) throws Exception;
	
	public ResultVO update(OptionVO param) throws Exception;
	
	public ResultVO updateValue(OptionVO param) throws Exception;
	
	public ResultVO delete(OptionVO param) throws Exception;
}
