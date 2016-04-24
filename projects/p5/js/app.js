$(document).ready(function() {
	$('#calc').click(function() {
		var number = $('#num').val();
		var range = [];
		range[0] = $('#lbound').val();
		range[1] = $('#ubound').val();
		var calculate = 0;
		if(number == '') {
			console.log("Please Enter a Number");
			$('.num-warning').css('display', 'initial');
		} else {
			$('.num-warning').css('display', 'none');
			number = Number(number);
			calculate++;
		}

		var rangeCondition = 0;

		if(range[0] == '' || range[1] == '') {
			console.log("Please Enter a Valid Range");
			rangeCondition++;
			$('.range-warning').css('display', 'initial');
		} else {
			$('.range-warning').css('display', 'none');
			range[0] = Number(range[0]);
			range[1] = Number(range[1]);
			rangeCondition = 0;
			calculate++;
		}
		var diff = Math.abs(range[0] - range[1]);
		if(diff == 0 && rangeCondition == 0) {
			console.log("Please Enter a Range Greater Than Zero");
			$('.zero-range-warning').css('display', 'initial');
		} else {
			$('.zero-range-warning').css('display', 'none');
			calculate++;
		}

		if(calculate == 3) {
			range = range.sort(function(a, b) {
				return a-b
			});
			console.log(range);
			var arr = [];
			for(i = range[0]; i < range[1]; i++) {
				arr.push(i);
			}
			console.log(arr);

		}
	});
	console.log('app loaded');
});