// require the arduino library
var five = require('johnny-five');
// create the board connection
var board = new five.Board();

board.on('ready',function(){
	// using a spectra symbol linear potentiometer
	var sensor = new five.Sensor('A0');

	// using an rgb led
	var 
	// rgb = new five.Led.RGB({
	// 	pins: {
	// 		red: 9,
	// 		green: 10,
	// 		blue: 11
	// 	}
	// }),
	led = {
		'red':five.Led(9),
		'green':five.Led(10),
		'blue':five.Led(11),
		'current': {
			'red': 0,
			'green': 0,
			'blue': 0
		},
		'color':function(newColor){
			if(newColor !== undefined){
				led.current.red = newColor.red;
				led.current.green = newColor.green;
				led.current.blue = newColor.blue;
			}
			return led.current;
		}
	},
	keys = ['red','green','blue'];

	function generateRGB() {
		var color = [];
		for (var i = 0; i < 3; i++) {
			var num = Math.floor(Math.random()*225);
			while (num < 25) {
				num = Math.floor(Math.random()*225);
			}
			color.push(num);
		}
		return color;
	}

	function rgb2hex(color) {
		// console.log(color);
		var hex = [],
		out = "#000000";
		for (var i = 0; i < 3; i++) {
			if(isNaN(color[keys[i]])){
				hex.push('FF');
			}else{
				hex.push(color[keys[i]].toString(16));
			}
			if (hex[i].length < 2) { hex[i] = "0" + hex[i]; }
		}
		out = "#" + hex[0] + hex[1] + hex[2];
		// console.log(out);
		return out;
	}

	function calculateDistance(current, next) {
		var distance = [];
		for (var i = 0; i < 3; i++) {
			distance.push(Math.abs(current[keys[i]] - next[i]));
		}
		return distance;
	}

	var incrementStops = 50;

	function calculateIncrement(distance) {
		var increment = [];
		for (var i = 0; i < 3; i++) {
			increment.push(Math.abs(Math.floor(distance[i] / incrementStops)));
			if (increment[i] === 0) {
				increment[i]++;
			}
		}
		return increment;
	}

	var iteration = Math.round(1000 / (incrementStops/2));
	function createTransition(obj) {
		var currentColor	= obj.color();
		var randomColor		= generateRGB();
		var distance		= calculateDistance(currentColor, randomColor);
		var increment		= calculateIncrement(distance);

		function transition() {

			if (currentColor.red > randomColor[0]) {
				currentColor.red -= increment[0];
				if (currentColor.red <= randomColor[0]) {
					increment[0] = 0;
				}
			} else {
				currentColor.red += increment[0];
				if (currentColor.red >= randomColor[0]) {
					increment[0] = 0;
				}
			}

			if (currentColor.green > randomColor[1]) {
				currentColor.green -= increment[1];
				if (currentColor.green <= randomColor[1]) {
					increment[1] = 0;
				}
			} else {
				currentColor.green += increment[1];
				if (currentColor.green >= randomColor[1]) {
					increment[1] = 0;
				}
			}

			if (currentColor.blue > randomColor[2]) {
				currentColor.blue -= increment[2];
				if (currentColor.blue <= randomColor[2]) {
					increment[2] = 0;
				}
			} else {
				currentColor.blue += increment[2];
				if (currentColor.blue >= randomColor[2]) {
					increment[2] = 0;
				}
			}
			//obj.color(rgb2hex(currentColor));
			obj.red.brightness(currentColor.red);
			obj.green.brightness(currentColor.green);
			obj.blue.brightness(currentColor.blue);

			if (increment[0] === 0 && increment[1] === 0 && increment[2] === 0) {
				clearInterval(handler);
				createTransition(obj);
			}
		}
		var handler = setInterval(transition, iteration);
	}
	createTransition(led);

	// Scale the sensor's data from 0-1023 to 0-10 and log changes
	sensor.scale(0, 255).on("change", function() {
		console.log(this.value);
		curval = this.value;
		red = curval * Math.random();
		green = curval * Math.random();
		blue = curval * Math.random();
		console.log(red,green,blue);
		led.red.brightness(red);
		led.green.brightness(green);
		led.blue.brightness(blue);
	});
});