package com.art.app.base.system.dao;

import com.art.app.base.system.domain.CompVO;
import com.art.app.common.basic.dao.CommonDao;

public interface CompDao extends CommonDao<CompVO>
{	
	public int updateOrder(CompVO param) throws Exception;
	
}
