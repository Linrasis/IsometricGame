(function(global) {
	'use strict';

	global.Entities.Point = new Class({
		x: 5,
		y: 5,
		width: 32,
		height: 32,
		images: [ 'assets/images/point.png', 'assets/images/point-shadow.png' ],
		imageObject: undefined,
		imageShadowObject: undefined,
		init: function() {
			this.imageObject = new Image();
			this.imageShadowObject = new Image();
		},
		render: function(context) {
			var position = this.calculatePosition();

			this.imageObject.src = this.images[0];
			context.drawImage(this.imageObject, position[0], position[1]);
		},
		renderShadow: function(context) {
			var position = this.calculatePosition();

			this.imageShadowObject.src = this.images[1];
			context.drawImage(this.imageShadowObject, position[0], position[1]);
		}
	}, global.Entities.Entity);
})(this);