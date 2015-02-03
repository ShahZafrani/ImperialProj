BasicGame.MainMenu = function(){ }; 
 
BasicGame.MainMenu.prototype = { 
    preload : function(){ 
    // load basic assets for this state 
    
    this.load.image('name','assets/menu.png'); 
    
    }, 
 
    create : function(){ 
 
    // place the assets and elements in their initial positions, create the state 
 
    this.menuIcon = this.add.sprite(0,0,'menu'); 
 
    }, 
 
    update : function(){ 
 
    // your game loop goes here 
        //if (input.space.isDown)
          //  this.state.start(mainGame);
  
    } 
}