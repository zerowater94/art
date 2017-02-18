package com.art.app.base.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.system.dao.CompDao;
import com.art.app.base.system.domain.CompVO;
import com.art.app.base.system.service.CompService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class CompServiceImpl extends AbstractService implements CompService
{
	@Autowired
	private CompDao dao ;

	@Override
	public List<CompVO> getList(CompVO param) throws Exception {
		return dao.selectList(param);
	}

	@Override
	public CompVO getData(CompVO param) throws Exception {
		return dao.selectData(param);
	}

	@Override
	public ResultVO insert(CompVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		param.setCompId(CommonUtil.getGuid());
		rstVO.setExecCnt(dao.insert(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}

	@Override
	public ResultVO update(CompVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.update(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
	
	@Override
	public ResultVO updateOrder(List<CompVO> param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		int execCnt = 0 ;
		for( CompVO vo : param) 
		{
			execCnt += dao.updateOrder(vo);
		}
		if ( execCnt == param.size() )
			rstVO.setResult(true);
		rstVO.setExecCnt(execCnt);
		return rstVO;
	}

	@Override
	public ResultVO delete(CompVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.delete(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}


}
