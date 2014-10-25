(function(global) {
	'use strict';

	global.Entities = global.Entities || {};
	global.Entities.Entity = new Class(true, {
		a: 0,	// the index of column in the horizontal for object
		b: 0,	// the index of column in the vertical for object
		x: 0,	// exact coordinate of the point x on the plane for object
		y: 0,	// exact coordinate of the point y on the plane for object
		z: 0,	// exact coordinate of the point z on the plane for object
		width: undefined,	// width of object
		height: undefined,	// height of object
		speed: 5,	// speed of object
		images: [],	// List of file paths to images
		imageIndex: undefined, 	// Actual using image index from images array to render object
		imageObjects: [],
		init: function () {
			var that = this;

			this.setImageIndex(0);
		},
		setImageIndex: function (index) {
			if (index != this.imageIndex && this.images[index]) {
				if (!this.imageObjects[index]) {
					this.imageObjects[index] = new Image();

					this.imageObjects[index].onload = (function (imageObject) {
						return function () {
							imageObject.ready = true;
						};
					})(this.imageObjects[index]);
				}

				this.imageObjects[index].src = this.images[index];
				this.imageIndex = index;
			}
		},
		/*
		Dispatched into main game loop
		*/
		update: function (m) {},
		/*
		Draw object on the plane
		*/
		draw: function(context) {
			if (this.imageObjects[this.imageIndex] && this.imageObjects[this.imageIndex].ready) {
				context.drawImage(this.imageObjects[this.imageIndex], this.x, this.y, this.width * 2, this.height * 2);
			}
		},
		setPositionIndexes: function (a, b) {
			this.a = a;
			this.b = b;
		},
		setPosition: function (x, y) {
			this.x = x;
			this.y = y;
		},
		prepareIndexesToPosition: function (a, b) {
			a = a || this.a;
			b = b || this.b;

			var x = parseFloat((a - b) * this.width) + 500;
			var y = parseFloat((a + b) * this.height / 2) + this.height - (this.z || 0);

			this.setPosition(x, y);
		}
	});

})(this);