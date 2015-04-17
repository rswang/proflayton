var Start = function() {};

Start.prototype = {

    preload: function() {
        game.load.image('bg', 'images/start/bg.jpg');
    },

    create: function() {
        game.add.sprite(0, 0, 'bg');
        game.add.text(350, 250, "proflayton", {fill: "#fff"});
    },

    update: function() {

    }
};
