(function(global) {
	'use strict';

	global.Entities = global.Entities || {};
	global.Entities.Entity = new Class(true, {
		x: 0,
		y: 0,
		width: undefined,
		height: undefined,
		render: function(context) {},
		calculatePosition: function (x, y) {
			x = x || this.x;
			y = y || this.y;

			return [
				parseFloat((x - y) * this.width) + 500,
				parseFloat((x + y) * this.height / 2) + this.height
			];
		}
	});

})(this);