package com.art.app.base.org.dao;

import com.art.app.base.org.domain.CompVO;
import com.art.app.common.basic.dao.CommonDao;

public interface CompDao extends CommonDao<CompVO>
{	
	public CompVO selectMaxOrder(CompVO param) throws Exception;
	
	public int updateOrder(CompVO param) throws Exception;
	
}
