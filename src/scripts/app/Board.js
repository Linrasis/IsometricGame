(function(global) {
	'use strict';

	var self = {
		KEYS: { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, SPACE: 32 },
		canvas: undefined,
		points: [],
		board: undefined,
		player: undefined,
		keysDown: {},
		now: undefined,
		delta: undefined,
		then: Date.now(),
		width: 1000,
		height: 600,
		init: function () {
			self.canvas = document.getElementById('canvas');
			self.context = canvas.getContext('2d');

			self.board = new global.Entities.Board();
			self.points.push(new global.Entities.Point());
			self.player = new global.Entities.Player();

			document.addEventListener("keydown", function (e) {
				if (typeof self.keysDown[e.keyCode] === 'undefined') {
					self.keysDown[e.keyCode] = true;
				}
			}, false);

			document.addEventListener("keyup", function (e) {
				delete self.keysDown[e.keyCode];
			}, false);
		},
		update: function (m) {
			if (self.KEYS.SPACE in self.keysDown && self.keysDown[self.KEYS.SPACE]) {
				self.player.shoot(m);
				self.keysDown[self.KEYS.SPACE] = false;
			}
			if (self.KEYS.UP in self.keysDown) {
				self.player.moveUp(m);
			}
			if (self.KEYS.DOWN in self.keysDown) {
				self.player.moveDown(m);
			}
			if (self.KEYS.LEFT in self.keysDown) {
				self.player.moveLeft(m);
			}
			if (self.KEYS.RIGHT in self.keysDown) {
				self.player.moveRight(m);
			}

			self.player.update(m);
		},
		draw: function () {
			var i = 0, len = 0;

			self.context.clearRect(0, 0, self.width, self.height);

			self.board.draw(self.context);

			for (i = 0, len = self.points.length; i < len; i++) {
				self.points[i].drawShadow(self.context);
			}

			self.player.draw(self.context);

			for (i = 0, len = self.points.length; i < len; i++) {
				self.points[i].draw(self.context);
			}

			self.player.drawTop(self.context);
		},
		start: function () {
			self.now = Date.now();
			self.delta = self.now - self.then;
			self.then = self.now;

			self.requestAnimationFrame(function() {
				self.draw();
				self.update(self.delta / 1000);
				self.start();
			}, 1000 / self.delta);
		},
		requestAnimationFrame: function (func, timeFrequency) {
			var requestAnimationFrame;

			requestAnimationFrame = (function () {
				return (
					window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function(func) {
						window.setTimeout(func, timeFrequency);
					}
				);
			}());

			return requestAnimationFrame(func);
		}
	};

	global.PubSub.subscribe('app/init', self.init);
	global.PubSub.subscribe('app/start', self.start);
})(this);