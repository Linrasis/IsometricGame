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