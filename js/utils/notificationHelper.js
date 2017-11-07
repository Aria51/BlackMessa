// success, danger, info, warning

function notificationSuccess(message) {
	$.bootstrapGrowl(message,{
            type: 'success',
            delay: 2000,
        });
}

function notificationInfo(message) {
	$.bootstrapGrowl(message,{
            type: 'info',
            delay: 2000,
        });
}

function notificationWarning(message) {
	$.bootstrapGrowl(message,{
            type: 'warning',
            delay: 2000,
        });
}

function notificationDanger(message) {
	$.bootstrapGrowl(message,{
            type: 'danger',
            delay: 2000,
        });
}