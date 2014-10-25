(function(global) {
	'use strict';

	global.Entities.Board = new Class({
		extend: function () { return global.Entities.Entity; },
		width: 32,
		height: 32,
		z: -32,
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