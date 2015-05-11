/* 
  Variation of the River Crossing Game
*/

var MetaPlanetDialogue = function() {};

MetaPlanetDialogue.prototype = {
  preload: function() {
    //planets, trying to take all items to escape

      game.load.image('bg', 'images/languages/puzzle1/p1wallscreen.png');

      game.load.image('black_bg', 'images/bg/black.png');
      game.load.image('arrow_left', 'images/dialogue/left-arrow.png');
      game.load.image('arrow_right', 'images/dialogue/right-arrow.png');
      game.load.image('start', 'images/dialogue/startButton.png');
  },

  create: function() {
      game.add.sprite(0, 0, 'black_bg');
      bg = game.add.sprite(0, 0, 'bg');
      scaleTo(800, 600, bg);
      
      i = 0;
      var dialogue = [
        "You\’ve done it! Now all that\’s left is to actually transport them. To make the process easier, we\’ve gone ahead and woken them up, so they\’ll be able to co-pilot for you. Unfortunately, that also means they\’re going to be interacting with each other, and some of them don\’t really get along. In particular, you can NEVER let the lighter humans outnumber the heavier humans and leave them unattended, or else the lighter humans will outsmart the heavier humans and murder them.",
        "As before, you\’ve got a ship which can hold at most one passenger, and can also have a co-pilot -- however, this time, you don\’t NEED a co-pilot. Any of the lighter humans can serve as co-pilot, and any of the humans may sit in back as a passenger. Hurry up and get back to Earth -- and get these pesky humans out of our hair for good.",
        "Goal: Transport all 7 humans (and yourself) back to Earth. \nThe Catch:\n           - Only a light human can be a co-pilot. \n           -Never let the lighter humans outnumber the heavier humans when left unattended" 
      ];

      text = game.add.text(110, 110, dialogue[i], {
        fill: "#FFF",
        font: "16px Helvetica Neue",
        'wordWrap': true,
        'wordWrapWidth': 600
      })

    arrow_left = game.add.button(70, 250, 'arrow_left', dialogueBackwards);
    arrow_right = game.add.button(700, 250, 'arrow_right', dialogueForwards);
    scaleTo(50,50, arrow_left);
    scaleTo(50,50, arrow_right);
    arrow_left.input.useHandCursor = true;
    arrow_right.input.useHandCursor = true;

    function dialogueBackwards(button) {
      if (i > 0){
        i -= 1;
        text.setText(dialogue[i]);
      }  
      
    }

    function dialogueForwards(button) {
      if (i == dialogue.length - 2) {
          i+=1
          arrow_left.destroy();
          arrow_right.destroy();
          start_game = game.add.button(300, 250, 'start', nextGame);
          start_game.input.useHandCursor = true;
          text.setText(dialogue[i]);
        }
      if (i < dialogue.length -2){
        i += 1;
        text.setText(dialogue[i]);


      }
    }

    function nextGame(button) {
      game.state.start('meta_planet');
    }

  },

  update: function()  {

  }

};
