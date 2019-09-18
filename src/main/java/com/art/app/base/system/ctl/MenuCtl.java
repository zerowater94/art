package com.art.app.base.system.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.system.domain.MenuVO;
import com.art.app.base.system.service.MenuService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/system/menu")
public class MenuCtl extends AbstractCtl
{
	@Autowired
	private MenuService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<MenuVO> getList( MenuVO param ) throws Exception
	{
		return service.getList(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.GET)
	public MenuVO getData( MenuVO param ) throws Exception
	{
		if( CommonUtil.isNull(param.getMenuId()) )
			throw new BadRequestException();
		return service.getData(param);
	}
	
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResultVO insertData(@RequestBody MenuVO param ) throws Exception
	{
		logger.debug("call insertdata : " + param.getMenuName() + " , " +param.getMenuUrl());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	@RequestMapping(value="", method = RequestMethod.PUT)
	public ResultVO updateData(@RequestBody MenuVO param ) throws Exception
	{
		logger.debug("call updateData : " + param.getMenuId());
		if( CommonUtil.isNull(param.getMenuId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="/delete", method = RequestMethod.DELETE)
	public ResultVO deleteData(@RequestBody MenuVO param ) throws Exception
	{
		logger.debug("call deleteData : " +param.getMenuId());
		if( CommonUtil.isNull(param.getMenuId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.delete(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
}
