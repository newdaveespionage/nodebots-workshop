// require the arduino library
var five = require('johnny-five');
// create the board connection
var board = new five.Board();

board.on('ready',function(){
	var sensor = new five.Sensor('A0');

	var led = new five.Led(9);

	// Scale the sensor's data from 0-1023 to 0-10 and log changes
	sensor.scale(0, 1000).on("change", function() {
		console.log(this.value);
		if(this.value > 600){
			led.on();
		}else{
			led.off();
		}
	});
});