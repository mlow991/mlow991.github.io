var count = 0;
var result;
var readmeActive = false;

// Calculates the sum of all multiples of up to 2 numbers within a specified range
function calc(x, y, range) {
	// Condition with only 1 number to find multiples for
	if(y == 0) {
		var arr = [];
		var total = 0;
		// Add all the multiples within the range together.
		// Slightly faster way of finding and adding multiples (than the method with 2 numbers)
		for(i = range[0]; i < range[1] / x; i++) {
			var val = i * x;
			arr.push(val);
			total += val;
		}
		result = total;
		console.log(arr);
		console.log(total);
	// Condition with 2 numbers to find multiples for
	} else {
		var arr = [];
		var total = 0;
		// Runs through entire range and checks to see if a number is a multiple of either number
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

// Loads event listeners once the page is loaded.
// Event listeners must be run once the page is loaded because they reference
// DOM elements.  If the DOM elements do not exist, then the event listener will
// not fire.
$(document).ready(function() {
	// Event listener for clicking the 'Calculate' button
	$('#calc').click(function() {
		// Collect the values from the input fields of the DOM.
		// The values are kept in string form to check to see if they
		// are empty.
		var number = $('#num').val();
		var range = [];
		range[0] = $('#lbound').val();
		range[1] = $('#ubound').val();

		// This variable is used to keep track of all exceptions.
		// The calculator will not proceed with a calculation if
		// there are invalid fields currently present.
		var calculate = 0;

		// Cheks to see if value in the 'Number' field is valid
		if(number == '') {
			console.log("Please Enter a Number");
			$('.num-warning').css('display', 'initial');
		} else {
			$('.num-warning').css('display', 'none');
			number = Number(number);
			calculate++;
		}

		// Checks to see if there is a second 'Number' field to consider.
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

		// Checks to see if the range is valid
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

		// Checks to see if the range is greater than 0
		if(diff == 0 && rangeCondition == 0) {
			console.log("Please Enter a Range Greater Than Zero");
			$('.zero-range-warning').css('display', 'initial');
		} else {
			$('.zero-range-warning').css('display', 'none');
			calculate++;
		}

		// Order the range from smallest to greatest for consistent computations.
		range = range.sort(function(a, b) {
			return a-b
		});
		console.log(range);

		// Success condition #1 where there is only 1 'Number' input.
		if(calculate == 3) {
			if(number != 0) {
				calc(number, 0, range);
			} else {
				result = 0;
			}
		}

		// Success condition #2 where there are 2 'Number' inputs.
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

		// Display the results in both success conditions
		if(calculate == 3 || calculate ==4) {
			$('.result').css('display', 'initial');
			$('.r-value').css('display', 'initial');
			$('.r-value').html(result);
		}

	});

	// Event listener for the button that adds a second 'Number' input field.
	$('#add').click(function() {
		if(count <= 0) {
			count++;
			$('.num-warning').after('<br><br>Number 2: <input id="num2" type="number" name="Given Number"><span class="num-warning-two">Please Enter a Number</span>');
		} else {
			$('.num-amount').css('display', 'initial');
		}
	});

	// Event listener for the button that toggles the README.
	$('.readme').click(function() {
		if(!readmeActive) {
			readmeActive = true;
			// Shows the README text
			$('.readme-text').css('display', 'initial');
			// Points the toggle triangle down
			$('.dropdown-triangle').css('border-top', '6px solid gray');
			$('.dropdown-triangle').css('border-bottom', '6px solid transparent');
			$('.dropdown-triangle').css('margin-top', '7px');
		} else {
			readmeActive = false;
			// Hides the README text
			$('.readme-text').css('display', 'none');
			// Points the toggle triangle up
			$('.dropdown-triangle').css('border-top', '6px solid transparent');
			$('.dropdown-triangle').css('border-bottom', '6px solid gray');
			$('.dropdown-triangle').css('margin-top', '0');
		}
	});

	console.log('app loaded');
});