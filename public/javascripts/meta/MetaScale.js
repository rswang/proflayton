var MetaScale = function() {};

/* 800x600 assumed for everything */
var baseY = 218+116;
var highY = baseY - 68;
var lowY = baseY + 68;

// for animation purposes
var lTargetY = baseY;
var rTargetY = baseY;

// main objects
var left, right;
var people;

MetaScale.prototype = {

    preload: function() {
        game.load.image('person', 'images/planet_minigame/pilot.png');
        game.load.image('side', 'images/scale/scaleside.png');

        game.load.image('bg', 'images/scale/scalepuzzlebackground.png');
        game.load.image('dialogue', 'images/dialogue/dialogue.png');
        game.load.image('green', 'images/scale/mysteryboxgreen.png');
        game.load.image('pink', 'images/scale/mysteryboxpink.png');
    },

    create: function() {
        game.playerState.currentState = 'meta_scale';

        bg = game.add.sprite(0, 0, 'bg');
        var dialogue, diaText;

        // scale
        left = game.add.sprite(0, baseY-15, 'side');
        left.anchor.setTo(0, 1.0);
        right = game.add.sprite(800, baseY-15, 'side');
        right.anchor.setTo(1.0, 1.0);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(left, Phaser.Physics.ARCADE);
        game.physics.enable(right, Phaser.Physics.ARCADE);

        var weighButton = game.add.button(undefined, undefined, undefined, weigh);
        weighButton.hitArea = new Phaser.Rectangle(254, 263, 290, 46);
        weighButton.input.useHandCursor = true;
        var tries = 2; //TODO
        var triesDisplay = game.add.text(254+145, 263+23, tries + " weighings left", {
            fill: "#fff",
            font: '16px Helvetica Neue',
            'wordWrap': true,
            'wordWrapWidth': 280
        });
        triesDisplay.anchor.setTo(0.5, 0.5);

        var statusDisplay = game.add.text(304+104, 67+96, "=", {
            fill: "#fff",
            font: '88px Helvetica Neue',
            'wordWrap': true,
            'wordWrapWidth': 184
        });
        statusDisplay.anchor.setTo(0.5, 0.5);
        
        // use the scale
        function weigh() {
            if (tries < 1)
                return;
            tries--;
            triesDisplay.text = tries + " weighings left";

            leftW = 0; rightW = 0;
            for (var i = 0; i < left.children.length; i++)
                leftW += left.children[i].weight;
            for (var i = 0; i < right.children.length; i++)
                rightW += right.children[i].weight;

            if (leftW == rightW) {
                lTargetY = baseY; rTargetY = baseY;
                statusDisplay.text = "=";
            } else if (leftW < rightW) {
                lTargetY = highY; rTargetY = lowY;
                statusDisplay.text = "<";
            } else {
                lTargetY = lowY; rTargetY = highY;
                statusDisplay.text = ">";
            }
        }

        // blobs
        people = [];
        for (var i = 1; i <= 8; i++) {
            var pod = game.add.sprite(100*i - 50, 450, 'person');
            pod.anchor.setTo(0.5, 0.5);
            pod.scale.setTo(0.5, 0.5);
            pod.inputEnabled = true;
            pod.input.enableDrag();
            pod.input.useHandCursor = true;
            pod.events.onDragStop.add(snapPod, pod);
            pod.events.onDragStop.add(peopleCheck, pod);
            pod.weight = 10;
            people.push(pod);
        }
        people[0].weight = 11;
        people[3].weight = 11;
        people[4].weight = 11;
        for (var i = 0; i < 7; i++)
            if (people[i].weight > 10)
                console.log("answer: " + i);

        // snaps people onto sides or pull it out
        function snapPod() {
            if (this.parent === left) {
                if (!inLeft(this)) {
                    left.removeChild(this);
                    statusDisplay.text = "?";
                    this.x = this.world.x;
                    this.y = this.world.y;
                    game.add.existing(this);
                }
                updateLeft();
            }
            if (this.parent === right) {
                if (!inRight(this)) {
                    right.removeChild(this);
                    statusDisplay.text = "?";
                    this.x = this.world.x;
                    this.y = this.world.y;
                    game.add.existing(this);
                }
                updateRight();
            }
            if (this.parent !== left && inLeft(this)) {
                left.addChild(this);
                statusDisplay.text = "?";
                updateLeft();
            }
            if (this.parent !== right && inRight(this)) {
                right.addChild(this);
                statusDisplay.text = "?";
                updateRight();
            }
        }

        // checks whether obj is on left/right side
        function inLeft(obj) {
            return obj.world.y <= left.y && obj.world.x >= 0 && obj.world.x <= 255;
        }
        function inRight(obj) {
            return obj.world.y <= right.y && obj.world.x <= 800 && obj.world.x >= 545;
        }

        // updates graphics for left/right side
        function updateLeft() {
            for (var i = 0; i < left.children.length; i++) {
                var r = i%2;
                var d = (i-r)/2;
                left.children[i].x = 128-30 + 60*r;
                left.children[i].y = -119 - 70*d;
            }
        }
        function updateRight() {
            for (var i = 0; i < right.children.length; i++) {
                var r = i%2;
                var d = (i-r)/2;
                right.children[i].x = -(128-30 + 60*r);
                right.children[i].y = -119 - 70*d;
            }
        }

        // destroy bad pod(s)
        var light = game.add.sprite(100, 500, 'green');
        scaleTo(100, 100, light);
        var heavy = game.add.sprite(700, 500, 'pink');
        scaleTo(100, 100, heavy);
        function peopleCheck(obj) {
            var correct = true;
            for (var i = 0; i < 7; i++) {
                if (people[i].weight > 10 && !inHeavy(people[i])) {
                    correct = false;
                    break;
                }
                if (people[i].weight == 10 && !inLight(people[i])) {
                    correct = false;
                    break;
                }
            }
            if (correct) {
                dialogue = game.add.sprite(110, 500, 'dialogue');
                diaText = game.add.text(120, 510, "All humans sorted!",
                        { fill: "#000F", font: '16px monospace', 'wordWrap': true, 'wordWrapWidth': 560 });
            }
        }
        function inLight(obj) {
            return obj.world.x <= 100 && obj.world.y >= 500;
        }
        function inHeavy(obj) {
            return obj.world.x >= 700 && obj.world.y >= 500;
        }
    },

    update: function() {
        if (lTargetY != left.Y) {
            var d = game.physics.arcade.distanceToXY(left, 0, lTargetY);
            game.physics.arcade.moveToXY(left, 0, lTargetY, d);
        } else {
            left.body.velocity.setTo(0, 0);
        }

        if (rTargetY != right.Y) {
            var d = game.physics.arcade.distanceToXY(right, 800, rTargetY);
            game.physics.arcade.moveToXY(right, 800, rTargetY, d);
        } else {
            right.body.velocity.setTo(0, 0);
        }
    }

};
