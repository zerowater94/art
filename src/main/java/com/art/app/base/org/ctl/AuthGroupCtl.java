package com.art.app.base.org.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.org.domain.AuthGroupVO;
import com.art.app.base.org.service.AuthGroupService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/org/auth/group")
public class AuthGroupCtl extends AbstractCtl
{
	@Autowired
	private AuthGroupService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<AuthGroupVO> getList(AuthGroupVO param ) throws Exception
	{
		logger.debug("call getList : " );
		return service.getList(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.GET)
	public AuthGroupVO getData(AuthGroupVO param ) throws Exception
	{
		logger.debug("call getDataByLoginId : " + param.getAuthGroupId() );
		return service.getData(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResultVO insert(@RequestBody AuthGroupVO param ) throws Exception
	{
		logger.debug("call insert : " + param.getAuthGroupName());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.PUT)
	public ResultVO update(@RequestBody AuthGroupVO param ) throws Exception
	{
		logger.debug("call update : " + param.getAuthGroupId());
		if( CommonUtil.isNull(param.getAuthGroupId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.DELETE)
	public ResultVO delete(@RequestBody AuthGroupVO param ) throws Exception
	{
		logger.debug("call delete : " +param.getAuthGroupId());
		if( CommonUtil.isNull(param.getAuthGroupId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.delete(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
}
