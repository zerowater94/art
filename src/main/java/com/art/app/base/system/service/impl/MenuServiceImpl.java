package com.art.app.base.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.system.dao.MenuDao;
import com.art.app.base.system.domain.MenuVO;
import com.art.app.base.system.service.MenuService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class MenuServiceImpl extends AbstractService<MenuVO> implements MenuService
{
	@Autowired
	private MenuDao dao;
	
	@Override
	public List<MenuVO> getList(MenuVO param) throws Exception
	{
		return dao.selectList(param);
	}
	@Override
	public MenuVO getData(MenuVO param) throws Exception
	{
		return dao.selectData(param);
	}
	@Override
	public ResultVO insert(MenuVO param) throws Exception
	{
		try
		{
			param.setMenuId(CommonUtil.getGuid());
			return ResultVO.getExecResultVO(dao.insert(param));
		}catch ( Exception ex )
		{
			throw ex;
		}
	}
	@Override
	public ResultVO update(MenuVO param) throws Exception
	{
		try
		{
			return ResultVO.getExecResultVO(dao.update(param));
		}catch ( Exception ex )
		{
			throw ex;
		}
	}
	
	@Override
	public ResultVO delete(MenuVO param) throws Exception
	{
		return ResultVO.getErrorResultVO("");
	}
	
}
