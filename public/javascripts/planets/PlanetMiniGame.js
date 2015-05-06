/* 
  Variation of the River Crossing Game
*/

var PlanetMiniGame = function() {};

PlanetMiniGame.prototype = {
  preload: function() {
    //planets, trying to take all items to escape

      game.load.image('bg', 'images/planet_minigame/background.png');
      game.load.image('m_green', 'images/planet_minigame/monster_green.png');
      game.load.image('m_purple', 'images/planet_minigame/monster_purple.png');
      game.load.image('m_red', 'images/planet_minigame/monster_red.png');
      game.load.image('m_yellow', 'images/planet_minigame/monster_yellow.png');
      game.load.image('spaceship', 'images/planet_minigame/spaceship.png');
      game.load.image('task_box', 'images/planet_minigame/planetpuzzlebox.png');
      game.load.image('no_sign', 'images/planet_minigame/no-sign.png');
      game.load.image('yes_sign', 'images/planet_minigame/sign.png');

      game.load.image('black_bg', 'images/bg/black.png');
      game.load.image('dialogue', 'images/dialogue/dialogue.png');

  },

  create: function() {
      game.add.sprite(0, 0, 'black_bg');
      bg = game.add.sprite(0, 0, 'bg');
      rules = game.add.sprite(300,0,'task_box')
      scaleTo(800, 160, rules);
      scaleTo(800,600, bg);

      var dialogue = game.add.sprite(100, 500, 'dialogue');
      game.add.text(110, 510, "The Alien King has decided that you are smart enough to be promoted to Chief Goods Transporter. You have no choice but to follow his instructions to save your own life", {
          fill: "#000",
          font: '16px Helvetica Neue',
          'wordWrap': true,
          'wordWrapWidth': 560
      });

      var goal = "Transport all space creature to the royal palace with everyone intact. You can take one creature at a time on your spaceship.";
      var clues = ['Red fights with Yellow', 'Green fights with Yellow', 'Purple fights with Green', 'Purple is afraid of yellow, so if yellow is present, Purple will not fight with Green'];
      //Goal: Restrictions: unless you are there,
        

      var MonsterGroup = new Phaser.Group(this.game, null, 'monsterGroup', true);
      var dog = 'm_green';
      var elephant = 'm_purple';
      var mouse = 'm_red';
      var cat = 'm_yellow';
      var spaceship = 'spaceship';

  },

  update: function()  {

  }

};