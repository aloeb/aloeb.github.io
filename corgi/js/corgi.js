/**
 * A class to animate a corgi! Woo!
 *
 *
 */

 "use strict";

var canvas = document.getElementById('mCanvas');

if (canvas.getContext) {
	// Set up our canvas.
	var context = canvas.getContext('2d');
	context.canvas.width  = window.innerWidth;
	context.canvas.height = window.innerHeight;

	// Set up our objects.

	function thing(imgUrls) {
		// Load all the images
		this.init = 0;
		this.images = [];

		for (var i = 0; i < imgUrls.length; i++) {
			this.images.push(new Image);
			this.images[this.images.length - 1].onload = function() {
				// Figure out solution for this.
				this.init--;
			};
			this.images[this.images.length - 1].src = imgUrls[i];
			this.init++;
		}

		this.isReady = function() { return this.init === 0; };

		// Now let's init all our variables.
		this.x = 0;
		this.y = 0;
		this.xv = 0;
		this.yv = 0;
		this.width = 100;
		this.height = 100;

		this.anim = 0;
		this.animCount = 0;
		this.animDelay = 3;

		this.draw = function(ctx) {
			ctx.drawImage(this.images[this.anim], this.x, this.y);
		};

		this.update = function() {
			this.x += this.xv;
			this.y += this.yv;

			if (this.xv != 0 || this.yv != 0) {
				if (this.animCount >= this.animDelay) {
					this.anim = (this.anim + 1) % this.images.length;
					this.animCount = 0;
				} else {
					this.animCount++;
				}
			} else {
				this.anim = 0;
			}
		};
	}
	var corgi = new thing([ 'images/corgi.svg', 'images/corgi2.svg' ]);
	var square = {
	    'x': 50,
	    'y': 50,
	    'xv': 0,
	    'yv': 0,
	    'width': 100,
	    'height': 100,
	    'fill': '#00FF00'
	};

	// Set up our loop.

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
		else { console.log("starting!"); loop(); }
	}

	var loop = function() {
		update();
		draw();
		
		requestAnimationFrame(loop);
	};

	var draw = function() {
	    // Clear the canvas
	    context.clearRect(0, 0, canvas.width, canvas.height);

	    // Draw the square
	    //context.beginPath();
	    //context.rect(square.x, square.y, square.width, square.height);
	    //context.fillStyle = square.fill;
	    //context.fill();
	    corgi.draw(context);
	};

	var update = function() {
		corgi.update();
	}

	// Set up key presses.

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

	document.body.addEventListener('keydown', function(e) {
		e.preventDefault();

		var info = getMovement(e, 3);

		if (info) {
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