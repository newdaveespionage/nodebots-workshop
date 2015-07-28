// require the arduino library
var five = require('johnny-five');
// create the board connection
var board = new five.Board();

// reset function for realigning servo
function reset(){
	this.stop();
	this.center();	
}

// wait for the board's ready state
board.on('ready', function () {

	// five.Servo takes a pin number for the constructor
	var servo = new five.Servo(9);

	// sweep takes an argument of degrees
	servo.sweep(180);

	// board.wait takes ms and callback
	board.wait(3000, reset.bind(servo));

});
