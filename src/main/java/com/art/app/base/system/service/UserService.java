package com.art.app.base.system.service;


import com.art.app.base.system.domain.UserVO;
import com.art.app.common.basic.service.CommonService;

public interface UserService extends CommonService<UserVO>
{
	public UserVO getDataByLoginId(UserVO param) throws Exception;
}
