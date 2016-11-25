package com.art.test.agr;

public class SumMatrix {
	int[][] sumMatrix(int[][] A, int[][] B) {
	int[][] answer = {{0, 0}, {0, 0}};
    int inx, jnx ;
    int len = A.length, sLen = A[0].length;
    answer = new int[len][sLen];
    for( inx = 0; inx < len; inx++ )
    {
      for( jnx = 0 ;jnx < sLen; jnx++ )
      {
        answer[inx][jnx] = A[inx][jnx]+B[inx][jnx];
      }
    }
		return answer;
	}

	// 아래는 테스트로 출력해 보기 위한 코드입니다.
	public static void main(String[] args) {
		SumMatrix c = new SumMatrix();
		int[][] A = { { 2, 2 }, { 6, 10 } , { 6, 10 } , { 6, 10 } , { 6, 10 } };
		int[][] B = { { 7, 3 }, { 5, 9 } , { 6, 10 } , { 6, 10 } , { 6, 10 } };
		int[][] answer = c.sumMatrix(A, B);
		if (answer[0][0] == 9 && answer[0][1] == 5 && 
				answer[1][0] == 11 && answer[1][1] == 19) {
			System.out.println("맞았습니다. 제출을 눌러 보세요");
		} else {
			System.out.println("틀렸습니다. 수정하는게 좋겠어요");
		}
	}
}
