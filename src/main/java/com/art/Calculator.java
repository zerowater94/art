package com.art;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Calculator 
{  
    public int sum(int num1, int num2)
    {
        return num1 + num2;
    }
    
    
    public boolean isEquals(int num1, int num2)
    {
        return ( num1 == num2);
    }
    
    
    public void checkTimeArray()
    {
    	List<String> aList = new ArrayList<String>();
    	List<String> lList = new LinkedList<String>();
    	System.out.println("array 성능 체크 시작 ");
    	long st = 0;
    	long et = 0;
    	st = System.currentTimeMillis();
    	for( int inx = 0 ; inx < 100000; inx++ )
    	{
    		aList.add("str_"+inx);
    	}
    	et = System.currentTimeMillis();
    	System.out.println(et-st);
    	
    	st = System.currentTimeMillis();
    	for( int inx = 0 ; inx < 100000; inx++ )
    	{
    		lList.add("str_"+inx);
    	}
    	et = System.currentTimeMillis();
    	System.out.println(et-st);
    	System.out.println("array 성능 체크 종료 ");
    	
    	System.out.println("array 성능 체크 시작2 ");
    	st = System.currentTimeMillis();
    	
    	for( int inx = 0 ; inx < aList.size(); inx++ )
    	{
    		aList.get(inx);
    	}
    	et = System.currentTimeMillis();
    	System.out.println(et-st);
    	
    	st = System.currentTimeMillis();
    	for( int inx = 0 ; inx < lList.size(); inx++ )
    	{
    		lList.get(inx);
    	}
    	et = System.currentTimeMillis();
    	System.out.println(et-st);
    	System.out.println("array 성능 체크 종료2 ");
    }
}

