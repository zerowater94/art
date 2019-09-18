package com.art.app.base.org.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.org.dao.DeptDao;
import com.art.app.base.org.dao.DeptUserDao;
import com.art.app.base.org.domain.DeptVO;
import com.art.app.base.org.domain.MembersVO;
import com.art.app.base.org.service.DeptService;
import com.art.app.common.basic.service.AbstractService;
import com.art.fw.domain.ResultVO;
import com.art.fw.resource.BasicResultCode;
import com.art.fw.util.CommonUtil;

@Service
public class DeptServiceImpl extends AbstractService<DeptVO> implements DeptService
{
	@Autowired
	private DeptDao dao ;
	
	@Autowired
	private DeptUserDao memberDao;

	@Override
	public List<DeptVO> getList(DeptVO param) throws Exception 
	{
		return dao.selectList(param);
	}

	@Override
	public DeptVO getData(DeptVO param) throws Exception 
	{
		return dao.selectData(param);
	}

	@Override
	public ResultVO insert(DeptVO param) throws Exception 
	{
		param.setDeptId(CommonUtil.getGuid());
		param.setDeptOrd(dao.selectMaxOrder(param).getDeptOrd()+1);
		return ResultVO.getExecResultVO(dao.insert(param));
	}

	@Override
	public ResultVO update(DeptVO param) throws Exception 
	{
		return ResultVO.getExecResultVO(dao.update(param));
	}
	
	@Override
	public ResultVO updateOrder(List<DeptVO> param) throws Exception
	{
		int execCnt = 0 ;
		for( DeptVO vo : param) 
		{
			execCnt += dao.updateOrder(vo);
		}
		
		return ResultVO.getExecResultVO(execCnt, param.size());
	}

	@Override
	public ResultVO delete(DeptVO param) throws Exception 
	{
		
		param.setSearchDeptList(getSubDeptList(param));
		List<MembersVO> existMembers = memberDao.selectMultiDeptMemberList(param);
		if (existMembers.size() > 0 )
			return ResultVO.getErrorResultVO(BasicResultCode.EXIST_BELONG_DATA);
		
		return ResultVO.getExecResultVO(dao.deleteMulti(param));
	}
	
	
	private List<DeptVO> getSubDeptList(DeptVO param) throws Exception 
	{
		List<DeptVO> subDeptList = new ArrayList<DeptVO>();
		List<DeptVO> toSearchDeptList = new ArrayList<DeptVO>();
		List<DeptVO> searchList = null;
		subDeptList.add(param);
		toSearchDeptList.add(param);
		while (toSearchDeptList.size() > 0 )
		{
			searchList = dao.selectSubDeptList(toSearchDeptList.get(0));
			toSearchDeptList.remove(0);
			toSearchDeptList.addAll(searchList);
			subDeptList.addAll(searchList);
		}
		return subDeptList;
	}

}
