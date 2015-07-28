// require the arduino library
var five = require('johnny-five');
// create the board connection
var board = new five.Board();

board.on('ready',function(){

	var pezio = new five.Piezo(8);

	pezio.play({
		tempo: 100,
		song:[
			["c4", 1/3],
			["c5", 1/3],
			["c6", 1/3],
			[null, 2/3],
			["c5", 1/3],
			["e4", 1/3],
			["e5", 1/3],
			["e6", 1/3],
			[null, 2/3],
			["e5", 1/3],
		]
	});

});