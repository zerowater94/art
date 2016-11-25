package com.art.app.base.login.service;

import com.art.app.base.login.domain.LoginVO;
import com.art.app.base.user.domain.UserBasicVO;

public interface LoginService 
{
	
	public UserBasicVO loginProcess(LoginVO param) throws Exception;	
	
}
