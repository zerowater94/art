package com.art.fw.session;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;


/**
 * @author zerowater
 *
 */
public class SessionManagerListener implements HttpSessionListener 
{
	
	/** 세션 생성시 이벤트 처리 **/
	public void sessionCreated(HttpSessionEvent event) 
	{		 
		
	}
	 
	 /** 세션 소멸(종료)시 이벤트 처리 **/
	public void sessionDestroyed(HttpSessionEvent event) 
	{
		HttpSession session = event.getSession();
//		SessionManager.getInstance().removeSessionInfo(session.getId());
	}
}
