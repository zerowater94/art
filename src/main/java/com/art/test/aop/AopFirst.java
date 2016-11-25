package com.art.test.aop;

import org.aopalliance.intercept.Joinpoint;

public class AopFirst 
{
	public void executeAop(Joinpoint jp)//it is advice  
    {  
        System.out.println("additional concern");  
        //System.out.println("Method Signature: "  + jp.getSignature());  
    }  
}
