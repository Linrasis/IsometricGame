(function(global) {
	'use strict';

	global.Entities.Point = new Class({
		width: 32,
		height: 32,
		z: 16,
		speed: 16,
		init: function() {
			this.setPositionIndexes(4, 4);
			this.prepareIndexesToPosition();

			this.parent.init.call(this);
		},
		draw: function(context) {
			context.fillStyle = '#000000';
			context.beginPath();
			context.arc(this.x + this.width, this.y + this.height * 1.5, 32 / 4, 0, 2 * Math.PI);
			context.closePath();
			context.fill();
		},
		drawShadow: function(context) {
			context.fillStyle = 'rgba(0, 0, 0, 0.2)';
			context.beginPath();
			context.arc(this.x + this.width, this.y + this.height * 1.5 + this.z, 32 / 4, 0, 2 * Math.PI);
			context.closePath();
			context.fill();
			context.fillStyle = '#000000';
		}
	}, global.Entities.Entity);
})(this);