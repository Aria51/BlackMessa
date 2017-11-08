/*
Методы и события формы отображения списка Моков
*/


$(function(){
	//Событие для срабатывания кнопки сохранить значение выбора
    $('#userBody').delegate('.button_u','click',function(e){
        var tt=$('select#'+this.id+ ' option:selected').text();
        var loc_id=this.id;
        var resp = $.get(connectionString+'/BlackMessa/setMockActionResponce', {mockAction: loc_id, mockResponceFile: tt});
        resp.done(function (data) {
            notificationSuccess('Изменения сохранены');           
        });
        resp.fail(function (data) {            
            if(data.status!='500'){
                notificationSuccess('Изменения сохранены');                
            }else{
                notificationDanger('Ошибка подключения: '+data.status);
            }            
        });
    });

    //Событие для открытия окна редактирования мока
    $('table').delegate('a','click',function(e){
        console.log(this.id);        
        $('#sName').text(this.id);        
        setMockActionToEdit(this.id);
        $('div[id^=div]').hide();
        $('#div4').show();
        
        //getProjectsList();
        ////getProjectsList();
        //getMocActionsResponceList('FNS');
    });

    $('table').delegate('.checkboxx','change',function(e){
        console.log($(this).val());
        if(this.checked) // if changed state is "CHECKED"
        {
            //При установке выделения
            console.log(this.checked);
        }
        else
        {
            //При снятии выделения
            console.log(this.checked);
        }

    });
});


function getMocActionsList(){
    $('#userHead').empty();
    $('#userBody').empty();
    //$('#userHead').append('<tr><th>Название сервиса</th><th>Описание</th><th>Папка</th><th>Файл ответа</th><th>Код</th><th>Авто/Ручной</th><th>Применить</th><tr>');
    $('#userHead').append('<tr><th>Название сервиса</th><th>Описание</th><th>Файл ответа</th><th>Код</th><th>Авто/Ручной</th><th>Применить</th><tr>');
    $.getJSON(connectionString+'/BlackMessa/getProjectsList', function(dataProject) {
        for (var j = 0; j < dataProject.mockProjectsList.length; j++) {
                //dataProject.mockProjectsList[i].actionResponceFolder
                $('#userBody').append('<tr class="users_row info" align="center" id="'+dataProject.mockProjectsList[j].actionResponceFolder+'"><td colspan="6">'+dataProject.mockProjectsList[j].actionResponceFolder+'</td></tr>');
                var test_str = dataProject.mockProjectsList[j].actionResponceFolder;
                setTableValue(test_str,'tr#'+test_str);
            };            
        });    
};

function setTableValueToProject(projectName, source) {
    $.getJSON(connectionString+'/BlackMessa/getMocActionsListToProject',{param1: projectName}, function(data) {
        for(var i=0;i<data.mockActionList.length;i++){                
            $(source).after('<tr class="users_row"><td><a id='+data.mockActionList[i].actionName+'>' + data.mockActionList[i].actionName +'</a>'+
             '</td><td class="col-md-2">' + data.mockActionList[i].actionDescription +
                                   //'</td><td>'+ data.mockActionList[i].actionResponceFolder +
                                   '</td><td>'+'<select class="form-control" id="'+data.mockActionList[i].actionName+'"></select>' +
                                   //+ data.mockActionList[i].actionFileAnsfer + 
                                   '</td><td>'+ data.mockActionList[i].actionStatusCode +
                                   '</td><td><input type="checkbox" class=checkboxx value='+data.mockActionList[i].actionName +' '+ mockIsAutomatic(data.mockActionList[i].actionAutomatic) + ' disabled/>'+
                                   '</td><td>' + '<button class="button_u btn" id="' + data.mockActionList[i].actionName +'">Применить</button>'+
                                   '</td><tr>');
            getMocActionsResponceList(
               data.mockActionList[i].actionResponceFolder,
               'select#'+data.mockActionList[i].actionName,
               data.mockActionList[i].actionFileAnsfer);

            if(data.mockActionList[i].actionFileAnsfer==''){
                $('select#'+data.mockActionList[i].actionName).append('<option value="" selected>Не выбран</option>');
            };       
                //if(data.mockActionList[i].actionAutomatic==null){console.log('1')}
                //console.log(data.mockActionList[i].actionAutomatic);
            }
        });
    // body...
};

function setTableValue(projectName, source) {
    $.getJSON(connectionString+'/BlackMessa/getMocActionsList', function(data) {
        for(var i=0;i<data.mockActionList.length;i++){
            if(projectName==data.mockActionList[i].actionResponceFolder){
                $(source).after('<tr class="users_row"><td><a id='+data.mockActionList[i].actionName+'>' + data.mockActionList[i].actionName +'</a>'+
                 '</td><td class="col-md-2">' + data.mockActionList[i].actionDescription +
                                   //'</td><td>'+ data.mockActionList[i].actionResponceFolder +
                                   '</td><td>'+'<select class="form-control" id="'+data.mockActionList[i].actionName+'"></select>' +
                                   //+ data.mockActionList[i].actionFileAnsfer + 
                                   '</td><td>'+ data.mockActionList[i].actionStatusCode +
                                   '</td><td><input type="checkbox" class=checkboxx value='+data.mockActionList[i].actionName +' '+ mockIsAutomatic(data.mockActionList[i].actionAutomatic) + ' disabled/>'+
                                   '</td><td>' + '<button class="button_u btn btn-info" id="' + data.mockActionList[i].actionName +'">Применить</button>'+
                                   '</td><tr>');
                getMocActionsResponceList(data.mockActionList[i].actionResponceFolder,'select#'+data.mockActionList[i].actionName,data.mockActionList[i].actionFileAnsfer);
                if(data.mockActionList[i].actionFileAnsfer==''){
                    $('select#'+data.mockActionList[i].actionName).append('<option value="" selected>Не выбран</option>');

                };
                
            };

                //if(data.mockActionList[i].actionAutomatic==null){console.log('1')}
                //console.log(data.mockActionList[i].actionAutomatic);
            }
        });
    // body...
};










function getMocActionsResponceList(progectName,source,selected_item) {
    $(source).empty();
    $.getJSON(connectionString + '/BlackMessa/getMocActionsResponceList', {param1: progectName}, function(data) {
        for (var i = 0; i < data.responceFiles.length; i++) {
            $(source).append('<option value="'+data.responceFiles[i].file+'" '+checked_select(data.responceFiles[i].file,selected_item) +'>'+data.responceFiles[i].file+'</option>');                
        };
    });
}

function checked_select(argument,argument2) {
    if(argument==argument2) return 'selected';
}

function mockIsAutomatic(p_actionAutomatic){
    //console.log(p_actionAutomatic=='Y');
    if(p_actionAutomatic=='Y'){return 'checked'}
};