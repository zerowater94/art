package com.art.test.agr;

public class Algo3 
{
	
	public int upStair(int n )
	{
		int answer = 0 ;
		int p1 = 0 , p2 = 1 ;
		
		for( int inx = 0 ; inx < n; inx++ )
		{
			answer = p1  + p2;
			p1 = p2;
			p2 = answer;
		}
		
		return answer;
	}
	
	public int change(int total, int[] coins) 
	{
		int answer = 0 ;
		int p1 = 1 , p2 = 2, p3 = 5 ;
		
		for( int inx = 0 ; inx < total; inx++ )
		{
			answer = p1  + p2 + p3;
			p1 = p2;
			p2 = p3;
			p3 = answer;
		}
		
		return answer;
	}
	
	public String change124(int n) {
		String answer = "0";
	    int[] arry = {1,2,4};
	    int r = 0, len, l = 0 ;
	    len = arry.length; 
	    
	    StringBuffer sb = new StringBuffer();
	    while( n > 0 )
	    {
	    	r = n%3;
	    	n = n/3;
	    	sb.append(r);
	    	l++;
	    }
	    System.out.println(l+","+r+","+ sb.reverse().toString());
//	    for ( int inx = 0 ; inx < n ; inx++ )
//	    {
//	    	r = inx%len;
//	    	if( r == 0 )
//	    		sb.append(arry[r]);
//	      if( inx % arry.length == 0 )
//	      {
//	    	  sb.append();
//	      }
//	    }
	    answer = sb.reverse().toString();
	    return answer;
	}
	
	public static void main(String args[])
	{
		Algo3 al  = null;
		try
		{
			al = new Algo3();
			System.out.println(al.upStair(3));
			String aaa = "test((()))";
			Runnable rw = new Runnable() {
				public void run()
				{
					System.out.println(aaa);
				}
			};
			rw.run();
			Runnable r =  () -> System.out.println(aaa);
			r.run();
			System.out.println(al.change124(18));
			int[] coins = { 1, 2, 5 };
			System.out.println(al.change(5, coins));
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
	}
}
