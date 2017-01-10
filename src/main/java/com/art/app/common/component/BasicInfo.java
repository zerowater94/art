package com.art.app.common.component;

import java.io.InputStream;

import com.art.fw.resource.BasicConfig;

public class BasicInfo extends BasicConfig
{
	private static String customCssPath = null;
	
	public void setLoadCustomCss(String path) throws Exception
	{
		BasicInfo.customCssPath = path;
	}
	
	public static InputStream getCustomCss(String resFile) throws Exception
	{
		return BasicInfo.getResourceStream(BasicInfo.customCssPath+java.io.File.separator+resFile);
	}
}
