package com.art.test;

import static org.junit.Assert.*;

import org.hamcrest.CoreMatchers;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.art.test.junit.NewCars;
import com.art.test.junit.impl.NewCarTruc;

public class NewJUnitTest 
{
	
	@BeforeClass
	public static void shouldBeforeClass()
	{
		System.out.println("================== before class");
	}
	
	@Before
	public void shuoldBefore()
	{
		System.out.println("-------------------------------- before " );
	}
	
	@After
	public void shouldAfter()
	{
		System.out.println("---------------------------------after ");
	}
	
	@AfterClass
	public static void shouldAfterClass()
	{
		System.out.println("====================== after class");
	}
	
	@Test
	public void test() 
	{
		System.out.println("RESULT");
		String first = "a";
		assertThat(first, CoreMatchers.startsWith("a"));
	}
	
	@Test
	public void test2()
	{
		System.out.println("RESULT--- 2 ");
		assertThat("a", CoreMatchers.endsWith("a"));
	}
	
}
