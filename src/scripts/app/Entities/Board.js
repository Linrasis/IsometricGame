(function(global) {
	'use strict';

	global.Entities.Board = new Class({
		width: 32,
		height: 32,
		images: [ 'assets/images/ground1.png', 'assets/images/ground2.png' ],
		imageObject: undefined,
		horizontalSegments: 15,
		verticalegments: 15,
		init: function() {
			this.imageObject = new Image();
		},
		render: function(context) {
			var i, j, x, y, position;

			this.imageObject.src = this.images[0];

			for(i = 0; i < this.horizontalSegments; i++) {
				for(j = 0; j < this.verticalegments; j++) {
					// var d = Math.pow(Math.sqrt(x - 0) + Math.sqrt(y - 0), 2);

					position = this.calculatePosition(i, j);
					context.drawImage(this.imageObject, position[0], position[1]);
				}
			}
		}
	}, global.Entities.Entity);
})(this);