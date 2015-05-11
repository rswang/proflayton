/* 
  Variation of the River Crossing Game
*/

var PlanetDialogue = function() {};

PlanetDialogue.prototype = {
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
        'My, you did every very well learning about our language! If you\’re going to return home, though, you\’ll need some training in commanding a ship!' 
        + '\n \nWhat, you didn\’t think we were going to spend the time to actually bring you back ourselves, did you?',
        'For some practice, you can run some errands we\’ve been needing done! We have some cargo that simply needs transporting to a few nearby planets-- no trouble at all! Well, if you don\’t factor in that some of the cargo will need to be supervised...you’ll see.',
        'Your first task will be to transport this space-dog and his two bags of space-biscuits to their home planet, BARK. \n\nSounds easy, right? \n\nWell, your ship has space enough for only one piece of cargo at a time (so either the space-dog or one bag of biscuits). And if you leave the dog alone with either bag of biscuits, he’s sure to eat them and ruin his appetite! So you\’ll need to avoid doing that. \n\nAre you up to the task? Let\’s hope so, or else you\’ll NEVER get back to Earth!”',
        'Goal: Transport Space-dog and two bags of biscuits \nThe Catch:\n           - One piece of cargo on the ship at a time \n           -The dog cannot be left alone with the biscuits'
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
      game.state.start('planet_mini_game');
    }

  },

  update: function()  {

  }

};

