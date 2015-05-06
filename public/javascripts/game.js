// Initialize Phaser and create a game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', null, true);

var gameStates = {
  start: Start,

  // languages
  languages_open_portal: LanguagesOpenPortal,
  languages_name_cryptogram: LanguagesNameCryptogram,
  planet_mini_game: PlanetMiniGame,
  // add more game states here
};

// Global player data for passing information between states
game.playerState = new PlayerState();

// Add all registered states to the game object
Object.keys(gameStates).forEach(function(stateName) {
  var stateConstructor = gameStates[stateName];
  game.state.add(stateName, stateConstructor);
});

game.state.start('planet_mini_game');