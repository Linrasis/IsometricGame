(function (global) {
	'use strict';

	global.PubSub.publish('app/init');
	global.PubSub.publish('app/start');
})(this);