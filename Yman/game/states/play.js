
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.radiusVal = 200;
      this.sprite = this.game.add.sprite(0, 600, 'paddle');
      this.coreSprite = this.game.add.sprite(0,472, 'core');
      this.Ballsprite = this.game.add.sprite(499,200, 'orb');
      this.sprite.pivot.x = 0;
      this.sprite.pivot.y = 600;
      this.sprite.scale.setTo(.2,.4);
      this.coreSprite.scale.setTo(4,4);
      this.sprite.anchor.setTo(.5,.5);
      this.sprite.inputEnabled = true;
      this.game.physics.arcade.enableBody(this.sprite);
      this.game.physics.arcade.enable(this.Ballsprite);
      this.game.physics.arcade.enable(this.coreSprite);
      this.sprite.body.collideWorldBounds = false;
      this.Ballsprite.body.bounce.setTo(1,1);
      this.sprite.body.allowRotation = true;
      this.Ballsprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      this.Ballsprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);
        this.Ballsprite.body.collideWorldBounds = true;
        //this.sprite.body.blocked.left = true;
        //this.sprite.body.blocked.right= true;
        this.sprite.body.immovable = true;

      //this.sprite.events.onInputDown.add(this.clickListener, this);
        this.input = this.game.input.keyboard.createCursorKeys();
        this.rotSpeed = 1.2;
        
    },
    update: function() {
        this.HandleInput();
        this.game.physics.arcade.collide(this.sprite, this.Ballsprite);
        if(this.game.physics.arcade.collide(this.Ballsprite, this.coreSprite))
          {this.EndGame();}

    },
    EndGame: function() {
      console.log("EndGame was Called");
      this.game.state.start('gameover');
    },
    HandleInput : function () {
        if (this.input.left.isDown)
        {
            this.MovePlayerLeft();
        }
        if (this.input.right.isDown)
        {
            this.MovePlayerRight();
        }
    
    },
    MovePlayerLeft : function() {
      if (this.sprite.body.rotation >0){
    this.sprite.body.rotation -= this.rotSpeed;
    console.log(this.sprite.body.rotation);
      }
    },
    MovePlayerRight : function() {
      if(this.sprite.body.rotation <91){
        this.sprite.body.rotation += this.rotSpeed;
        console.log("moved right");
    }
  }
  };
  
  module.exports = Play;