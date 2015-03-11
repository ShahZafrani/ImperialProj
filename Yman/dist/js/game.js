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
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'orb');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Imperial v0.3', style);
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

},{}],7:[function(require,module,exports){

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
},{"../prefabs/Brick":2,"../prefabs/Player":3}],8:[function(require,module,exports){

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
    this.load.image('brick', 'assets/brick.png');

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