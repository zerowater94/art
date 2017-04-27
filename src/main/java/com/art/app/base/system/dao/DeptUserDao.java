package com.art.app.base.system.dao;

import java.util.List;

import com.art.app.base.system.domain.DeptUserVO;
import com.art.app.common.basic.dao.CommonDao;

public interface DeptUserDao extends CommonDao<DeptUserVO>
{	
	public List<DeptUserVO> selectDeptUserList(DeptUserVO param) throws Exception;
	
}
