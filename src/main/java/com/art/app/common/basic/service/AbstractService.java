package com.art.app.common.basic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.art.fw.domain.ResultVO;

public abstract class AbstractService 
{
	protected Logger logger = LoggerFactory.getLogger(this.getClass()) ;
	
	@Autowired
	@Qualifier("txManager-basic")
	protected PlatformTransactionManager  txManager;
	
	protected TransactionStatus tx = null;
	
	protected TransactionStatus startTransaction()
	{
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		return txManager.getTransaction(def);
	}
	
	protected void commit(TransactionStatus txStatus)
	{
		txManager.commit(txStatus);
	}
	
	protected void rollback(TransactionStatus txStatus)
	{
		txManager.rollback(txStatus);
	}
}
