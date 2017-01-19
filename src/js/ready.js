var $ = require('jquery');

$(document).ready(function(){
	$('#new-song').on('click', function() {
		if ($(this).data('status') == 'ui-form-shown') {
			$('body').removeClass().addClass('ui-songs-list-shown');
			$(this).data('status', 'ui-songs-list-shown');
		} else {
			$('body').removeClass().addClass('ui-form-shown');
			$(this).data('status', 'ui-form-shown');
		}
	});
});
