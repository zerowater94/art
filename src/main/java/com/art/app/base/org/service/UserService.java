package com.art.app.base.org.service;


import com.art.app.base.org.domain.UserVO;
import com.art.app.common.basic.service.CommonService;

public interface UserService extends CommonService<UserVO>
{
	public UserVO getDataByLoginId(UserVO param) throws Exception;
}
