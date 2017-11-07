function getMockHostList() {	
	$('#hostList').empty();
	var tt;

	pingService();
	$.each(hostMass, function () {
		tt=this;
				//tt.status=pingService(tt.url);
				ter(tt.descriptions,tt.url,tt.statuss,tt.serviceName);					
			}); 

	$.each(hostMass, function () {


		$.when(resp=$.getJSON(this.url + '/BlackMessa/pingService')
			).then(function () {							

			}, function () {

			})
		});
};



function disableButton(source){
	if(source!=true){ return 'disabled'}
}

function ter(_description, url, status, serviceName) {
	$('#hostList').append(
		'<tr class="users_row"><td>'
		+_description
		+'</td><td>'
		+url
		+'</td><td>'
		+'<p id="'
		+serviceName
		+'">'
		+ function () {
			var t;
			if (status==true){t= "Активен"}else{t= "Не активен"};
			return t;
		}()
		+'</p>'						
		+'</td><td>'
		+ '<button class="button_u btn btn-info" id="' 
		+ serviceName
		+'">Выбрать</button>'
		+'</td>');
	if(status==false){$('button#'+serviceName).attr('disabled','disabled');}
}

function pingService() {	
	//var resp = 	$.getJSON(hostUrl + '/BlackMessa/pingService');
	//return resp;
	$.each(hostMass, function () {
		tt=this;
		$.ajax({
			url: tt.url + '/BlackMessa/pingService',					
			async: false,
			dataType: 'text',
			type: 'GET',					
			complete: function (e, xhr, settings) {
				if(e.status==200){
					tt.statuss=true
				}
				else
				{
					tt.statuss=false
				}
			}				
		});

	});
	console.log(tt.statuss);

	var resp;
	
	return resp;
};




$(function () {

	$('#testt').click(function(event) {
		console.log('55');
		getMockHostList();
	});
	$('#testt1').click(function(event) {
		console.log('erase');
		//$('#hostListHead').empty();
		$('#hostList').empty();
	});
	// body...
})

