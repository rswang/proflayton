var LanguagesNameKeyboard = function() {};

var english_alphabet = 'abcdefghijklmnopqrstuvwxyz';

LanguagesNameKeyboard.prototype = {

    preload: function() {
        game.load.image('bg', 'images/languages/puzzle2/bg.png');
        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('keyboard', 'images/languages/puzzle2/keyboard.png');
        game.load.image('person', 'images/languages/puzzle2/person.png');
        game.load.image('blank', 'images/languages/puzzle2/blank.png');

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

        var typed = [];

        var index = 0;
        createLetters(95, 215, 50, 12, 3, 3);
        createLetters(525, 215, 50, 12, 3, 3);
        createLetters(280, 245, 50, 12, 4, 2);

        function createLetters(x, y, size, margin, dimX, dimY) {
            for (var i = 0; i < dimX; i++) {
                for (var j = 0; j < dimY; j++) {
                    game.add.text(x + i*(size+margin) + 15, y + j*(size+margin) + 5, english_alphabet[index], {
                        fill: "#7AF5F5",
                        font: '30px Helvetica Neue',
                        'wordWrap': true,
                        'wordWrapWidth': 560
                    });
                    var letter = game.add.button(x + i*(size+margin), y + j*(size+margin), 'blank', clickLetter);
                    letter.letter = english_alphabet[index];
                    scaleTo(size, size, letter);
                    letter.input.useHandCursor = true;
                    lettersGroup.add(letter);
                    index++;
                }
            }
        }

        function clickLetter(button) {
            typed.push(button.letter);
            var guessLetter = game.add.text(200 + 30*typed.length, 100, button.letter, {
                fill: "#7AF5F5",
                font: '30px Helvetica Neue',
                'wordWrap': true,
                'wordWrapWidth': 560
            });

        }
    },

    update: function() {

    }
};
