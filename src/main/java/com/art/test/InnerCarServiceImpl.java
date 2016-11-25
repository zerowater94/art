package com.art.test;

public class InnerCarServiceImpl implements InnerCar
{

	@Override
	public void makeCar() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sellCar() {
		// TODO Auto-generated method stub
		long st = System.currentTimeMillis();
		long et = System.currentTimeMillis();
		
		System.out.println(et-st);
		
		
	}

	@Override
	public int makeCarCount() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int sellCarCount() {
		// TODO Auto-generated method stub
		return 0;
	}

}
