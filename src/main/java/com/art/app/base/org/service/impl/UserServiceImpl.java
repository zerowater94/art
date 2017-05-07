package com.art.app.base.org.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.org.dao.UserDao;
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

	@Override
	public List<UserVO> getList(UserVO param) throws Exception {
		return dao.selectList(param);
	}

	@Override
	public UserVO getData(UserVO param) throws Exception {
		return dao.selectData(param);
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
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.update(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}

	@Override
	public ResultVO delete(UserVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.delete(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}


}
