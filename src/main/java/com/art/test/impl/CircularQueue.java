package com.art.test.impl;

import com.art.test.MyQueue;

public class CircularQueue<T> implements MyQueue<T>
{
	private int rear = 0;    // queue back..
	private int front = 0 ;  // queue front
	private int maxSize = 100;
	private T[] arry = null;
	
	@SuppressWarnings("unchecked")
	public CircularQueue()
	{
		this.arry = (T[])new Object[this.maxSize];
	}
	
	@SuppressWarnings("unchecked")
	public CircularQueue(int maxSize)
	{
		this.maxSize = maxSize+1;
		this.arry = (T[])new Object[this.maxSize];
	}
	
	@Override
	public int getSize() 
	{
		if( front > rear  )
			return (maxSize-front+rear);
		else
			return rear-front;
	}
	
	@Override
	public boolean isEmpty()
	{
		return (rear == front);
	}
	
	@Override
	public boolean isFull()
	{
		return (((rear+1)%maxSize) == front);
	}

	@Override
	public boolean add( T obj ) 
	{
		if( this.isFull() )
			throw new IndexOutOfBoundsException("over max Size");
		rear = (rear+1)%(maxSize);
		this.arry[rear] = obj;
		return true;
	}

	@Override
	public T poll() {
		
		if( this.isEmpty() )
			throw new IndexOutOfBoundsException("no data Queue");
		front = (front+1)%(maxSize);
		return this.arry[front] ;
	}

	@Override
	public T peak() {
		if( this.isEmpty() )
			throw new IndexOutOfBoundsException("no data Queue");
		return this.arry[(front+1)%maxSize];
	}
	
	@Override
	public String toString()
	{
		StringBuffer sb = new StringBuffer();
		
        int f = front;
        while( f != rear )
        {
        	f = (f+1)%maxSize;
        	sb.append(arry[f]).append(" ");
        }

        return sb.toString();
	}
}
