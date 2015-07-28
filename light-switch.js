// require the arduino library
var five = require('johnny-five');
// create the board connection
var board = new five.Board();

// wait for the board's ready state
board.on('ready', function () {

	button = new five.Button(5);
	led = new five.Led(9);

	button.on("hold", function() {
		console.log( "Button held" );
	});

	button.on("press", function() {
		console.log( "Button pressed" );

		// turn led on or off
		led.toggle();
	});

	button.on("release", function() {
		console.log( "Button released" );

	});

});