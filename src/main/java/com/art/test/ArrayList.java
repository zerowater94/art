package com.art.test;

public class ArrayList 
{
	private Object[] array = null;
	private int arraySize = 0 ;
	
	public ArrayList()
	{
		this.array = new Object[100];
	}
	
	public ArrayList(int size) 
	{
		this.array = new Object[size];
	}

	public Object size() 
	{
		return arraySize;
	}
	
	public Object get(int index) 
	{
		return array[index];
	}
	
	public void firstElement(String string) 
	{
		array[0] = string;
		arraySize++;
	}
	

	public void addElement(String string) 
	{
		array[arraySize] = string;
		arraySize++;
	}
	
	public boolean addElement(int index, Object obj)
	{
		if ( index <= arraySize )
		{
			for( int inx = arraySize-1; inx >= index; inx-- )
			{
				array[inx+1] = array[inx];
			}
		}
		array[index] = obj;
		if( index > arraySize)
			arraySize += (index-arraySize)+1;
		else
			arraySize++;
		
		for( int inx = 0 ; inx < arraySize; inx++ )
		{
			System.out.println(array[inx]);
		}
		
		return true;
	}

	public void removeElement(int index)
	{
		array[index] = null;
		for ( int inx = index; inx < arraySize;inx++ )
		{
			if( inx == (arraySize-1) )
				array[inx] = null;
			else
				array[inx] = array[inx+1];
		}
		arraySize--;
		for( int inx = 0 ; inx < arraySize; inx++ )
		{
			System.out.println(array[inx]);
		}
	}
	
	

	public int getIntTypeStirng(String string)
	{
		try
		{
			return Integer.parseInt(string);
		}catch ( NumberFormatException ex )
		{
			throw new IllegalArgumentException("not a int type string");
		}
	}

	
}
