/* 
  Variation of the River Crossing Game
*/

var MetaPlanet = function() {};

MetaPlanet.prototype = {
  preload: function() {
    //planets, trying to take all items to escape

      game.load.image('bg', 'images/planet_minigame/background.png');
      game.load.image('earth', 'images/meta/earth.png');
      game.load.image('pilot', 'images/planet_minigame/pilot.png');
      game.load.image('spaceship', 'images/planet_minigame/spaceship.png');
      game.load.image('task_box', 'images/planet_minigame/planetpuzzlebox.png');
      game.load.image('no-people', 'images/meta/no-people.png');
      game.load.image('spaceship_rule_meta', 'images/meta/spaceship_rule_meta.png');
      game.load.image('go', 'images/planet_minigame/goButton.png');
      game.load.image('personThin', 'images/meta/personThin.png');
      game.load.image('personWide', 'images/meta/personWide.png');
      game.load.image('black_bg', 'images/bg/black.png');
      game.load.image('planet', 'images/meta/planet.png');

  },

  create: function() {
      game.add.sprite(0, 0, 'black_bg');
      bg = game.add.sprite(0, 0, 'bg');
      planet  = game.add.sprite(0,0,'planet');
      earth = game.add.sprite(495,250,'earth');
      scaleTo(160,160, planet);
      scaleTo(550,550, earth);  

      //create rules box
      rules = game.add.sprite(300,0,'task_box');
      rule1 = game.add.sprite(450,30, 'no-people');
      rule2 = game.add.sprite(610, 30, 'spaceship_rule_meta');
      scaleTo(800, 160, rules);
      scaleTo(800,600, bg);
      scaleTo(150,100, rule1);
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
        var x = Math.ceil(i/2) * 30 + offset;
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
    ship = spaceship_group.children[0];
    cargo = cargoGroup.children;//0-2 is wide, 3-6 is thin
    ship_item = ship;

    pilot.x = ship.x + 120;
    pilot.y = ship.y + 50;
    items_in_ship = [];

    //check items put in spaceship are correct
    for (var i = 0; i < cargoGroup.length; i++) {
      var item = cargoGroup.children[i];
      if (calculateDistance(item, ship) < 60 && itemInShip(cargoGroup, ship) <= 2) {
        items_in_ship.push(item);

        items_in_ship[0].x = ship.x + ship.width/3 - items_in_ship[0].width/2;
        items_in_ship[0].y = ship.y + ship.height/2 - items_in_ship[0].height/2;

        if (items_in_ship.length == 2) {
          if ((items_in_ship[0].key == 'personWide') && (items_in_ship[1].key == 'personThin') ||
            (items_in_ship[0].key == 'personThin') && (items_in_ship[1].key == 'personThin')) {
              items_in_ship[1].x = ship.x + ship.width/2 - items_in_ship[1].width/2;
              console.log("x",items_in_ship[1].x)
              console.log("y", items_in_ship[1].y)
              items_in_ship[1].y = ship.y + ship.height/2 - items_in_ship[1].height/2;
          }
        }
      }
    }

    //check items on planets are correct
    console.log(calculateDistance(planet,ship))
    if ((isLightMore(cargoGroup, planet) && calculateDistance(planet, ship) > 200)|| 
      (isLightMore(cargoGroup, earth) && calculateDistance(earth,ship)> 200)) {
        cargoGroup.destroy();
        spaceship_group.destroy();
        game.state.start("game_over_meta");
    }
    
  }

};

var calculateDistance = function(sprite1, sprite2) {
    x1 = sprite1.x + (sprite1.width/2);
    x2 = sprite2.x + (sprite2.width/2);
    y1 = sprite1.y + (sprite1.height/2);
    y2 = sprite2.y + (sprite2.height/2);
    // console.log("xi", x1)
    // console.log(x2)
    // console.log("y1", y1)
    // console.log("y2", y2)
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

function isLightMore(cargoGroup, planet) {
  var numLightOnPlanet = 0;
  var numWideOnPlanet = 0;

  for (var i = 0; i < cargoGroup.length; i++) {
    var sprite = cargoGroup.children[i];
    if (checkOverlap(sprite, planet)) {
      if (sprite.key == 'personThin') {
        numLightOnPlanet += 1;
      } 
      if (sprite.key == 'personWide') {
        numWideOnPlanet += 1;
      }
    }
  }
  return (numLightOnPlanet > numWideOnPlanet);
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
