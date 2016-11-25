package com.art.fw.session;

import java.util.Hashtable;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.art.fw.domain.ResultVO;
import com.art.fw.domain.SessionInfoVO;
import com.art.fw.resource.BasicConfig;
import com.art.fw.util.DateUtil;


/**
 * @author zerowater
 *
 */
public class SessionManager 
{
	public static SessionManager sessionManager = null;
	
	
	private Map<String,HttpSession> loginSessionMap = null; // session id별 session 정보
	private Map<String,ResultVO> tempSecureMap = null; // sesison id별 함호화 정보 
	
	public static synchronized SessionManager getInstance() 
	{
		 if (sessionManager == null)
		 {
			 synchronized(SessionManager.class)
			 {
				 sessionManager = new SessionManager() ;
			 }
		 }
		 return sessionManager;
	 }
	
	private SessionManager() 
	{
		loginSessionMap = new Hashtable<String,HttpSession>();
		tempSecureMap   = new Hashtable<String,ResultVO>();
	}
	
	/*********************************************************************************************
	 * 
	 *  암호화 임시 세션 검색, 추가 및 삭제
	 * 
	 **********************************************************************************************/
	public ResultVO getSecureInfo(HttpServletRequest req)
	{
		String sessionId = req.getSession().getId();
		if( this.tempSecureMap.get(sessionId) == null )
			return null;
		else
			return this.tempSecureMap.get(sessionId);
	}
	
	public void addSecureInfo(HttpServletRequest req, ResultVO secVO )
	{
		this.tempSecureMap.put(req.getSession().getId(), secVO);
	}
	
	public void removeSecureInfo(HttpServletRequest req)
	{
		this.tempSecureMap.remove(req.getSession().getId());
	}
	
	
	/*********************************************************************************************
	 * 
	 *  세션 추가 / 삭제
	 * 
	 **********************************************************************************************/
	
	/** 로그인한 Session Put */
	public synchronized void createSession(HttpServletRequest req, SessionInfoVO userBean) 
	{
		HttpSession session = req.getSession();
		userBean.setSessionId(session.getId());
		userBean.setCreateDate(DateUtil.getCurrentTimestamp());
		loginSessionMap.put(session.getId(), session);
		session.setAttribute(BasicConfig.getProperty("SESSION_NAME"), userBean);
		session.setMaxInactiveInterval(BasicConfig.getPropertyInt("SESSION_TIMEOUT"));
	}
	
	/**
	 * 세션이 invalid 되면 session 정보를 삭제 한다.
	 * 세션이 invalid 되면 listener에서 call되는 method
	 * @param sessionId
	 */
	public synchronized void removeSessionInfo(HttpServletRequest req)
	{
		HttpSession session = req.getSession();
		String sessionId = session.getId();
		session.invalidate();
		
		if( loginSessionMap == null || loginSessionMap.get(sessionId) == null )
			return;
		loginSessionMap.remove(sessionId);
	}
	
	
	/*********************************************************************************************
	 * 
	 *  세션 검색
	 * 
	 **********************************************************************************************/
	/**
	 * 특정 Session ID값을 리턴한다.
	 * @param sessionId
	 * @return
	 */
	public HttpSession getHttpSession(String sessionId)
	{
		return loginSessionMap.get(sessionId);
	}
	
}
