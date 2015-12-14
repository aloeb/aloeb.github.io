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
	if (temp != 4/*!corgi.isReady()*/) { temp++; setTimeout(init, 100); }
	else { 
		// build a 5x5 maze (that should have 40 edges)
		var R = buildMaze(25, 40);
		//var R = [ 0, 1, 2, 7, 8, 10, 15 ];

		var w = canvas.width / 50;
		var edgeNumb = 0;
		var j = 0;
		for (var i = 0; i < w*w; i++) {
			// Skip cells
			if (Math.floor(i/w) % 2 == 1 && (i%w) % 2 == 1) continue;
			// Skip edges we should remove
			// If we are on an "edge", a piece we can remove
			if (i % 2 == 1 && i % w != 0 && (i+1) % w != 0 && i >= w && i < w*w - w) {
				edgeNumb++;
				if (j < R.length && R[j] == edgeNumb-1) { j++; continue; }
			}
			// Skip the ending block
			if (i == w*(w-1)-1) continue;
			// Otherwise put a wall in
			blocks.push(new block(50*(i%w), 50*Math.floor(i/w), 'images/wall.svg'));
		}

		console.log("starting!");
		loop();
	}
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