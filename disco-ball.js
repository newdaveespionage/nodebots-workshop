// require the arduino library
var five = require('johnny-five');
// create the board connection
var board = new five.Board();

board.on('ready',function(){
	// using a spectra symbol linear potentiometer
	var sensor = new five.Sensor('A0');

	// using an rgb led
	var led = new five.Led.RGB({
		pins: {
			red: 9,
			green: 10,
			blue: 11
		}
	});

	// Scale the sensor's data from 0-1023 to 0-10 and log changes
	sensor.scale(0, 255).on("change", function() {
		console.log(this.value);
		curval = this.value;
		red = curval * Math.random();
		green = curval * Math.random();
		blue = curval * Math.random();
		console.log(red,green,blue);
		led.color({
			red: red,
			green: green,
			blue: blue
		});
	});
});