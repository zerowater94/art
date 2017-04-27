package com.art.app.base.system.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.system.domain.DeptUserVO;
import com.art.app.base.system.domain.DeptVO;
import com.art.app.base.system.service.DeptService;
import com.art.app.base.system.service.DeptUserService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/system/deptuser")
public class DeptUserCtl extends AbstractCtl
{
	@Autowired
	private DeptUserService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<DeptUserVO> getList( DeptUserVO param ) throws Exception
	{
		logger.debug("call getList : " + param.getCompId());
		return service.getList(param);
	}
	
	@RequestMapping(value="/list/all", method = RequestMethod.GET)
	public List<DeptUserVO> getDeptUserList( DeptUserVO param ) throws Exception
	{
		logger.debug("call getList : " + param.getCompId());
		return service.getDeptUserList(param);
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public ResultVO insert(@RequestBody DeptUserVO param ) throws Exception
	{
		logger.debug("call insert : " + param.getDeptCode() + " , " +param.getDeptName());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	@RequestMapping(value="", method = RequestMethod.PUT)
	public ResultVO update(@RequestBody DeptUserVO param ) throws Exception
	{
		logger.debug("call update : " + param.getCompId());
		if( CommonUtil.isNull(param.getCompId()) )
			throw new BadRequestException();
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(rstVO);
		return rstVO;
	}
	
	
	@RequestMapping(value="", method = RequestMethod.DELETE)
	public ResultVO delete(@RequestBody DeptUserVO param ) throws Exception
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
