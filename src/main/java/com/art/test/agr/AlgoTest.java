package com.art.test.agr;

public class AlgoTest 
{
	public void basic()
	{
		// Root 
		// double java.lang.Math.sqrt(double a)
		System.out.println(Math.sqrt(9));
		
		// 제곱근 
		// double java.lang.Math.pow(double a, double b)
		System.out.println(Math.pow(10, 4));
		
		// 절대값 
		// int java.lang.Math.abs(int a)
		System.out.println(Math.abs(-10));
		
		// 자연 로그
		System.out.println(Math.log(4));
		
	}
	
	public void setCalcIncrease( int n )
    {
    	int sum = 0, b, a, inx ;
    	b = a = 1;
    	
    	for( inx = 3 ; inx <= n ; inx++  )
    	{
    		sum = b+a;
    		System.out.println(a +" + "+ b +" = "+ sum );
    		b = a;
    		a = sum;
    	}
    	
    	System.out.println(sum);
    }
	
	public void testSqar( int n )
	{
		int[][] loc = new int[n+1][n+1];
		
		int inx, jnx;
		for( inx = 1 ; inx <= n; inx++ )
		{
			for( jnx = 1; jnx <= n; jnx++ )
			{
				if( inx == 1 || jnx == 1 )
					loc[inx][jnx] = 1;
				else
					loc[inx][jnx] = loc[inx-1][jnx-1]+loc[inx-1][jnx];
				
			}
		}
		System.out.println(loc[n][n]);
		System.out.println(loc.length +" , "+ loc[0].length);
	}
	
	interface TestIf<T>
	{
		T test(T a,T b);
	}
	
	public int testMakeOne(int n)
	{
		if( n == 1)
			return 1;
		
		int[] d = new int[n+1]; 
		System.out.println(d[0]);
		for( int inx = 2; inx <=n; inx++ )
		{
			d[inx] = d[inx-1]+1;

			if( inx%2 == 0 && d[inx] > d[inx/2]+1)
			{
				System.out.println("%2");
				System.out.println(inx+"====> "+d[inx] +", "+d[inx/2] +", "+(d[inx/2]+1));
				d[inx] = d[inx/2]+1;
			}
			
			if( inx%3 == 0 && d[inx] > d[inx/3]+1 )
			{
				System.out.println("%3");
				System.out.println(inx+"====> "+d[inx] +", "+d[inx/3] +", "+(d[inx/3]+1));
				d[inx] = d[inx/3]+1;
			}
			
			System.out.println(inx+"====> "+d[inx]);
		}
		return 0;
	}
	
	public void testDivide(int n)
	{
		int[] d = new int[n+1];
		
		d[0] = 1;
		System.out.println("==================");
		for( int inx = 1; inx <= n; inx++ )
		{
			if( inx == 1)
				d[inx] = d[inx-1];
			else if( inx == 2 )
				d[inx] = d[inx-1]+d[inx-2];
			else if( inx == 3 )
				d[inx] = d[inx-1]+d[inx-2]+d[inx-3];
			else
				d[inx] = d[inx-1]+d[inx-2]+d[inx-3]+d[inx-4];
			
//			if( inx -1 >= 0 )
//				d[inx] += d[inx-1];
//			
//			if( inx -2 >= 0 )
//				d[inx] += d[inx-2];
//			
//			if( inx - 3 >= 0 )
//				d[inx] += d[inx-3];
			
			System.out.println(d[inx]);
		}
	}
	
	/**
	 * 특정 정수 n에서 1에서 C까지의 숫자 조합으로 만들어 낼수 있는 경우의 수
	 * @param n
	 * @param c
	 */
	public void testDivide(int n, int c )
	{
		int[] d = new int[n+1];
		
		d[0] = 1;
		System.out.println("==================");
		for( int inx = 1; inx <= n; inx++ )
		{
			for( int jnx = 1; jnx <= c; jnx++)
			{
				if( inx - jnx >= 0 )
					d[inx] += d[inx-jnx];
			}
			
			System.out.println(d[inx]);
		}
	}
	
	
	/**
	 * 붕어빵 최대 수익율
	 * @param p
	 */
	public void maxNumbers(int[] p)
	{

		p = new int[]{5,2,8,10};
		int n = p.length;
		int[] d = new int[n+1];
		d[1] = 1;
		System.out.println("================== maxNumbers");
		for( int inx = 1; inx <= n; inx++ )
		{
			for( int jnx= 1; jnx <= inx; jnx++ )
			{
				d[inx] = Math.max(d[inx], d[inx-jnx]+p[jnx-1]);
			}
			System.out.println(d[inx]);
		}
	}
	
	public static void main(String[] args)
	{
		AlgoTest at = null ;
		try
		{
			at = new AlgoTest();
			at.setCalcIncrease(10);
			at.basic();
			at.testSqar(3);
			
			
			TestIf<Integer> tInt = (Integer a, Integer b) -> {return a+b; } ;
			System.out.println(tInt.test(3,4));
			TestIf<String> tStr = (String a, String b) -> {return a+b; } ;
			System.out.println(tStr.test("3", "4"));
			
			at.testMakeOne(10);
			
			at.testDivide(6);
			at.testDivide(6,4);
			int[] moneys = {1, 5,6,7};
			int[] moneys1 = {5,2,8,10};
			at.maxNumbers(moneys1);
			
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
	}
}
