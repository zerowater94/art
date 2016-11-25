package com.art.test.impl;

import com.art.test.MyQueue;

public class ArrayQueue<T> implements MyQueue<T>
{
	private int rear = 0;    // queue back..
	private int front = 0 ;  // queue front 
	private int maxSize = 100;
	private T[] arry = null;
	
	@SuppressWarnings("unchecked")
	public ArrayQueue()
	{
		this.arry = (T[])new Object[this.maxSize];
	}
	
	@SuppressWarnings("unchecked")
	public ArrayQueue(int maxSize)
	{
		this.maxSize = maxSize;
		this.arry = (T[])new Object[this.maxSize];
	}
	
	@Override
	public int getSize() 
	{
		return (rear-front);
	}
	
	@Override
	public boolean isEmpty()
	{
		return (rear == front);
	}
	
	@Override
	public boolean isFull()
	{
		return (maxSize == rear);
	}

	@Override
	public boolean add( T obj ) 
	{
		if( this.isFull() )
			throw new IndexOutOfBoundsException("over max Size");
		this.arry[rear++] = obj;
		return true;
	}

	@Override
	public T poll() {
		if( this.isEmpty() )
			throw new IndexOutOfBoundsException("no data Queue");
		return this.arry[front++];
	}

	@Override
	public T peak() {
		if( this.isEmpty() )
			throw new IndexOutOfBoundsException("no data Queue");
		return this.arry[front];
	}
	
	public String toString()
	{
		StringBuffer sb = new StringBuffer();
		for( int inx = front ; inx < rear; inx++)
			sb.append(arry[inx]).append(" ");
        return sb.toString();
	}
}
