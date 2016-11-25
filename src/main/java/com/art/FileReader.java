package com.art;

import java.io.File;
import java.io.FileInputStream;
import java.util.Scanner;

public class FileReader 
{
	public void testScanFile()
	{
		Scanner fileScan =  null;
		String readLine = null;
		try
		{
			
			fileScan = new Scanner(new FileInputStream(new File("d:\\test1.txt")));
			if (fileScan.hasNext() ) // 한줄만 읽을라거 ...
				readLine = fileScan.nextLine();
			
			int cnt = readLine.split("|").length;
			System.out.println((cnt >= 10)?"C":"B");
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}finally
		{
			if( fileScan  != null )
				fileScan.close();
		}
	}
	
	public static void main (String[] args)
	{
		FileReader fr = new FileReader();
		fr.testScanFile();
	}
}
