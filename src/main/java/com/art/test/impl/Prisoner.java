package com.art.test.impl;

import java.util.PriorityQueue;

public class Prisoner implements Comparable<Prisoner>
{
	String name;
    int weight; // 형량


    public Prisoner(String name, int weight) {
        super();
        this.name = name;
        this.weight = weight;
    }

    @Override
    public int compareTo(Prisoner target) {
    	System.out.println(this.weight+" , "+ target.weight);
        if (this.weight > target.weight) {
            return 1;
        } else if (this.weight < target.weight) {
            return -1;
        }
        return 0;
    }
    
    public void testMultiParam(String ... aa )
    {
    	System.out.println(aa.length);
    }
    
    
    public static void main(String[] args)
    {
    	Prisoner prisoner1 = new Prisoner("james", 5);
        Prisoner prisoner2 = new Prisoner("schofield", 99);
        Prisoner prisoner3 = new Prisoner("alex", 14);
        Prisoner prisoner4 = new Prisoner("silvia", 10);

        Prisoner prisoner5 = new Prisoner("thomson", 2);
        Prisoner prisoner6 = new Prisoner("thomson", 1);
        
        PriorityQueue<Prisoner> priorityQueue = new PriorityQueue<Prisoner>();

        System.out.println(priorityQueue.offer(prisoner1));
        System.out.println(priorityQueue.offer(prisoner2));
        System.out.println(priorityQueue.offer(prisoner3));
        System.out.println(priorityQueue.offer(prisoner4));
        System.out.println(priorityQueue.offer(prisoner6));
        System.out.println(priorityQueue.offer(prisoner5));

//        System.out.println(priorityQueue.poll().name);
//        System.out.println(priorityQueue.poll().name);
//        System.out.println(priorityQueue.poll().name);
//        System.out.println(priorityQueue.poll().name);
//        System.out.println(priorityQueue.offer(prisoner5));
//        System.out.println(priorityQueue.poll().name);
        
        Prisoner p = new Prisoner("alex", 14);
        
        p.testMultiParam("a", "b", "C");

    }


}
