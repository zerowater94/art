package com.art.app.base.org.dao;

import java.util.List;

import com.art.app.base.org.domain.DeptUserVO;
import com.art.app.base.org.domain.DeptVO;
import com.art.app.base.org.domain.MembersVO;
import com.art.app.base.org.domain.UserVO;
import com.art.app.common.basic.dao.CommonDao;

public interface DeptUserDao extends CommonDao<DeptUserVO>
{	
	public List<MembersVO> selectDeptUserList(MembersVO param) throws Exception;
	
	public List<MembersVO> selectMultiDeptMemberList(DeptVO param) throws Exception;
	
	public List<DeptUserVO> selectNextOrderDept(DeptUserVO param) throws Exception;
	
	public int selectMaxOrder(DeptUserVO param) throws Exception;
	
	public int updateOrder(DeptUserVO param) throws Exception;
	
	public int deleteRemovedDept(UserVO param) throws Exception;
	
}
