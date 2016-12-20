package com.art.app.base.system.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.system.domain.OptionVO;
import com.art.app.base.system.service.OptionService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.app.common.component.BasicInfo;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/system/option")
public class OptionCtl extends AbstractCtl
{
	@Autowired
	private OptionService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<OptionVO> getOptionList( OptionVO param ) throws Exception
	{
		return service.getList(param);
	}
	
	@RequestMapping(value="/category/list", method = RequestMethod.GET)
	public List<OptionVO> getCategoryList( OptionVO param ) throws Exception
	{
		return service.getCategoryList(param);
	}
	
	
	@RequestMapping(value="/save", method = RequestMethod.POST)
	public ResultVO insertData(@RequestBody OptionVO param ) throws Exception
	{
		logger.debug("call insertdata : " + param.getCategory() + " , " +param.getOptionId());
		ResultVO rstVO = service.insert(param);
		if ( !rstVO.getResult() )
			throw new ArtException(BasicInfo.fail(super.getSessionLocale()).insert());
		return rstVO;
	}
	
	@RequestMapping(value="/save", method = RequestMethod.PUT)
	public ResultVO updateData(@RequestBody OptionVO param ) throws Exception
	{
		logger.debug("call insertdata : " + param.getCategory() + " , " +param.getOptionId());
		
		if( CommonUtil.isNull(param.getOptionId()) )
			throw new BadRequestException(BasicInfo.fail(super.getSessionLocale()).poorParam());
		ResultVO rstVO = service.update(param);
		if ( !rstVO.getResult() )
			throw new ArtException(BasicInfo.fail(super.getSessionLocale()).insert());
		return rstVO;
	}
}
