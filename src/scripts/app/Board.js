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
		init: function () {
			self.canvas = document.getElementById('canvas');
			self.context = canvas.getContext('2d');

			self.board = new global.Entities.Board();
			self.points.push(new global.Entities.Point());
			self.player = new global.Entities.Player();

			document.addEventListener("keydown", function (e) {
				self.keysDown[e.keyCode] = true;
			}, false);

			document.addEventListener("keyup", function (e) {
				delete self.keysDown[e.keyCode];
			}, false);
		},
		update: function (m) {
			if (self.KEYS.UP in self.keysDown) {
				self.player.y -= self.player.speed * m;
			}
			if (self.KEYS.DOWN in self.keysDown) {
				self.player.y += self.player.speed * m;
			}
			if (self.KEYS.LEFT in self.keysDown) {
				self.player.x -= self.player.speed * m;
			}
			if (self.KEYS.RIGHT in self.keysDown) {
				self.player.x += self.player.speed * m;
			}
		},
		render: function () {
			var i = 0, len = 0;

			self.board.render(self.context);

			for (i = 0, len = self.points.length; i < len; i++) {
				self.points[i].renderShadow(self.context);
			}

			if (self.player.x < 5 || self.player.y < 5) {
				self.player.render(self.context);
				for (i = 0, len = self.points.length; i < len; i++) {
					self.points[i].render(self.context);
				}

				self.player.renderShadow(self.context);
			}
			else {
				self.player.renderShadow(self.context);

				for (i = 0, len = self.points.length; i < len; i++) {
					self.points[i].render(self.context);
				}
				self.player.render(self.context);
			}
		},
		start: function () {
			self.render();
			self.update(self.delta / 1000);

			self.requestAnimationFrame(function() {
				if (!self.isGameOver) {
					self.start();
				}
				else {
					// self.showGameOver();
				}
			});


			// setInterval(function() {
			// 	self.update(m);
			// 	self.render();
			// }, 10);	
		},
		requestAnimationFrame: function (func) {
			var requestAnimationFrame;

			self.now = Date.now();
			self.delta = self.now - self.then;
			self.then = self.now;

			requestAnimationFrame = (function () {
				return (
					window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame	   ||
					function(func) {
						window.setTimeout(func, 1000 / 60);
					}
				);
			}());

			return requestAnimationFrame(func);
		}
	};

	global.PubSub.subscribe('app/init', self.init);
	global.PubSub.subscribe('app/start', self.start);
})(this);