package com.art.app.base.org.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.org.dao.MembersDao;
import com.art.app.base.org.domain.DeptUserVO;
import com.art.app.base.org.domain.MembersVO;
import com.art.app.base.org.service.MembersService;
import com.art.app.common.basic.service.AbstractService;
import com.art.app.common.component.BasicConstants;
import com.art.fw.domain.ResultVO;

@Service
public class MembersServiceImpl extends AbstractService<DeptUserVO> implements MembersService
{
	@Autowired
	private MembersDao dao ;
	
	@Override
	public List<MembersVO> getDeptUserList(MembersVO param) throws Exception {
		return dao.selectDeptUserList(param);
	}
	
	@Override
	public List<DeptUserVO> getList(DeptUserVO param) throws Exception {
		return dao.selectList(param);
	}

	@Override
	public ResultVO insert(DeptUserVO param) throws Exception {
		DeptUserVO searchVO = new DeptUserVO();
		searchVO.setUserId(param.getUserId());
		searchVO.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ORIGINAL.code);
		List<DeptUserVO> originalDeptList = dao.selectList(searchVO);
		if (originalDeptList == null || originalDeptList.size() == 0 ) 
			param.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ORIGINAL.code);
		else
			param.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ADDITIONAL.code);
		return ResultVO.getExecResultVO(dao.insert(param));
	}

	@Override
	public ResultVO update(DeptUserVO param) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public ResultVO delete(DeptUserVO param) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
