$(function(){
    var $timer = $('#timer');
    var $p1Score = $('.score.p1');
    var $p2Score = $('.score.p2');
    var $p1InfoText = $('.info-text.p1');
    var $p2InfoText = $('.info-text.p2');
    var $p1Art = $('.art.p1');
    var $p2Art = $('.art.p2');
    var $p1Controls = $('.controls.p1');
    var $p2Controls = $('.controls.p2');
    var $p1Timer = $('.mg-timer.p1');
    var $p2Timer = $('.mg-timer.p2');
    var $p1Selector = $('.selector-p1');
    var $p2Selector = $('.selector-p2');

    var keyPressBools = [false, false, false, false, false, false, false, false];

    var assetHandler = {
    	$controlAssets: [],
        $selectorAssets: [],
        $weightLifterAssets: [],
    	loadAssets: function() {
    		this.$controlAssets.push($('<img>').attr('src', 'assets/W.png').attr('class', 'control control-up').appendTo($p1Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/A.png').attr('class', 'control').appendTo($p1Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/S.png').attr('class', 'control').appendTo($p1Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/D.png').attr('class', 'control').appendTo($p1Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/up.png').attr('class', 'control control-up').appendTo($p2Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/left.png').attr('class', 'control').appendTo($p2Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/down.png').attr('class', 'control').appendTo($p2Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/right.png').attr('class', 'control').appendTo($p2Controls));
            for (var i = 0; i < 4; i++) {
                this.$weightLifterAssets.push($('<img>').attr('src', 'assets/weightlifter' + i.toString() + '.png'));
            };
    	}
    }

    function MiniGame(framesLeft, speed) {
        this.framesLeft = framesLeft;
        this.speed = speed;
        this.p1Amount = 0;
        this.p2Amount = 0;
        this.controls = [];
        this.winCondition = null;
        this.winValue = -1;
        this.fullKeyPresses = false;
        this.clue = '';

        this.miniGameNum = 1;//Math.floor(Math.random() * 2);
        
        switch (this.miniGameNum) {
            case 0:
                this.winCondition = 'greater';
                this.clue = 'MASH!';
                this.fullKeyPresses = true;
                this.controls = [0, 1, 2, 3, 4, 5, 6, 7];
            break;
            case 1:
                this.winCondition = 'first';
                this.winValue = 16;
                this.clue = 'LIFT!';
                this.fullKeyPresses = true;
                this.controls = [0, 4];
            break;
            case 2:
                this.winCondition = 'greater';
                this.clue = 'CATCH HIM!';
                this.fullKeyPresses = false;
                this.controls = [1, 3, 5, 7];
            break;
        }

        this.draw = function() {
            switch (this.miniGameNum) {
                case 0:
                    $p1Art.text(this.p1Amount.toString());
                    $p2Art.text(this.p2Amount.toString());
                break;
                case 1:
                    if ($p1Art.children().length == 0) {
                        assetHandler.$weightLifterAssets[0].appendTo($p1Art);
                        assetHandler.$weightLifterAssets[2].appendTo($p2Art);
                    }
                    if (this.p1Amount == this.winValue) {
                        this.p1Amount++;
                        $p1Art.empty();
                        assetHandler.$weightLifterAssets[1].appendTo($p1Art);
                    }
                    if (this.p2Amount == this.winValue) {
                        this.p2Amount++;
                        $p2Art.empty();
                        assetHandler.$weightLifterAssets[3].appendTo($p2Art);
                    }
                break;
                case 2:
                    if ($p1Art.children().length == 0) {
                        $p1Art.css('width', '142px');
                        $p1Art.css('height', '18px');
                        $p1Art.css('background-color', '#DDDD00');
                        $p1Art.css('position', 'absolute');
                        // $p1Art.css('bottom', '5%');
                        // $p1Art.css('left', '5%');
                    }
                break;
            }
        }
        this.checkInputs = function() {
            switch (this.miniGameNum) {
                case 0:
                    for (var i = 0; i < keyPressBools.length; i++) {
                        if ((i < 4) && (keyPressBools[i])) {
                            this.p1Amount++;
                        }
                        if ((i >= 4) && (keyPressBools[i])) {
                            this.p2Amount++;
                        }
                    };
                break;
                case 1:
                    if (keyPressBools[0]) {
                        this.p1Amount++;
                        if (this.p1Amount % 2 == 0) {
                            $p1Art.css('bottom', '10px');
                        }
                        else {
                            $p1Art.css('bottom', '0px');  
                        }
                    }
                    if (keyPressBools[4]) {
                        this.p2Amount++;
                        if (this.p2Amount % 2 == 0) {
                            $p2Art.css('bottom', '10px');
                        }
                        else {
                            $p2Art.css('bottom', '0px');  
                        }
                    }
                break;
            }
        }
        this.checkWin = function() {
            if (((this.winCondition == 'greater') && (this.p1Amount > this.p2Amount) && (this.framesLeft == 45)) || ((this.winCondition == 'first') && ((this.p1Amount >= this.winValue) || ((this.p1Amount > this.p2Amount) && (this.framesLeft == 45))))) {
                return 1;
            }
            if (((this.winCondition == 'greater') && (this.p1Amount < this.p2Amount) && (this.framesLeft == 45)) || ((this.winCondition == 'first') && ((this.p2Amount >= this.winValue) || ((this.p1Amount < this.p2Amount) && (this.framesLeft == 45))))) {
                return 2;
            }
            if (((this.framesLeft == 45) && (this.p1Amount == this.p2Amount)) || ((this.winCondition == 'first') && (this.p1Amount == this.winValue) && (this.p2Amount == this.winValue))) {
                return 3;
            }

            return 0;
        }
    };

    function Timer() {
        this.framesLeft = 180 * 30;
        this.updateTimer = function() {
            if (this.framesLeft > 0) {
                this.framesLeft--;
                if (this.framesLeft % 30 == 29) {
                    $timer.text(Math.floor(this.framesLeft / 30 / 60) + ':' + this.getSeconds(Math.floor(this.framesLeft / 30) % 60));
                }
                return true;
            }
            $timer.text('0:00');
            return false;
        }
        this.getSeconds = function(seconds) {
            if (seconds < 10) {
                return '0' + seconds.toString();
            }
            return '' + seconds.toString();
        },
        $timer.text(Math.floor(this.framesLeft / 30 / 60) + ':' + this.getSeconds(Math.floor(this.framesLeft / 30) % 60));
    }

    var game = {
        timer: new Timer(),
        currentMiniGame: null,
        intervalID: null,
        p1Score: 0,
        p2Score: 0,
        p1TitlePos: 1,
        p2TitlePos: 1,
        p1Ready: false,
        p2Ready: false,
        p1SelectorCounter: 15,
        p2SelectorCounter: 15,
        p1Moved: false,
        p2Moved: false,
        minutes: 3,
        seconds: 0,
        opacityCounter: 0,
        startCountdown: 90,

        titleScreenBool: true,
        titleScreen: function() {
            game.intervalID = window.setInterval(game.titleScreenUpdate, 1000 / 30);
            game.displayControls([0, 1, 2, 3, 4, 5, 6, 7]);
            $p1Timer.css('width', '0%');
            $p2Timer.css('width', '0%');
        },
        titleScreenUpdate: function() {
            game.checkKeyBools();

            game.opacityCounter++;

            if (game.p1Moved) {
                $p1Selector.css('opacity', '1');
            }
            if (game.p2Moved) {
                $p2Selector.css('opacity', '1');
            }

            if (game.p1Ready) {
                assetHandler.$controlAssets[1].css('opacity', '0');
                assetHandler.$controlAssets[3].css('opacity', '0');
            }
            else {
                assetHandler.$controlAssets[1].css('opacity', '1');
                assetHandler.$controlAssets[3].css('opacity', '1');
            }

            if (game.p2Ready) {
                assetHandler.$controlAssets[5].css('opacity', '0');
                assetHandler.$controlAssets[7].css('opacity', '0');
            }
            else {
                assetHandler.$controlAssets[5].css('opacity', '1');
                assetHandler.$controlAssets[7].css('opacity', '1');
            }

            if (game.opacityCounter == 9) {
                if (!game.p1Moved) {
                    $p1Selector.css('opacity', '0.5');
                }
                if (!game.p2Moved) {
                    $p2Selector.css('opacity', '0.5');
                }
            }
            else if (game.opacityCounter == 18) {
                if (!game.p1Moved) {
                    $p1Selector.css('opacity', '1');
                }
                if (!game.p2Moved) {
                    $p2Selector.css('opacity', '1');
                }
                game.opacityCounter = 0;
            }

            if (keyPressBools[0]) {
                if (game.p1TitlePos == 1) {
                    if ((game.p1SelectorCounter == 15) || (game.p1SelectorCounter <= 0)) {
                        game.minutes++;
                        if (game.minutes == 10) {
                            game.minutes = 1;
                        }
                    }
                    game.p1SelectorCounter--;
                }
                else {
                    $p1Score.text('Ready!');
                    game.p1Ready = true;
                }
                $p1Selector.css('top', '-95px');
            }
            else if (keyPressBools[2]) {
                if (game.p1TitlePos == 1) {
                    if ((game.p1SelectorCounter == 15) || (game.p1SelectorCounter <= 0)) {
                        game.minutes--;
                        if (game.minutes == 0) {
                            game.minutes = 9;
                        }
                    }
                    game.p1SelectorCounter--;
                }
                else {
                    $p1Score.text('Start?');
                    game.p1Ready = false;
                }
                $p1Selector.css('top', '-69px');
            }
            else {
                game.p1SelectorCounter = 15;
                $p1Selector.css('top', '-82px');
            }

            if ((keyPressBools[1]) && (!game.p1Ready)) {
                game.p1TitlePos = 0;
            }
            if ((keyPressBools[3]) && (!game.p1Ready)) {
                game.p1TitlePos = 1;
            }

            if (keyPressBools[4]) {
                if (game.p2TitlePos == 1) {
                    if ((game.p2SelectorCounter == 15) || (game.p2SelectorCounter <= 0)) {
                        game.seconds++;
                        if (game.seconds == 60) {
                            game.seconds = 0;
                        }
                    }
                    game.p2SelectorCounter--;
                }
                else {
                    $p2Score.text('Ready!');
                    game.p2Ready = true;
                }
                $p2Selector.css('top', '-8px');
            }
            else if (keyPressBools[6]) {
                if (game.p2TitlePos == 1) {
                    if ((game.p2SelectorCounter == 15) || (game.p2SelectorCounter <= 0)) {
                        game.seconds--;
                        if (game.seconds == -1) {
                            game.seconds = 59;
                        }
                    }
                    game.p2SelectorCounter--;
                }
                else {
                    $p2Score.text('Start?');
                    game.p2Ready = false;  
                }
                $p2Selector.css('top', '18px');
            }
            else {
                game.p2SelectorCounter = 15;
                $p2Selector.css('top', '5px');
            }

            if ((keyPressBools[5]) && (!game.p2Ready)) {
                game.p2TitlePos = 1;
            }
            if ((keyPressBools[7]) && (!game.p2Ready)) {
                game.p2TitlePos = 0;
            }


            if (game.p1TitlePos == 0) {
                $p1Selector.css('left', '64px');
            }
            else {
                $p1Selector.css('left', '550px');
            }

            if (game.p2TitlePos == 0) {
                $p2Selector.css('right', '-490px');
            }
            else {
                $p2Selector.css('right', '-4px');
            }

            if (game.seconds >= 10) {
                $timer.text(game.minutes.toString() + ':' + game.seconds.toString());
            }
            else {
                $timer.text(game.minutes.toString() + ':0' + game.seconds.toString());
            }

            if ((game.p1Ready) && (game.p2Ready)) {
                startCountdown--;
                if (startCountdown == 0) {
                    window.clearInterval(game.intervalID);
                    $p1Selector.css('opacity', '0');
                    $p2Selector.css('opacity', '0');
                    game.timer.framesLeft = (game.minutes * 60 * 30) + game.seconds * 30;
                    $p1InfoText.text('Buckle up...');
                    $p2InfoText.text('Buckle up...');
                    assetHandler.$controlAssets[0].css('opacity', '0');
                    assetHandler.$controlAssets[2].css('opacity', '0');
                    assetHandler.$controlAssets[4].css('opacity', '0');
                    assetHandler.$controlAssets[6].css('opacity', '0');
                    window.setTimeout(game.countdown, 750);
                }
            }
            else {
                startCountdown = 90;
            }
        },
        countdown: function() {
            game.titleScreenBool = false;
            window.setTimeout(game.start, 3000);
        },
        start: function() {
            $p1Score.css('max-width', '58px');
            $p2Score.css('max-width', '58px');
            $p1Score.text('0');
            $p2Score.text('0');
            $timer.text(Math.floor(game.timer.framesLeft / 30 / 60) + ':' + game.timer.getSeconds(Math.floor(game.timer.framesLeft / 30) % 60));
            game.intervalID = window.setInterval(game.update, 1000 / 30);
            game.currentMiniGame = new MiniGame(180, 1);
        },
        update: function() {
            game.currentMiniGame.checkInputs();
            game.checkKeyBools();
            if (game.timer.updateTimer()) {
                if (game.currentMiniGame.framesLeft == 180) {
                    game.displayControls(game.currentMiniGame.controls);
                    $p1InfoText.text(game.currentMiniGame.clue);
                    $p2InfoText.text(game.currentMiniGame.clue);
                    $p1Art.empty();
                    $p2Art.empty();
                }
                if (game.currentMiniGame.framesLeft <= 180) {
                    game.currentMiniGame.draw();
                    $p1Timer.css('width', 608 * ((game.currentMiniGame.framesLeft - 45) / 135) + 'px');
                    $p2Timer.css('width', 608 * ((game.currentMiniGame.framesLeft - 45) / 135) + 'px');
                    switch (game.currentMiniGame.checkWin()) {
                        case 1:
                            $p1InfoText.text('YOU WIN!');
                            $p2InfoText.text('YOU LOSE!');
                            game.p1Score++;
                            game.endMiniGame();
                        break;
                        case 2:
                            $p1InfoText.text('YOU LOSE!');
                            $p2InfoText.text('YOU WIN!');
                            game.p2Score++;
                            game.endMiniGame();
                        break;
                        case 3:
                            $p1InfoText.text('DRAW!');
                            $p2InfoText.text('DRAW!');
                            game.p1Score++;
                            game.p2Score++;
                            game.endMiniGame();
                        break;
                    }
                }
                game.currentMiniGame.framesLeft--;
            }
            else {
                if ((game.currentMiniGame != null) && (game.currentMiniGame.framesLeft > 0)) {
                    $p1Timer.css('width', '0%');
                    $p2Timer.css('width', '0%');
                }
                $p1Art.text(game.p1Score);
                $p2Art.text(game.p2Score);
                if (game.p1Score > game.p2Score) {
                    $p1InfoText.text('WINNER');
                    $p2InfoText.text('LOSER');
                }
                else if (game.p1Score < game.p2Score) {
                    $p1InfoText.text('LOSER');
                    $p2InfoText.text('WINNER');
                }
                else {
                    $p1InfoText.text('IT\'S A TIE!');
                    $p2InfoText.text('IT\'S A TIE!');
                }
                window.clearInterval(game.intervalID);
            }
        },
        checkKeyBools: function() {
            for (var i = 0; i < keyPressBools.length; i++) {
                if (keyPressBools[i]) {
                    assetHandler.$controlAssets[i].addClass('control-pressed');
                }
                else {
                    assetHandler.$controlAssets[i].removeClass('control-pressed');
                }
            }
            if ((!game.titleScreenBool) && (game.currentMiniGame.fullKeyPresses)) {
                keyPressBools = [false, false, false, false, false, false, false, false];
            }
        },
    	displayControls: function(controlsToDisplay) {
            assetHandler.$controlAssets[0].css('opacity', '0');
            assetHandler.$controlAssets[1].css('opacity', '0');
            assetHandler.$controlAssets[2].css('opacity', '0');
            assetHandler.$controlAssets[3].css('opacity', '0');
            assetHandler.$controlAssets[4].css('opacity', '0');
            assetHandler.$controlAssets[5].css('opacity', '0');
            assetHandler.$controlAssets[6].css('opacity', '0');
            assetHandler.$controlAssets[7].css('opacity', '0');
    		for (var i = 0; i < controlsToDisplay.length; i++) {
                assetHandler.$controlAssets[controlsToDisplay[i]].css('opacity', '1');
    		};
    	},
        changeKeyBool: function(keyCode, bool) {
            switch (keyCode) {
                case 87: //W
                    keyPressBools[0] = bool;
                    game.p1Moved = true;
                break;
                case 65: //A
                    keyPressBools[1] = bool;
                    game.p1Moved = true;
                break;
                case 83: //S
                    keyPressBools[2] = bool;
                    game.p1Moved = true;
                break;
                case 68: //D
                    keyPressBools[3] = bool;
                    game.p1Moved = true;
                break;
                case 38: //Up
                    keyPressBools[4] = bool;
                    game.p2Moved = true;
                break;
                case 37: //Left
                    keyPressBools[5] = bool;
                    game.p2Moved = true;
                break;
                case 40: //Down
                    keyPressBools[6] = bool;
                    game.p2Moved = true;
                break;
                case 39: //Right
                    keyPressBools[7] = bool;
                    game.p2Moved = true;
                break;
            }
        },
        checkKeyPresses: function() {
            if ((game.titleScreenBool) || ((game.currentMiniGame != null) && (!game.currentMiniGame.fullKeyPresses) && (game.currentMiniGame.framesLeft <= 180))) {
                game.changeKeyBool(event.keyCode, true);
            }
            else {
                game.changeKeyBool(event.keyCode, false);
            }
        },
        checkKeyReleases: function() {
            if ((game.currentMiniGame != null) && (!game.titleScreenBool) && (game.currentMiniGame.fullKeyPresses)) {
                if (game.currentMiniGame.framesLeft <= 180) {
                    game.changeKeyBool(event.keyCode, true);
                }
            }
            else if ((game.titleScreenBool) || ((game.currentMiniGame != null) && (!game.currentMiniGame.fullKeyPresses))) {
                game.changeKeyBool(event.keyCode, false);
            }
        },
        endMiniGame: function() {
            game.displayControls([]);
            $p1Timer.css('width', '0%');
            $p2Timer.css('width', '0%');
            $p1Art.css('bottom', '0px');
            $p2Art.css('bottom', '0px');
            $p1Score.text(game.p1Score.toString());
            $p2Score.text(game.p2Score.toString());
            this.currentMiniGame = new MiniGame(270, 1);
        }
	};

    $(window).on('keydown', game.checkKeyPresses);
    $(window).on('keyup', game.checkKeyReleases);

	assetHandler.loadAssets();

    game.titleScreen();
});