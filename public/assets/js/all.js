(function (global, factory) {
	'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else {
        global.Class = factory();
    }
}(this, function () {
	'use strict';

	return function () {
		var abstractClass, prop, parent, args = Array.prototype.slice.call(arguments, 0);

		if (args[0] && typeof args[0] === 'boolean') {
			abstractClass = args.shift();
		}

		prop = args.shift();
		parent = args.shift();

		var Class = (function(abstractClass) {
			return function () {
				if (abstractClass) {
					throw Error('Cannot create instance of abstract class.');
				}

				if (typeof this.init === 'function') {
					this.init.apply(this, arguments);
				}
			};
		})(abstractClass);

		if (parent) {
			var SubClass = function () {};
			SubClass.prototype = parent.prototype;
			Class.prototype = new SubClass();
			Class.prototype.parent = new SubClass();
		}

		Class.extend = function (obj) {
			for (var i in obj) {
				Class[i] = obj[i];
			}
		};

		for (var i in prop) {
			Class.prototype[i] = prop[i];
		}

		return Class;
	};
}));
if (!Function.prototype.bind) {
	Function.prototype.bind = function (context) {
		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var args = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fn = function () {},
			fBound = function () {
				return fToBind.apply(
					this instanceof fn && context ? this : context,
					args.concat(Array.prototype.slice.call(arguments))
				);
			};

		fn.prototype = this.prototype;
		fBound.prototype = new fn();
		return fBound;
	};
}

if (!Function.prototype.extend) {
	Function.prototype.extend = function (parent) {
		this.prototype = new parent();
		this.prototype.parent = new parent();

		for (var m in this.prototype.parent) {
			if (typeof this.prototype.parent[m] === 'function') {
				this.prototype.parent[m] = this.prototype.parent[m].bind(this);
			}
		}

		return this;
	};
}

if (!Object.toType) {
	Object.toType = (function(obj) {
		if (obj === window) {
			return "window";
		}
		else if (obj === document) {
			return "object";
		}

		return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
	});
}
(function (global, factory) {
	'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else {
        global.PubSub = factory();
    }
}(this, function () {
	'use strict';

	var
	subscribed = {},
	publish = function(name, params) {
		for (var i in (subscribed[name] || [])) {
			if (subscribed[name].hasOwnProperty(i)) {
				subscribed[name][i].apply(null, params);
			}
		}
	},
	subscribe = function(name, func) {
		(subscribed[name] || (subscribed[name] = [])).push(func);
	},
	unsubscribe = function(name) {
		if (subscribed[name]) {
			delete subscribed[name];
		}
	};

	return {
		publish: publish,
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}));
(function(global) {
	'use strict';

	global.Entities = global.Entities || {};
	global.Entities.Entity = new Class(true, {
		a: 0,	// the index of column in the horizontal for object
		b: 0,	// the index of column in the vertical for object
		x: 0,	// exact coordinate of the point x on the plane for object
		y: 0,	// exact coordinate of the point y on the plane for object
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
			var y = parseFloat((a + b) * this.height / 2) + this.height;

			this.setPosition(x, y);
		}
	});

})(this);
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
				self.keysDown[e.keyCode] = true;
			}, false);

			document.addEventListener("keyup", function (e) {
				delete self.keysDown[e.keyCode];
			}, false);
		},
		update: function (m) {
			if (self.KEYS.SPACE in self.keysDown) {
				self.player.shoot(m);
				delete self.keysDown[self.KEYS.SPACE];
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
			});
		},
		requestAnimationFrame: function (func) {
			var requestAnimationFrame;

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
(function(global) {
	'use strict';

	global.Entities.Board = new Class({
		width: 32,
		height: 32,
		images: [ 'assets/images/ground1.png' ],
		horizontalSegments: 15,
		verticalegments: 15,
		imageObjects: [],
		draw: function(context) {
			var i, j;

			for (i = 0; i < this.horizontalSegments; i++) {
				for (j = 0; j < this.verticalegments; j++) {
					this.prepareIndexesToPosition(i, j);
					this.parent.draw.call(this, context);
				}
			}
		}
	}, global.Entities.Entity);
})(this);
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
					this.shoots[i].parent.draw.call(this.shoots[i], context);
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
			context.font = "16px Arial";
			context.fillText(d, a.x + a.width / 2, a.y + a.height / 2);
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

			if (this.shoots.length > 10) {
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
(function(global) {
	'use strict';

	global.Entities.Point = new Class({
		width: 32,
		height: 32,
		speed: 16,
		imageObjects: [],
		images: [ 'assets/images/point.png', 'assets/images/point-shadow.png' ],
		init: function() {
			this.setPositionIndexes(5, 5);
			this.prepareIndexesToPosition();

			this.parent.init.call(this);
		},
		draw: function(context) {
			this.prepareIndexesToPosition();
			this.parent.draw.call(this, context);
		},
		drawShadow: function(context) {
			var that = this; 
			this.setImageIndex(1);
			that.parent.draw.call(that, context);
			that.setImageIndex(0);

		}
	}, global.Entities.Entity);
})(this);
(function (global) {
	'use strict';

	global.PubSub.publish('app/init');
	global.PubSub.publish('app/start');
})(this);