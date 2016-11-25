package com.art.test.agr;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

public class ArraySort 
{
	public void sortBubble()
	{
		int[] arry = {84,69,76,86,94,91};
		int tmp = 0 ;
		int len = arry.length;
		for( int inx = 0 ; inx < len; inx++)
		{
			for( int jnx = 0; jnx < len-1; jnx++ )
			{
				if( arry[jnx] > arry[jnx+1] )
				{
					tmp = arry[jnx+1];
					arry[jnx+1] = arry[jnx];
					arry[jnx] = tmp;
				}
			}
		}
		System.out.println(Arrays.toString(arry));
	}
	
	public void sortInsert()
	{
		int[] arry = {84,69,76,86,94,91};
		int tmp,jnx;
		jnx = tmp = 0 ;
		int len = arry.length;
		for( int inx = 1 ; inx < len; inx++)
		{
			tmp = arry[inx]; 
			for( jnx = inx-1; jnx >= 0 ; jnx-- )
			{
				if( tmp > arry[jnx] )
					break;
				arry[jnx+1] = arry[jnx];
				
			}
			arry[jnx+1] = tmp;
		}
		System.out.println(Arrays.toString(arry));
	}
	
	public void sortSelection()
	{
		int[] arry = {84,69,76,86,94,91};
		int min,minIndex;
		min = minIndex = 0 ;
		
		int len = arry.length;
		for( int inx = 0 ; inx < len; inx++)
		{
			min = arry[inx];
			minIndex = inx;
			for( int jnx = inx+1; jnx < len ; jnx++ )
			{
				if ( min > arry[jnx] )
				{
					min = arry[jnx];
					minIndex = jnx;
				}
			}
			if ( inx != minIndex )
			{
				arry[minIndex] = arry[inx];
				arry[inx] = min;
				
			}
		}
		System.out.println(Arrays.toString(arry));
	}
	
	private int[] mergeSort(int array[]) 
	{
        if (array.length > 1) 
        {
            int inx1 = array.length / 2;
            int inx2 = array.length - inx1;

            int arr1[] = new int[inx1];
            int arr2[] = new int[inx2];

            for (int i = 0; i < inx1; i++)
            {
            	arr1[i] = array[i];
            }

            for (int i = 0; i < inx2; i++)
            {
            	arr2[i] = array[i+inx1];
            }
            arr1 = mergeSort(arr1);
            arr2 = mergeSort(arr2);
	
            int i=0, j=0, k = 0;

            while (arr1.length != j && arr2.length != k) 
            {

                   if (arr1[j] < arr2[k]) 
                   {
                           array[i] = arr1[j];
                           j++;
                   } else 
                   {
                           array[i] = arr2[k];
                           k++;
                   }

                   i++;
            }

            while (arr1.length != j) 
            {
            	array[i] = arr1[j];
                   i++;
                   j++;
            }
            while (arr2.length != k) 
            {
                   array[i] = arr2[k];
                   i++;
                   k++;
            }
	    }
	
	    return array;
	}
	
	public int[] selfFunction( int[] arry )
	{
		int[] arry1 = null;
		int[] arry2 = null;
		int cnt = 0 ;
		if( arry.length > 1 )
		{

			cnt = arry.length/2;
			arry1 = new int[cnt];
			arry2 = new int[arry.length-cnt];

			System.out.println(arry1.length+" ,  "+arry2.length);
			arry1 = selfFunction(arry1);
			arry2 = selfFunction(arry2);
			
		}
		return arry;
	}

	
	public void sortMerge()
	{
		// int[] arry = {84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91};
		int size = 100000;
		int[] arry = new int[size];
		for( int inx = 0 ; inx < size; inx++ )
			arry[inx] = inx;
		arry = mergeSort(arry);
		System.out.println(Arrays.toString(arry));
	}

	public void sortMerget2()
	{
		//int[] arry = {84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91,84,69,76,86,94,91};
		int size = 100000;
		int[] arry = new int[size];
		for( int inx = 0 ; inx < size; inx++ )
			arry[inx] = inx;
		int[][] tArry = new int[arry.length][];
		int inx, jnx , cnt = 0;
		int onx, pnx,qnx;
		int loopCnt = arry.length/2;
		
		for( inx = 0 ; inx < arry.length; inx++ )
		{
			tArry[inx] = new int[]{arry[inx]};
		}
		
		loopCnt = arry.length/2;
		cnt = tArry.length;
		int[] temp1 = null;
		int[] temp2 = null;
		int[] newTemp = null;
		int newIndex = 0 ;
		
		while( loopCnt > 0 )
		{
			jnx = 0 ;
			for( inx = 0; inx < cnt ; inx += 2 )
			{
				temp1 = tArry[inx];
				if( inx+1 >= cnt )
					temp2 = new int[0];
				else
					temp2 = tArry[inx+1];
				onx = pnx = qnx = 0;
				newIndex = temp1.length+temp2.length;
				newTemp = new int[newIndex];

				while( temp1.length != pnx && temp2.length != qnx )
				{
					if( temp1[pnx] < temp2[qnx] )
					{
						newTemp[onx] = temp1[pnx];
						pnx++;
					}else 
					{
						newTemp[onx] = temp2[qnx];
						qnx++;
					}
					onx++;
				}
				
				while( temp1.length != pnx)
				{
					newTemp[onx] = temp1[pnx];
					pnx++;
					onx++;
				}
				
				while( temp2.length != qnx)
				{
					newTemp[onx] = temp2[qnx];
					qnx++;
					onx++;
				}
				tArry[jnx] = newTemp;
				jnx++;
				
			}
			cnt = jnx;
			loopCnt--;
		}
		
		System.out.println(Arrays.toString(newTemp));
	}
	
	interface Anagram
	{
		public void setBasis(char[] data);
		
		public boolean removeChar(char c);
		
		public boolean isEmpty();
		
	}
	
	class AnagramMap implements Anagram
	{
		private Map<Character, Integer> map = null;
		
		public AnagramMap()
		{
			this.map = new HashMap<Character, Integer>();
		}
		
		@Override
		public void setBasis(char[] data ) 
		{
			for( char c : data)
			{
				if( this.map.get(c) == null )
					this.map.put(c,1);
				else
					this.map.put(c, this.map.get(c)+1);
			}
		}

		@Override
		public boolean removeChar(char c) 
		{
			if( this.map.get(c) == null )
				return false;
			else
			{
				if( this.map.get(c) > 1 )
					this.map.put(c, this.map.get(c)-1);
				else
					this.map.remove(c);
				return true;
			}
		}

		@Override
		public boolean isEmpty() {
			
			if( map.size() > 0 )
				return false;
			else
				return true;
		}
		
	}
	
	class AnagramCharArry implements Anagram
	{
		private List<Character> list = null;
		
		public AnagramCharArry()
		{
			this.list = new ArrayList<Character>();
		}
		
		@Override
		public void setBasis(char[] data ) 
		{
			for( char c : data)
			{
				this.list.add(c);
			}
		}

		@Override
		public boolean removeChar(char c) 
		{
			if( !this.list.contains(c) )
				return false;
			else
			{
				int inx = 0;
				for( char baseC : this.list )
				{
					if( baseC == c )
					{
						this.list.remove(inx);
						break;
					}
					
					inx++;
						
				}
				return true;
			}
		}

		@Override
		public boolean isEmpty() {
			
			return (list.size() == 0 );
		}
		
	}
	
	public boolean testAnagram(String a, String b)
	{
		Map<Character, Integer> m = new HashMap<Character, Integer>();
		Anagram anagram = new AnagramMap();
		
		anagram.setBasis(a.toCharArray());
		char[] bArry = b.toCharArray();
		
		for( char c : bArry )
		{
			if( !anagram.removeChar(c) )
				return false;
		}
		
		if( !anagram.isEmpty() )
			return false;
		
		return true;
	}
	
	public boolean testAnagramList(String a, String b)
	{
		Map<Character, Integer> m = new HashMap<Character, Integer>();
		Anagram anagram = new AnagramCharArry();
		
		anagram.setBasis(a.toCharArray());
		char[] bArry = b.toCharArray();
		
		for( char c : bArry )
		{
			if( !anagram.removeChar(c) )
				return false;
		}
		
		if( !anagram.isEmpty() )
			return false;
		
		return true;
	}
	
	public boolean isAnagram(String firstWord, String secondWord)
	{
	     char[] word1 = firstWord.replaceAll("[\\s]", "").toCharArray();
	     char[] word2 = secondWord.replaceAll("[\\s]", "").toCharArray();
	     Arrays.sort(word1);
	     Arrays.sort(word2);
	     return Arrays.equals(word1, word2);
	}
	
	public static void main(String[] args)
	{
		ArraySort test = new ArraySort();
		long st = 0;
		long et = 0 ;
		int[] arry = {84,69,76,86,94,91};
		test.selfFunction(arry);
		System.out.println(arry.length);
		st = System.nanoTime();
		
		String aaa = "abcdefghijklmlabcdefghijklmlabcdefghijklmlabcdefghijklmlabcdefghijklmlabcdefghijklmlabcdefghijklmlabcdefghijklml";
		String bbb = aaa;
		System.out.println(test.testAnagram(aaa, bbb));
		et = System.nanoTime();
		System.out.println(et-st);
		System.out.println(test.testAnagramList(aaa, bbb));
		et = System.nanoTime();
		System.out.println(et-st);
		st = System.nanoTime();
		System.out.println(test.isAnagram(aaa, bbb));
		et = System.nanoTime();
		System.out.println(et-st);
	}
}
