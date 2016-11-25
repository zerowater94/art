package com.art.test.agr;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

public class Algo1 {

	public int findLargestSquare(char [][]board)
    {
		int answer = 0;
        int rowCnt = board.length; 
        int colCnt = board[0].length;
        int maxCnt = 0;
        int nextBreakCnt = 0 ; 
        boolean isMore = false;
        for( int inx = 0 ; inx < rowCnt; inx++ )
        {
          if ( maxCnt > (rowCnt-inx) )
            break;
          for( int jnx = 0 ; jnx < colCnt; jnx++ )
          {
            if ( maxCnt > (colCnt-jnx) )
            	break;
            isMore = false;
            if( board[inx][jnx] == 'O' )
            {
              System.out.println(inx+", "+jnx);
              nextBreakCnt = 0 ;
              isMore = true;
              for( int knx = 1 ; knx < colCnt-jnx; knx++ )
              {
                for( int lnx = 0 ; lnx < knx; lnx++ )
                {
                	System.out.println("["+(inx+lnx)+", "+(jnx+knx) +"],["+(inx+knx)+","+(jnx+lnx)+"]");
                	
                  if( board[inx+lnx][jnx+knx] == 'X'
                     || board[inx+knx][jnx+lnx] == 'X' 
                     || board[inx+knx][jnx+lnx] == 'X' )
                  {
                	  isMore = false;
                	  break;
                  }
                }  
                
                if( isMore )
                	nextBreakCnt++;
                else 
                	break;
              }
              if( maxCnt < nextBreakCnt )
            	  maxCnt = nextBreakCnt;
              System.out.println(maxCnt+"<<<<<<<<<<");
            }
          }
        }
        answer = maxCnt*maxCnt;
        return answer;
    }
	
	public String change124(int n) {
		String answer = "0";
		int[] arry = {1,2,4};
	    int loop = (n/3);	
	    
	    boolean isMinus = false;
	    
	    if ( n < 0 )
	    {
	      isMinus = true;
	      n = n*-1;
	    }
	    int remain = (n-1)%arry.length;
	    int roopCnt = 0 ;
	    int roopSize = n/arry.length;
	    int posCnt = roopSize/arry.length;
	    // 자리수를 구한다. --> 3/3
	    System.out.println(posCnt);
	    
	    // 뒤에부터 값을 구한다. 
	    for( int inx = 0 ; inx < roopSize; inx++ )
	    {
	    	answer = ((loop*10)+arry[remain])+"";
	    }
	    
		return answer;
	}
	
	public int getMean(int[] array) {
		
        return (int) Arrays.stream(array).sum();
    }
	
	public String evenOrOdd(int num) {
        String result = "";
        result = (num%2==0)?"Even":"Odd";
        return result;
    }

	
	public String reverseStr(String str){
		String[] arry = str.split("");
	    Arrays.sort(arry,  Collections.reverseOrder());
	    StringBuffer sb = new StringBuffer();
	    for( String s : arry )
	    {
	    	sb.append(s);
	    }
	    System.out.println(("c".charAt(0) > "b".charAt(0)));
	    return sb.toString();
	}

	
//	public String reverseStr(String str)
//	{
//		char[] arry = str.toCharArray();
//		int len = arry.length;
//		int cInx , sInx, eInx = 0 ;
//		char[] rstArry = new char[len];
//		char tChar ;
//		for( int inx = 0 ; inx < len; inx++ )
//		{
//
//			for( int jnx = cInx ; jnx >= 0; jnx-- )
//			{
//				if( arry[jnx-1] > arry[jnx] )
//				{
//					tChar = arry[jnx];
//					arry[jnx] = arry[jnx-1];
//					arry[jnx-1] = tChar;
//				}else 
//				{
//					cInx = jnx;
//					break;
//				}
//			}
//		}
//		new String(rstArry);
//	}
	
	public void removeDupList() {

        List<String> list = new ArrayList<String>();

        list.add("5");

        list.add("4");
        list.add("1");
        list.add("2");
        list.add("1");
        list.add("3");
        list.add("2");

        //중복된 내용 제거
        //hashSet - 중복제거, LinkedHashSet - 중복제거,정렬
        Set<String> set = new LinkedHashSet<String>(list);
        Iterator<String> it = set.iterator();
        while( it.hasNext() )
        {
        	System.out.println(it.next());
        }
        
//        List<String> duplicateRemoveList = new ArrayList<String>(set);
//
//        for (int i = 0; i < duplicateRemoveList.size(); i++) 
//        {
//            System.out.println(duplicateRemoveList.get(i));
//        }
//        Collections.sort(duplicateRemoveList, new NameDescCompare());
//        for (int i = 0; i < duplicateRemoveList.size(); i++) 
//        {
//            System.out.println(duplicateRemoveList.get(i));
//        }
    }
	
	class NameDescCompare implements Comparator<String> {
		 
		/**
		 * 내림차순(DESC)
		 */
		@Override
		public int compare(String arg0, String arg1) {
			// TODO Auto-generated method stub
			return arg1.compareTo(arg0);
		}
 
	}
	private Map<Character,Character> map1 = null;
	
	private Map<Character,Character> getBracketMap()
	{
		if( map1 == null )
		{
			map1 =  new HashMap<Character,Character>(); 
			map1.put('(',')');
			map1.put('{','}');
			map1.put('[',']');
		}
		return map1;
	}
	
	private boolean isOpenChar( char c )
	{
		return this.getBracketMap().containsKey(c);
	}
	
	private boolean isCloseChar( char c)
	{
		return this.getBracketMap().containsValue(c);
	}
	
	private char getPair(char c)
	{
		return this.getBracketMap().get(c);
	}
	
	public boolean isPair(String str)
	{
		Stack<Character> cStack = new Stack<Character>();
		char[] sArry = str.toCharArray();
		char c ;
		int len = str.length();

		for( int inx = 0 ; inx < len; inx++ )
		{
			c = sArry[inx];
			if ( this.isOpenChar(c) )
			{
				cStack.add(new Character(this.getPair(c)));
				
			}else if(this.isCloseChar(c) )
			{	
				if( cStack.size() == 0 ||  !cStack.pop().equals(c) )
					return false;
			}
		}

		if( cStack.size() > 0 )
			return false;
		return true;
	}

	

	
	
    public static void main(String[] args)
    {
    	Algo1 test = new Algo1();
				char [][]board ={
				{'X','O','O','O','X'},
				{'X','O','O','O','O'},
				{'X','X','O','O','O'},
				{'X','X','O','O','O'},
				{'X','X','X','X','X'}};
				
				 int x[] = {500000000, 400000000, 300000000};
			
//		System.out.println("평균값 : " + test.reverseStr("Zbcdefg"));
		test.removeDupList();
		System.out.println("result : "+ test.isPair("[{{(ajfla)afd}}afd]adf}"));
		
		// create 2 Character objects c1, c2
	      Character c1, c2;

	      // create a boolean primitive res
	      boolean res;

	      Set<Character> set = new LinkedHashSet<Character>();
	      // assign values to c1, c2
	      c1 = new Character('a');
	      c2 = new Character('a');
	      c2 = new Character(c1);
	      char c3 = c2;
	      
	      set.add(c1);
	      set.add(c2);
	      set.add(c3);

	      // assign the result of equals method on c1, c2 to res
	      res = c1.equals(c2);
	      boolean res2 = (c1 == c2);
	      

	      String str = c1+ " and " + c2 + " are equal is " + res +" , = is "+ res2;

	      // print res value
	      System.out.println( str );

    }
}
