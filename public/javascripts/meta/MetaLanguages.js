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

        game.load.image('line', 'images/meta/line.png');
        game.load.image('plus', 'images/meta/plus.png');

        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('right', 'images/dialogue/right-arrow.png');


    },

    create: function() {
        game.playerState.currentState = 'meta_languages';
        
        bg = game.add.sprite(0, 0, 'bg');
        scaleTo(1000, 1000, bg);

        createLetters(280, 200, 50, 12, 4, 1, ['s1', 's2', 's3', 's4']);
        createLetters(280, 260, 50, 12, 4, 1, ['s4', 's5', 's6', 's2']);
        createLetters(218, 330, 50, 12, 5, 1, ['s4', 's5', 's3', 's2', 's7']);

        var line = game.add.sprite(210, 310, 'line');
        scaleTo(300, 300, line);

        var plus = game.add.sprite(215, 255, 'plus');
        scaleTo(50, 50, plus);

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
        var dialogues = ["You’re finally ready to return home! One last thing, though. Obviously you’ve done very well at our little tests, but many of your human brothers and sisters did not fare so well.",
        "Indeed, we’ve all but given up on the rest of the humans we captured -- if you’d be so kind, we’d like you to return them to Earth, as well.",
        "This could be your toughest task yet, and you’ll need to use all the skills you’ve learned on our planet to accomplish it! I wish you luck!"
        ]
        var dialogue_index = 0;
        var dialogue = game.add.sprite(110, 500, 'dialogue');

        var diaText = game.add.text(120, 510, dialogues[dialogue_index], { fill: "#000", font: '16px Helvetica Neue', 'wordWrap': true, 'wordWrapWidth': 560 });
        dialogue_index++;

        function loadNext() {
            if (dialogue_index == dialogues.length) {
                game.state.start('meta_numbers');
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