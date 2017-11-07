//BlackMessa/getFileResponce
import org.ini4j.Ini;
import com.eviware.soapui.support.GroovyUtils;

// Создаем экземпляр класса GroovyUtils
def groovyUtils = new GroovyUtils(context);
// Получаем путь до директории с проектом
def projectDir = groovyUtils.projectPath;
// Загружаем конфигурационный файл
def conf = new Ini(new File(projectDir, "/settings.conf"));

def queryString = mockRequest.getHttpRequest().getQueryString();
def queryParams = queryString.split('&');
def mapParams = queryParams.collectEntries { param -> param.split('=').collect { it }};

def responseFile = mapParams['responseFile'];
def projectFolder = conf.get(mapParams['responceFolder'], "responce_folder");
def payload = "";
if (responseFile) {
	payload = new File(projectDir, "/responses/${projectFolder}/${responseFile}").getText();
}

def httpResponse = mockRequest.httpResponse;
mockResponse.setResponseContent(payload);