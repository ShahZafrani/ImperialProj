
  'use strict';
  var Player = require('../prefabs/Player')
  var Brick = require('../prefabs/Brick')
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.testBrick1 = new Brick(this.game, 100, 440);
      this.testBrick2 = new Brick(this.game, 160, 440);
      //this.BrickGroup = this.game.add.group();
      this.testBrick2.anchor.setTo(.5,.5);
      this.testBrick2.rotation = 90;
      this.game.add.existing(this.testBrick1);
      this.game.add.existing(this.testBrick2);
      //this.BrickGroup.add(testBrick1);
      //this.BrickGroup.add(testBrick2);
      this.radiusVal = 200;
      this.Player1 = new Player(this.game, 0, 600);
      this.game.add.existing(this.Player1);
      this.coreSprite = this.game.add.sprite(0,472, 'core');
      this.Ballsprite = this.game.add.sprite(499,200, 'orb');
      this.coreSprite.scale.setTo(4,4);
      this.game.physics.arcade.enable(this.Ballsprite);
      this.game.physics.arcade.enable(this.coreSprite);
      this.Ballsprite.body.bounce.setTo(1,1);
      this.Ballsprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      this.Ballsprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);
        this.Ballsprite.body.collideWorldBounds = true;
        
    },
    update: function() {
        if(this.game.physics.arcade.collide(this.testBrick1, this.Ballsprite))
          {this.testBrick1.destroy();}
        if(this.game.physics.arcade.collide(this.testBrick2, this.Ballsprite))
          {this.testBrick2.destroy();}
          //this.game.physics.arcade.collide(this.testBrick1, this.Ballsprite);
         //   this.game.physics.arcade.collide(this.testBrick2, this.Ballsprite);
        this.game.physics.arcade.collide(this.Player1, this.Ballsprite);
        if(this.game.physics.arcade.collide(this.Ballsprite, this.coreSprite))
          { 
            this.EndGame();}

    },
    EndGame: function() {
      console.log("EndGame was Called");
      //this.Player1.keys.destroy();
      this.Player1.kill();
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;