//BlackMessa/setMockAction

import org.ini4j.Ini;
import org.ini4j.Profile.Section;
import com.eviware.soapui.support.GroovyUtils;
import groovy.json.JsonSlurper
log.info('----------------------------------------request');
log.info(mockRequest.requestContent);
//grab the response
def ResponseMessage = mockRequest.requestContent;
//define a JsonSlurper
def jsonSlurper = new JsonSlurper().parseText(ResponseMessage);
log.info('-------------------------------------------------');
log.info(jsonSlurper.id);
log.info(jsonSlurper.tags);
log.info('-------------------------------------------------');
// Создаем экземпляр класса GroovyUtils
def groovyUtils = new GroovyUtils(context);
// Получаем путь до директории с проектом
def projectDir = groovyUtils.projectPath;
// Загружаем конфигурационный файл
//def conf = new Ini(new File(projectDir, "/settings.conf"));
Ini ini = new Ini(new File(projectDir, "/settings.conf"));
        ini.put(jsonSlurper.actionName, "description", jsonSlurper.actionDescription);
        ini.put(jsonSlurper.actionName, "response", jsonSlurper.actionFileAnsfer);
        ini.put(jsonSlurper.actionName, "status_code", jsonSlurper.actionStatusCode);
        ini.put(jsonSlurper.actionName, "automatic", jsonSlurper.actionAutomatic);
        ini.put(jsonSlurper.actionName, "responce_folder", jsonSlurper.actionResponceFolder);
        ini.store();