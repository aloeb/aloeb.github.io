/**
 * A class to animate a corgi! Woo!
 *
 *
 */

 "use strict";


// Create functions we'll need

var requestAnimationFrame =  
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
    	return setTimeout(callback, 1000 / 60);
    };

var temp = 0;
var init = function() {
	var w = canvas.width / 50;
	for (var i = 0; i < w*w; i++) {
		if (Math.floor(i/w) % 2 == 1 && (i%w) % 2 == 1) continue;
		blocks.push(new block(50*(i%w), 50*Math.floor(i/w), 'images/wall.svg'));
	}

	if (temp != 4/*!corgi.isReady()*/) { temp++; setTimeout(init, 100); }
	else { console.log("starting!"); loop(); }
}

var loop = function() {
	if (!done) {
		update();
		draw();
		
		requestAnimationFrame(loop);
	}
};

var draw = function() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Draw the square
    //context.beginPath();
    //context.rect(square.x, square.y, square.width, square.height);
    //context.fillStyle = square.fill;
    //context.fill();

    for (var i = 0; i < blocks.length; i++) {
    	blocks[i].draw(context);
    }

    corgi.draw(context);
};

var update = function() {
	corgi.update();
	for (var i = 0; i < blocks.length; i++) {
    	corgi.collides(blocks[i]);
    }

    if (corgi.wins(canvas.width, canvas.height)) { window.alert("win!"); done = true; }
}

var getMovement = function(e, distance) {
	// Set some initial variables
	var prop = 'xv';
	var mult = 1;

	// Just return false if the key isn't an arrow key
	if (e.which < 37 || e.which > 40) {
		return false;
	}

	// If we're going left or up, we want to set the multiplier to -1
	if (e.which === 37 || e.which === 38) {
		mult = -1;
	}

	// If we're going up or down, we want to change the property we will be animating. 
	if (e.which === 38 || e.which === 40) {
		prop = 'yv';
	}

	return [prop, mult * distance];
}





// Do actual stuff

var canvas = document.getElementById('mCanvas');

// Set up our objects.

var done = false;

var corgi = new thing(55, 55, [ 'images/corgi.svg', 'images/corgi2.svg' ]);

var blocks = [];

var background = new Image;
background.src = 'images/ground.svg';

if (canvas.getContext) {
	// Set up our canvas.
	var context = canvas.getContext('2d');
	//context.canvas.width  = window.innerWidth;
	//context.canvas.height = window.innerHeight;

	// Set up our loop.

	

	document.body.addEventListener('keydown', function(e) {
		e.preventDefault();

		var info = getMovement(e, 3);

		if (info) {
			// So we can only move one direction at a time
			corgi.xv = 0;
			corgi.yv = 0;
			corgi[info[0]] = info[1];
	    };
	});

	document.body.addEventListener('keyup', function(e) {
		e.preventDefault();

		var info = getMovement(e, 0);

		if (info) {
			corgi[info[0]] = info[1];
		}
	});

	// Finally, initialize our loop stuff.
	init();
}