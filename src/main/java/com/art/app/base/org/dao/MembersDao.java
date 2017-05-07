package com.art.app.base.org.dao;

import java.util.List;

import com.art.app.base.org.domain.DeptUserVO;
import com.art.app.base.org.domain.DeptVO;
import com.art.app.base.org.domain.MembersVO;
import com.art.app.common.basic.dao.CommonDao;

public interface MembersDao extends CommonDao<DeptUserVO>
{	
	public List<MembersVO> selectDeptUserList(MembersVO param) throws Exception;
	
	public List<MembersVO> selectMultiDeptMemberList(DeptVO param) throws Exception;
	
}
