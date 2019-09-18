package com.art.app.base.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.app.base.system.dao.CodeDao;
import com.art.app.base.system.domain.CodeVO;
import com.art.app.base.system.service.CodeService;
import com.art.app.common.basic.service.AbstractService;
import com.art.app.common.component.BasicConstants;
import com.art.fw.domain.ResultVO;
import com.art.fw.exception.ArtException;
import com.art.fw.resource.BasicResultCode;
import com.art.fw.util.CommonUtil;

@Service
public class CodeServiceImpl extends AbstractService<CodeVO> implements CodeService
{
	@Autowired
	private CodeDao dao;
	
	public List<CodeVO> getList(CodeVO param) throws Exception
	{
		return dao.selectList(param);
	}
	
	public CodeVO getMaxOrder(CodeVO param) throws Exception
	{
		return dao.selectMaxOrder(param);
	}
	
	public ResultVO insert(CodeVO param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		try
		{
			// 순서 변경
			if( param.getCodeType().equals(BasicConstants.CODE_TYPE.CODE.code)  )
			{
				param.setGap("+1");
				param.setSIndex(param.getCodeOrd());
				dao.updateOrderGap(param);
			}else {
				// 중복 코드그룹이 존재 하는지 체크 
				if( dao.selectCodeGroupCount(param).getCount() > 0 )
				{
					rstVO.setResultCode(BasicResultCode.ALEADY_DATA);
					throw new ArtException(rstVO);
				}
			}
			param.setCodeId(CommonUtil.getGuid());
			rstVO.setExecCnt(dao.insert(param));
			if ( rstVO.getExecCnt() > 0 )
				rstVO.setResult(true);
			
		}catch ( Exception ex )
		{
			throw ex;
		}
		return rstVO;
	}
	
	public ResultVO update(CodeVO param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		CodeVO oldCodeVO = dao.selectData(param);
		if( oldCodeVO.getCodeType().equals(BasicConstants.CODE_TYPE.CODE.code) 
				&& oldCodeVO.getCodeOrd() != param.getCodeOrd() ) 
		{
			if( oldCodeVO.getCodeOrd() > param.getCodeOrd() )
			{
				param.setGap("+1");
				param.setSIndex(param.getCodeOrd());
				param.setEIndex(oldCodeVO.getCodeOrd());
			}else 
			{
				param.setGap("-1");
				param.setSIndex(oldCodeVO.getCodeOrd());
				param.setEIndex(param.getCodeOrd());
			}
			dao.updateOrderGap(param);
		}
		rstVO.setExecCnt(dao.update(param));
		if ( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
	
	public ResultVO updateOrder(List<CodeVO> param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		int execCnt = 0 ;
		for( CodeVO vo : param) 
		{
			execCnt += dao.updateOrder(vo);
		}
		if ( execCnt == param.size() )
			rstVO.setResult(true);
		rstVO.setExecCnt(execCnt);
		return rstVO;
	}
	
	public ResultVO deleteCode(CodeVO param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		CodeVO oldCodeVO = dao.selectData(param);
		param.setGap("-1");
		param.setSIndex(oldCodeVO.getCodeOrd());
		dao.updateOrderGap(param);
		
		rstVO.setExecCnt(dao.delete(param));
		if ( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
	
	public ResultVO deleteGroup(CodeVO param) throws Exception
	{
		ResultVO rstVO = new ResultVO();
		rstVO.setExecCnt(dao.deleteGroup(param));
		if ( rstVO.getExecCnt() > 0 )
			rstVO.setResult(true);
		return rstVO;
	}
	
}
