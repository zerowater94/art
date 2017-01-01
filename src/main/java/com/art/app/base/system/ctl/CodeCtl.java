package com.art.app.base.system.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.system.domain.CodeVO;
import com.art.app.base.system.service.CodeService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.app.common.component.BasicInfo;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/system/code")
public class CodeCtl extends AbstractCtl
{
	@Autowired
	private CodeService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<CodeVO> getOptionList( CodeVO param ) throws Exception
	{
		return service.getList(param);
	}
	
	
	@RequestMapping(value="/save", method = RequestMethod.POST)
	public ResultVO insertData(@RequestBody CodeVO param ) throws Exception
	{
		logger.debug("call insertdata : " + param.getCodeGroup() + " , " +param.getCode());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(BasicInfo.fail(super.getSessionLocale()).insert());
		return rstVO;
	}
	
	@RequestMapping(value="/save", method = RequestMethod.PUT)
	public ResultVO updateData(@RequestBody CodeVO param ) throws Exception
	{
		logger.debug("call updateData : " + param.getCodeGroup() + " , " +param.getCodeId());
		if( CommonUtil.isNull(param.getCodeId()) )
			throw new BadRequestException(BasicInfo.fail(super.getSessionLocale()).poorParam());
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(BasicInfo.fail(super.getSessionLocale()).update());
		return rstVO;
	}
	
	
	@RequestMapping(value="/save", method = RequestMethod.DELETE)
	public ResultVO deleteData(@RequestBody CodeVO param ) throws Exception
	{
		logger.debug("call deleteData : " +param.getCodeId());
		
		if( CommonUtil.isNull(param.getCodeId()) )
			throw new BadRequestException(BasicInfo.fail(super.getSessionLocale()).poorParam());
		ResultVO rstVO = service.delete(param);
		if ( !rstVO.getResult() )
			throw new ArtException(BasicInfo.fail(super.getSessionLocale()).delete());
		return rstVO;
	}
}
