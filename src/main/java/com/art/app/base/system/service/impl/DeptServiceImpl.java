package com.art.app.base.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.system.dao.DeptDao;
import com.art.app.base.system.domain.DeptVO;
import com.art.app.base.system.service.DeptService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;
import com.art.fw.util.CommonUtil;

@Service
public class DeptServiceImpl extends AbstractService implements DeptService
{
	@Autowired
	private DeptDao dao ;

	@Override
	public List<DeptVO> getList(DeptVO param) throws Exception {
		return dao.selectList(param);
	}

	@Override
	public DeptVO getData(DeptVO param) throws Exception {
		return dao.selectData(param);
	}

	@Override
	public ResultVO insert(DeptVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		param.setDeptId(CommonUtil.getGuid());
		param.setDeptOrd(dao.selectMaxOrder(param).getDeptOrd()+1);
		rstVO.setExecCnt(dao.insert(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}

	@Override
	public ResultVO update(DeptVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.update(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
	
	@Override
	public ResultVO updateOrder(List<DeptVO> param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		int execCnt = 0 ;
		for( DeptVO vo : param) 
		{
			execCnt += dao.updateOrder(vo);
		}
		if ( execCnt == param.size() )
			rstVO.setResult(true);
		rstVO.setExecCnt(execCnt);
		return rstVO;
	}

	@Override
	public ResultVO delete(DeptVO param) throws Exception {
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.delete(param));
		if( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}


}
