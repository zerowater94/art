package com.art.test.impl;

public class LinkedCircleList 
{
	private Node head; 
	
	public LinkedCircleList() 
	{ 
		this.head = new Node("head"); 
	} 
	
	public Node head() 
	{ 
		return head;
	} 
	
	public void appendIntoTail(Node node) 
	{
		Node current = head;
		
		
		while(current.next() != null)
		{
			current = current.next();

		}
		current.setNext(node);

	}
	
	public boolean isCyclic()
	{
		Node fast = head;
		Node slow = head;
		while(fast!= null && fast.next != null)
		{
			fast = fast.next.next;
			slow = slow.next;
			if(fast == slow )
				return true;
		}
		return false;
	}
	
	public String toString()
	{
		StringBuilder sb = new StringBuilder();
		Node current = head.next();
		while(current != null)
		{
			sb.append(current).append("-->");
			current = current.next();

		}

		sb.delete(sb.length() - 3, sb.length()); // to remove --> from last node 
		return sb.toString();

	}
	
	public Node newNode(String data)
	{
		return new Node(data);
	}

    class  Node 
    {
    	private Node next;
    	private String data;
    	public Node(String data) 
    	{
    		this.data = data;

    	}

    	public String data() { return data; }
    	public void setData(String data) { this.data = data;} 
    	public Node next() { return next; }
    	public void setNext(Node next) { this.next = next; }
    	public String toString() 
    	{
    		return this.data;

    	}

    }
    
    
    public static void  main(String[] args )
    {
    	LinkedCircleList linkedList = new LinkedCircleList();
    	Node node = linkedList.newNode("105");
    	linkedList.appendIntoTail(linkedList.newNode("101"));
    	linkedList.appendIntoTail(node);
    	
    	linkedList.appendIntoTail(linkedList.newNode("102"));
    	linkedList.appendIntoTail(linkedList.newNode("103"));
    	linkedList.appendIntoTail(linkedList.newNode("104"));
    	linkedList.appendIntoTail(linkedList.newNode("104"));
    	linkedList.appendIntoTail(linkedList.newNode("104"));
    	linkedList.appendIntoTail(linkedList.newNode("104"));
    	System.out.println("Linked List : " + linkedList);
    	if(linkedList.isCyclic())
    	{
    		System.out.println("Linked List is cyclic as it contains cycles or loop");

    	}else
    	{
    		System.out.println("LinkedList is not cyclic, no loop or cycle found"); 

    	}

    	
    	linkedList.appendIntoTail(node);
    	if(linkedList.isCyclic())
    	{
    		System.out.println("Linked List is cyclic as it contains cycles or loop");

    	}else
    	{
    		System.out.println("LinkedList is not cyclic, no loop or cycle found"); 

    	}
    	
    	System.out.println();
    	
    	

    }

}
