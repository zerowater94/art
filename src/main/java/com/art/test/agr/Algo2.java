package com.art.test.agr;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Algo2 
{
	
	public void testContinues(String s)
	{
		char[] cArry = s.toCharArray();
		List<Character> map = new ArrayList<Character>();
		for( char c : cArry )
		{
			if( map.size() == 0 || map.get(map.size()-1) != c )
				map.add(c);
		}
		System.out.println(Arrays.toString(map.toArray()));
	}
	
	private int cnt = 0 ;
    public int collatz(int num) 
    {
		int answer = 0, cnt = 0;
		
		while ( num != 1 && cnt < 500 )
		{
			 if( num%2 == 0 )
		      num = num/2;
		    else
		      num = (num*3)+1;
			 System.out.println(cnt +"-->"+num);
			 cnt++;
		}
	   
		if( num == 1)
			answer = cnt;
		else 
			answer = -1;
	    System.out.println(answer);
		return answer;
	}
    
    public void reaminMoney()
    {
		int[] quotient = new int[4];
		int remainder;
		int[] coin = { 500, 100, 50, 10 };
		int money = 9458290;
		System.out.println("money = " + money);

		for (int i = 0; i < coin.length; i++) {
			// 큰 단위의 동전을 사용하여야 가능한 한 적은 수의
			// 동전으로 거스름돈을 줄 수 있다.
			quotient[i] = money / coin[i];
			remainder = money % coin[i];
			money = remainder;
		}

		System.out.println("거스름돈 동전의 개수는 ");
		for (int i = 0; i < 4; i++) {
			System.out.print(" " + quotient[i]);
		}
    }
    
    public void money125( int n )
    {	
    	int[] Pi = {-1,1,2,5};
    	int[] Ni = Pi;
    	int[][] D = new int [Pi.length][n+1];
    	
    	D[0][0] = 1;
    	D[1][1] = 1;
    	
    	for(int i = 1; i <= 3; i++) 
    	{
            for(int j=1; j<= n; j++) 
            {
                // 이전 동전이 만든 잔돈과
                // 내가 만들 잔돈을 더해 주면 
                // 잔돈을 만들수 있는 케이스가 합쳐진다.
                for(int k=0; k <= Ni[i]; k++) 
                {
                    if( Pi[i]*k > j) 
                    	break;
                    D[i][j] += D[i-1][j-Pi[i]*k];
                }
            }
        }
        System.out.println(D[3][5]);
    }
    
    public void setMultiVal(int ... nums)
    {
    	System.out.println(nums.length);
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

	
    public static void main(String[] args)
    {
    	Algo2 al = new Algo2();
//    	al.testContinues("47330");
//    	al.collatz(626331);
    	al.money125(5);
//    	al.setMultiVal();
//    	al.setCalcIncrease(7);
//    	al.reaminMoney();
    }
}
