package com.art.app.kra.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.JSONObj;


public abstract class AbstractDashboardService extends AbstractService
{
	protected JSONObj executeCallWS(String callAddr) throws Exception
	{
		JSONObj rtnObj = null;
		URL url = null;
		URLConnection conn = null;
		InputStream is = null;
		byte[] bytes = new byte[1024];
		ByteArrayOutputStream bodyMsg = null;
		int read = 0;
		
		try
		{
			url = new URL(callAddr);
			conn = url.openConnection();
			conn.setConnectTimeout(3000);
//			conn.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
			is = conn.getInputStream();
			bodyMsg = new ByteArrayOutputStream();
			while((read = is.read(bytes))!= -1 )
			{
				bodyMsg.write(bytes, 0, read);
			}
			rtnObj = new JSONObj(bodyMsg.toString());
		}catch( Exception ex)
		{
			throw ex;
		}finally
		{
			if( bodyMsg != null )
				bodyMsg.close();
			if( is != null )
				is.close();
		}
		return rtnObj;
	}
	
	public static void testArryByte()
	{
		ByteArrayOutputStream bodyMsg = null;
		String test = "한글한글한글한글한글1111 dgsdfasd  한글";
		byte[] bytes = test.getBytes();
		int len = bytes.length;
		int offset, index = 0;
		bodyMsg = new ByteArrayOutputStream();
		while( len > 0 )
		{
			offset = 5;
			if( offset > len )
				offset = len;
			System.out.println(len+" , "+index+" , "+offset);
			bodyMsg.write(bytes, index, offset); // pdu code
			System.out.println(new String(bytes, index , 5 ));
			index += offset;
			len -= offset;
		}
		System.out.println(bodyMsg.toString());
	}
	
	public static void main(String[] args)
	{
		AbstractDashboardService.testArryByte();
	}

}
