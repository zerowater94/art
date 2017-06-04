package com.art.app.base.org.service;

import java.util.List;

import com.art.app.base.org.domain.DeptUserVO;
import com.art.app.base.org.domain.MembersVO;
import com.art.app.common.basic.service.CommonService;

public interface DeptUserService extends CommonService<DeptUserVO>
{
	public List<MembersVO> getDeptUserList(MembersVO param) throws Exception;
}
