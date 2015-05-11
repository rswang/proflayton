/* 
  Variation of the River Crossing Game
*/

var MetaPlanet = function() {};

MetaPlanet.prototype = {
  preload: function() {
    //planets, trying to take all items to escape

      game.load.image('bg', 'images/planet_minigame/background.png');
      game.load.image('earth', 'images/planet_minigame/earth.png');
      game.load.image('pilot', 'images/planet_minigame/pilot.png');
      game.load.image('spaceship', 'images/planet_minigame/spaceship.png');
      game.load.image('task_box', 'images/planet_minigame/planetpuzzlebox.png');
      game.load.image('no_sign', 'images/planet_minigame/no-sign.png');
      game.load.image('spaceship_rule', 'images/planet_minigame/spaceship_rule.png');
      game.load.image('go', 'images/planet_minigame/goButton.png');
      game.load.image('personThin', 'images/planet_minigame/personThin.png');
      game.load.image('personWide', 'images/planet_minigame/personWide.png');
      game.load.image('black_bg', 'images/bg/black.png');
      game.load.image('planet', 'images/planet_minigame/planet.png');

  },

  create: function() {
      game.add.sprite(0, 0, 'black_bg');
      bg = game.add.sprite(0, 0, 'bg');
      planet  = game.add.sprite(0,0,'planet');
      earth = game.add.sprite(495,250,'earth');
      scaleTo(800,800, planet);
      scaleTo(550,550, earth);  

      //create rules box
      rules = game.add.sprite(300,0,'task_box');
      rule2 = game.add.sprite(610, 30, 'spaceship_rule');
      scaleTo(800, 160, rules);
      scaleTo(800,600, bg);
      scaleTo(150,100, rule2);

      //create rules box text
      game.add.text(350,30, "RULES:", {
        fill: "#FFF",
        font: '20px Helvetica Neue',
      });
      game.add.text(325, 150, "Final Goal: Transport Humans Home", {
          fill: "#FFF",
          font: '24px Helvetica Neue',
          'wordWrap': true,
          'wordWrapWidth': 560
      });      

      cargoGroup = new Phaser.Group(this.game, null, 'cargoGroup', true);

      var cargo = ['personWide', 'personWide', 'personWide',
      'personThin', 'personThin', 'personThin', 'personThin'];

      for (var i = 0; i < cargo.length; i++) {
        var y = i % 2 ? 70 : 10;
        var offset = (i) % 2 ? 0 : 10;
        var x = Math.ceil(i/2) * 35 + offset;
        var people = game.add.sprite(x, y, cargo[i]);
        scaleTo(70,70,people);
        people.inputEnabled = true;
        people.input.enableDrag();
        people.input.useHandCursor = true;
        cargoGroup.add(people);
      }

      ship_start = [70,70];
      ship_end = [450,250];
      spaceship_group = new Phaser.Group(this.game, null, 'spaceship_group', true);
      spaceship = game.add.sprite(ship_start[0], ship_start[1],'spaceship');
      
      spaceship_group.add(spaceship);
      scaleTo(250,250, spaceship);
      tweenX = game.add.tween(spaceship);
      tweenY = game.add.tween(spaceship);
      tweenX.to({x: ship_end[0]}, 1000, Phaser.Easing.Linear.None);
      tweenY.to({y: ship_end[1]}, 1000, Phaser.Easing.Linear.None);

      tweenX2 = game.add.tween(spaceship);
      tweenY2 = game.add.tween(spaceship);
      tweenX2.to({x: ship_start[0]}, 1000, "Linear");
      tweenY2.to({y: ship_start[0]}, 1000, "Linear");

      


      go_button = game.add.button(20, 250, 'go', moveShip);
      go_button.input.useHandCursor = true;
      scaleTo(100,100,go_button);

      pilot = game.add.sprite(spaceship.x+120, spaceship.y+50, 'pilot');
      scaleTo(100, 100, pilot);

      function moveShip(button) {
        if (spaceship.x == ship_start[0]) {          
          tweenX.start();
          tweenY.start();
        }
        else if (spaceship.x == ship_end[0]) {
          tweenX2.start();
          tweenY2.start();
        }
      }
  },

  update: function()  {
    console.log(spaceship_group.children);
    ship = spaceship_group.children[0];
    cargo = cargoGroup.children;
    ship_item = ship;

    pilot.x = ship.x + 120;
    pilot.y = ship.y + 50;

    for (var i = 0; i < cargoGroup.length; i++) {
      var item = cargoGroup.children[i];
      if (calculateDistance(item, ship) < 60 && itemInShip(cargoGroup, ship) <= 1) {
        item.x = ship.x + ship.width/2 - item.width/2;
        item.y = ship.y + ship.height/2 - item.height/2;
        ship_item = item;
      }
    }

    if (cargo[0].x > 540 && cargo[1].x > 540 && cargo[2].x > 540) {
        game.add.text(250,250, "You Win!", {
        fill: "#F0F",
        font: '64px Helvetica Neue',
      });
    }

    if (calculateDistance(cargo[0],cargo[1]) < 100 || calculateDistance(cargo[0], cargo[2]) < 100){
      if ((calculateDistance(cargo[0],ship) > 300 && calculateDistance(cargo[1], ship) > 300) || 
        (calculateDistance(cargo[0],ship) > 300 && calculateDistance(cargo[2], ship) > 300)){
        cargoGroup.destroy();
        spaceship_group.destroy();
        game.state.start("game_over");
  
      }
    }
    // if (calculateDistance(cargo[0], cargo[2]) < 100){
    //   if (calculateDistance(cargo[0],ship) > 300 && calculateDistance(cargo[2], ship) > 300) {
    //     cargoGroup.destroy();
    //     spaceship_group.destroy();
    //     game.state.start("game_over");
    //   }
    // }
  }

};

var calculateDistance = function(sprite1, sprite2) {
    x1 = sprite1.x + (sprite1.width/2);
    x2 = sprite2.x + (sprite2.width/2);
    y1 = sprite1.y + (sprite1.height/2);
    y2 = sprite2.y + (sprite2.height/2);
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

var itemInShip = function(cargoGroup, ship) {
  var numShips = 0;
  for (var i = 0; i < cargoGroup.length; i++) {
      var item = cargoGroup.children[i];
      if (calculateDistance(item,ship) <10){
        numShips+=1;
      }
  }
  return numShips;
}