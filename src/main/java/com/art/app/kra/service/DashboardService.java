package com.art.app.kra.service;

import com.art.app.kra.domain.WSRequestVO;
import com.art.fw.domain.JSONObj;

public interface DashboardService 
{
	public JSONObj getMainData(WSRequestVO reqVO) throws Exception;
	
	public JSONObj getStatisticData(WSRequestVO reqVO) throws Exception;

}
