package com.art.test.agr;


/**
 * N개 배열의 최소 공배수 구함.
 * @author zerowater
 *
 */
public class NLCM 
{
	public long getGcd(long a, long b)
	{
		long l = Math.max(a, b), s = Math.min(a, b);
		long r = 1;
		while ( r > 0 )
		{
			r = l%s;
			l = s;
			s = r;
		}

		return l;
	}
	  
		public long nlcm(int[] num) {
			long answer = num[0];
		    int len = num.length;
		    long bInt = 0;
		    long bGcd = num[0] ;
		    for( int inx = 1 ; inx < len; inx++ )
		    {
		    	bInt = answer;
		    	bGcd = getGcd(answer, num[inx]);
		    	answer = (bInt*num[inx])/bGcd;
		    }
			return answer;
		}

		public static void main(String[] args) {
			NLCM c = new NLCM();
			int[] ex = { 2, 6, 8, 14 };
			// 아래는 테스트로 출력해 보기 위한 코드입니다.
			System.out.println(c.nlcm(ex));
		}

}
