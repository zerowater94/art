package com.art.app.base.config.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.config.dao.OptionDao;
import com.art.app.base.config.domain.OptionVO;
import com.art.app.base.config.service.OptionService;
import com.art.app.common.basic.service.AbstractService;

@Service("optionService")
public class OptionServiceImpl extends AbstractService implements OptionService
{
	@Autowired
	private OptionDao dao;
	
	public List<OptionVO> getList(OptionVO param) throws Exception
	{
		return dao.selectList(param);
	}
}
