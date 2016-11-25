package com.art.test.agr;

import java.util.Arrays;

public class BestSet 
{

    public int[] bestSet(int n, int s)
    {
        int[] answer = null;
        int gap = s/n;
        answer = new int[n];
        int max, p;
        max = p = 0;
        int[] maxArry = null;
        if( s <= n)
        {
        	int minx = Math.min(s, n);
        	answer = new int[minx];
        	for( int inx = 0 ; inx < minx; inx++)
        		answer[inx] = 1;
        }else
        {
        	for( int inx = (s-n); inx >= n; inx-- )
        	{
        		maxArry = new int[n];
        		maxArry[0] = inx;
        		for( int jnx = 1 ; jnx < n; jnx++)
        			maxArry[jnx] = 0;
        		gap = s-inx;
        		int sInx = 1 ;
        		while( gap > 0 )
        		{
        			maxArry[sInx] = maxArry[sInx]+1; 
        			sInx++;
        			if( sInx >= n )
        				sInx = 1;
        			gap--;
        		}
        		p = 1;
        		for( int jnx = 0; jnx < n; jnx++ )
        			p = p*maxArry[jnx];
        		
        		if( max < p )
        		{
        			
        			max = p;
        			
        			answer = maxArry;
        		}
        	}
        }
        
        return answer;
    }
    
    public static void main(String[] args) 
    {
        BestSet c = new BestSet();
        //아래는 테스트로 출력해 보기 위한 코드입니다.
        System.out.println(Arrays.toString(c.bestSet(3,13)));
    }

}