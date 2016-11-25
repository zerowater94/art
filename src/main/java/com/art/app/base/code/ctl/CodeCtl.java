package com.art.app.base.code.ctl;

import java.io.ByteArrayInputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.code.service.CodeService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.app.common.component.BasicConstants;
import com.art.app.common.component.BasicInfo;
import com.art.fw.annota.NoSession;
import com.art.fw.domain.JSONObj;

@RestController
@RequestMapping("/base/code")
public class CodeCtl extends AbstractCtl
{
	@Autowired 
	private CodeService servcie ;
	
	@NoSession
	@RequestMapping(value="/callJsp/{module}", method = RequestMethod.GET)
	public String callJsp( @PathVariable String module ) throws Exception
	{
		super.logger.debug("callJsp : " + module);
		JSONObj rtnObj = null;
		try
		{
			rtnObj = this.servcie.callJsp();
		}catch ( Exception ex )
		{
			ex.printStackTrace();
			super.logger.error(ex.getMessage());
			throw ex;
		}
		return rtnObj.toString();
	}
}
