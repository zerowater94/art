package com.art.app.base.org.dao;

import java.util.List;

import com.art.app.base.org.domain.DeptVO;
import com.art.app.common.basic.dao.CommonDao;

public interface DeptDao extends CommonDao<DeptVO>
{	
	public DeptVO selectMaxOrder(DeptVO param) throws Exception;
	
	public List<DeptVO> selectSubDeptList(DeptVO param) throws Exception;
	
	public int updateOrder(DeptVO param) throws Exception;
	
	public int deleteMulti(DeptVO param) throws Exception;
	
}
