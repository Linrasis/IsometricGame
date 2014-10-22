(function (global) {
	'use strict';

	global.PubSub.publish('app/init');
	global.PubSub.publish('app/start');





	// var canvas = document.getElementById('canvas');
	// var context = canvas.getContext('2d');

	// var image = new Image();
	// image.src = 'assets/images/block.png';

	// var image2 = new Image();
	// image2.src = 'assets/images/block2.png';
	
	// var image3 = new Image();
	// image3.src = 'assets/images/ball.png';

	// var image4 = new Image();
	// image4.src = 'assets/images/shadow.png';


	// var image6 = new Image();
	// image6.src = 'assets/images/block2-2.png';


	// var tileWidth = 32;
	// var tileHeight = 32;

	// var keysDown = {},
	// 	_KEYS = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, SPACE: 32 };

	// var x = 0, 
	// 	y = 0, 
	// 	z = 0;

	// document.addEventListener("keydown", function (e) {
	// 	keysDown[e.keyCode] = true;
	// }, false);

	// document.addEventListener("keyup", function (e) {
	// 	delete keysDown[e.keyCode];
	// }, false);



	// setInterval(function() {
	// 	context.clearRect(0, 0, 1000, 600);

	// 	if (_KEYS.UP in keysDown) {
	// 		y -= 1 * 0.05;
	// 	}
	// 	if (_KEYS.DOWN in keysDown) {
	// 		y += 1 * 0.05;
	// 	}
	// 	if (_KEYS.LEFT in keysDown) {
	// 		x -= 1 * 0.05;
	// 	}
	// 	if (_KEYS.RIGHT in keysDown) {
	// 		x += 1 * 0.05;
	// 	}

	//     for(var i = 0; i < 15; i++) {
	//         for(var j = 0; j < 15; j++) {
	//             a(i, j, 0);
	//         }
	//     }

	//     b1(5, 5, 1);

	//     if (x < 5 || y < 5) {
	//     	b(x, y, 1);
	// 		c(5, 5, 1);
	//     }
	//     else {
	//     	c(5, 5, 1);
	//     	b(x, y, 1);
	//     }

		
	//     b(x, y, 1, true);

		

		



	// }, 10);

	// 	function a (x, y, z) {
	// 		// var d = Math.pow(Math.sqrt(x - 0) + Math.sqrt(y - 0), 2);
 //            var a = parseFloat((x - y) * tileWidth);
 //            var b = parseFloat((x + y) * tileHeight / 2) + (z * tileHeight);

	// 		a += 500;

	//     	context.drawImage(image, a, b);
	// 	}


	// 	function b (x, y, z, h) {
	// 		// var d = Math.pow(Math.sqrt(x - 0) + Math.sqrt(y - 0), 2);
 //            var a = parseFloat((x - y) * tileWidth);
 //            var b = parseFloat((x + y) * tileHeight / 2) + (z * tileHeight);

	// 		a += 500;

	// 		if (h) {
	// 			context.drawImage(image6, a, b);
	// 		}
	// 		else {
	//     		context.drawImage(image2, a, b);
	// 		}
	// 	}
	// 	function b1 (x, y, z) {
	// 		// var d = Math.pow(Math.sqrt(x - 0) + Math.sqrt(y - 0), 2);
 //            var a = parseFloat((x - y) * tileWidth);
 //            var b = parseFloat((x + y) * tileHeight / 2) + (z * tileHeight);

	// 		a += 500;

	//     	context.drawImage(image4, a, b);
	// 	}


	// 	function c (x, y, z) {
	// 		// var d = Math.pow(Math.sqrt(x - 0) + Math.sqrt(y - 0), 2);
 //            var a = parseFloat((x - y) * tileWidth);
 //            var b = parseFloat((x + y) * tileHeight / 2) + (z * tileHeight);

	// 		a += 500;

	//     	context.drawImage(image3, a, b);
	// 	}

	



	// var blocks = [];

	// var Block = function(x, y, z) {
	//      this.x = x;
	//     this.y = y;
	//     this.z = z;
	//     this.image = new Image();
	//     this.image.src = 'http://s14.postimage.org/540ysmvhp/block.png';
	// };

	// Block.prototype.draw = function() {
	//     var x = (this.x - this.y) * tileWidth;
	//     var y = (this.x + this.y) * tileHeight / 2 + this.z;
	//     context.drawImage(this.image, x, y);
	// };

	// var drawMap = function() {
	//     // for(var i = 0; i < 2; i++) {
	//     //     for(var j = 0; j < 2; j++) {
	//     //         var x = (i - j) * tileWidth;
	//     //         var y = (i + j) * tileHeight / 2;
	//     //         context.drawImage(image, x, y);
	//     //     }
	//     // }
	    
	//     for(var i = 0; i < blocks.length; i++) {
	//         blocks[i].draw();
	//     }
	// };

	// window.onload = function() {
	    
	//     blocks.push(new Block(0, 0, 0));
	//     // blocks.push(new Block(1, 0, 0));
	//     drawMap();
	// };
})(this);