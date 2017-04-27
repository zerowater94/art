package com.art.app.base.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.system.dao.DeptUserDao;
import com.art.app.base.system.domain.DeptUserVO;
import com.art.app.base.system.service.DeptUserService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;

@Service
public class DeptUserServiceImpl extends AbstractService implements DeptUserService
{
	@Autowired
	private DeptUserDao dao ;

	@Override
	public List<DeptUserVO> getList(DeptUserVO param) throws Exception {
		return null;
	}

	@Override
	public DeptUserVO getData(DeptUserVO param) throws Exception {
		return null;
	}

	@Override
	public ResultVO insert(DeptUserVO param) throws Exception {
		// TODO Auto-generated method stub
		return null;
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

	@Override
	public List<DeptUserVO> getDeptUserList(DeptUserVO param) throws Exception {
		return dao.selectDeptUserList(param);
	}

}
