package com.art.app.base.login.ctl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.base.login.domain.LoginVO;
import com.art.app.base.login.service.LoginService;
import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.app.common.component.BasicConstants;
import com.art.fw.annota.NoReferer;
import com.art.fw.annota.NoSession;
import com.art.fw.domain.JSONObj;
import com.art.fw.domain.RequestVO;
import com.art.fw.domain.ResultVO;
import com.art.fw.domain.SessionInfoVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.resource.BasicResultCode;
import com.art.fw.security.EncryptUtil;
import com.art.fw.session.SessionManager;
import com.art.fw.util.CommonUtil;

@RestController
@RequestMapping("/base/login")
public class LoginCtl extends AbstractCtl
{
	@Autowired
    private LoginService loginService;
	
	@NoSession
	@RequestMapping(value="/session", method = RequestMethod.GET)
	public SessionInfoVO getSessionInfoData( HttpServletRequest req ) throws Exception
	{
		logger.debug("BasicConstants.LOGIN_RESULT.FailLogin.name() : "+ BasicConstants.LOGIN_TYPE.LOGIN.code);
		return super.getSessionInfo();
	}
	
	/***************************************************************************************************************************
	 * 
	 *  암/복호화 key 생성 리턴.. 
	 * 
	 * **************************************************************************************************************************/
	@NoSession
	@NoReferer
	@RequestMapping(method = RequestMethod.GET, value = "/encrypt/getKey")
    public ResultVO getEncryptKey( HttpServletRequest req, HttpServletResponse res) throws Exception 
	{
		super.logger.debug("getExteralCallKey(GET)...");
		ResultVO rtnVO = null;
		try
		{
			// 50 byte의 rendom key  생성. 
			rtnVO = new ResultVO();
			rtnVO.setSecureKey(EncryptUtil.getAESSecureKey(50));
			rtnVO.setIndexKey(CommonUtil.randomRange(0, 30));
			rtnVO.setIndexIv(CommonUtil.randomRange(0, 30));

			SessionManager.getInstance().addSecureInfo(req, rtnVO);
			rtnVO.setResult(true);
		}catch ( Exception ex )
		{
			ex.printStackTrace();
			super.logger.error(ex.toString());
			throw ex;
		}
		return rtnVO;
	}
	
	/***************************************************************************************************************************
	 * 
	 *  Login / Logout
	 * 
	 * **************************************************************************************************************************/
	@NoReferer
	@RequestMapping(method = RequestMethod.POST, value = "/execute/login")
	public ResultVO executeLogin( HttpServletRequest req,  @RequestBody RequestVO param ) throws Exception
	{
		logger.info("execute executeLogin : " + param.getEncData());
		ResultVO rtnVO = new ResultVO();
		SessionInfoVO sessionInfo = null;
		int keyLen = 16;
		JSONObj decodedObj = null;
		LoginVO loginVO = null;
		try
		{
			// decode....
			rtnVO = SessionManager.getInstance().getSecureInfo(req);
			if( rtnVO == null )
				throw new BadRequestException("Secure Info session is NULL , ");
			
			String decScureKey = EncryptUtil.getAESSecureDecodeKey(rtnVO.getSecureKey()) ; // decode base64
	    	byte[] ivParameter = decScureKey.substring(rtnVO.getIndexIv(), rtnVO.getIndexIv()+keyLen).getBytes();
			byte[] encodeKey   = decScureKey.substring(rtnVO.getIndexKey(), rtnVO.getIndexKey()+keyLen).getBytes();
			// decoded data 데이터화
			decodedObj = new JSONObj(EncryptUtil.getAESDecodeData(param.getEncData(), encodeKey, ivParameter));
			loginVO = new LoginVO(decodedObj);
			// 암호화 임시 세션 삭제.
			SessionManager.getInstance().removeSecureInfo(req);
			
			// 로그인 정보 체크
			sessionInfo = this.loginService.loginProcess(loginVO);
			if ( sessionInfo == null )
			{
				rtnVO.setResult(false);
				rtnVO.setResultCode(BasicResultCode.NO_LOGIN_ID);
				throw new ArtException(rtnVO);
			}
			
			SessionManager.getInstance().createSession(req, sessionInfo);
			rtnVO.setResult(true);
		}catch ( Exception ex )
		{
			throw new ArtException(rtnVO);
		}
		return rtnVO;
	}
	
}
