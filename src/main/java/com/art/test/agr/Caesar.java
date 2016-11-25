package com.art.test.agr;

public class Caesar 
{
	String caesar(String s, int n) {
		StringBuffer sb = new StringBuffer();
		// 함수를 완성하세요.
		int maxSmallChar = (int)"z".charAt(0);
		int minSmallChar = (int)"a".charAt(0);
		int maxBigChar = (int)"Z".charAt(0);
		int minBigChar = (int)"A".charAt(0);
		char[] cArry = s.toCharArray();
		int rIndex;
		n = n%26;
		for( char c : cArry)
		{
			rIndex = (int)c;
			if( c == " ".charAt(0))
				sb.append(" ");
			else
			{
				if( rIndex >= minSmallChar  && rIndex <= maxSmallChar )
				{
					rIndex = rIndex+n;
					if( rIndex > maxSmallChar )
					{
						rIndex = minSmallChar+(rIndex-maxSmallChar)-1;
					}
				}
				
				if( rIndex >= minBigChar && rIndex <= maxBigChar )
				{
					rIndex = rIndex+n;
					if( rIndex > maxSmallChar )
					{
						rIndex = minBigChar+(rIndex-maxBigChar)-1;
					}
				}
				sb.append((char)rIndex);
			}
			
		}
		return sb.toString();
	}

	public static void main(String[] args) {
		Caesar c = new Caesar();
		System.out.println("s는 'a B z', n은 4인 경우: " + c.caesar("a B z", 4));
	}
}
