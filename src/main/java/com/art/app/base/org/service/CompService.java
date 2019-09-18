package com.art.app.base.org.service;

import java.util.List;

import com.art.app.base.org.domain.CompVO;
import com.art.app.common.basic.service.CommonService;
import com.art.fw.domain.ResultVO;

public interface CompService extends CommonService<CompVO>
{
	public ResultVO updateOrder(List<CompVO> param) throws Exception;
}
