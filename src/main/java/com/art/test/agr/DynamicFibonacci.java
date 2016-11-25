package com.art.test.agr;

public class DynamicFibonacci 
{
	public int fibonacci( int n )
	{
		if( n <= 2 )
			return 1;
		else
			return fibonacci(n-1)+fibonacci(n-2);
	}
	
	private int[] m = null;
	public void setMemorise(int n)
	{
		if(  m == null )
		{
			m = new int[n+1];
			for( int inx = 0; inx <= n; inx++ )
			{
				if( inx < 2 )
					m[inx] = 1;
				else
					m[inx] = -1;
			}
		}
	}
	public int fiboMemo( int n )
	{
		if( n <= 2 )
			return 1 ;
		else
		{
			if ( m[n] > -1  )
			{
				return m[n];
			}else
			{
				return fiboMemo(n-1)+fiboMemo(n-2);
			}
		}
	}
	
	public int fiboBottomup(int n)
	{
		int answer = 0 , inx, p1, p2 ;
		p1 = p2 = 1;
		if( n <= 2 )
			return 1;
		
		for( inx = 3; inx <= n; inx++)
		{
			answer = p1+p2;
			p1 = p2;
			p2 = answer;
		}
		return answer;
	}
	
	public static void main(String[] arg)
	{
		DynamicFibonacci dp = null;
		long st = 0 ;
		long et = 0 ;
		int n = 40;
		try
		{
			dp = new DynamicFibonacci();
			
			System.out.println("============================= ");
			st = System.currentTimeMillis();
			System.out.println(dp.fibonacci(n));
			et = System.currentTimeMillis();
			System.out.println(et-st);
			
			System.out.println("============================= ");
			st = System.currentTimeMillis();
			dp.setMemorise(n);
			System.out.println(dp.fiboMemo(n));
			et = System.currentTimeMillis();
			System.out.println(et-st);
			
			System.out.println("============================= ");
			st = System.currentTimeMillis();
			System.out.println(dp.fiboBottomup(n));
			et = System.currentTimeMillis();
			System.out.println(et-st);
			
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
	}
}
