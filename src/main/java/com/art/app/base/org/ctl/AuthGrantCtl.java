package com.art.app.base.org.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.org.domain.AuthGrantVO;
import com.art.app.base.org.service.AuthGrantService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/org/auth/grant")
public class AuthGrantCtl extends AbstractCtl
{
	@Autowired
	private AuthGrantService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<AuthGrantVO> getList(AuthGrantVO param ) throws Exception
	{
		logger.debug("call getList : " );
		return service.getList(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.GET)
	public AuthGrantVO getData(AuthGrantVO param ) throws Exception
	{
		logger.debug("call getDataByLoginId : " + param.getAuthGrantId() );
		return service.getData(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResultVO insert(@RequestBody AuthGrantVO param ) throws Exception
	{
		logger.debug("call insert : " + param.getAuthAssignId());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.PUT)
	public ResultVO update(@RequestBody AuthGrantVO param ) throws Exception
	{
		logger.debug("call update : " + param.getAuthGrantId());
		if( CommonUtil.isNull(param.getAuthGrantId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.DELETE)
	public ResultVO delete(@RequestBody AuthGrantVO param ) throws Exception
	{
		logger.debug("call delete : " +param.getAuthGrantId());
		if( CommonUtil.isNull(param.getAuthGrantId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.delete(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
}
