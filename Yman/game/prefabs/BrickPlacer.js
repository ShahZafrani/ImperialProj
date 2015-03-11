'use strict';

var BrickPlacer = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'null', frame);

  // initialize your prefab here
  
};

BrickPlacer.prototype = Object.create(Phaser.Sprite.prototype);
BrickPlacer.prototype.constructor = BrickPlacer;

BrickPlacer.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = BrickPlacer;
