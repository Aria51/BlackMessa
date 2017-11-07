function getMockHostList() {	
			$('#hostList').empty();
			var tt;
			$.each(hostMass, function () {
				tt=this;
				ter(tt.descriptions,tt.url,'null',tt.serviceName);					
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
						+status
						+'</p>'						
						+'</td><td>'
						+ '<button class="button_u btn btn-info" id="' 
						+ serviceName
						+'">Выбрать</button>'
						+'</td>');				
}

function pingService(hostUrl) {	
	//var resp = 	$.getJSON(hostUrl + '/BlackMessa/pingService');
	//return resp;
var resp;
$.when(resp=$.getJSON(hostUrl + '/BlackMessa/pingService')
	).then(function () {
		resp.done(function () {
			res='Успешно';
			console.log('Успешно');
		})
	}, function () {
		console.log('Ошибка');
	})	
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

