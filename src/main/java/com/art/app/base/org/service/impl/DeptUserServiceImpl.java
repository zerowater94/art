package com.art.app.base.org.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.org.dao.DeptUserDao;
import com.art.app.base.org.domain.DeptUserVO;
import com.art.app.base.org.domain.MembersVO;
import com.art.app.base.org.service.DeptUserService;
import com.art.app.common.basic.service.AbstractService;
import com.art.app.common.component.BasicConstants;
import com.art.fw.domain.ResultVO;
import com.art.fw.resource.BasicResultCode;

@Service
public class DeptUserServiceImpl extends AbstractService<DeptUserVO> implements DeptUserService
{
	@Autowired
	private DeptUserDao dao ;
	
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
		if (this.getMemberVO(param) != null) {
			return ResultVO.getErrorResultVO(BasicResultCode.ALEADY_DATA);
		}
		if (this.isRegistOriginalDept(param) ) {
			param.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ADDITIONAL.code);
		} else {
			param.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ORIGINAL.code);
		}
		param.setDeptOrder(dao.selectMaxOrder(param)+1);
		return ResultVO.getExecResultVO(dao.insert(param));
	}

	@Override
	public ResultVO update(DeptUserVO param) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public ResultVO delete(DeptUserVO param) throws Exception {
		int execCnt = dao.delete(param);
		if (execCnt == 0 ) {
			return ResultVO.getExecResultVO(execCnt);
		}
		List<DeptUserVO> nextOrderDepts = dao.selectNextOrderDept(param);
		for (DeptUserVO vo : nextOrderDepts) {
			vo.copyExecuteUser(param);
			vo.setDeptOrder(vo.getDeptOrder()-1);
			if (vo.getDeptOrder() == 1 ) {
				vo.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ORIGINAL.code);
			} else {
				vo.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ADDITIONAL.code);
			}
			dao.updateOrder(vo);
		}
		return ResultVO.getExecResultVO(execCnt);
	}
	
	private DeptUserVO getMemberVO(DeptUserVO param) throws Exception {
		DeptUserVO searchVO = new DeptUserVO();
		searchVO.setUserId(param.getUserId());
		searchVO.setDeptId(param.getDeptId());
		return dao.selectData(searchVO);
	}
	
	private boolean isRegistOriginalDept(DeptUserVO param) throws Exception {
		DeptUserVO searchVO = new DeptUserVO();
		searchVO.setUserId(param.getUserId());
		searchVO.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ORIGINAL.code);
		List<DeptUserVO> originalDeptList = dao.selectList(searchVO);
		return (originalDeptList != null && originalDeptList.size() > 0);
	}
}
