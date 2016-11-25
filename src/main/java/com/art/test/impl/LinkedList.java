package com.art.test.impl;

public class LinkedList 
{
	private Node head;
	private Node tail ;
	private int size = 0 ;
	
	public boolean addFirst(Object input)
	{
		Node newNode = new Node(input);
		newNode.next = head;
		head = newNode;
		
		size++;

		if( head.next == null )
			tail = head;
		return true;
	}
	
	
	public boolean addLast(Object input)
	{
		Node newNode = new Node(input);
		if( size == 0 )
			this.addFirst(input);
		else
		{
			tail.next = newNode;
			tail = newNode;
			size++;
		}
		return true;
	}
	
	public Node getNode(int index )
	{
		if ( index < 0 )
			return null;
	
		Node rtnNode = head;
		int k = 0;
		
		while( k++ < index )
			rtnNode = rtnNode.next;
		
		return rtnNode;
	}
	
	public boolean add(int index, Object input ) throws Exception
	{
		Node newNode = new Node(input);
		Node before,after ;
		
		if( index < 0 || index > size )
			throw new IndexOutOfBoundsException("not valid index ["+index+"]" );
		
		if( index == 0 )
			this.addFirst(input);
		else
		{
		
			before = this.getNode(index-1);
	
			if( before == null )
				this.addFirst(input);
			else
			{
				after  = before.next;
				before.next = newNode;
				newNode.next = after;
				size++;
				
				if( newNode.next == null) 
					tail = newNode;
			}
		}
		return true;
	}
	
	public String toString() {
	    // 노드가 없다면 []를 리턴합니다.
	    if(head == null){
	        return "[]";
	    }       
	    // 탐색을 시작합니다.
	    Node temp = head;
	    String str = "[";
	    // 다음 노드가 없을 때까지 반복문을 실행합니다.
	    // 마지막 노드는 다음 노드가 없기 때문에 아래의 구문은 마지막 노드는 제외됩니다.
	    while(temp.next != null){
	        str += temp.data + ",";
	        temp = temp.next;
	    }
	    // 마지막 노드를 출력결과에 포함시킵니다.
	    str += temp.data;
	    return str+"]";
	}
	
	public String findRecData(int inx)
	{
		Node t , f ;
		t = f = head;
		int cnt = this.size - inx;
		String rtnData = "";
		for ( int jnx = 0 ; jnx < cnt; jnx++)
		{
			t = t.next;
		}
		return (String)t.data;
	}
	
	public boolean isLoop()
	{
		Node slow, fast;
		slow = fast = head;
		
		while( fast.next != null && fast.next.next != null )
		{
			slow = slow.next;
			fast = fast.next.next;
			
			if(slow == fast) 
	            return true;
		}
		return false;
	}
	
	private class Node
	{
		private Object data;
		private Node next;
		
		public Node(Object input)
		{
			this.data = input;
			this.next = null;
		}
		
		public String toString()
		{
			return String.valueOf(data);
		}
	}
	
	public static void main (String[] args)
	{
		LinkedList list = new LinkedList();
		try
		{
			list.add(0, "a");
			System.out.println(list.toString());
			list.add(0, "b");
			System.out.println(list.toString());
			list.add(1, "c");
			System.out.println(list.toString());
			list.addFirst("-1");
			list.addLast("c");
			list.addLast("d");
			list.addLast("e");
			list.addLast("f");
			list.addLast("g");
			list.addLast("h");
			System.out.println(list.toString());
			System.out.println(list.findRecData(2));
		}catch ( Exception ex )
		{
			ex.printStackTrace();
		}
	}
}
