(function(global) {
	'use strict';

	global.Entities.Player = new Class({
		width: 32,
		height: 32,
		images: [ 'assets/images/player1.png', 'assets/images/player2.png' ],
		image1Object: undefined,
		image2Object: undefined,
		speed: 5,
		init: function() {
			this.image1Object = new Image();
			this.image2Object = new Image();
		},
		render: function(context) {
			var position = this.calculatePosition();

			this.image1Object.src = this.images[0];
			context.drawImage(this.image1Object, position[0], position[1]);
		},
		renderShadow: function(context) {
			var position = this.calculatePosition();

			this.image2Object.src = this.images[1];
			context.drawImage(this.image2Object, position[0], position[1]);
		}
	}, global.Entities.Entity);
})(this);