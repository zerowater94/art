package com.art.app.base.system.service;

import java.util.List;

import com.art.app.base.system.domain.DeptUserVO;
import com.art.app.common.basic.service.CommonService;

public interface DeptUserService extends CommonService<DeptUserVO>
{
	public List<DeptUserVO> getDeptUserList(DeptUserVO param) throws Exception;
}
