var MetaNumbers = function() {};

MetaNumbers.prototype = {

    preload: function() {
        game.load.image('bg', 'images/languages/puzzle2/bg.png');

        game.load.image('s1', 'images/languages/symbols/1.png');
        game.load.image('s4', 'images/languages/symbols/4.png');
        game.load.image('s7', 'images/languages/symbols/7.png');
        game.load.image('minus', 'images/meta/minus.png');

        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('right', 'images/dialogue/right-arrow.png');
        game.load.image('person', 'images/languages/puzzle2/person.png');


    },

    create: function() {
        game.playerState.currentState = 'meta_languages';
        
        bg = game.add.sprite(0, 0, 'bg');
        scaleTo(1000, 1000, bg);

        createLetters(280, 100, 50, 12, 4, 1, ['s7', 's4', 'minus', 's1']);

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

        var dialogue_index = 0;
        var dialogue = game.add.sprite(110, 500, 'dialogue');

        var diaText = game.add.text(120, 510, 'Let\'s go!', { fill: "#000", font: '16px Helvetica Neue', 'wordWrap': true, 'wordWrapWidth': 560 });


        var nextButton = game.add.button(710, 510, 'right', checkPeople);
        nextButton.inputEnabled = true;
        nextButton.input.useHandCursor = true;


        var person = game.add.button(100, 200, 'person', createPerson);
        scaleTo(200, 200, person);
        var movingPersons = [];

        function createPerson(button) {
            var newPerson = game.add.sprite(button.x, button.y, button.key);
            scaleTo(200, 200, newPerson);
            newPerson.inputEnabled = true;
            newPerson.input.enableDrag();
            newPerson.input.useHandCursor = true;
            movingPersons.push(newPerson);
        }


        function checkPeople() {
            count = 0;
            for (var i=0; i < movingPersons.length; i++) {
                console.log(movingPersons[i].x);
                if (movingPersons[i].x > 400) {
                    count++;
                }
            }
            console.log(count);
            if (count == 7) {
                game.state.start('meta_planet');
            } else {
                diaText.text = "Oops, that's not quite the right number!";
            }
        }


    },

    update: function() {

    }
};