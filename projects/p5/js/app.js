var count = 0;
var result;

function calc(x, y, range) {
	if(y == 0) {
		var arr = [];
		var total = 0;
		for(i = range[0]; i < range[1] / x; i++) {
			var val = i * x;
			arr.push(val);
			total += val;
		}
		result = total;
		console.log(arr);
		console.log(total);
	} else {
		var arr = [];
		var total = 0;
		for(i = range[0]; i < range[1]; i++) {
			if(i % x == 0 || i % y ==0) {
				arr.push(i);
				total += i;
			}
		}
		result = total;
		console.log(arr);
		console.log(total);
	}
}

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

		if(count > 0) {
			var number2 = $('#num2').val();
			if(number2 == '') {
				console.log("Please Enter a Second Number");
				$('.num-warning-two').css('display', 'initial');
			} else {
				$('.num-warning-two').css('display', 'none');
				number2 = Number(number2);
				calculate++;
			}
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

		range = range.sort(function(a, b) {
			return a-b
		});
		console.log(range);

		if(calculate == 3) {
			if(number != 0) {
				calc(number, 0, range);
			} else {
				result = 0;
			}
		}

		if(calculate == 4) {
			if(number != 0 && number2 != 0) {
				calc(number, number2, range);
			} else if(number != 0 && number2 == 0) {
				calc(number, 0, range);
			} else if(number == 0 && number2 != 0) {
				calc(number2, 0, range);
			} else {
				result = 0;
			}
		}

		if(calculate == 3 || calculate ==4) {
			$('.result').css('display', 'initial');
			$('.r-value').css('display', 'initial');
			$('.r-value').html(result);
		}

	});

	$('#add').click(function() {
		if(count <= 0) {
			count++;
			$('.num-warning').after('<br><br>Number 2: <input id="num2" type="number" name="Given Number"><span class="num-warning-two">Please Enter a Number</span>');
		} else {
			$('.num-amount').css('display', 'initial');
		}
	});
	console.log('app loaded');
});