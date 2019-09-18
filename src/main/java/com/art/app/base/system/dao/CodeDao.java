package com.art.app.base.system.dao;

import com.art.app.base.system.domain.CodeVO;
import com.art.app.common.basic.dao.CommonDao;

public interface CodeDao extends CommonDao<CodeVO>
{	
	public CodeVO selectMaxOrder(CodeVO param) throws Exception;
	
	public CodeVO selectCodeGroupCount(CodeVO param) throws Exception;
	
	public int updateOrder(CodeVO param) throws Exception;
	
	public int updateOrderGap(CodeVO param) throws Exception;
	
	public int deleteGroup(CodeVO param) throws Exception;
}
