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