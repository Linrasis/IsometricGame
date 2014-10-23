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