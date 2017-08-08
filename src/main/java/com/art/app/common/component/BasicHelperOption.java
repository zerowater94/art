package com.art.app.common.component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.art.app.base.system.domain.OptionVO;
import com.art.app.base.system.service.OptionService;

@Component
public class BasicHelperOption 
{
	private Logger log = Logger.getLogger(this.getClass());
	@Autowired
	private OptionService optionService ;
	
	private Map<String, List<OptionVO>> optionMap = null;
	
	
	public List<OptionVO> getOptionList(String category) 
	{
		if (optionMap == null )
		{
			optionMap = new HashMap<String, List<OptionVO>>();
		}
		
		if (optionMap.get(category) == null )
		{
			optionMap.put(category,getReloadOptionList(category));
		}
		return optionMap.get(category);
	}
	
	
	private List<OptionVO> getReloadOptionList(String category)
	{
		OptionVO param = null;
		List<OptionVO> optionList = null;
		try
		{
			param = new OptionVO();
			param.setCategory(category);
			optionList = optionService.getList(param);
		} catch ( Exception ex ) {
			log.error(ex.getMessage());
		}
		return optionList;
	}
	
}
