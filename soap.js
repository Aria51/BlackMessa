//Обработка событий checkboxx
//
//
var glob_test;
$(function(){
    
    $('#sendEditForm').submit(function (event) {        
        //console.log(JSON.stringify(objectifyForm($('#sendEditForm').serializeArray())));
        event.preventDefault();        
        var resp = $.post(connectionString+'/BlackMessa/setMockAction',JSON.stringify(objectifyForm($('#sendEditForm').serializeArray())));    
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
    
    $('#formTextResponce').submit(function(event) {
        event.preventDefault();
        console.log('send');
        /* Act on the event */
        if($("input[name*='f_rewrite']").val()!='E'){
        $("input[name*='f_fileName']").val($("input[name*='f_progectName']").val()+'_'+$("input[name*='f_fileName']").val());
    };
        //console.log(JSON.stringify(objectifyForm($('#formTextResponce').serializeArray())));
        var resp = $.post(connectionString+'/BlackMessa/setFileResponce', JSON.stringify(objectifyForm($('#formTextResponce').serializeArray())));
        resp.done(function (data) {
            notificationSuccess('Изменения сохранены');
            setMockActionToEdit_rewreshFileAnsfer();
            $("#editFileAnsferModal").modal("hide");
        });
        resp.fail(function (data) {            
            if(data.status!='500'){
                notificationSuccess('Изменения сохранены');
                setMockActionToEdit_rewreshFileAnsfer();
                $("#editFileAnsferModal").modal("hide");
            }else{
                notificationDanger('Ошибка подключения: '+data.status);
            }            
        });
    });



//Событие кнопки редактирования файла
    $("button[name*='b_editFile']").click(function(event) {        
        getFileResponceText($('#actionFileAnsfer option:selected').text(),$('#a_name').val(),'E');
        $("#titleModal").text('Редактирование файла : '+$('#actionFileAnsfer option:selected').text());
        $("#editFileAnsferModal").modal({backdrop: "static"});        
    });
//Обновление списка файлов ответов
    $("button[name*='b_refresh']").click(function(event) {
        setMockActionToEdit_rewreshFileAnsfer();
    });
//Событие кнопки создания файла на основе(клонирование)
    $("button[name*='b_createCloneFile']").click(function(event) {        
        getFileResponceText($('#actionFileAnsfer option:selected').text(),$('#a_name').val(),'C');
        $("#titleModal").text('Создание файла на основе: '+$('#actionFileAnsfer option:selected').text());
        $("#editFileAnsferModal").modal({backdrop: "static"});        
    });
//Событие кнопки создания нового файла
    $("button[name*='b_createNewFile']").click(function(event) {        
        getFileResponceText($('#actionFileAnsfer option:selected').text(),$('#a_name').val(),'N');
        $("#titleModal").text('Создание нового файла');
        $("#editFileAnsferModal").modal({backdrop: "static"});        
    });

    $("input[name*='b_backToMockList']").click(function(event) {
        showMockList();  
    });
});





// Загрузка данных о методах эмулятора со всеми характеристиками



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



function setMockActionToEdit_rewreshFileAnsfer() {
    getMocActionsResponceList($('#a_respFolder').val(),'#actionFileAnsfer',$("input[name*='e_selectedFile']").val());   
}


/* TODO: Доделать */
function getMockAction(l_actionName) {
    //console.log('getMockAction = '+ l_actionName);    
    return $.getJSON(connectionString + '/BlackMessa/getMockAction', {actionName: l_actionName}, function(data) {        
    });    
}




function setMockActionToEdit(l_actionName) {        
    var gActions;
    getMockAction(l_actionName).done(function (dd) {
        console.log(dd.mockAction.actionName);
        gActions=dd.mockAction;
        $('#a_name').val(gActions.actionName);
        $('#a_description').val(gActions.actionDescription);
        $('#a_statusCode').val(gActions.actionStatusCode);
        $('#a_respFolder').val(gActions.actionResponceFolder);
        $('#a_auto').val(gActions.actionAutomatic);
        $("input[name*='e_selectedFile']").val(gActions.actionFileAnsfer);
        getMocActionsResponceList(
            gActions.actionResponceFolder,
            '#actionFileAnsfer',
            gActions.actionFileAnsfer);
    });        
}


function getFileResponceText(fileName, folderName, rewrite) {    
    $('#textResponce').val('');
    $("input[name*='f_fileName']").val('');
    $("input[name*='f_progectName']").val(folderName);            
    $("input[name*='f_fileName']").attr('readonly', false);            
    $("input[name*='f_rewrite']").val(rewrite);
    if(rewrite!='N'){
        var tt = $.get(connectionString + '/BlackMessa/getFileResponce', {responceFolder:folderName, responseFile:fileName});
        tt.done(function (data) {
            //console.log(data);
            //console.log(JSON.stringify(data));            
        
            $('#textResponce').val(data);
            $("input[name*='f_fileName']").val(fileName);       
            if(rewrite=='E'){
                $("input[name*='f_fileName']").attr('readonly', true);            
            }

            //$('#textResponce').val(JSON.stringify(data));
        });           
        tt.fail(function(jqXHR,textStatus){
            notificationDanger('Ошибка подключения: '+jqXHR.status);
        });

    }    
}


function showMockList() {
    $('div[id^=div]').hide();
        $('#div1').show();
        getMocActionsList();
}



$(function() {
    $('#showdiv1').click(function() {
        if(connectionString!='')
            {showMockList();}
        else{notificationWarning('Окружение не выбрано');}

    });

    $('#linkToHost').click(function() {
        $('div[id^=div]').hide();        
        getMockHostList();
        $('#div7').show();
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
        getMockHostList();
        $('#div7').show();
    });
    $('#editTextResponce').click(function() {
        /* Act on the event */
        $('div[id^=div]').hide();
        getFileResponceText();
        $('#div5').show();        
    });

    $('#linkToHost').show(function(){
       getMockHostList(); 
    }) 
})



$(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#userBody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});