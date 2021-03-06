package com.art.app.common.basic.ctl;

import java.io.ByteArrayInputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.system.domain.CodeVO;
import com.art.app.base.system.domain.OptionVO;
import com.art.app.common.component.BasicCodeOptions;
import com.art.app.common.component.BasicConstants;
import com.art.app.common.component.BasicInfo;
import com.art.fw.annota.NoSession;
import com.art.fw.domain.JSONObj;

@RestController
@RequestMapping("/common/initialize")
public class InitailizeCtl extends AbstractCtl
{
	@NoSession
	@RequestMapping(value="/reload/resource/{langType}", method = RequestMethod.GET)
	public String getResoureConfig( @PathVariable String langType ) throws Exception
	{
		JSONObj rtnObj = null;
		try
		{
			rtnObj = new JSONObj();
			rtnObj.put("PROPERTIES", BasicInfo.getProperties());
			rtnObj.put("MSG", BasicInfo.getMessageDefaultObj(langType)); // 최초에 common_module resource를 load 한다.
			rtnObj.put("CONSTANTS", BasicConstants.getConstantsMap());
			
		}catch ( Exception ex )
		{
			ex.printStackTrace();
			super.logger.error(ex.getMessage());
			throw ex;
		}
		return rtnObj.toString();
	}
		
	@RequestMapping(value = "/getCustomCss/{theme}/{fileName:.+}", method = RequestMethod.GET)
	public void getCssFile(HttpServletResponse response, @PathVariable String theme, @PathVariable String fileName ) throws Exception
	{
		try
		{
		    response.setHeader("Content-Type", "text/css");
		    FileCopyUtils.copy(BasicInfo.getCustomCss(theme+java.io.File.separator+fileName), response.getOutputStream());
		}catch ( Exception ex )
		{
			logger.error(ex.getMessage());
			FileCopyUtils.copy(new ByteArrayInputStream("".getBytes()), response.getOutputStream());
		}
	}
	
	@RequestMapping(value = "/code/{locale}/code-group/{codeGroup}", method = RequestMethod.GET)
	public List<CodeVO> getCodeList(HttpServletResponse response, @PathVariable String locale, @PathVariable String codeGroup ) throws Exception
	{
		return BasicCodeOptions.getCodeList(codeGroup, locale);
	}
	
	@RequestMapping(value = "/option/category/{category}", method = RequestMethod.GET)
	public List<OptionVO> getOptionList(HttpServletResponse response, @PathVariable String category ) throws Exception
	{
		return BasicCodeOptions.getOptionList(category);
	}
}
