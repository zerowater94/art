package com.art.fw.domain;

import java.util.Map;

import org.codehaus.jettison.json.JSONObject;

public class JSONObj extends JSONObject
{
	private static final long serialVersionUID = 190000000000000000L;
	
	public JSONObj() 
	{
		super();
	}
	
	public JSONObj(String str) throws Exception
	{
		super(str);
	}
	
	public JSONObj(Map<?,?> map) throws Exception
	{
		super(map);
	}

}
