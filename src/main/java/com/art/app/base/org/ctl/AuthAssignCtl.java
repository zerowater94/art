package com.art.app.base.org.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.org.domain.AuthAssignVO;
import com.art.app.base.org.service.AuthAssignService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/org/auth/grant")
public class AuthAssignCtl extends AbstractCtl
{
	@Autowired
	private AuthAssignService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<AuthAssignVO> getList(AuthAssignVO param ) throws Exception
	{
		logger.debug("call getList : " );
		return service.getList(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.GET)
	public AuthAssignVO getData(AuthAssignVO param ) throws Exception
	{
		logger.debug("call getDataByLoginId : " + param.getAuthAssignId() );
		return service.getData(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResultVO insert(@RequestBody AuthAssignVO param ) throws Exception
	{
		logger.debug("call insert : " + param.getAuthAssignId());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.PUT)
	public ResultVO update(@RequestBody AuthAssignVO param ) throws Exception
	{
		logger.debug("call update : " + param.getAuthAssignId());
		if( CommonUtil.isNull(param.getAuthAssignId()) ) {
			throw new BadRequestException();
		}	
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.DELETE)
	public ResultVO delete(@RequestBody AuthAssignVO param ) throws Exception
	{
		logger.debug("call delete : " +param.getAuthAssignId());
		if( CommonUtil.isNull(param.getAuthAssignId()) ) {
			throw new BadRequestException();
		}
		ResultVO rstVO = service.delete(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
}
