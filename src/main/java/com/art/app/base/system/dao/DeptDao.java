package com.art.app.base.system.dao;

import com.art.app.base.system.domain.DeptVO;
import com.art.app.common.basic.dao.CommonDao;

public interface DeptDao extends CommonDao<DeptVO>
{	
	public DeptVO selectMaxOrder(DeptVO param) throws Exception;
	
	public int updateOrder(DeptVO param) throws Exception;
	
}
