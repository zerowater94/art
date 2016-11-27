package com.art.fw.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.art.fw.annota.NoReferer;
import com.art.fw.annota.NoSession;
import com.art.fw.session.SessionThreadUtil;
import com.art.fw.util.RequestUtil;


/**
 * 일반 Cotroller에서 사용되는 Interceptor
 * @author zerowater
 *
 */
public class SessionInterceptor extends HandlerInterceptorAdapter 
{
	protected Logger logger = LoggerFactory.getLogger(this.getClass()) ;
	
    @SuppressWarnings("unchecked")
	@Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception 
    {
		HttpSession session = null;
		String contextPath = "";
		try
		{	
			// access log.. 
			logger.info(request.getRequestURI()+", "+RequestUtil.getClientIp(request));
			
			//@NoCheckLogin 어노테이션이 컨트롤러에 사용되었는지 체크함
			NoSession nossession = ((HandlerMethod)handler).getMethodAnnotation(NoSession.class);
			NoReferer noReferer = ((HandlerMethod)handler).getMethodAnnotation(NoReferer.class);
			contextPath = request.getServerName();
			
			response.setHeader("X-UA-Compatible", "IE=Edge");
			response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
	        response.setHeader("Access-Control-Max-Age", "3600");
	        response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
	        response.setHeader("Access-Control-Allow-Origin", "*");
	        
			
			// referer 체크..
			if( noReferer == null ){
				
				if( request.getHeader("referer") == null
						|| request.getHeader("referer").indexOf(contextPath) == -1 )
				{
					response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE); // 잘못된 접근
					return false;
				}
			}
			// User Session Check
			
			session = request.getSession();
//			session.setAttribute("lastAccessTime", session.getLastAccessedTime());
			
//			if( nossession == null
//					&& session.getAttribute(Config.getProperty("SESSION_NAME")) == null )
//	    	{
//				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); //  권한 없음 401 리턴
//	        	return false;
//	    	}
			
			// thread util 
//			sessionUserVO = (SessionUserVO)session.getAttribute(Config.getProperty("SESSION_NAME"));
//			SessionThreadUtil.setSessionInfo(sessionUserVO);
			
			
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
        return true;
    }
 
    @Override
    public void postHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception 
    {
    	SessionThreadUtil.removeSessionInfo();
    }
 
    @Override
    public void afterCompletion(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex)
            throws Exception 
    {
    	SessionThreadUtil.removeSessionInfo();
    }
 
}
