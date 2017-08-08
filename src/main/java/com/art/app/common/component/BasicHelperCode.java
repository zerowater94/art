package com.art.app.common.component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.art.app.base.system.domain.CodeVO;
import com.art.app.base.system.service.CodeService;

@Component
public class BasicHelperCode 
{
	private Logger log = Logger.getLogger(this.getClass());
	@Autowired
	private CodeService codeService ;
	
	private Map<String, Map<String, List<CodeVO>>> codeLocaleMap = null;
	
	
	private Map<String, List<CodeVO>> getLocaleCode(String locale)
	{
		if (codeLocaleMap == null ) 
		{
			codeLocaleMap = new HashMap<String, Map<String, List<CodeVO>>>();
		}
		
		if (codeLocaleMap.get(locale) == null )
		{
			codeLocaleMap.put(locale, new HashMap<String, List<CodeVO>>());
		}
		return codeLocaleMap.get(locale);
	}
	
	public List<CodeVO> getCodeList(String codeGroup, String locale) 
	{
		if (getLocaleCode(locale).get(codeGroup) == null )
		{
			getLocaleCode(locale).put(codeGroup,getReloadCodeList(codeGroup, locale));
		}
		return getLocaleCode(locale).get(codeGroup);
	}
	
	public Map<String,String> getCodeMap(String codeGroup, String locale)
	{
		return null;
	}
	
	private List<CodeVO> getReloadCodeList(String codeGroup, String locale)
	{
		CodeVO param = null;
		List<CodeVO> codeList = null;
		try
		{
			param = new CodeVO();
			param.setCodeGroup(codeGroup);
			param.setCodeType(BasicConstants.CODE_TYPE.CODE.code);
			codeList = codeService.getList(param);
		} catch ( Exception ex ) {
			log.error(ex.getMessage());
		}
		return codeList;
	}
	
}
