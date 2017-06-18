package com.art.app.base.org.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.org.dao.AuthGrantDao;
import com.art.app.base.org.domain.AuthGrantVO;
import com.art.app.base.org.service.AuthGrantService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class AuthGrantServiceImpl extends AbstractService<AuthGrantVO> implements AuthGrantService
{
	@Autowired
	private AuthGrantDao dao ;

	@Override
	public List<AuthGrantVO> getList(AuthGrantVO param) throws Exception {
		return dao.selectList(param);
	}

	@Override
	public AuthGrantVO getData(AuthGrantVO param) throws Exception {
		return dao.selectData(param);
	}

	@Override
	public ResultVO insert(AuthGrantVO param) throws Exception {
		param.setAuthGrantId(CommonUtil.getGuid());
		return ResultVO.getExecResultVO(dao.insert(param));
	}

	@Override
	public ResultVO update(AuthGrantVO param) throws Exception {
		return ResultVO.getExecResultVO(dao.update(param));
	}

	@Override
	public ResultVO delete(AuthGrantVO param) throws Exception {
		return ResultVO.getExecResultVO(dao.delete(param));
	}


}
