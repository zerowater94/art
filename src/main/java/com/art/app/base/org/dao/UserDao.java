package com.art.app.base.org.dao;

import com.art.app.base.org.domain.UserVO;
import com.art.app.common.basic.dao.CommonDao;

public interface UserDao extends CommonDao<UserVO>
{	
	public UserVO selectDataByLoginId(UserVO param) throws Exception;
}
