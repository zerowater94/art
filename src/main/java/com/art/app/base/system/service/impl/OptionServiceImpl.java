package com.art.app.base.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.system.dao.OptionDao;
import com.art.app.base.system.domain.OptionVO;
import com.art.app.base.system.service.OptionService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class OptionServiceImpl extends AbstractService implements OptionService
{
	@Autowired
	private OptionDao dao;
	
	public List<OptionVO> getList(OptionVO param) throws Exception
	{
		return dao.selectList(param);
	}
	
	public List<OptionVO> getCategoryList(OptionVO param) throws Exception
	{
		return dao.selectCategoryList(param);
	}
	
	public ResultVO insert(OptionVO param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		param.setOptionId(CommonUtil.getGuid());
		rstVO.setExecCnt(dao.insert(param));
		if ( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
}
