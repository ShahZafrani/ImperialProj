(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'imperial');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
    this.game.transparent = true;
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Tech Demo Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'Tune in next week!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'orb');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Imperial v0.26', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click to start. Keep ball away from heart', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -180;
    this.game.add.tween(this.sprite).to({angle: 180}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

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
},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('orb', 'assets/greenOrb.png');
    this.load.image('paddle', 'assets/paddle.png');
    this.load.image('core', 'assets/pixelheart.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])