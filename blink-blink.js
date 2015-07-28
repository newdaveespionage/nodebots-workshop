// require the arduino library
var five = require('johnny-five');
// create the board connection
var board = new five.Board();

// wait for the board's ready state
board.on('ready', function(){
	// Led takes a pin number in the constructor
	var led = new five.Led(13);

	// blink the led once every second (blink takes ms as a parameter)
	led.blink(1000);

});