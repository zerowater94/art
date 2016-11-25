package com.art.fw.security;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.RandomStringUtils;

/**
 * 
 *    
 * @author zerowater
 *
 */
public class EncryptUtil 
{
    private static final String ALGORITHM_AES = "AES";
    private static final String TRANSFORM_KEY = "AES/CBC/PKCS5Padding";
    

    /***********************************************************************************************************************
     * 
     * AES 암복호화 
     * 
     ***********************************************************************************************************************/
    /**
     * 암호화를 위한 Key를 생성 해서 base64로 encoding 해서 리턴한다.
     * @param length
     * @return
     * @throws Exception
     */
    public static String getAESSecureKey(int length) throws Exception
    {
    	return new String( Base64.encodeBase64( RandomStringUtils.randomAlphanumeric(length).getBytes() )) ;
    }
    
    /**
     * base64로 encoding된 key를 복호화 한다.
     * @param secureKey
     * @return
     * @throws Exception
     */
    public static String getAESSecureDecodeKey(String secureKey) throws Exception
    {
    	return new String( Base64.decodeBase64( secureKey.getBytes() )) ;
    }
    
    /**
     * Source data를 암호화 한다. ( parameter key 활용 )
     * @param sourceData
     * @param encodeKey
     * @return
     * @throws Exception
     */
    public static String getAESEncodeData(String sourceData, byte[] encodeKey , byte[] ivParameter) throws Exception
    {
    	SecretKey secureKey = null;
    	Cipher cipher = null;
    	byte[] encrypted = null;
    	try
    	{
    		secureKey = new SecretKeySpec(encodeKey, EncryptUtil.ALGORITHM_AES);
            cipher = Cipher.getInstance(EncryptUtil.TRANSFORM_KEY);

            cipher.init(Cipher.ENCRYPT_MODE, secureKey, new IvParameterSpec(ivParameter));
            encrypted = cipher.doFinal(sourceData.getBytes("UTF-8"));
            return new String(Base64.encodeBase64(encrypted));
    	}catch ( Exception ex )
    	{
    		throw ex;
    	}
    }
    
    /**
     * 암호화된 데이터를 복호화 한다 
     * @param sourceData : 암호화된 데이터
     * @param encodeKey  : 복호화 KEY
     * @param ivParameter : IV 파라미터
     * @return
     * @throws Exception
     */
    public static String getAESDecodeData(String sourceData, byte[] encodeKey , byte[] ivParameter ) throws Exception 
    {
    	SecretKey secureKey = null;
    	Cipher cipher = null;
    	byte[] encrypted = null;
    	
    	try
    	{
    		secureKey = new SecretKeySpec(encodeKey, EncryptUtil.ALGORITHM_AES);
    		cipher = Cipher.getInstance(EncryptUtil.TRANSFORM_KEY);
    		cipher.init(Cipher.DECRYPT_MODE, secureKey, new IvParameterSpec(ivParameter));
    		encrypted = Base64.decodeBase64(sourceData.getBytes());
    		return new String(cipher.doFinal(encrypted),"UTF-8");
    		
    	}catch ( Exception ex )
    	{
    		throw ex;
    	}
    }
    
    
    public static void main(String[] args)
    {
    	try
    	{
    		
//    		String encKey = EncryptUtil.getAESSecureDecodeKey(EncryptUtil.getAESSecureKey(50));
//    		System.out.println(encKey);
    		System.out.println(EncryptUtil.getAESSecureDecodeKey("ZU9ZT0d6bWx0d3FxWkp6UDllMG5lNDNobVE1dkx0QnlCY2dQaXZ1TGZqRVdYUUZNVXQ"));
    		System.out.println("ZU9ZT0d6bWx0d3FxWkp6UDllMG5lNDNobVE1dkx0QnlCY2dQaXZ1TGZqRVdYUUZNVXQ");
    		String encKey = EncryptUtil.getAESSecureDecodeKey("ZU9ZT0d6bWx0d3FxWkp6UDllMG5lNDNobVE1dkx0QnlCY2dQaXZ1TGZqRVdYUUZNVXQ");
    		byte[] key = encKey.substring(16,32).getBytes();
    		byte[] iv =  encKey.substring(12,28).getBytes();
    		
    		System.out.println(EncryptUtil.getAESEncodeData("{\"loginId\":\"admin\",\"password\":\"uni@2016!\"}", key, iv));
    		
    		System.out.println(EncryptUtil.getAESDecodeData("w4UIdOYP0HcNrweDi219RFPzlSPnIKTTVPeKmGyLE6TccrIF7Yi2Iov2qbWqX9hI", key, iv));
    	}catch ( Exception ex )
    	{
    		ex.printStackTrace();
    	}
    }
    
}
