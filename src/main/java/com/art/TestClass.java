package com.art;

import java.io.File;
import java.io.FileInputStream;
import java.io.RandomAccessFile;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class TestClass {

	public static void main(String[] args) 
	{
		TestClass tc = null;
		try
		{
			tc = new TestClass();
			
			// 1. test equals
//			tc.testStringEquals();
			
			// 2 . split 
//			tc.testSplit();
			
			// 3. caledar 
//			tc.testCalendar();
			
			// 4. stringbuilder
//			tc.testStringBuilder();
			
			// 5. random
//			tc.testRander();
			
			// 6. scanner
//			tc.testScanner();
			
			// 7. file scanner
//			tc.testScanFile();
			
			tc.testArray();
			
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
	}
	
	
	public void testStringEquals()
	{
		String s1 = "aaa";
		String s2 = "aaa";
		s2 = new String("aaa");
		s2 = s1;
		System.out.println(s1 == s2);
	}
	
	public void testSplit()
	{
		String s1 = "a,b,c,d,,,,";
		String[] arry = s1.split(",");
		System.out.println(arry.length);
		for( String str : arry )
		{
			System.out.println(str);
		}
	}
	
	public void testCalendar()
	{
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat adf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(adf.format(cal.getTime()));
	}
	
	public void testStringBuilder()
	{
		String str = "";
		StringBuffer sbf = new StringBuffer();
		StringBuilder sbl = new StringBuilder();
		
		long st = System.currentTimeMillis();
		for( int inx = 0 ; inx < 100000; inx++ )
		{
			str += "a";
		}
		long et = System.currentTimeMillis();
		System.out.println("execute String       : " +(et-st));
		st = System.currentTimeMillis();
		for( int inx = 0 ; inx < 100000; inx++ )
		{
			sbf.append("a");
		}
		et = System.currentTimeMillis();
		System.out.println("execute StringBuffer : " +(et-st));
		st = System.currentTimeMillis();
		for( int inx = 0 ; inx < 100000; inx++ )
		{
			sbl.append("a");
		}
		et = System.currentTimeMillis();
		System.out.println("execute StringBuilder : " +(et-st));
	}
	
	public void testRander() 
	{
		Random rd = new Random();
		System.out.println(rd.nextInt(10)+"");
	}
	
	public void testScanner()
	{
		Scanner s = new Scanner(System.in);
		System.out.println("숫자를 입력 하세요");
		int num = s.nextInt();
		Scanner strScan = new Scanner(System.in);
		System.out.println("문자를 입력 하세요");
		String str = strScan.nextLine();
		
		System.out.println(num);
		System.out.println(str);
		System.out.println("1TestClass".getBytes().length);
	}
	
	public void testScanFile()
	{
		RandomAccessFile raf = null;
		Scanner fileScan =  null;
		String readLine = null;
		try
		{
			
			fileScan = new Scanner(new FileInputStream(new File("d:\\test.txt")));
			while (fileScan.hasNext() )
			{
				System.out.println(fileScan.nextLine());
			}
			System.out.println("random accesss****************");
			raf = new RandomAccessFile(new File("d:\\test.txt"), "r");
			raf.seek(48); // 시작점.
			while( (readLine=raf.readLine()) != null )
			{
				System.out.println(readLine);
			}
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}finally
		{
			if( fileScan  != null )
				fileScan.close();
		}
	}
	
	public void testArray()
	{

		int size = 2000000;
		List<String> list1 = new ArrayList<String>();
		long st = 0;
		long et = 0;
		st = System.currentTimeMillis();
		for( int inx = 0 ; inx < size ; inx++) 
		{
			list1.add("str_1"+inx);
		}
		et = System.currentTimeMillis();
		
		System.out.println("list1 : "+ (et-st));
		
		List<String> list2 = new ArrayList<String>(size);
		st = System.currentTimeMillis();
		for( int inx = 0 ; inx < size; inx++ )
		{
			list2.add("str_1" + inx);
		}
		et = System.currentTimeMillis();
		System.out.println("iist2 : " +(et-st));
	}
}
