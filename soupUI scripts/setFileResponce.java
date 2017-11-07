//BlackMessa/setFileResponce
//
import org.ini4j.Ini;
import org.ini4j.Profile.Section;
import com.eviware.soapui.support.GroovyUtils;
import groovy.json.JsonSlurper
import java.io.*;
log.info('----------------------------------------request');
log.info(mockRequest.requestContent);
//grab the response
def ResponseMessage = mockRequest.requestContent;
//define a JsonSlurper
def jsonSlurper = new JsonSlurper().parseText(ResponseMessage);
// Создаем экземпляр класса GroovyUtils
def groovyUtils = new GroovyUtils(context);
// Получаем путь до директории с проектом
def projectDir = groovyUtils.projectPath;
// Загружаем конфигурационный файл
//def conf = new Ini(new File(projectDir, "/settings.conf"));
Ini ini = new Ini(new File(projectDir, "/settings.conf"));
def folderProject = ini.get(jsonSlurper.f_progectName, "responce_folder");
def firstFileName = ini.get(jsonSlurper.f_progectName, "response");
def filePath=projectDir+"/responses/"+folderProject+"/"+jsonSlurper.f_fileName;
def file_create=false;

if(firstFileName!=jsonSlurper.f_fileName){
	file_create=false;	
};

try
{
	FileWriter writer = new FileWriter(filePath, file_create);
	log.info('dd');
	writer.write(jsonSlurper.textResponce);
	writer.flush();
	writer.close();	
}
catch(IOException ex){
	log.info(ex.getMessage());
}
