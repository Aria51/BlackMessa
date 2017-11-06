function getNameLanguega(p_idname){
    $.getJSON('http://localhost:9091/testID', function(data) {
                $.each(data, function(key, val) {
                    $('#'+p_idname).append('<option value="' + val + '">' + key + '</option>');
                });
    });
};

function getNameUser(){
    $.getJSON('http://localhost:9091/testID2', function(data) {
            for(var i=0;i<data.users.length;i++){
                $('#users').append('<tr><td>' + data.users[i].id + '</td><td>' + data.users[i].name + 
                '</td><td>' + data.users[i].age + '</td><td><select id="user' +data.users[i].id +'"><option disabled>Выберите язык</option></select></td><tr>');
                getNameLanguega('user'+data.users[i].id);
            }
    });
};

function getFileName(p_idname){
    $.getJSON('http://localhost:9092/test', function(data) {
                $.each(data, function(key, val) {
                	var test=val;
                	for(var i=0;i<test.length;i++)
                	{
                		$('#'+p_idname).append('<option value="' + val + '">' + test[i].file + '</option>');
                	}
                    
                });
    });
};