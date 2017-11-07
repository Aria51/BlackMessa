//BlackMessa/setMockActionResponce

import org.ini4j.Ini;
import org.ini4j.Profile.Section;
import com.eviware.soapui.support.GroovyUtils;
import groovy.json.JsonSlurper

def queryString = mockRequest.getHttpRequest().getQueryString();
def queryParams = queryString.split('&');
def mapParams = queryParams.collectEntries { param -> param.split('=').collect { it }};

// Создаем экземпляр класса GroovyUtils
def groovyUtils = new GroovyUtils(context);
// Получаем путь до директории с проектом
def projectDir = groovyUtils.projectPath;
// Загружаем конфигурационный файл
//def conf = new Ini(new File(projectDir, "/settings.conf"));
Ini ini = new Ini(new File(projectDir, "/settings.conf"));
        ini.put(mapParams['mockAction'], "response", mapParams['mockResponceFile']);        
        ini.store();