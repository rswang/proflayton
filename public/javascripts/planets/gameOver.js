/* 
  Variation of the River Crossing Game
*/

var gameOver = function() {};

gameOver.prototype = {
  preload: function() {
    //planets, trying to take all items to escape

      game.load.image('black_bg', 'images/bg/black.png');
      game.load.image('go', 'images/planet_minigame/goButton.png');

  },

  create: function() {
    game.playerState.currentState = 'start';
    
    bg = game.add.sprite(0, 0, 'black_bg');
  
    scaleTo(800, 600, bg);
    
    game_over = game.add.text(270, 250, "GAME OVER", {
        fill: "#0FF",
        font: '48px Helvetica Neue',
    });
  

    

    tryAgain = game.add.button(350, 300, 'black_bg', startOver)   
    scaleTo(400,110,tryAgain);
    tryAgain.input.useHandCursor = true;
    
    text = game.add.text(350, 300, "try again?", {
      fill: "#FFF",
      font: "32px Helvetica Neue",
    })

    function startOver(button) {
      game.state.start('planet_mini_game')
      
    }


  },

  update: function()  {

  }

};

