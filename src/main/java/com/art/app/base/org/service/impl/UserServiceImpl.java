package com.art.app.base.org.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.org.dao.DeptUserDao;
import com.art.app.base.org.dao.UserDao;
import com.art.app.base.org.domain.DeptUserVO;
import com.art.app.base.org.domain.UserVO;
import com.art.app.base.org.service.UserService;
import com.art.app.common.basic.service.AbstractService;
import com.art.app.common.component.BasicConstants;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class UserServiceImpl extends AbstractService<UserVO> implements UserService
{
	@Autowired
	private UserDao dao ;
	
	@Autowired
	private DeptUserDao deptUserDao;

	@Override
	public List<UserVO> getList(UserVO param) throws Exception {
		return dao.selectList(param);
	}

	@Override
	public UserVO getData(UserVO param) throws Exception {
		UserVO userVO = dao.selectData(param);
		DeptUserVO deptUserVO = new DeptUserVO();
		deptUserVO.setUserId(param.getUserId());
		userVO.setUserDeptList(deptUserDao.selectList(deptUserVO));
		return userVO;
	}
	
	@Override
	public UserVO getDataByLoginId(UserVO param) throws Exception {
		return dao.selectDataByLoginId(param);
	}

	@Override
	public ResultVO insert(UserVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		param.setUserId(CommonUtil.getGuid());
		param.setUserStatus(BasicConstants.USER_STATUS.NORMAR.code);
		rstVO.setExecCnt(dao.insert(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}

	@Override
	public ResultVO update(UserVO param) throws Exception {
		int execCnt = dao.update(param);
		if( execCnt == 0 ) {
			return ResultVO.getExecResultVO(execCnt);
		}
		
		boolean resultBln = this.updateUserDepts(param);
		if (!resultBln ) {
			return ResultVO.getExecResultVO(0);
		}
		return ResultVO.getExecResultVO(execCnt);
	}

	@Override
	public ResultVO delete(UserVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.delete(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
	
	private boolean updateUserDepts(UserVO param) throws Exception {
		int maxOrder = 0 ;
		if (param.isExistUserDept() ) {
			for(DeptUserVO vo : param.getUserDeptList()) {
				vo.copyExecuteUser(param);
				vo.setUserId(param.getUserId());
				vo.setDeptOrder(++maxOrder);
				if (maxOrder == 1 ) {
					vo.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ORIGINAL.code);
				} else {
					vo.setDeptTypeCode(BasicConstants.USER_DEPT_TYPE.ADDITIONAL.code);
				}
				deptUserDao.updateOrder(vo);
			}
		}
		deptUserDao.deleteRemovedDept(param);
		return true;
	}
}
