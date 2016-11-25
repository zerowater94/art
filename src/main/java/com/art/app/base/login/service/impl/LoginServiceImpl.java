package com.art.app.base.login.service.impl;

import org.springframework.stereotype.Service;

import com.art.app.base.login.domain.LoginVO;
import com.art.app.base.login.service.LoginService;
import com.art.app.base.user.domain.UserBasicVO;
import com.art.app.common.basic.service.AbstractService;
import com.art.app.common.component.BasicConstants;
import com.art.fw.exception.AuthException;

@Service("loginService")
public class LoginServiceImpl extends AbstractService implements LoginService
{
	private final String SETUP_LOGIN_ID  = "setupAdmin";
	private final String SETUP_LOGIN_PWD = "art@setup!2016";
	
	/**
	 * 로그인 정보를 검색 한다. 
	 */
	@Override
	public UserBasicVO loginProcess(LoginVO param) throws Exception 
	{
		UserBasicVO rtnVO = null;
		try
		{
			if( param.getLoginType().equals(BasicConstants.LOGIN_TYPE.SETUP.code) )
			{
				if( !( param.getLoginId().equals(this.SETUP_LOGIN_ID)
						&& param.getPassword().equals(this.SETUP_LOGIN_PWD)) )
					throw new AuthException();
				
				rtnVO = this.getSetupUserInfo();
					
			}else 
			{
				
			}
		}catch ( Exception ex )
		{
			throw ex;
		}
		return rtnVO;
	}
	
	
	private UserBasicVO getSetupUserInfo() 
	{
		UserBasicVO rtnVO = new UserBasicVO();
		rtnVO.setUserId(this.SETUP_LOGIN_ID);
		rtnVO.setUserUid(this.SETUP_LOGIN_ID);
		rtnVO.setUserName("Setup Admin");
		rtnVO.setSystemRole(BasicConstants.SYS_ROLE.SYSTEM_ADMIN.code);
		return rtnVO;
	}

}
