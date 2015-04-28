var LanguagesNameCryptogram = function() {};

LanguagesNameCryptogram.prototype = {

    preload: function() {
        game.load.image('bg', 'images/start/bg.jpg');

    },

    create: function() {
        game.add.sprite(0, 0, 'bg');
        game.add.text(350, 250, "name cryptogram", {fill: "#fff"});
    },

    update: function() {

    }
};
