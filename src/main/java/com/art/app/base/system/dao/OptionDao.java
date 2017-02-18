package com.art.app.base.system.dao;

import java.util.List;

import com.art.app.base.system.domain.OptionVO;
import com.art.app.common.basic.dao.CommonDao;

public interface OptionDao extends CommonDao<OptionVO>
{
	public List<OptionVO> selectCategoryList(OptionVO param) throws Exception;

	public int updateValue(OptionVO param) throws Exception;
	
}
