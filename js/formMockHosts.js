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
			if (status==true){return "Активен"}else{return "Не активен"};
			return t;
		}()
		+'</p>'						
		+'</td><td>'
		+ '<button class="button_u btn btn-info" id="' 
		+ serviceName
		+'">Выбрать</button>'
		+'</td>');
	if(status==false){
		$('button#'+serviceName).attr('disabled','disabled');
		$('button#'+serviceName).removeClass('btn-info');
		$('button#'+serviceName).addClass('btn-danger');
	}else
	{
		if(url==connectionString){
			$('button#'+serviceName).removeClass('btn-info');
			$('button#'+serviceName).addClass('btn-success');
			$('button#'+serviceName).text('Выбран');
		}
	}
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

	$('#b_updateServiceHost').click(function(event) {		
		getMockHostList();
	});	

	$('#hostList').delegate('.button_u', 'click', function(e) {				
		$('#showdiv1').text('Сервисы');
		SetHostName(this.id);
		$('#'+this.id).text('Выбран');
	});		
})


function SetHostName(sName) {
	$.each(hostMass,function() {
		if(this.serviceName==sName){
			connectionString=this.url;
			connectionDescription=this.descriptions;
			$('#linkToHost').text(connectionDescription);
			showMockList();
		}
	});
}

