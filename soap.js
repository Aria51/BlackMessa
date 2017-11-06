//Обработка событий checkboxx
$(function(){
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
    $('#sendEditForm').submit(function (event) {        
        //console.log(JSON.stringify(objectifyForm($('#sendEditForm').serializeArray())));
        event.preventDefault();        
        $.post('http://localhost:8089/BlackMessa/setMockAction',JSON.stringify(objectifyForm($('#sendEditForm').serializeArray())));    
    });
});

//Событие для срабатывания кнопки обновить
$(function(){
    $('table').delegate('.button_u','click',function(e){
        console.log(this.id);
    });
});
$(function(){
    $('table').delegate('a','click',function(e){
        console.log(this.id);        
        $('#sName').text(this.id);
        //getProjectsList();
        //getMocActionsResponceList('FNS');
        setMockActionToEdit(this.id);
        $('div[id^=div]').hide();
        //getProjectsList();
        $('#div4').show();
        


    });
});

$(function(){
    $("#btn1").click(function(){ 
        $(this).css('background-color', 'red');
        $('#tes').val('test');
    });
});

// Загрузка данных о методах эмулятора со всеми характеристиками

function getMocActionsList(){
    $('#userHead').empty();
    $('#userBody').empty();
    $('#userHead').append('<tr><th>Название сервиса</th><th>Описание</th><th>Папка</th><th>Файл ответа</th><th>Код</th><th>Авто/Ручной</th><th>Применить</th><tr>');
    $.getJSON('http://localhost:8089/BlackMessa/getMocActionsList', function(data) {
            for(var i=0;i<data.mockActionList.length;i++){
                $('#userBody').append('<tr class="users_row"><td><a id='+data.mockActionList[i].actionName+'>' + data.mockActionList[i].actionName +'</a>'+
                                   '</td><td>' + data.mockActionList[i].actionDescription +
                                   '</td><td>'+ data.mockActionList[i].actionResponceFolder +
                                   '</td><td>'+ data.mockActionList[i].actionFileAnsfer +
                                   '</td><td>'+ data.mockActionList[i].actionStatusCode +
                                   '</td><td><input type="checkbox" class=checkboxx value='+data.mockActionList[i].actionName +' '+ test(data.mockActionList[i].actionAutomatic) + ' disabled/>'+
                                   '</td><td>' + '<button class="button_u" id="' + data.mockActionList[i].actionName +'">U</button>'+
                                   '</td><tr>');
                //if(data.mockActionList[i].actionAutomatic==null){console.log('1')}

                //console.log(data.mockActionList[i].actionAutomatic);
            }
    });

};
/**
 * @return {[type]}
 * Возвращяет сипсок проектов в эмуляторе
 */
function getProjectsList() {
    $.getJSON('http://localhost:8089/BlackMessa/getProjectsList', function(data) {
            $("#select_file").empty();
            for (var i = 0; i < data.mockProjectsList.length; i++) {
                $("#select_file").append('<option value="'+data.mockProjectsList[i].actionResponceFolder+'">'+data.mockProjectsList[i].actionResponceFolder+'</option>');                
            }
    });
}

/**
 * @param  {[type]}
 * @return {[type]}
 */
function getMocActionsResponceList(progectName) {
    $("#select_file2").empty();
    $.getJSON(connectionString+'/BlackMessa/getMocActionsResponceList', {param1: progectName}, function(data) {
            for (var i = 0; i < data.responceFiles.length; i++) {
                $("#select_file2").append('<option value="'+data.responceFiles[i].file+'">'+data.responceFiles[i].file+'</option>');                
            };
    });
}

function getMocActionsResponceList(progectName,source) {
    $(source).empty();
    $.getJSON(connectionString + '/BlackMessa/getMocActionsResponceList', {param1: progectName}, function(data) {
            for (var i = 0; i < data.responceFiles.length; i++) {
                $(source).append('<option value="'+data.responceFiles[i].file+'">'+data.responceFiles[i].file+'</option>');                
            };
    });
}

function getMocActionsResponceList(progectName,source,selected_item) {
    $(source).empty();
    $.getJSON(connectionString + '/BlackMessa/getMocActionsResponceList', {param1: progectName}, function(data) {
            for (var i = 0; i < data.responceFiles.length; i++) {
                $(source).append('<option value="'+data.responceFiles[i].file+'" '+checked_select(data.responceFiles[i].file,selected_item) +'>'+data.responceFiles[i].file+'</option>');                
            };
    });
}


/* TODO: Доделать */
function getMockAction(l_actionName) {
    console.log('getMockAction = '+ l_actionName);
    
    return $.getJSON(connectionString + '/BlackMessa/getMockAction', {actionName: l_actionName}, function(data) {
        tt = data.mockAction;
    });
    
}


function setMockActionToEdit(l_actionName) {
    //$(to_source).empty();
    console.log(checked_select(l_actionName,l_actionName));
    var gActions;
    getMockAction(l_actionName).done(function (dd) {
        console.log(dd.mockAction.actionName);
        gActions=dd.mockAction;
        $('#a_name').val(gActions.actionName);
        $('#a_description').val(gActions.actionDescription);
        $('#a_statusCode').val(gActions.actionStatusCode);
        $('#a_respFolder').val(gActions.actionResponceFolder);
        $('#a_auto').val(gActions.actionAutomatic);
        getMocActionsResponceList(gActions.actionResponceFolder,'#actionFileAnsfer',gActions.actionFileAnsfer);
    });    
    
    
    // body...
}

function checked_select(argument,argument2) {
    if(argument==argument2) return 'selected';
}





function test(p_actionAutomatic){
    console.log(p_actionAutomatic=='Y');
    if(p_actionAutomatic=='Y'){return 'checked'}
};


$(function() {
    $('#showdiv1').click(function() {
        $('div[id^=div]').hide();
        $('#div1').show();
        getMocActionsList();
    });
    $('#showdiv2').click(function() {
        $('div[id^=div]').hide();
        $('#div2').show();
    });
 
    $('#showdiv3').click(function() {
        $('div[id^=div]').hide();
        $('#div3').show();
    });
 
    $('#showdiv4').click(function() {
        $('div[id^=div]').hide();
        //getMocActionsResponceList('FNS','#actionFileAnsfer');
        $('#div4').show();
    });
    $('#div1').show(function(){
       getMocActionsList(); 
    }) 
})



