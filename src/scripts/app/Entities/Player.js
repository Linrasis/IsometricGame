(function(global) {
	'use strict';

	global.Entities.Player = new Class({
		width: 32,
		height: 32,
		images: [ 'assets/images/player1.png', 'assets/images/player2.png' ],
		speed: 96,
		shoots: [],
		imageObjects: [],
		init: function() {
			this.setPositionIndexes(0, 0);
			this.prepareIndexesToPosition();

			this.parent.init.call(this);
		},
		draw: function(context) {
			var i;
			this.parent.draw.call(this, context);

			for (i = this.shoots.length - 1; i >= 0; i--) {
				if (this.shoots[i]) {
					this.shoots[i].draw.call(this.shoots[i], context);
					this.shoots[i].drawShadow.call(this.shoots[i], context);

					this.drawDistance(context, this.shoots[i], this);
				}
			}
		},
		/* 
		Calculate distance from point a to point b
		*/
		drawDistance: function(context, a, b) {
			var d = Math.round(Math.pow(Math.sqrt(Math.abs(a.x - b.x)) + Math.sqrt(Math.abs(a.y - b.y)), 2));

			// Show distance on the top of point object
			context.font = "14px Arial";
			context.fillText(d, a.x + a.width / 1.5, a.y + a.height);
		},
		drawTop: function(context) {
			this.setImageIndex(1);
			this.parent.draw.call(this, context);
			this.setImageIndex(0);
		},
		update: function (m) {
			for (var i = this.shoots.length - 1; i >= 0; i--) {
				if (this.shoots[i]) {
					this.shoots[i].moveTo(m);
				}

				if (this.shoots[i].x < 0 || this.shoots[i].x > 1000 || this.shoots[i].y < 0 || this.shoots[i].y > 600) {
					this.shoots.splice(i, 1);
					continue;
				}
			}
		},
		moveUp: function (m) {
			this.y -= this.speed * m;
		},
		moveDown: function (m) {
			this.y += this.speed * m;
		},
		moveLeft: function (m) {
			this.x -= this.speed * m;
		},
		moveRight: function (m) {
			this.x += this.speed * m;
		},
		shoot: function (m) {
			var point;

			if (this.shoots.length > 100) {
				return;
			}

			point = new global.Entities.Point();
			point.setPosition(this.x, this.y);

			point.moveTo = (function(randomX, randomY) {
				return function (m) {
					this.x += ((randomX < 0) ? (randomX * this.speed) : (randomX * this.speed)) * m;
					this.y += ((randomY < 0) ? (randomY * this.speed) : (randomY * this.speed)) * m;
				};
			})(Math.floor((Math.random() * 20) - 10), Math.floor((Math.random() * 20) - 10));

			this.shoots.push(point);
		}
	}, global.Entities.Entity);
})(this);