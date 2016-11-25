package com.art.app.kra.service.impl;

import org.springframework.stereotype.Service;

import com.art.app.common.component.BasicInfo;
import com.art.app.kra.domain.WSRequestVO;
import com.art.app.kra.service.AbstractDashboardService;
import com.art.app.kra.service.DashboardService;
import com.art.fw.domain.JSONObj;


@Service("dashboardService")
public class DashboardServiceImpl extends AbstractDashboardService implements
		DashboardService {

	@Override
	public JSONObj getMainData(WSRequestVO reqVO) throws Exception 
	{
		StringBuffer urlSb = new StringBuffer();
		urlSb.append(BasicInfo.getProperty("PORTAL_ADDR"));//app.properties 정의 : portal addr
		urlSb.append("/").append(BasicInfo.getProperty("PORTAL_API_MAIN"));
		urlSb.append("?").append("mode").append("=").append(reqVO.getMode());
		urlSb.append("&").append("query").append("=").append(reqVO.getQuery());
		urlSb.append("&").append("startDate").append("=").append(reqVO.getStartDate());
		urlSb.append("&").append("endDate").append("=").append(reqVO.getEndDate());
		urlSb.append("&").append("startCount").append("=").append(reqVO.getStartCount());
		urlSb.append("&").append("pageCount").append("=").append(reqVO.getPageCount());
		urlSb.append("&").append("seedId").append("=").append(reqVO.getSeedId());
		urlSb.append("&").append("themeGubun").append("=").append(reqVO.getThemeGubun());
		urlSb.append("&").append("topicCount").append("=").append(reqVO.getTopicCount());
		
		return super.executeCallWS(urlSb.toString());
	}
	
	
	
	@Override
	public JSONObj getStatisticData(WSRequestVO reqVO) throws Exception 
	{
		StringBuffer urlSb = new StringBuffer();
		urlSb.append(BasicInfo.getProperty("PORTAL_ADDR"));//app.properties 정의 : portal addr
		urlSb.append("/").append(BasicInfo.getProperty("PORTAL_API_STATISTIC"));
		urlSb.append("?").append("mode").append("=").append(reqVO.getMode());
		urlSb.append("&").append("query").append("=").append(reqVO.getQuery());
		urlSb.append("&").append("startDate").append("=").append(reqVO.getStartDate());
		urlSb.append("&").append("endDate").append("=").append(reqVO.getEndDate());
		urlSb.append("&").append("startCount").append("=").append(reqVO.getStartCount());
		urlSb.append("&").append("pageCount").append("=").append(reqVO.getPageCount());
		urlSb.append("&").append("seedId").append("=").append(reqVO.getSeedId());
		urlSb.append("&").append("themeGubun").append("=").append(reqVO.getThemeGubun());
		urlSb.append("&").append("topicCount").append("=").append(reqVO.getTopicCount());
		
		return super.executeCallWS(urlSb.toString());
	}
	
}
