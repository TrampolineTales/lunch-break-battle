$(function(){
    var $timer = $('#timer');
    var $p1 = $('#player-1');
    var $p2 = $('#player-2');
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

    var keyPressBools = [false, false, false, false, false, false, false, false];

    var assetHandler = {
    	$controlAssets: [],
    	loadAssets: function() {
    		this.$controlAssets.push($('<img>').attr('src', 'assets/W.jpg').attr('class', 'control control-up'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/A.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/S.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/D.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/up.jpg').attr('class', 'control control-up'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/left.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/down.jpg').attr('class', 'control'));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/right.jpg').attr('class', 'control'));
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

        this.miniGameNum = Math.floor(Math.random() * 1);
        
        switch (this.miniGameNum) {
            case 0:
                this.winCondition = 'greater';
                this.clue = 'MASH!';
                this.fullKeyPresses = true;
                this.controls = [0, 1, 2, 3, 4, 5, 6, 7];
            break;
            case 1: this.winCondition = 'first'; this.winValue = 16; this.clue = 'LIFT!'; break;
        }

        this.draw = function() {
            switch (this.miniGameNum) {
                case 0:
                    $p1Art.text(this.p1Amount.toString());
                    $p2Art.text(this.p2Amount.toString());
                break;
                case 1:
                    //art
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
            }
        }
        this.checkWin = function() {
            if ((this.winCondition == 'greater') && (this.p1Amount > this.p2Amount) && (this.framesLeft == 30)) {
                return 1;
            }
            if ((this.winCondition == 'greater') && (this.p1Amount < this.p2Amount) && (this.framesLeft == 30)) {
                return 2;
            }
            if (((this.framesLeft == 45) && (this.p1Amount == this.p2Amount)) || ((this.winCondition == 'first') && (this.p1Amount == this.p2Amount) && (this.p1Amount > 0) && (this.p2Amount > 0))) {
                return 3;
            }

            return 0;
        }
    };

    function Timer() {
        this.framesLeft = 15 * 30;
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
        this.setTime = function() {
            //set timer before game starts
        }
        $timer.text(Math.floor(this.framesLeft / 30 / 60) + ':' + this.getSeconds(Math.floor(this.framesLeft / 30) % 60));
    }

    var game = {
        timer: new Timer(),
        currentMiniGame: null,
        intervalID: null,
        p1Score: 0,
        p2Score: 0,
        totalGames: 0,
        start: function() {
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
                            game.p1Score++;
                            $p1InfoText.text('YOU WIN!');
                            $p2InfoText.text('YOU LOSE!');
                            game.endMiniGame();
                        break;
                        case 2:
                            game.p2Score++; 
                            $p1InfoText.text('YOU LOSE!');
                            $p2InfoText.text('YOU WIN!');
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
                $p1InfoText.text('GAME OVER');
                $p2InfoText.text('GAME OVER');
                if (game.p1Score > game.p2Score) {
                    $p1Art.text('WINNER');
                    $p2Art.text('LOSER');
                }
                else if (game.p1Score < game.p2Score) {
                    $p1Art.text('LOSER');
                    $p2Art.text('WINNER');
                }
                else {
                    $p1Art.text('IT\'S A TIE!');
                    $p2Art.text('IT\'S A TIE!');
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
            if (game.currentMiniGame.fullKeyPresses) {
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
            if ((game.currentMiniGame != null) && (!game.currentMiniGame.fullKeyPresses) && (game.currentMiniGame.framesLeft <= 180)) {
                game.changeKeyBool(event.keyCode, true);
            }
            else {
                game.changeKeyBool(event.keyCode, false);
            }
        },
        checkKeyReleases: function() {
            if ((game.currentMiniGame != null) && (game.currentMiniGame.fullKeyPresses)) {
                if (game.currentMiniGame.framesLeft <= 180) {
                    game.changeKeyBool(event.keyCode, true);
                }
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
    $p1InfoText.text('Ready?');
    $p2InfoText.text('Ready?');
    window.setTimeout(game.start, 3000); //need a countdown function
});