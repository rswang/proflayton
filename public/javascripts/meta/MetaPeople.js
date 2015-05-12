
var MetaPeople = function() {};

MetaPeople.prototype = {

    preload: function() {
        game.load.image('bg', 'images/languages/puzzle2/bg.png');

        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('right', 'images/dialogue/right-arrow.png');
        game.load.image('person', 'images/languages/puzzle2/person.png');


    },

    create: function() {
        game.playerState.currentState = 'meta_languages';
        
        bg = game.add.sprite(0, 0, 'bg');
        scaleTo(1000, 1000, bg);

        createLetters(100, 200, 200, 12, 7, 1, ['person', 'person','person','person','person','person','person']);

        function createLetters(x, y, size, margin, dimX, dimY, symbols) {
            var index = 0;
            for (var i = 0; i < dimX; i++) {
                for (var j = 0; j < dimY; j++) {
                    var letter = game.add.sprite(x + i*(70+margin), y + j*(size+margin), symbols[index]);
                    scaleTo(size, size, letter);
                    // letter.inputEnabled = true;
                    // letter.input.useHandCursor = true;
                    index++;
                }
            }
        }

        var dialogues = ["Very good! Yes, you’ll need to transport 7 humans back with you.",
        "However, as you know, humans can vary quite a bit with how much they weigh, and the ship you’ll be using is very sensitive about how much the co-pilot can weigh vs. someone sitting in the back.",
        "Accordingly, you’ll need to figure out which of your brethren weighs enough that he has to sit in the back, and which can ride up front with you! You’ve got your trusty balance scale to help with this problem -- things might be easier if they weren’t in deep hibernation and you could just ask them!"]


        var dialogue_index = 0;
        var dialogue = game.add.sprite(110, 500, 'dialogue');

        var diaText = game.add.text(120, 510, dialogues[dialogue_index], { fill: "#000", font: '16px Helvetica Neue', 'wordWrap': true, 'wordWrapWidth': 560 });
        dialogue_index++;

        function loadNext() {
            if (dialogue_index == dialogues.length) {
                game.state.start('meta_scale');
            }
            diaText.text = dialogues[dialogue_index];
            dialogue_index++;
        }

        var nextButton = game.add.button(710, 510, 'right', loadNext);
        nextButton.inputEnabled = true;
        nextButton.input.useHandCursor = true;


    },

    update: function() {

    }
};