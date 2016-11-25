package com.art.test;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

public class ArrayListTest 
{
	private static ArrayList ar =  null;
	
	@BeforeClass
	public static void initialArray()
	{
		ar = new ArrayList(10);
	}
	
	@Ignore
	@Test
	public void  shouldAddElement()
	{
		ar.firstElement("1");
		assertEquals(1, ar.size());
		ar.addElement("2");
		assertEquals(2, ar.size());
		ar.addElement(1, "3");
		ar.addElement(7, "4");
		assertEquals("3", ar.get(1));
		assertEquals(8, ar.size());
		ar.removeElement(2);
		assertEquals(7, ar.size());
	}
	
	@Ignore
	@Test(expected = IllegalArgumentException.class)
	public void shouldAccureException()
	{
		ar.getIntTypeStirng("aa");
	}
	
	@Test
	public void testMap()
	{
		Map<String,String> map = null;
		int size = 1000000;
		long st = 0;
		long et = 0 ;
		st = System.currentTimeMillis();
		try {
		
			Thread.sleep(200);
		}catch ( Exception _ignore)
		{
			_ignore.printStackTrace();
		}
		et = System.currentTimeMillis();
		
		System.out.println(et-st);
		map = new HashMap<String,String>();
		st = System.currentTimeMillis();
		for( int inx = 0 ; inx < size; inx++)
		{
			map.put("cd_"+inx, "val_"+inx);
		}
		et = System.currentTimeMillis();
		
		System.out.println(et-st);
		
		map = new ConcurrentHashMap<String,String>();
		st = System.currentTimeMillis();
		for( int inx = 0 ; inx < size; inx++)
		{
			map.put("cd_"+inx, "val_"+inx);
		}
		et = System.currentTimeMillis();
		System.out.println(map.get("cd_100"));
		System.out.println(et-st);
	}

}

