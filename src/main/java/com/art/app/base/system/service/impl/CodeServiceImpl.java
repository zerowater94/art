package com.art.app.base.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.system.dao.CodeDao;
import com.art.app.base.system.domain.CodeVO;
import com.art.app.base.system.service.CodeService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class CodeServiceImpl extends AbstractService implements CodeService
{
	@Autowired
	private CodeDao dao;
	
	public List<CodeVO> getList(CodeVO param) throws Exception
	{
		return dao.selectList(param);
	}
	
	public ResultVO insert(CodeVO param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		param.setCodeId(CommonUtil.getGuid());
		rstVO.setExecCnt(dao.insert(param));
		if ( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
	
	public ResultVO update(CodeVO param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.update(param));
		if ( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
	
	public ResultVO delete(CodeVO param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.delete(param));
		if ( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}

}
