package com.art.test.agr;

import java.util.Calendar;
public class TryHelloWorld 
{
	/**
	 * 
	 * @param A
	 * @param B
	 * @return
	 */
	public int getMinSum(int []A, int []B)
    {
        int answer = 0;
        for( int inx = 0; inx < A.length; inx++ )
        {
        	for( int jnx = 0; jnx < B.length; jnx++)
        	{
//        		Math.min(answer, );
        	}
        }
        return answer;
    }
	
	public String getDayName(int a, int b)
    {
        String answer = "";
        
        Calendar c = Calendar.getInstance();
        c.set(2016, a-1, b);
        String[] weeks = {"SUN","MON","TUE","WED","THU","FRI","SAT"};
        System.out.println(weeks[c.get(Calendar.DAY_OF_WEEK)-1]);

        return answer;
    }
    public static void main(String[] args)
    {
        TryHelloWorld test = new TryHelloWorld();
        int []A = {1,2};
        int []B = {3,4};
        System.out.println(test.getMinSum(A,B));
        
        int a=5, b=24;
        System.out.println(test.getDayName(a,b));
        
        System.out.println(Integer.bitCount(83));
    }
}
