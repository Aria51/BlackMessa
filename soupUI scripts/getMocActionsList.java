//BlackMessa/getMocActionsList

import org.ini4j.Ini;
import org.ini4j.Profile.Section;
import com.eviware.soapui.support.GroovyUtils;
import groovy.json.JsonBuilder
//------------------------------------------------------------------------------
class Mocks {
    String actionName;
    String actionDescription;
    String actionFileAnsfer;
    String actionStatusCode;
    String actionAutomatic;
    String actionResponceFolder;
}
class Mockk{
	Mocks[] mockActionList
}
//------------------------------------------------------------------------------

def myList2=[];
// Создаем экземпляр класса GroovyUtils
def groovyUtils = new GroovyUtils(context);
// Получаем путь до директории с проектом
def projectDir = groovyUtils.projectPath;
// Загружаем конфигурационный файл
//def conf = new Ini(new File(projectDir, "/settings.conf"));
Ini ini = new Ini(new File(projectDir, "/settings.conf"));
        //log.info("Number of sections: "+ini.size()+"\n");
        for (String sectionName: ini.keySet()) {
   //         log.info("["+sectionName+"]");
   if(sectionName!='Main'){
            myList2 << new Mocks(
            	actionName:sectionName,
            	actionDescription:ini.get(sectionName, "description"),
            	actionFileAnsfer:ini.get(sectionName, "response"),
            	actionStatusCode:ini.get(sectionName, "status_code"),
            	actionAutomatic:ini.get(sectionName, "automatic"),
            	actionResponceFolder:ini.get(sectionName, "responce_folder")
            	);}
        }
def tt = new Mockk(mockActionList:myList2);
def json2 = new JsonBuilder(tt)

def httpResponse = mockRequest.httpResponse;
mockResponse.setResponseHttpStatus(Integer.valueOf(200));
mockResponse.setResponseContent(json2.toString());

//log.info(json2.toString())
       