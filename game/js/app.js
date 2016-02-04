$(function(){
    var $timer = $('#timer');
    var $p1 = $('#player-1');
    var $p2 = $('#player-2');
    var $p1Score = $('.score.p1');
    var $p2Score = $('.score.p2');
    var $p1InfoText = $('.info-text.p1');
    var $p2InfoText = $('.info-text.p2');

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

    function MiniGame(speed) {
        this.framesLeft = 270;
        this.speed = speed;
        this.p1Amount = null;
        this.p2Amount = null;
        this.winCondition = null;
        this.fullKeyPresses = false;
        this.clue = '';
        this.miniGameNum = Math.floor(Math.random() * 2);
            switch (this.miniGameNum) {
                case 0: this.winCondition = 'greater'; this.clue = 'MASH!'; this.fullKeyPresses = true; break;
                case 1: this.winCondition = 16; this.clue = 'LIFT!'; break;
            }
        this.draw = function() {
            switch (this.miniGameNum) {
                case 0:
                    //art
                break;
                case 1:
                    //art
                break;
            }
        }
        this.checkWin = function() {
            if ((this.winCondition == 'greater') && (this.p1Amount > this.p2Amount)) {
                return 1;
            }
            if ((this.winCondition == 'greater') && (this.p1Amount < this.p2Amount)) {
                return 2;
            }
            if (((this.framesLeft == 0) && (this.p1Amount == this.p2Amount)) || ((typeof(this.winCondition) == 'number') && (this.p1Amount == this.p2Amount) && (this.p1Amount > 0) && (this.p2Amount > 0))) {
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
                if (this.framesLeft % 30 == 0) {
                    $timer.text(Math.floor(this.framesLeft / 30 / 60) + ':' + this.getSeconds(Math.floor(this.framesLeft / 30) % 60));
                }
                return true;
            }
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
    }

    var game = {
        timer: new Timer(),
        currentMiniGame: new MiniGame(1, true),
        keyPressBools: [false, false, false, false, false, false, false, false],
        intervalID: null,
        p1Score: 0,
        p2Score: 0,
        totalGames: 0,
        start: function() {
            $timer.text(Math.floor(game.timer.framesLeft / 30 / 60) + ':' + game.timer.getSeconds(Math.floor(game.timer.framesLeft / 30) % 60));
            game.intervalID = window.setInterval(game.update, 1000 / 30);
        },
        update: function() {
            game.checkKeyBools();
            if (game.timer.updateTimer()) {
                $p1InfoText.text(game.currentMiniGame.clue);
                $p2InfoText.text(game.currentMiniGame.clue);
                game.currentMiniGame.framesLeft--;
                if (game.currentMiniGame.framesLeft <= 180) {
                    console.log(game.currentMiniGame.checkWin());
                    switch (game.currentMiniGame.checkWin()) {
                        case 1:
                            game.p1Score++; 
                            game.endMiniGame();
                        break;
                        case 2:
                            game.p2Score++; 
                            game.endMiniGame();
                        break;
                        case 3:
                            game.p1Score++;
                            game.p2Score++; 
                            game.endMiniGame();
                        break;
                    }
                }
                else if ((game.p1Score > 0) && (game.p2Score > 0)) {
                    $p1InfoText.text('Break time...');
                    $p2InfoText.text('Break time...');
                }
                //game stuff
            }
            else {
                this.intervalID.clear();
            }
        },
        checkKeyBools: function() {
            for (var i = 0; i < game.keyPressBools.length; i++) {
                if (game.keyPressBools[i]) {
                    assetHandler.$controlAssets[i].addClass('control-pressed');
                }
                else {
                    assetHandler.$controlAssets[i].removeClass('control-pressed');
                }
            }
            if (!game.currentMiniGame.fullKeyPresses) {
                game.keyPressBools = [false, false, false, false, false, false, false, false];
            }
        },
    	displayControls: function(controlsToDisplay) {
    		for (var i = 0; i < controlsToDisplay.length; i++) {
                if (controlsToDisplay[i] < 4) {
                    assetHandler.$controlAssets[controlsToDisplay[i]].appendTo('.controls.p1');
                }
                else {
                    assetHandler.$controlAssets[controlsToDisplay[i]].appendTo('.controls.p2');
                }
    		};
    	},
        changeKeyBool: function(keyCode, bool) {
            switch (keyCode) {
                case 87: //W
                    this.keyPressBools[0] = bool;
                break;
                case 65: //A
                    this.keyPressBools[1] = bool;
                break;
                case 83: //S
                    this.keyPressBools[2] = bool;
                break;
                case 68: //D
                    this.keyPressBools[3] = bool;
                break;
                case 38: //Up
                    this.keyPressBools[4] = bool;
                break;
                case 37: //Left
                    this.keyPressBools[5] = bool;
                break;
                case 40: //Down
                    this.keyPressBools[6] = bool;
                break;
                case 39: //Right
                    this.keyPressBools[7] = bool;
                break;
            }
        },
        checkKeyPresses: function() {
            if (game.currentMiniGame.fullKeyPresses) {
                game.changeKeyBool(event.keyCode, true);
            }
        },
        checkKeyReleases: function() {
            if (!game.currentMiniGame.fullKeyPresses) {
                game.changeKeyBool(event.keyCode, true);
            }
            else {
                game.changeKeyBool(event.keyCode, false);
            }
        },
        endMiniGame: function() {
            $p1Score.text(game.p1Score.toString());
            $p2Score.text(game.p2Score.toString());
            this.currentMiniGame = new MiniGame();
        }
	};

    $(window).on('keydown', game.checkKeyPresses);
    $(window).on('keyup', game.checkKeyReleases);

	assetHandler.loadAssets();
    $p1InfoText.text('Ready?');
    $p2InfoText.text('Ready?');
    window.setTimeout(game.start, 3000); //need a countdown function
    game.displayControls([0, 1, 2, 3, 4, 5, 6, 7]); //test
});