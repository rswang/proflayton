var LanguagesNameCryptogram = function() {};

var alphabet = 'mnbvghjklcxzasdfqwertypoiu';

LanguagesNameCryptogram.prototype = {

    preload: function() {
        game.load.image('bg', 'images/languages/puzzle2/bg.png');
        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('keyboard', 'images/languages/puzzle2/keyboard.png');
        game.load.image('person', 'images/languages/puzzle2/person.png');
        game.load.image('names', 'images/languages/puzzle2/namesList.png');

        game.load.image('right', 'images/dialogue/right-arrow.png');
        game.load.image('left', 'images/dialogue/left-arrow.png');
        game.load.image('up', 'images/dialogue/up-arrow.png');

        for (var index = 0; index < alphabet.length; index++) {
            var letter = alphabet[index];
            game.load.image(letter, 'images/languages/puzzle2/alphabet/' + letter + '.png');
        }
    },

    create: function() {
        game.playerState.currentState = 'languages_name_cryptogram';
        bg = game.add.sprite(0, 0, 'bg');

        // symbol keyboard
        var keyboardGroup = new Phaser.Group(this.game, null, 'keyboardGroup', true);
        var keyboard = game.add.sprite(50, 50, 'keyboard');
        scaleTo(700, 600, keyboard);
        keyboardGroup.add(keyboard);
        var symbolsGroup = new Phaser.Group(this.game, null, 'symbolsGroup', true);

        var typed = [];
        var typedDisplay = [];

        var index = 0;
        createLetters(95, 215, 50, 12, 3, 3);
        createLetters(525, 215, 50, 12, 3, 3);
        createLetters(280, 245, 50, 12, 4, 2);

        function createLetters(x, y, size, margin, dimX, dimY) {
            for (var i = 0; i < dimX; i++) {
                for (var j = 0; j < dimY; j++) {
                    var letter = game.add.button(x + i*(size+margin), y + j*(size+margin), alphabet[index], clickLetter);
                    letter.eng_letter = alphabet[index];
                    scaleTo(size, size, letter);
                    letter.input.useHandCursor = true;
                    symbolsGroup.add(letter);
                    index++;
                }
            }
        }

        function clickLetter(button) {
            if (typed.length < 6) {
                typed.push(button.eng_letter);
                var guessLetter = game.add.sprite(200 + 50*typed.length, 100, button.key);
                keyboardGroup.add(guessLetter);
                typedDisplay.push(guessLetter);
            }
        }

        var leftButton = game.add.button(590, 85, 'left', deleteLetter);
        var rightButton = game.add.button(795, 300, 'right', enterName);
        leftButton.input.useHandCursor = true;
        rightButton.anchor.setTo(1.0, 0.5);
        rightButton.input.useHandCursor = true;
        keyboardGroup.add(leftButton);
        keyboardGroup.add(rightButton);

        function deleteLetter() {
            typed.pop();
            typedDisplay.pop().destroy();
        }

        function enterName() { // TODO next puzzle state start
            var nameGuess = typed.join("");
            console.log(nameGuess);
            if (nameGuess == game.playerState.name) {
                console.log(true);
                game.state.start('scale');
            } else {
                diaText.text = "Oops, I thought you name was " + game.playerState.name + "...\n" +
                "[Press ︽ for their names. Press > to enter your name.]";
            }
        }

        // show/hide
        var upButton = game.add.button(400, 5, 'up', showNames);
        upButton.input.useHandCursor = true;
        upButton.anchor.setTo(0.5, 0);
        keyboardGroup.add(upButton);

        function showKeyboard() {
            people.visible = false;
            names.visible = false;
            wholescreen.visible = false;

            diaText.text = "The symbols on the keys look like the symbols written below those people. If I remember their names...\n" +
                "[Press ︽ for their names. Press > to enter your name.]";
            keyboardGroup.visible = true;
            symbolsGroup.visible = true;
        }
        function showNames() {
            keyboardGroup.visible = false;
            symbolsGroup.visible = false;

            diaText.text = "ZYVY, MEPE, PUZZ, XXXO, CARL,\nJINK, QATH, GRRL, STYW, DEAB";
            people.visible = true;
            names.visible = true;
            wholescreen.visible = true;
            curscene = scenes.length - 1;
        }

        // click anywhere
        var wholescreen = game.add.button(undefined, undefined, undefined, next);
        wholescreen.hitArea = new Phaser.Rectangle(0, 0, 800, 600);
        wholescreen.input.useHandCursor = true;


        var people_names = ["ZYVY", "MEPE", "PUZZ", "XXXO", "CARL", "JINK", "QATH", "GRRL", "STYW", "DEAB"];
        var people_index = 0;
        var people = new Phaser.Group(this.game, undefined, 'people');
        function addperson(color) {
            var r = people_index % 5;
            var p = game.add.sprite(40 + r*160, (people_index - r)*25, 'person');
            var p_name = game.add.text(60+r*160, (people_index - r)*25 + 60, people_names[people_index], {
                fill: "#fff",
                font: '16px Helvetica Neue'
            });
            p_name.inputEnabled = true;
            p_name.input.enableDrag();
            p_name.input.useHandCursor = true;
            people_index++;
            scaleTo(80, 125, p);
            p.tint = color;
            people.add(p);
            people.add(p_name);
        }

        // stuff to happen
        keyboardGroup.visible = false;
        symbolsGroup.visible = false;
        var dialogue = game.add.sprite(110, 500, 'dialogue');
        var names = game.add.sprite(0, 250, 'names');
        scaleTo(800, 228, names);
        var diaText = game.add.text(120, 510, "I still have no idea where I am... " +
                "At least I am somewhere warm and not as dark.\n\n" +
                "Huh, is there someone here?",
                { fill: "#000", font: '16px Helvetica Neue', 'wordWrap': true, 'wordWrapWidth': 560 });
        var scenes = [
            function() {
                addperson("0xFFFFFF");
                diaText.text = "Hello, " + game.playerState.name + ".\n" +
                    "Congratulations on your safe arrival to the hospitality room for humans. My name is ZYVY. Nice to meet you.";
            },
            function() {
                addperson("0xFF0000");
                diaText.text = "I believe 78% of people fail at opening that portal. Your intellect is above average!";
            },
            function() {
                addperson("0x00FF00");
                diaText.text = "Oh MEPE, enough with your made-up statistics.\n" +
                    "My name is PUZZ. I'm sure you are starving after spending so long in cryosleep. You can find meal pills for humans in that corner.";
            },
            function() {
                addperson("0x0000FF");
                diaText.text = "Name, XXXO. Interest, neuroscience. Favorite color, blue. Location, 290 A.U. from Earth. Currently testing, " +
                    game.playerName + ". Next answer...";
            },
            function() {
                addperson("0x00FFFF");
                diaText.text = "Whoah, that's enough, XXXO. Hi, I'm captain CARL. " +
                    "Just to be clear, you are a test subject for our Intelligence Testing initiative. " +
                    "Please wait in this area until your turn comes. This hospitality room has all the amenities humans require for survival.";
            },
            function() {
                addperson("0xFF00FF");
                diaText.text = "Don't be frightened of being a test subject. " +
                    "Our research shows that the probability of a mortal accident in our tests is not significantly higher than the probability of deadly freak accidents on Earth.";
            },
            function() {
                addperson("0xFFFF00");
                diaText.text = "JINK is right. I, the great infallible QATH, was the one who performed that study.";
            },
            function() {
                addperson("0xFF8800");
                diaText.text = "GRRL finished fixing the test subject transmitter! What's the test subject's name? GRRL wants to try using the name entry thingie.";
            },
            function() {
                addperson("0x8800FF");
                diaText.text = "Lieutenant STYW reporting in. " +
                    "Thanks to massive scheduling improvements in the Testing Protocol, this test subject's turn will come in merely 2577 years!";
            },
            function() {
                addperson("0x00FF88");
                diaText.text = "Great!\n" +
                    "Hey, I'm DEAB. I think humans are fascinating! " +
                    "It's a shame you don't get to stay here that long, but feel free to chat with me about anything!";
            },
            function() {
                people.alpha = 0.5;
                diaText.text = "2577 years?! I'd be dead long before I get my turn!\n" +
                    "Wait, maybe I could use that test subject transmitter myself.";
            }
        ];

        // make stuff happen
        var curscene = -1;
        function next() {
            curscene++;
            if (curscene >= scenes.length) {
                showKeyboard();
            } else {
                scenes[curscene]();
            }
        }
    },

    update: function() {

    }
};
