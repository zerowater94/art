package com.art.app.base.system.service;

import java.util.List;

import com.art.app.base.system.domain.DeptVO;
import com.art.app.common.basic.service.CommonService;
import com.art.fw.domain.ResultVO;

public interface DeptService extends CommonService<DeptVO>
{
	public ResultVO updateOrder(List<DeptVO> param) throws Exception;
}
