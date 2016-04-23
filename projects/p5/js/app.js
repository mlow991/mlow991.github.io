$(document).ready(function() {
	$('#calc').click(function() {
		var number = $('#num').val();
		var range = [];
		range[0] = Number($('#lbound').val());
		range[1] = Number($('#ubound').val());
		if(number == '') {
			console.log("Please Enter a Number");
		}
	});
	console.log('app loaded');
});