package com.art;

public class TestException2 
{
	
	public static void main(String[] args) 
	{
		TestException2 textEx = new TestException2();
		textEx.parseInt("11a");
//		System.out.println("error , but execute ");
	}
	
	public void parseInt(String str)
	{
		try
		{
			System.out.println(Integer.parseInt(str));
		}catch ( Exception ex )
		{
			System.out.println(ex.getMessage());
		}
	}
}
