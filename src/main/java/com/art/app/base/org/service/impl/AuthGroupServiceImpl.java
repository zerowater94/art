package com.art.app.base.org.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.org.dao.AuthGroupDao;
import com.art.app.base.org.domain.AuthGroupVO;
import com.art.app.base.org.service.AuthGroupService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class AuthGroupServiceImpl extends AbstractService<AuthGroupVO> implements AuthGroupService
{
	@Autowired
	private AuthGroupDao dao ;

	@Override
	public List<AuthGroupVO> getList(AuthGroupVO param) throws Exception {
		return dao.selectList(param);
	}

	@Override
	public AuthGroupVO getData(AuthGroupVO param) throws Exception {
		return dao.selectData(param);
	}

	@Override
	public ResultVO insert(AuthGroupVO param) throws Exception {
		param.setAuthGroupId(CommonUtil.getGuid());
		return ResultVO.getExecResultVO(dao.insert(param));
	}

	@Override
	public ResultVO update(AuthGroupVO param) throws Exception {
		return ResultVO.getExecResultVO(dao.update(param));
	}

	@Override
	public ResultVO delete(AuthGroupVO param) throws Exception {
		return ResultVO.getExecResultVO(dao.delete(param));
	}


}
