'use strict';

var Player = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'brick', frame);
  //this.tint = 0xD3D3D3;
  this.scale.setTo(.6,.7);
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);
  this.pivot.x = 0;
  this.pivot.y = 600;
  this.inputEnabled = true;
  this.body.allowRotation = true;
  this.body.immovable = true;
  this.rotSpeed = 1.5;
  this.keys = this.game.input.keyboard.createCursorKeys();
  // initialize your prefab here
  
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.HandleInput = function()
{
	if (this.keys.left.isDown)
        {
            this.MovePlayerLeft();
        }
        if (this.keys.right.isDown)
        {
            this.MovePlayerRight();
        }
};
    Player.prototype.MovePlayerLeft = function() {
      if (this.body.rotation >0){
    this.body.rotation -= this.rotSpeed;
    console.log(this.body.rotation);
      }
    };
    Player.prototype.MovePlayerRight = function() {
    	console.log("MoveRigh Called");
      if (this.body.rotation <90){
    this.body.rotation += this.rotSpeed;
    console.log(this.body.rotation);
      }
    };
Player.prototype.update = function() {
  
  // write your prefab's specific update code here
  this.HandleInput();
};

module.exports = Player;
