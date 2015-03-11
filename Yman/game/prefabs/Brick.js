'use strict';

var Brick = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'brick', frame);

  // initialize your prefab here
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
    this.scale.setTo(3,1);
  
};

Brick.prototype = Object.create(Phaser.Sprite.prototype);
Brick.prototype.constructor = Brick;

Brick.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Brick;
