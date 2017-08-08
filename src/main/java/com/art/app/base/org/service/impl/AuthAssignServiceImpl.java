package com.art.app.base.org.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.org.dao.AuthAssignDao;
import com.art.app.base.org.domain.AuthAssignVO;
import com.art.app.base.org.service.AuthAssignService;
import com.art.app.common.basic.service.AbstractService;
import com.art.app.common.component.BasicConstants.AUTH_ASSIGN_TYPE;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class AuthAssignServiceImpl extends AbstractService<AuthAssignVO> implements AuthAssignService
{
	@Autowired
	private AuthAssignDao dao ;

	@Override
	public List<AuthAssignVO> getList(AuthAssignVO param) throws Exception {
		List<AuthAssignVO> assigners = dao.selectList(param);
		for (AuthAssignVO assign : assigners ) {
			logger.debug(assign.getAuthAssignType() + " : " + AUTH_ASSIGN_TYPE.isUser(assign.getAuthAssignType()));
		}
		return dao.selectList(param);
	}

	@Override
	public AuthAssignVO getData(AuthAssignVO param) throws Exception {
		return dao.selectData(param);
	}

	@Override
	public ResultVO insert(AuthAssignVO param) throws Exception {
		param.setAuthAssignId(CommonUtil.getGuid());
		return ResultVO.getExecResultVO(dao.insert(param));
	}

	@Override
	public ResultVO update(AuthAssignVO param) throws Exception {
		return ResultVO.getExecResultVO(dao.update(param));
	}

	@Override
	public ResultVO delete(AuthAssignVO param) throws Exception {
		return ResultVO.getExecResultVO(dao.delete(param));
	}


}
