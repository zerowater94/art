package com.art.app.common.component;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.art.app.base.system.domain.CodeVO;
import com.art.app.base.system.domain.OptionVO;

@Component
public class BasicCodeOptions 
{
	private static BasicHelperCode codeHelper;
	
	private static BasicHelperOption optionHelper;
	
	@Autowired(required = true)
	public void setBasicHelperCode(BasicHelperCode helper)
	{
		codeHelper = helper; 
	}
	
	@Autowired(required = true)
	public void setBasicHelperOption(BasicHelperOption helper)
	{
		optionHelper = helper; 
	}
	
	
	public static List<CodeVO> getCodeList(String codeGroup, String locale) 
	{
		return codeHelper.getCodeList(codeGroup, locale);
	}
	
	public static List<OptionVO> getOptionList(String category) 
	{
		return optionHelper.getOptionList(category);
	}
}
