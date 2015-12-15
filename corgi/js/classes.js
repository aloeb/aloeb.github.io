function thing(x, y, width, height, imgUrls) {
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
	this.width = width;
	this.height = height;

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

	this.intersects = function(x, y, w, h) {
		return this.y + this.height > y && this.y < y + h
				&& this.x + this.width > x && this.x < x + w;
	}

	this.collides = function(bl) {
		if (this.intersects(bl.x, bl.y, bl.width, bl.height)) {
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

	this.collidesWithItem = function(it) {
		if (this.intersects(it.x, it.y, it.width, it.height)) {
			return true;
		} else return false;
	};

	this.collidesWithBank = function(bank) {
		if (this.intersects(bank.x, bank.y, bank.width, bank.height)) {
			return true;
		}
		return false;
	}

	this.wins = function(width, height) {
		if (this.x + this.width < 0) { return [true, 'x', width]; }
		if (this.y + this.height < 0) { return [true, 'y', height]; }
		if (this.x > width) { return [true, 'x', -width]; }
		if (this.y > height) { return [true, 'y', -height]; }

		return [false, 'x', 0];
	};
}

function block(x, y, width, height, imgUrl) {
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
	this.width = width;
	this.height = height;

	this.draw = function(ctx) {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	};
}

function bank(x, y, w, h, imgUrl) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.image = new Image;
	this.image.src = imgUrl;
	this.points = 0;

	this.draw = function(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		ctx.font = "16px Arial";
		ctx.fillText("Filled: " + this.points + "/100",x,y);
	}

	this.fill = function(amt) {
		this.points += amt;
		if (this.points >= 100) {
			this.points = 100;
			return true;
		}
		return false;
	}
}

function maze(blocks, items, bank, imgUrl) {
	this.x = 0;
	this.y = 0;
	this.blocks = blocks;
	this.items = items;
	this.background = new Image;
	this.background.src = imgUrl;
	this.bank = bank;
}
