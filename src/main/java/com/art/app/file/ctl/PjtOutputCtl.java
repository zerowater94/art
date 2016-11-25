package com.art.app.file.ctl;

import java.io.File;
import java.io.FileInputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.art.app.common.basic.ctl.AbstractCtl;
import com.art.app.file.service.PjtOutputService;
import com.art.fw.annota.NoReferer;
import com.art.fw.annota.NoSession;


@RestController
@RequestMapping("/common/file")
public class PjtOutputCtl extends AbstractCtl
{
	@Autowired
	private PjtOutputService service ;
	
	/**
	 * 파일을 다운로드 한다.
	 * @param delFileList
	 * @return{fileName:.+}
	 */
	@NoSession
	@NoReferer
	@RequestMapping(value = "/filelist", method = RequestMethod.GET)
    public void getFileList( HttpServletResponse response, HttpServletRequest request
    		,  @RequestParam(value = "dirUrl") String dirUrl
    		,  @RequestParam(value = "fileName") String fileName ) //   throws Exception
	{
		super.logger.debug("getFileList called..."+ dirUrl +" , "+ fileName);
		File excelFile = null;
		try
		{
			
			
			
			excelFile = service.getExcelFileList(dirUrl);
			
			response.setContentType("application/octet-stream;charset=UTF-8");

			response.setHeader("Content-Disposition", "attachment; filename=\"" + java.net.URLEncoder.encode(fileName, "UTF-8") + "\";");
		
			FileCopyUtils.copy(new FileInputStream(excelFile), response.getOutputStream());
			
			
		}catch ( Exception ex )
		{
			ex.printStackTrace();
			super.logger.error(ex.toString());
			//throw ex;
		}
	}
}
