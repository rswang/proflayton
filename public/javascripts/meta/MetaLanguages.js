var MetaLanguages = function() {};

MetaLanguages.prototype = {

    preload: function() {
        game.load.image('bg', 'images/languages/puzzle2/bg.png');

        game.load.image('s1', 'images/languages/symbols/1.png');
        game.load.image('s2', 'images/languages/symbols/2.png');
        game.load.image('s3', 'images/languages/symbols/3.png');
        game.load.image('s4', 'images/languages/symbols/4.png');
        game.load.image('s5', 'images/languages/symbols/5.png');
        game.load.image('s6', 'images/languages/symbols/6.png');
        game.load.image('s7', 'images/languages/symbols/7.png');
        game.load.image('s8', 'images/languages/symbols/8.png');
        game.load.image('s9', 'images/languages/symbols/9.png');

    },

    create: function() {
        bg = game.add.sprite(0, 0, 'bg');
        scaleTo(800, 600, bg);

        createLetters(280, 200, 50, 12, 4, 1, ['s1', 's2', 's3', 's4']);
        createLetters(280, 260, 50, 12, 4, 1, ['s4', 's5', 's6', 's2']);
        createLetters(218, 330, 50, 12, 5, 1, ['s4', 's5', 's3', 's2', 's7']);

        function createLetters(x, y, size, margin, dimX, dimY, symbols) {
            var index = 0;
            for (var i = 0; i < dimX; i++) {
                for (var j = 0; j < dimY; j++) {
                    var letter = game.add.sprite(x + i*(size+margin), y + j*(size+margin), symbols[index]);
                    scaleTo(size, size, letter);
                    // letter.inputEnabled = true;
                    // letter.input.useHandCursor = true;
                    index++;
                }
            }
        }

    },

    update: function() {

    }
};