package com.art.app.base.org.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.org.domain.CompVO;
import com.art.app.base.org.service.CompService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/org/comp")
public class CompCtl extends AbstractCtl
{
	@Autowired
	private CompService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<CompVO> getList( CompVO param ) throws Exception
	{
		return service.getList(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResultVO insert(@RequestBody CompVO param ) throws Exception
	{
		logger.debug("call insert : " + param.getCompCode() + " , " +param.getCompName());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	@RequestMapping(value="", method = RequestMethod.PUT)
	public ResultVO update(@RequestBody CompVO param ) throws Exception
	{
		logger.debug("call update : " + param.getCompId());
		if( CommonUtil.isNull(param.getCompId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	@RequestMapping(value="/order", method = RequestMethod.PUT)
	public ResultVO reorder(@RequestBody List<CompVO> param ) throws Exception
	{
		logger.debug("call reorder : " + param.size() );
		ResultVO rstVO = service.updateOrder(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.DELETE)
	public ResultVO delete(@RequestBody CompVO param ) throws Exception
	{
		logger.debug("call delete : " +param.getCompId());
		if( CommonUtil.isNull(param.getCompId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.delete(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
}
