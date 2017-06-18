package com.art.app.base.system.service;

import java.util.List;

import com.art.app.base.system.domain.MenuVO;
import com.art.fw.domain.ResultVO;

public interface MenuService 
{
	public List<MenuVO> getList(MenuVO param) throws Exception;

	public MenuVO getData(MenuVO param) throws Exception;
	
	public ResultVO insert(MenuVO param) throws Exception;
	
	public ResultVO update(MenuVO param) throws Exception;
	
	public ResultVO delete(MenuVO param) throws Exception;
}
