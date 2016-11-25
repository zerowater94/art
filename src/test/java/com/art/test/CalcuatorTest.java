package com.art.test;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.art.Calculator;

public class CalcuatorTest {
	
	
	@BeforeClass
    public static void setUpBeforeClass() throws Exception {
        System.out.println("@BeforeClass");
    }

    @AfterClass
    public static void tearDownAfterClass() throws Exception {
        System.out.println("@AfterClass");
    }

    @Before
    public void setUp() throws Exception {
        System.out.println("@Before");
    }

    @After
    public void tearDown() throws Exception {
        System.out.println("@After");
    }

	@Test
	public void testSum() {
		Calculator calculator = new Calculator();
        assertEquals(30, calculator.sum(10, 20));
        System.out.println("true");
	}
	
	@Test
	public void testEqual() {
		Calculator calculator = new Calculator();
		assertTrue(calculator.isEquals(10, 10));
        System.out.println("true");
	}
	
	@Test
	public void testTimeout() {
	    // Test case goes here
		Calculator calculator = new Calculator();
		calculator.checkTimeArray();
	}
}
