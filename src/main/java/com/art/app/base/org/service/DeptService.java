package com.art.app.base.org.service;

import java.util.List;

import com.art.app.base.org.domain.DeptVO;
import com.art.app.common.basic.service.CommonService;
import com.art.fw.domain.ResultVO;

public interface DeptService extends CommonService<DeptVO>
{
	public ResultVO updateOrder(List<DeptVO> param) throws Exception;
}
