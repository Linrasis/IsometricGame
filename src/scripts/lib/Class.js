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
		}

		Class.prototype.parent = Class;
		Class.__super__ = Class.__proto__;

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