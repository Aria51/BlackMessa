//BlackMessa/getProjectsList
import org.ini4j.Ini;
import org.ini4j.Profile.Section;
import com.eviware.soapui.support.GroovyUtils;
import groovy.json.JsonBuilder
//------------------------------------------------------------------------------
class Mocks {    
    String actionResponceFolder;
}
class Mockk{
	Mocks[] mockProjectsList
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
            	actionResponceFolder:ini.get(sectionName, "responce_folder")
            	);}
        }
log.info(myList2);

def tt_before = myList2.unique{test2 -> test2.actionResponceFolder};
log.info(tt_before);
def tt = new Mockk(mockProjectsList:tt_before);
def json2 = new JsonBuilder(tt)

def httpResponse = mockRequest.httpResponse;
mockResponse.setResponseHttpStatus(Integer.valueOf(200));
mockResponse.setResponseContent(json2.toString());

//log.info(json2.toString())
       