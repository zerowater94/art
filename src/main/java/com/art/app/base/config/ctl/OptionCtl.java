package com.art.app.base.config.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.config.domain.OptionVO;
import com.art.app.base.config.service.OptionService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.app.common.component.BasicConstants;

@RestController
@RequestMapping("/base/config/option")
public class OptionCtl extends AbstractCtl
{
	@Autowired
	private OptionService service;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public List<OptionVO> getSessionInfoData( OptionVO param ) throws Exception
	{
		logger.debug("BasicConstants.LOGIN_RESULT.FailLogin.name() : "+ BasicConstants.LOGIN_TYPE.LOGIN.code);
		return service.getList(param);
	}
}
