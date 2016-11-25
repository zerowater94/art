package com.art.test.agr;

public class DynamicCombination 
{
	
	public int combination1(int n, int k )
	{
		if( n == 0 || k == 0 || n == k )
			return 1;
		return combination1(n-1, k-1)+ combination1(n-1, k);
	}
	
//	private int min( int inx, int jnx )
//	{
//		if( inx > jnx )
//			return inx;
//		else
//			return jnx;
//	}
	
	public int combination2(int n, int k )
	{
		int inx, jnx;
		int[][] ans = new int[n+1][k+1];
		
		if( n == 0 || k == 0 || n == k )
			return 1;
		
		for( inx = 0 ; inx <= n; inx++ )
		{
			for( jnx = 0; jnx <= Math.min(inx , k) ; jnx++)
			{

				if ( jnx == 0  || jnx == inx )
					ans[inx][jnx] = 1;
				else
					ans[inx][jnx] = ans[inx-1][jnx-1]+ ans[inx-1][jnx]; 
			}
		}
		
		return ans[n][k];
	}
	
	
	public static void main(String[] args) 
	{
		DynamicCombination dc = null;
		try 
		{
			dc = new DynamicCombination();
			System.out.println(dc.combination1(10,2));
			System.out.println(dc.combination2(10,2));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
