package com.art.test;

public interface MyQueue<T> 
{
	public int getSize() ;
	
	public boolean isEmpty() ; 
	
	public boolean isFull();
	
	public boolean add(T obj);
	
	public T poll();
	
	public T peak();
	
}
