function thing(x, y, imgUrls) {
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
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	this.width = 40;
	this.height = 40;

	this.anim = 0;
	this.animCount = 0;
	this.animDelay = 3;

	this.draw = function(ctx) {
		ctx.save();
		if (this.xv < 0) {
			ctx.trans
			ctx.scale(-1, 1);
			ctx.drawImage(this.images[this.anim], -this.x - this.width, this.y, this.width, this.height);
		} else {
			ctx.drawImage(this.images[this.anim], this.x, this.y, this.width, this.height);
		}
		ctx.restore();
	};

	this.update = function(width, height) {
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

	this.collides = function(bl) {
		if (this.y + this.height > bl.y && this.y < bl.y + bl.height
		 && this.x + this.width > bl.x && this.x < bl.x + bl.width) {
			if (this.xv > 0 && this.x + this.width > bl.x)
				this.x = bl.x - this.width;
			if (this.xv < 0 && this.x < bl.x + bl.width)
				this.x = bl.x + bl.width;
			if (this.yv > 0 && this.y + this.height > bl.y)
				this.y = bl.y - this.height;
			if (this.yv < 0 && this.y < bl.y + bl.height)
				this.y = bl.y + bl.height;
		}
	};

	this.wins = function(width, height) {
		if (this.x < 0
			 || this.y < 0
			 || this.x > width
			 || this.y > height) {
			return true;
		} else {
			return false;
		}
	}
}

function block(x, y, imgUrl) {
	// Load all the images
	this.init = 0;

	this.image = new Image;
	this.image.onload = function() {
		// Figure out solution for this.
		this.init--;
	};
	this.image.src = imgUrl;
	this.init++;

	this.isReady = function() { return this.init === 0; };

	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;

	this.draw = function(ctx) {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	};
}
