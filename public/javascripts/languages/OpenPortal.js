var LanguagesOpenPortal = function() {};

LanguagesOpenPortal.prototype = {

    preload: function() {
        game.load.image('bg', 'images/languages/puzzle1/p1doorclosed.png');
        game.load.image('bg_open', 'images/languages/puzzle1/p1dooropen.png');
        game.load.image('s1', 'images/languages/symbols/1.png');
        game.load.image('s2', 'images/languages/symbols/2.png');
        game.load.image('s3', 'images/languages/symbols/3.png');
        game.load.image('s4', 'images/languages/symbols/4.png');
        game.load.image('s5', 'images/languages/symbols/5.png');
        game.load.image('s6', 'images/languages/symbols/6.png');
        game.load.image('s7', 'images/languages/symbols/7.png');
        game.load.image('s8', 'images/languages/symbols/8.png');
        game.load.image('screen', 'images/languages/puzzle1/proflaytonlp1inputscreen_1.png');
        game.load.image('keyboard', 'images/languages/puzzle1/p1keyboard2.png');
        game.load.image('enter', 'images/languages/puzzle1/p1enter.png');
        game.load.image('box', 'images/languages/puzzle1/inputbox.png');
        game.load.image('reset', 'images/languages/symbols/9.png');
        
        game.load.image('black_bg', 'images/bg/black.png');
        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('down', 'images/dialogue/down-arrow.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'black_bg');
        bg = game.add.sprite(0, 0, 'bg');
        scaleTo(800, 600, bg);

        var dialogue = game.add.sprite(100, 500, 'dialogue');
        var diaText = game.add.text(110, 510, "Looks like this portal is the way out, and to the left of it is the control panel. " +
                "I need to enter two symbols into it. What do those symbols mean?", {
            fill: "#000",
            font: '16px Helvetica Neue',
            'wordWrap': true,
            'wordWrapWidth': 560
        });

        var symbolsGroup = new Phaser.Group(this.game, null, 'symbolsGroup', true);

        var squiggle = 's1';
        var cross = 's2';
        var plus = 's3';
        var triangle = 's4';
        var diagonal = 's5';
        var circle = 's6';
        var horizontal = 's7';
        var square = 's8';
        var clues = [[square, squiggle], [cross, plus],
            [triangle, squiggle], [cross, diagonal],
            [triangle, plus], [circle, horizontal]];
        var translations = ['Build spaceship','Open spaceship', 'Build rocket', 'Steal rocket', 'Steal humans', 'Close portal'];
        Phaser.ArrayUtils.shuffle(clues);
        Phaser.ArrayUtils.shuffle(translations);
        var answer = [square, horizontal];

        var reset = game.add.button(520, 340, 'reset', placeAll);
        scaleTo(50, 50, reset);
        placeAll();

        function placeAll() {
            symbolsGroup.removeAll();
            symbolsGroup = new Phaser.Group(this.game, null, 'symbolsGroup', true);
            symbolsGroup.add(reset);

            for (var i = 0; i < clues.length; i++) {
                var x = i % 2 ? 480 : 400;
                var y = Math.floor(i/2) * 70 + 120;
                var symbol1 = game.add.sprite(x, y, clues[i][0]);
                symbol1.inputEnabled = true;
                symbol1.input.enableDrag();
                symbol1.input.useHandCursor = true;
                symbolsGroup.add(symbol1);
                scaleTo(30, 30, symbol1);
                var symbol2 = symbolsGroup.create(x+30, y, clues[i][1]);
                symbol2.inputEnabled = true;
                symbol2.input.enableDrag();
                symbol2.input.useHandCursor = true;

                scaleTo(30, 30, symbol2);
            }
            for (var i = 0; i < translations.length; i++) {
                var r = i % 2;
                var x = 560 + r*90;
                var y = (i - r)/2 * 70 + 120;
                var translation = game.add.text(x, y, translations[i], {
                    fill: "#fff",
                    font: '16px Helvetica Neue',
                    'wordWrap': true,
                    'wordWrapWidth': 50
                });
                symbolsGroup.add(translation);
                translation.inputEnabled = true;
                translation.input.enableDrag();
                translation.input.useHandCursor = true;
            }
        }


        var input_screen = game.add.button(25, 250, 'screen', openInputScreen);
        input_screen.input.useHandCursor = true;
        scaleTo(150, 75, input_screen);

        var screenGroup = new Phaser.Group(this.game, null, 'screenGroup', true);
        screenGroup.create(0, 0, 'black_bg');
        var screen_lg = screenGroup.create(200, 50, 'screen');
        scaleTo(400, 400, screen_lg);
        var enter = game.add.button(287, 245, 'enter', submitGuess);
        scaleTo(226, 100, enter);
        enter.input.useHandCursor = true;
        screenGroup.add(enter);
        lbox = screenGroup.create(285, 125, 'box');
        scaleTo(105, 105, lbox);
        rbox = screenGroup.create(405, 125, 'box');
        scaleTo(105, 105, rbox);
        lAnswer = '';
        rAnswer = '';

        var keyboard = screenGroup.create(200, 350, 'keyboard');
        scaleTo(400, 400, keyboard);
        screenGroup.visible = false;

        movingSymbols = [];
        
        for (var i = 1; i <= 8; i++) {
            var y = i % 2 ? 450 : 380;
            var offset = (i+1) % 2 ? 0 : 45;
            var x = Math.ceil(i/2) * 80 + 150 + offset;

            var symbol = game.add.button(x, y, 's'+i, createSymbol);
            symbol.input.useHandCursor = true;
            scaleTo(50, 50, symbol);
            screenGroup.add(symbol);
        }

        function createSymbol(button) {
            var newSymbol = game.add.sprite(button.x, button.y, button.key);
            scaleTo(50, 50, newSymbol);
            newSymbol.inputEnabled = true;
            newSymbol.input.enableDrag();
            newSymbol.input.useHandCursor = true;
            screenGroup.add(newSymbol);
            movingSymbols.push(newSymbol);
        }

        var close_screen = game.add.button(400, 590, 'down', closeInputScreen);
        close_screen.anchor.setTo(0.5, 1.0);
        close_screen.input.useHandCursor = true;
        screenGroup.add(close_screen);

        function openInputScreen(button) {
            symbolsGroup.visible = false;
            screenGroup.visible = true;
        }

        function closeInputScreen(button) {
            symbolsGroup.visible = true;
            screenGroup.visible = false;
        }

        function submitGuess(button) {
            var nextpuzzle = function() {
                game.state.start('languages_name_keyboard');
            };
            if (lAnswer == square && rAnswer == horizontal) {
                screenGroup.destroy();
                symbolsGroup.destroy();

                bg.loadTexture('bg_open');
                diaText.text = "It opened! I don't think this is over yet though... Let's find out what lies ahead.";

                var wholescreen = game.add.button(undefined, undefined, undefined, nextpuzzle);
                wholescreen.hitArea = new Phaser.Rectangle(0, 0, 800, 600);
                wholescreen.input.useHandCursor = true;
            }
        }
    },

    update: function() {
        for (var i = 0; i < movingSymbols.length; i++) {
            var symbol = movingSymbols[i];
            for (var b = 0; b < 2; b ++) {
                var box = b == 0 ? lbox : rbox;
                if (calculateDistance(symbol, box) < 60) {
                    symbol.x = box.x + box.width/2 - symbol.width/2;
                    symbol.y = box.y + box.height/2 - symbol.height/2;
                    if (b == 0) {
                        lAnswer = symbol.key;
                    } else {
                        rAnswer = symbol.key;
                    }
                }  
            }
        }
    }
};

var calculateDistance = function(sprite1, sprite2) {
    x1 = sprite1.x + (sprite1.width/2);
    x2 = sprite2.x + (sprite2.width/2);
    y1 = sprite1.y + (sprite1.height/2);
    y2 = sprite2.y + (sprite2.height/2);
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
