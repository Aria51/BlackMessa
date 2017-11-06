//BlackMessa/getMocActionsResponceList

import org.ini4j.Ini;
import java.io.File;
import com.eviware.soapui.support.GroovyUtils;
import groovy.json.JsonBuilder;

class ResponceFile{
    String file;
}
class ResponceFileList{
    ResponceFile[] ResponceFiles;
}

def tempList=[];
def queryString = mockRequest.getHttpRequest().getQueryString();
def queryParams = queryString.split('=');
def groovyUtils = new GroovyUtils(context);
def projectDir = groovyUtils.projectPath;
log.info(queryParams[1]);
//log_info(mapParams["proj"]);
def folderRequest = projectDir + "/responses/"+queryParams[1]+"/";

new File(folderRequest).eachFile() {  
         file_searce->tempList<<new ResponceFile(file:file_searce.getName())};

def tt = new ResponceFileList(ResponceFiles:tempList);
def json2 = new JsonBuilder(tt);
// Получаем путь до директории с проектом
def code = 200;

def httpResponse = mockRequest.httpResponse;
mockResponse.setResponseHttpStatus(Integer.valueOf(code));
mockResponse.setResponseContent(json2.toString());         