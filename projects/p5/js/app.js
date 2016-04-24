$(document).ready(function() {
	$('#calc').click(function() {
		var number = $('#num').val();
		var range = [];
		range[0] = $('#lbound').val();
		range[1] = $('#ubound').val();
		if(number == '') {
			console.log("Please Enter a Number");
			$('.num-warning').css('display', 'initial');
		} else {
			$('.num-warning').css('display', 'none');
			number = Number(number);
		}

		if(range[0] == '' || range[1] == '') {
			console.log("Please Enter a Valid Range");
			$('.range-warning').css('display', 'initial');
		} else {
			$('.range-warning').css('display', 'none');
			range[0] = Number(range[0]);
			range[1] = Number(range[1]);
		}
		var diff = Math.abs(range[0] - range[1]);
		if(diff == 0) {
			console.log("Please Enter a Range Greater Than Zero");
			$('.zero-range-warning').css('display', 'initial');
		} else {
			$('.zero-range-warning').css('display', 'none');
		}
	});
	console.log('app loaded');
});