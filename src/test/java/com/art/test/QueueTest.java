package com.art.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

import org.hamcrest.CoreMatchers;
import org.junit.Ignore;
import org.junit.Test;

import com.art.test.impl.ArrayQueue;
import com.art.test.impl.CircularQueue;

public class QueueTest 
{
	@Ignore
	@Test
	public void shouldAddedData()
	{
		Queue<String> q = new LinkedList<String>();
		q.add("a");
		q.add("b");
		String first = q.poll();
		String temp = q.peek();
		System.out.println(first);
		System.out.println(temp);
		System.out.println(q.poll());
		q.add("c");
//		System.out.println(q.size());
		assertEquals(2, q.size(), 1);
		assertThat(first, CoreMatchers.startsWith("a"));
	}
	
	@Ignore
	@Test
	public void shouldADdedDataStack()
	{
		Stack<String> s = new Stack<String>();
		s.add("A");
		s.add("B");
		System.out.println(s.size());
		System.out.println(s.peek());
		System.out.println(s.size());
		System.out.println(s.pop());
		System.out.println(s.size());
		System.out.println(s.pop());
		assertThat(s.size(), CoreMatchers.equalTo(0));
	}

	@Test
	public void shouldArrayQueue()
	{
		MyQueue<Integer> myQ = new ArrayQueue<Integer>(3);

		myQ.add(1);
		System.out.println(myQ.peak());
		myQ.add(2);
		myQ.add(3);
		System.out.println(myQ);
		System.out.println(myQ.getSize());
		System.out.println(myQ.poll());
		System.out.println(myQ.peak());
		System.out.println(myQ.poll());
		System.out.println(myQ.peak());
		System.out.println(myQ.poll());
		
//		int size = 5000000;
//		myQ = new ArrayQueue<String>(size);
//		long st = System.currentTimeMillis();
//		long et = 0;
//		for ( int inx = 0 ; inx < size; inx++ )
//		{
//			myQ.add("str_"+inx);
//		}
//		
//		for ( int inx = 0 ; inx < size; inx++ )
//		{
//			myQ.poll();
//		}
//		
//		et = System.currentTimeMillis();
//		System.out.println(et-st);
//		
//		st = System.currentTimeMillis();
//		Queue<String> q = new LinkedList<String>();
//		for ( int inx = 0 ; inx < size; inx++ )
//		{
//			q.add("str_"+inx);
//		}
//		
//		for ( int inx = 0 ; inx < size; inx++ )
//		{
//			q.poll();
//		}
//		
//		et = System.currentTimeMillis();
//		System.out.println(et-st);
		
		assertThat(myQ.getSize(), CoreMatchers.equalTo(0));
	}
	@Ignore
	@Test
	public void shouldCircularQueue()
	{
		MyQueue<Integer> myQ = new CircularQueue<Integer>();
		myQ.add(1);
		myQ.poll();
		System.out.println(myQ);
		myQ.add(2);
		System.out.println(myQ);
		assertThat(myQ.getSize(), CoreMatchers.equalTo(1));
		myQ.poll();
		myQ.add(6);
		myQ.add(7);
		myQ.add(8);
		myQ.add(9);
		myQ.poll();
		myQ.poll();

		myQ.add(10);

		myQ.add(11);

		myQ.poll();
		myQ.add(12);
		System.out.println(myQ);
		
		assertThat(myQ.getSize(), CoreMatchers.equalTo(4));
		System.out.println(myQ);
	}
	
	@Ignore
	@Test
	public void checkTime()
	{
		long st = 0;
		long et = 0;
		
		int rst = 0 ;
		int size = 1000000000;
		int gap = 0 ;
		st = System.currentTimeMillis();
		for( int inx = 0 ; inx < size; inx++)
		{
//			rst++;
			gap = inx%3;
		}
		et = System.currentTimeMillis();
		System.out.println(gap+"");
		System.out.println(et-st);
		
		st = System.currentTimeMillis();
		rst = 0;
		gap = 0 ;
		for( int inx = 0 ; inx < size; inx++)
		{
//			rst = rst+1;
			if( gap >= 3)
				gap = 0;
			else
				gap++;
		}
		et = System.currentTimeMillis();
		System.out.println(gap+"");
		System.out.println(et-st);
	}
}