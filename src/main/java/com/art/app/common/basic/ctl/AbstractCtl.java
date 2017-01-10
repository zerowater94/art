package com.art.app.common.basic.ctl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.art.app.common.component.BasicInfo;
import com.art.fw.domain.ResultVO;
import com.art.fw.domain.SessionInfoVO;
import com.art.fw.exception.ArtException;
import com.art.fw.exception.AuthException;
import com.art.fw.exception.BadRequestException;
import com.art.fw.resource.BasicResultCode;

public abstract class AbstractCtl 
{
	protected Logger logger = LoggerFactory.getLogger(this.getClass()) ;
	
	/********************************************************************
	 * ********************************************************************
	 * 세션을 체크 하고 세션을 생성한다.
	 * ********************************************************************
	 *********************************************************************/
	/**
	 * 세션을 체크 한다.
	 * @param req
	 * @return 
	 * @return
	 * @throws Exception
	 */
	protected boolean checkSession() //throws Exception
	{
		if( this.getSessionInfo() == null)
			return false;
		else
			return true;
	}
	
	/**
	 * 세션 정보를 리턴한다.
	 * @param req
	 * @return
	 */
	protected SessionInfoVO getSessionInfo() //throws Exception
	{
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		
		if( request == null )
			return null;
		
		HttpSession session = request.getSession();
		if( session == null )
			return null;
		
		if( session.getAttribute(BasicInfo.getProperty("SESSION_NAME")) != null )
			return (SessionInfoVO)session.getAttribute(BasicInfo.getProperty("SESSION_NAME"));
		else
			return null;
	}
	
	protected String getSessionLocale()
	{
		if( this.getSessionInfo() != null )
			return this.getSessionInfo().getLocale();
		else
			return BasicInfo.getDefaultLocale();
	}
	
	@InitBinder
	public void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception 
	{
		try 
		{
			if (binder.getTarget() == null) 
				return;
			
			BeanWrapper beanWrapper = new BeanWrapperImpl(binder.getTarget());
			
			if (beanWrapper.isReadableProperty("currUserId"))
				beanWrapper.setPropertyValue("currUserId", this.getSessionInfo().getUserId());
			
		} catch (Exception e)
		{
			e.printStackTrace();
			//throw new Exception(BaseUtils.printStackTrace(e));
		}
	}
	
	
	/**
	 * 공통으로 활용하기 위한 Exception
	 * @param request
	 * @param response
	 * @param exception
	 * @return
	 */
	@ExceptionHandler({Exception.class, ArtException.class, AuthException.class, BadRequestException.class})
	public ResultVO fail(HttpServletRequest request, HttpServletResponse response, Exception exception) 
	{
		ResultVO error = null;
	    System.out.println("exception.getClass().getName() : "+ exception.getClass().getName());
	    if( exception.getClass().getName().equals(ArtException.class.getName()) )
	    {
	    	error = ((ArtException)exception).getResultVO();
	    	if( error == null )
	    	{
	    		error = new ResultVO();
	    		error.setResultMessage( exception.getMessage());	
	    	} else 
	    	{
	    		error.setResultMessage(BasicInfo.getResultMsg(error.getResultCode(), this.getSessionLocale()));
	    	}
	    	response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
	    }else
	    {
	    	error = new ResultVO();
		    
	    	if( exception.getClass().getName().equals(AuthException.class.getName()) )
		    {
		    	response.setStatus(HttpStatus.FORBIDDEN.value());
		    	error.setResultMessage( BasicInfo.getResultMsg(BasicResultCode.NO_AUTH, this.getSessionLocale()));
		    }else if( exception.getClass().getName().equals(BadRequestException.class.getName()) )
		    {
		    	response.setStatus(HttpStatus.BAD_REQUEST.value());
		    	error.setResultMessage( BasicInfo.getResultMsg(BasicResultCode.INSUFFICIENT_PARAM, this.getSessionLocale()));
		    }else
		    {
		    	if( exception.getClass().getName().equals(NullPointerException.class.getName()) )
		    		error.setResultMessage( NullPointerException.class.getName() );
		    	else if ( exception.getClass().getName().indexOf("org.springframework.dao") > -1) 
		    		error.setResultMessage( BasicInfo.getResultMsg(BasicResultCode.SQL_ERROR, this.getSessionLocale()));
		    	response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		    }
	    }

	    error.setUrl(request.getRequestURL().toString() +" \n"+exception.getClass().getName());
	    
	    this.logger.error("Exeption Trace====================> "+ exception.getClass().getName());
	    StackTraceElement[] errors = exception.getStackTrace();
	    this.logger.error("["+error.getResultCode()+"]"+ error.getResultMessage() );
	    for( StackTraceElement trace : errors )
	    {
	    	if( trace.getClassName().indexOf("com.art") > -1 )
	    		this.logger.error(trace.getClassName() +":"+trace.getLineNumber());
	    }
	    this.logger.error("<======================================Exeption");
	    return error;
	}
}
