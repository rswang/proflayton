var Start = function() {};

Start.prototype = {

    preload: function() {
        game.load.image('bg', 'images/bg/black.png');
        game.load.image('up', 'images/dialogue/up-arrow.png');
        game.load.image('dialogue', 'images/dialogue/dialogue.png');
    },

    create: function() {
        game.add.sprite(0, 0, 'bg');

        // click anywhere
        var wholescreen = game.add.button(undefined, undefined, undefined, next);
        wholescreen.hitArea = new Phaser.Rectangle(0, 0, 800, 600);
        wholescreen.input.useHandCursor = true;

        // stuff to happen
        var dialogue, diaText;
        var uparrow;
        var scenes = [
            function() {
                dialogue = game.add.sprite(110, 500, 'dialogue');
                diaText = game.add.text(120, 510, "So dark and cold...\n"+
                        "I want to get out of here, but where's the exit?\n"+
                        "Let alone finding an exit, I can't see anything in this pitch black room.",
                        { fill: "#000", font: '16px Helvetica Neue', 'wordWrap': true, 'wordWrapWidth': 560 });
            },
            function() {
                uparrow = game.add.sprite(400, 150, 'up');
                uparrow.anchor.setTo(0.5, 0.5);
                diaText.text = "As if someone was listening to my thoughts, an arrow sign lights up.";
            },
            function() {
                diaText.text = "This is really weird and suspicious, but I don't have any other clue to follow.\n"+
                    "Guess I'll see where this leads to...";
            },
            function() {
                game.add.tween(uparrow.scale).to({ x:2, y:2 }, 1000, Phaser.Easing.Linear.None, true);
            },
            function() {
                diaText.text = "I can feel a door here. Let's try pushing it open!";
            }
        ];

        // make stuff happen
        var curscene = -1;
        function next() {
            curscene++;
            if (curscene >= scenes.length)
                game.state.start('languages_open_portal');
            else
                scenes[curscene]();
        }
    },

    update: function() {
    }

}
