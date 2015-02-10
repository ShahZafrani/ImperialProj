
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.radiusVal = 200;
      this.sprite = this.game.add.sprite(this.radiusVal, 600, 'paddle');
        this.Ballsprite = this.game.add.sprite(499,200, 'orb');
        this.sprite.anchor.setTo(.5,.5);
      this.sprite.inputEnabled = true;
      this.game.physics.arcade.enable(this.sprite);
        this.game.physics.arcade.enable(this.Ballsprite);
      this.sprite.body.collideWorldBounds = false;
      this.Ballsprite.body.bounce.setTo(1,1);
      this.sprite.pivot.x = 100;
      this.sprite.pivot.y = 500;
      this.Ballsprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      this.Ballsprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);
        this.Ballsprite.body.collideWorldBounds = true;

      this.sprite.events.onInputDown.add(this.clickListener, this);
        this.input = this.game.input.keyboard.createCursorKeys();
        
    },
    update: function() {
        this.HandleInput();
    },
    clickListener: function() {
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
    this.sprite.rotation -=.03;
    },
    MovePlayerRight : function() {
        this.sprite.rotation +=.03;
    }
  };
  
  module.exports = Play;