var LanguagesNameKeyboard = function() {};

var english_alphabet = 'abcdefghijklmnopqrstuvwxyz';

LanguagesNameKeyboard.prototype = {

    preload: function() {
        game.load.image('bg', 'images/languages/puzzle2/bg.png');
        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('keyboard', 'images/languages/puzzle2/keyboard.png');
        game.load.image('person', 'images/languages/puzzle2/person.png');
        game.load.image('blank', 'images/languages/puzzle2/blank.png');

        game.load.image('right', 'images/dialogue/right-arrow.png');
        game.load.image('left', 'images/dialogue/left-arrow.png');
    },

    create: function() {
        game.playerState.currentState = 'languages_name_keyboard';


        bg = game.add.sprite(0, 0, 'bg');

        var dialogue = game.add.sprite(110, 500, 'dialogue');
        game.add.text(120, 510, "Welcome aboard! Please enter your name.\n\n" + 
                "[Press > to proceed after entering name.]", {
            fill: "#000",
            font: '16px Helvetica Neue',
            'wordWrap': true,
            'wordWrapWidth': 560
        });

        var keyboard = game.add.sprite(50, 50, 'keyboard');
        scaleTo(700, 600, keyboard);

        var lettersGroup = new Phaser.Group(this.game, null, 'lettersGroup', true);

        var typed = [];
        var typedDisplay = [];

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
            if (typed.length < 6) {
                typed.push(button.letter);
                var guessLetter = game.add.text(200 + 30*typed.length, 100, button.letter, {
                    fill: "#7AF5F5",
                    font: '30px Helvetica Neue',
                    'wordWrap': true,
                    'wordWrapWidth': 560
                });
                typedDisplay.push(guessLetter);
            }
        }

        var leftButton = game.add.button(590, 85, 'left', deleteLetter);
        var rightButton = game.add.button(795, 300, 'right', enterName);
        leftButton.input.useHandCursor = true;
        rightButton.anchor.setTo(1.0, 0.5);
        rightButton.input.useHandCursor = true;

        function deleteLetter() {
            typed.pop();
            typedDisplay.pop().destroy();
        }

        function enterName() {
            game.playerState.name = typed.join("");
            game.state.start('languages_name_cryptogram');
        }
    },

    update: function() {

    }
};
