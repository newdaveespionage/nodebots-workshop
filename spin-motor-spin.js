// require the arduino library
var five = require('johnny-five');
// create the board connection
var board = five.Board();

// wait for the board's ready state
board.on('ready', function () {

	// Motor takes multiple pins for the constructor, in this activity we're just using 9
	motor = five.Motor(9);
	function run(){
		motor.start(200);
		board.wait(2000,function(){
			motor.stop();
			board.wait(1000,run);
		});
	}
	run();
});