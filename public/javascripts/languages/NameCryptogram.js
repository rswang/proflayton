var LanguagesNameCryptogram = function() {};

var alphabet = 'mnbvghjklcxzasdfqwertypoiu';

LanguagesNameCryptogram.prototype = {

    preload: function() {
        game.load.image('bg', 'images/languages/puzzle2/bg.png');
        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('keyboard', 'images/languages/puzzle2/keyboard.png');
        game.load.image('person', 'images/languages/puzzle2/person.png');

        for (var index = 0; index < alphabet.length; index++) {
            var letter = alphabet[index];
            game.load.image(letter, 'images/languages/puzzle2/alphabet/' + letter + '.png');

        }

    },

    create: function() {


        bg = game.add.sprite(0, 0, 'bg');

        var dialogue = game.add.sprite(100, 500, 'dialogue');
        game.add.text(110, 510, "Welcome aboard! Please enter your name.", {
            fill: "#000",
            font: '16px Helvetica Neue',
            'wordWrap': true,
            'wordWrapWidth': 560
        });

        var keyboard = game.add.sprite(50, 50, 'keyboard');
        scaleTo(700, 600, keyboard);
        
        var lettersGroup = new Phaser.Group(this.game, null, 'lettersGroup', true);

        var guesses = [];

        var index = 0;
        createLetters(95, 215, 50, 12, 3, 3);
        createLetters(525, 215, 50, 12, 3, 3);
        createLetters(280, 245, 50, 12, 4, 2);

        function createLetters(x, y, size, margin, dimX, dimY) {
            for (var i = 0; i < dimX; i++) {
                for (var j = 0; j < dimY; j++) {
                    var letter = game.add.button(x + i*(size+margin), y + j*(size+margin), alphabet[index], clickLetter);
                    scaleTo(size, size, letter);
                    letter.input.useHandCursor = true;
                    lettersGroup.add(letter);
                    index++;
                }
            }
        }

        function clickLetter(button) {
            guesses.push(button.key);
            var guessLetter = game.add.sprite(200 + 50*guesses.length, 100, button.key);

        }
    },

    update: function() {

    }
};
