package com.art.app.kra.ctl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.app.kra.domain.WSRequestVO;
import com.art.app.kra.service.DashboardService;
import com.art.fw.domain.JSONObj;


@RestController
@RequestMapping("/main/dashboard")
public class DashboardCtl extends AbstractCtl
{
	@Autowired
	private DashboardService service;
	
	/**
	 * Main Dashboard 데이터 조회
	 * @param paramVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/get/main", method = RequestMethod.GET)
	public String getDashMainData( WSRequestVO paramVO )throws Exception
	{
		super.logger.info("### called getDashMainData - mode ["+paramVO.getMode()+", startDate["+paramVO.getStartDate()+"]");
		super.logger.info("### called getDashMainData - mode ["+paramVO.getMode()+", endDate["+paramVO.getEndDate()+"]");
		super.logger.info("### called getDashMainData - mode ["+paramVO.getMode()+", seedId["+paramVO.getSeedId()+"]");
		JSONObj rtnObj = null;
		try
		{
			rtnObj = this.service.getMainData(paramVO);
		}catch(Exception ex )
		{
			ex.printStackTrace();
			super.logger.error(ex.getMessage());
			throw ex;
		}
		return rtnObj.toString();
	}
	
	/**
	 * 문서 통계 데이터 조회
	 * @param paramVO
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/get/statistic", method = RequestMethod.GET)
	public String getDashStatisticData( WSRequestVO paramVO )throws Exception
	{
		super.logger.info("### called getDashStatisticData - mode ["+paramVO.getMode()+", startDate["+paramVO.getStartDate()+"]");
		JSONObj rtnObj = null;
		try
		{
			rtnObj = this.service.getStatisticData(paramVO);
		}catch(Exception ex )
		{
			ex.printStackTrace();
			super.logger.error(ex.getMessage());
			throw ex;
		}
		return rtnObj.toString();
	}
}
