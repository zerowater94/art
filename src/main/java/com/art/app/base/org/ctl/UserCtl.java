package com.art.app.base.org.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.org.domain.UserVO;
import com.art.app.base.org.service.UserService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/org/user")
public class UserCtl extends AbstractCtl
{
	@Autowired
	private UserService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<UserVO> getList(UserVO param ) throws Exception
	{
		logger.debug("call getList : " + param.getCompId());
		return service.getList(param);
	}
	
	@RequestMapping(value="/loginid/{loginId}", method = RequestMethod.GET)
	public UserVO getDataByLoginId(UserVO param ) throws Exception
	{
		logger.debug("call getDataByLoginId : " + param.getSiteId() + " , " +param.getLoginId());
		return service.getDataByLoginId(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResultVO insert(@RequestBody UserVO param ) throws Exception
	{
		logger.debug("call insert : " + param.getUserId() + " , " +param.getUserName());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	
	@RequestMapping(value="", method = RequestMethod.PUT)
	public ResultVO update(@RequestBody UserVO param ) throws Exception
	{
		logger.debug("call update : " + param.getUserId());
		if( CommonUtil.isNull(param.getUserId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.DELETE)
	public ResultVO delete(@RequestBody UserVO param ) throws Exception
	{
		logger.debug("call delete : " +param.getUserId());
		if( CommonUtil.isNull(param.getUserId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.delete(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
}
