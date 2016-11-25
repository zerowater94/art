package com.art.fw.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.art.fw.domain.JSONObj;


public class TransformUtil 
{
	/**
     * name을 메소드 형태로 변경 하여 리턴 한다.
     * 첫문자 대문자로 _뒤에 첫문자 대문자로.. 
     * @param name
     * @return
     */
	public static String getMethodPatterName(String name)
    {
		return TransformUtil.getMethodPatterName(name, true);
    }
	
    public static String getMethodPatterName(String name, boolean isLowerCase)
    {
    	StringBuffer sb = new StringBuffer();
    	if( isLowerCase )
    		name = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    	else
    		name = name.substring(0, 1).toUpperCase() + name.substring(1);
    	
		Pattern pattern = Pattern.compile("_.");
		Matcher matcher = pattern.matcher(name);
		while(matcher.find() )
		{
			matcher.appendReplacement(sb, matcher.group().replaceAll("_", "").toUpperCase());
			
		}
		matcher.appendTail(sb);
		return sb.toString();
    }
    
    
    /**
     * get 메소드를 parameter key 형태로 리턴한다.
     * getModelName --> modelName
     * @param getMethodName
     * @return
     */
    public static String getKeyPatterName(String getMethodName)
    {
    	if( !getMethodName.startsWith("get") )
    		return getMethodName;
    	
    	if( getMethodName.length() < 5)
    		return getMethodName;
    	
    	return getMethodName.substring(3,4).toLowerCase()+getMethodName.substring(4);
    	
    }
    
    
    /**
     * set method별 value set을 한다.
     *  각 method의 class type별.
     * @param paramType
     * @param value
     * @return
     */
    public static Object getModelParams(Class<?> paramType, Object value) 
	{
		if( paramType == null )
			return new Object();
		
		if( value == null )
			return null;
		
		
		if( paramType.equals(Byte.class))
		{
			return Byte.valueOf(value.toString());
		}else if ( paramType.equals(Integer.TYPE) )
        {
			return TransformUtil.getParseInt(value);
        }
        else if (paramType.equals(Short.class))
        {
        	return Short.valueOf(value.toString());
        }
        else if (paramType.equals(Long.class))
        {
        	return Long.valueOf(value.toString());
        }
        else if (paramType.equals(Float.class))
        {
        	return Float.valueOf(value.toString());
        }
        else if (paramType.equals(Double.class))
        {
        	return Double.valueOf(value.toString());
        }
        else if (paramType.equals(Boolean.class))
        {
        	return Boolean.valueOf(value.toString());
        }else
        {
        	return String.valueOf(value.toString());
        }
	}
    
    /**
	 * 특정 클래스에 있는 field 및 field값을 JSON Object로 리턴한다.
	 * @return
	 */
	public JSONObj getClassFieldInfo(Class<? extends Object> _class) throws Exception
	{
		JSONObj rtnObj = null;
		Field[] fArry = null;
		String fName = "";
		try
		{
			rtnObj = new JSONObj();
			
			fArry = _class.getFields();

			for( Field field : fArry )
			{
				fName = field.getName();
				rtnObj.put(fName,field.get(fName));
			}
		}catch ( Exception ex )
		{
			throw ex;
		}
		return rtnObj;
	}
	
	/**
	 * bean to JSON
	 * @param bean
	 * @param showNulls
	 * @return
	 */
	public JSONObj getJsonFromBean(Object bean, boolean showNulls) 
    {
		JSONObj rtnObj = null;
		BeanInfo bi = null;
		PropertyDescriptor[] pd = null;
		Object result = null;
		try 
		{
			if (bean == null)  
				return null;
			
			rtnObj = new JSONObj();
			
			bi = Introspector.getBeanInfo(bean.getClass());
			pd = bi.getPropertyDescriptors();

			for (int i = 0; i < pd.length; i++) 
			{
				if (!"class".equals(pd[i].getName())) 
				{
					result = pd[i].getReadMethod().invoke(bean);
					if (showNulls || result != null) 
					{
						rtnObj.put(pd[i].getDisplayName(),result);
						if (i == pd.length - 1)  
							continue;
					}
				}
			}
		}catch (Exception _ignore){ 
			_ignore.printStackTrace();
		}
		return rtnObj;
	}
    
    private static Integer getParseInt(Object val)
    {
    	try
    	{
    		return Integer.valueOf(val.toString());
    	}catch ( NumberFormatException nex )
    	{
    		return -1;
    	}catch ( Exception ex )
    	{
    		return -1;
    	}
    }
}
