package com.art.app.base.org.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.org.domain.DeptUserVO;
import com.art.app.base.org.domain.MembersVO;
import com.art.app.base.org.service.DeptUserService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/org/members")
public class DeptUserCtl extends AbstractCtl
{
	@Autowired
	private DeptUserService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<DeptUserVO> getList( DeptUserVO param ) throws Exception
	{
		logger.debug("call getList : " + param.getCompId()+" , deptId : " + param.getDeptId());
		if( CommonUtil.isNull(param.getDeptId()) )
			throw new BadRequestException();
		return service.getList(param);
	}
	
	@RequestMapping(value="/list/all", method = RequestMethod.GET)
	public List<MembersVO> getDeptUserList( MembersVO param ) throws Exception
	{
		logger.debug("call getList : " + param.getCompId());
		return service.getDeptUserList(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResultVO insert(@RequestBody DeptUserVO param ) throws Exception
	{
		logger.debug("call insert : " + param.getDeptId() + " , " +param.getUserId());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	@RequestMapping(value="", method = RequestMethod.PUT)
	public ResultVO update(@RequestBody DeptUserVO param ) throws Exception
	{
		logger.debug("call update : " + param.getCompId());
		if( CommonUtil.isNull(param.getDeptId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.DELETE)
	public ResultVO delete(@RequestBody DeptUserVO param ) throws Exception
	{
		logger.debug("call delete : " +param.getDeptId() +", "+param.getUserId());
		if( CommonUtil.isNull(param.getDeptId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.delete(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
}
