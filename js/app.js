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
    		this.$controlAssets.push($('<img>').attr('src', 'assets/W.jpg').attr('class', 'control control-up'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/A.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/S.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/D.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/up.jpg').attr('class', 'control control-up'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/left.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/down.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/right.jpg').attr('class', 'control'));
            for (var i = 0; i < 8; i++) {
                this.$weightLifterAssets.push($('<img>').attr('src', 'assets/weightLifter' + i.toString() + '.png'));
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

        this.miniGameNum = 0;//Math.floor(Math.random() * 2);
        
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
        }

        this.draw = function() {
            switch (this.miniGameNum) {
                case 0:
                    $p1Art.text(this.p1Amount.toString());
                    $p2Art.text(this.p2Amount.toString());
                break;
                case 1:
                    if (this.p1Amount <= 4) {
                        $p1Art.empty();
                        assetHandler.$weightLifterAssets[0].appendTo($p1Art);
                    }
                    else if (this.p1Amount <= 8) {
                        $p1Art.empty();
                        assetHandler.$weightLifterAssets[1].appendTo($p1Art);
                    }
                    else if (this.p1Amount <= 12) {
                        $p1Art.empty();
                        assetHandler.$weightLifterAssets[2].appendTo($p1Art);
                    }
                    else if (this.p1Amount == 16) {
                        $p1Art.empty();
                        assetHandler.$weightLifterAssets[3].appendTo($p1Art);
                    }
                    if (this.p2Amount <= 4) {
                        $p2Art.empty();
                        assetHandler.$weightLifterAssets[4].appendTo($p2Art);
                    }
                    else if (this.p2Amount <= 8) {
                        $p2Art.empty();
                        assetHandler.$weightLifterAssets[5].appendTo($p2Art);
                    }
                    else if (this.p2Amount <= 12) {
                        $p2Art.empty();
                        assetHandler.$weightLifterAssets[6].appendTo($p2Art);
                    }
                    else if (this.p2Amount <= 16) {
                        $p2Art.empty();
                        assetHandler.$weightLifterAssets[7].appendTo($p2Art);
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
                    }
                    if (keyPressBools[4]) {
                        this.p2Amount++;
                    }
                break;
            }
        }
        this.checkWin = function() {
            if (((this.winCondition == 'greater') && (this.p1Amount > this.p2Amount) && (this.framesLeft == 45)) || ((this.winCondition == 'first') && ((this.p1Amount == this.winValue) || ((this.p1Amount > this.p2Amount) && (this.framesLeft == 45))))) {
                return 1;
            }
            if (((this.winCondition == 'greater') && (this.p1Amount < this.p2Amount) && (this.framesLeft == 45)) || ((this.winCondition == 'first') && ((this.p1Amount == this.winValue) || ((this.p1Amount < this.p2Amount) && (this.framesLeft == 45))))) {
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
        minutes: 3,
        seconds: 0,
        titleScreenBool: true,
        titleScreen: function() {
            game.intervalID = window.setInterval(game.titleScreenUpdate, 1000 / 30);
            game.displayControls([0, 1, 2, 3, 4, 5, 6, 7]);
        },
        titleScreenUpdate: function() {
            game.checkKeyBools();

            if (keyPressBools[0]) {
                if (game.p1TitlePos == 1) {
                    if (((game.p1SelectorCounter == 15) || (game.p1SelectorCounter <= 0)) && (game.minutes < 9)) {
                        game.minutes++;
                    }
                    game.p1SelectorCounter--;
                }
                else {
                    $p1Score.text('I\'m Ready!');
                    game.p1Ready = true;
                }
            }
            else if (keyPressBools[2]) {
                if (game.p1TitlePos == 1) {
                    if (((game.p1SelectorCounter == 15) || (game.p1SelectorCounter <= 0)) && (game.minutes > 0)) {
                        game.minutes--;
                    }
                    game.p1SelectorCounter--;
                }
                else {
                    $p1Score.text('Start?');
                    game.p1Ready = false;
                }
            }
            else {
                game.p1SelectorCounter = 15;
            }

            if (keyPressBools[1]) {
                game.p1TitlePos = 0;
            }
            if (keyPressBools[3]) {
                game.p1TitlePos = 1;
            }

            if (keyPressBools[4]) {
                if (game.p2TitlePos == 1) {
                    if (((game.p2SelectorCounter == 15) || (game.p2SelectorCounter <= 0)) && (game.seconds < 59)) {
                        game.seconds++;
                    }
                    game.p2SelectorCounter--;
                }
                else {
                    $p2Score.text('I\'m Ready!');
                    game.p2Ready = true;
                }
            }
            else if (keyPressBools[6]) {
                if (game.p2TitlePos == 1) {
                    if (((game.p2SelectorCounter == 15) || (game.p2SelectorCounter <= 0)) && (game.seconds > 0)) {
                        game.seconds--;
                    }
                    game.p2SelectorCounter--;
                }
                else {
                    $p2Score.text('Start?');
                    game.p2Ready = false;  
                }
            }
            else {
                game.p2SelectorCounter = 15;
            }

            if (keyPressBools[5]) {
                game.p2TitlePos = 1;
            }
            if (keyPressBools[7]) {
                game.p2TitlePos = 0;
            }


            if (game.p1TitlePos == 0) {
                $p1Selector.css('left', '5%');
            }
            else {
                $p1Selector.css('left', '45.25%');
            }

            if (game.p2TitlePos == 0) {
                $p2Selector.css('right', '5%');
            }
            else {
                $p2Selector.css('right', '44.75%');
            }

            if (game.seconds >= 10) {
                $timer.text(game.minutes.toString() + ':' + game.seconds.toString());
            }
            else {
                $timer.text(game.minutes.toString() + ':0' + game.seconds.toString());
            }

            if ((game.p1Ready) && (game.p2Ready)) {
                window.clearInterval(game.intervalID);
                $p1Controls.empty();
                $p2Controls.empty();
                $p1Selector.empty();
                $p2Selector.empty();
                game.timer.framesLeft = (game.minutes * 60 * 30) + game.seconds * 30;
                $p1InfoText.text('Buckle up...');
                $p2InfoText.text('Buckle up...');
                window.setTimeout(game.countdown, 750);
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
                    $p1Timer.css('width', 50 * ((game.currentMiniGame.framesLeft - 45) / 135) + '%');
                    $p2Timer.css('width', 50 * ((game.currentMiniGame.framesLeft - 45) / 135) + '%');
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
                    $p1Controls.empty();
                    $p2Controls.empty();
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
    		for (var i = 0; i < controlsToDisplay.length; i++) {
                if (controlsToDisplay[i] < 4) {
                    assetHandler.$controlAssets[controlsToDisplay[i]].appendTo($p1Controls);
                }
                else {
                    assetHandler.$controlAssets[controlsToDisplay[i]].appendTo($p2Controls);
                }
    		};
    	},
        changeKeyBool: function(keyCode, bool) {
            switch (keyCode) {
                case 87: //W
                    keyPressBools[0] = bool;
                break;
                case 65: //A
                    keyPressBools[1] = bool;
                break;
                case 83: //S
                    keyPressBools[2] = bool;
                break;
                case 68: //D
                    keyPressBools[3] = bool;
                break;
                case 38: //Up
                    keyPressBools[4] = bool;
                break;
                case 37: //Left
                    keyPressBools[5] = bool;
                break;
                case 40: //Down
                    keyPressBools[6] = bool;
                break;
                case 39: //Right
                    keyPressBools[7] = bool;
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
            $p1Timer.css('width', '0%');
            $p2Timer.css('width', '0%');
            $p1Controls.empty();
            $p2Controls.empty();
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