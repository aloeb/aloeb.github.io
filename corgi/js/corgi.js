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
		corgi = new thing(65, 65, 40, 40, [ 'images/corgi.svg', 'images/corgi2.svg' ])
		room = generateMaze();

		console.log("starting!");
		loop();
	}
}

var generateMaze = function() {
	var blocks = [];
	var items = [];
	
	// build a 5x5 maze (that should have 40 edges and 25 cells)
	var R = buildMaze(25, 40);
	//var R = [ 0, 1, 2, 7, 8, 10, 15 ];

	var b = null;

	if (Math.floor(Math.random() * 5) === 3) {
		b = new bank(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50, 'images/bank.svg');
		console.log("hey");
	}

	var tile = 60;
	var w = canvas.width / tile;
	var edgeNumb = 0;
	var j = 0;
	for (var i = 0; i < w*w; i++) {
		// Skip cells
		if (Math.floor(i/w) % 2 == 1 && (i%w) % 2 == 1) { 
			// Let's just put a bone on every cell
			items.push(new thing(tile*(i%w) + (tile-19)/2, tile*Math.floor(i/w) + (tile-11)/2, 19, 11, [ 'images/point.svg' ]));
			continue;
		}
		// Skip edges we should remove
		// If we are on an "edge", a piece we can remove
		else if (i % 2 == 1 && i % w != 0 && (i+1) % w != 0 && i >= w && i < w*w - w) {
			edgeNumb++;
			if (j < R.length && R[j] == edgeNumb-1) { j++; continue; }
		}
		//Now we want to pick the very edge pieces we will remove to be exits (could only be odd number i because next to cell)
		else if ((i < w || i >= w*w - w || i%w == 0 || i%w == w-1) && i%2 == 1) {
			continue;
		}

		// Skip the block the player is on
		if (corgi.intersects(tile*(i%w), tile*Math.floor(i/w), tile, tile)) continue;
		// Otherwise put a wall in
		blocks.push(new block(tile*(i%w), tile*Math.floor(i/w), tile, tile, 'images/wall.svg'));
	}

	return new maze(blocks, items, b, 'images/ground.svg');
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
    context.drawImage(room.background, 0, 0, canvas.width, canvas.height);

    // Draw the square
    //context.beginPath();
    //context.rect(square.x, square.y, square.width, square.height);
    //context.fillStyle = square.fill;
    //context.fill();

    for (var i = 0; i < room.blocks.length; i++) {
    	room.blocks[i].draw(context);
    }

    for (var i = 0; i < room.items.length; i++) {
    	room.items[i].draw(context);
    }

    if (room.bank != null) room.bank.draw(context);

    corgi.draw(context);
};

var update = function() {
	corgi.update();
	for (var i = 0; i < room.blocks.length; i++) {
    	corgi.collides(room.blocks[i]);
    }

    for (var i = 0; i < room.items.length; i++) {
    	// check for adding points
    	if (corgi.collidesWithItem(room.items[i])) {
    		score++;
    		room.items.splice(i, 1);
    		i--;
    	}
    }

    var won = corgi.wins(canvas.width, canvas.height);
    if (won[0]) {
    	corgi[won[1]] += won[2];
    	prevRooms.push(room);
    	room = null;
    	for (var i = 0; i < prevRooms.length; i++) {
    		// Basically add or subtract 1 from the x or y of the rooms because we moved like that.
    		prevRooms[i][won[1]] += won[2] / Math.abs(won[2]);
    		if (prevRooms[i].x === 0 && prevRooms[i].y === 0) {
    			room = prevRooms[i];
    		}
    	}

    	if (room == null) room = generateMaze();
    }

    if (room.bank != null && corgi.collidesWithBank(room.bank)) {
    	if (room.bank.fill(score)) {
    		alert("You win! Starting over.");
    		prevRooms = [];
    		room = generateMaze();
    	}
    	score = 0;
    }
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

var corgi;

var room;

var prevRooms = [];

var score = 0;

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