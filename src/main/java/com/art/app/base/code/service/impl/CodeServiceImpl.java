package com.art.app.base.code.service.impl;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import org.springframework.stereotype.Service;

import com.art.app.base.code.service.CodeService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.JSONObj;

@Service("codeService")
public class CodeServiceImpl extends AbstractService implements CodeService 
{
	public JSONObj callJsp() throws Exception 
	{
		JSONObj rtnObj  = null;
		URL url = null;
		URLConnection conn = null;
		InputStream is = null;
		StringBuffer xmlSb = null;
		byte[] bytes = new byte[4096];
		int read = 0;
		try
		{
			url = new URL("http://localhost:8080/test.jsp");
			conn = url.openConnection();
			is = conn.getInputStream();
			xmlSb = new StringBuffer();
			while( (read=is.read(bytes)) != -1 )
			{
				xmlSb.append(new String(bytes, 0, read, "UTF-8"));
			}
			
			rtnObj = new JSONObj(xmlSb.toString());
			super.logger.debug("rtnObj length : "+ rtnObj.length());
		}catch ( Exception ex )
		{
			throw ex;
		}
		return rtnObj;
	}
}
