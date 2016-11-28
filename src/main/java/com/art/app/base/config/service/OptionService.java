package com.art.app.base.config.service;

import java.util.List;

import com.art.app.base.config.domain.OptionVO;

public interface OptionService 
{
	public List<OptionVO> getList(OptionVO param) throws Exception;
}
