package com.art.fw.resource;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

abstract class AbstractBasic 
{
	
	/**
	 * Locale 별 Properties 리턴한다.
	 * @param path
	 * @param locale
	 * @return
	 */
	protected Properties getProperties(String filePath)
	{
		Properties prop = null;
		try
		{
			prop = new Properties();
			prop.load(AbstractBasic.getResourceStream(filePath));
		}catch ( Exception ex )
		{
			ex.printStackTrace();
			return new Properties();
		}
		return prop;
	}
	
	
	protected static InputStream getResourceStream(String filePath) throws Exception
	{
		InputStream inputStram = null;
		try
		{
			
			if( filePath.startsWith("file:") )
			{
				filePath = filePath.replace("file:", "");
				String resFilePath = System.getProperty("user.dir")+File.separator+filePath;
				inputStram = new FileInputStream(new File(resFilePath));
			}else 
			{
				if( filePath.startsWith("classpath:") )
					filePath = filePath.replace("classpath:", "/");
				inputStram = AbstractBasic.class.getResourceAsStream(filePath);
			}	
		}catch ( Exception ex )
		{
			throw ex;
		}
		return inputStram;
		
	}
	
}
