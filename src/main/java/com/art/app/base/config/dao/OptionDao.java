package com.art.app.base.config.dao;

import java.util.List;

import com.art.app.base.config.domain.OptionVO;

public interface OptionDao
{
	public List<OptionVO> selectList( OptionVO param ) throws Exception;
}
