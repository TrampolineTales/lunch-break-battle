$(function(){
    var $body = $('body')
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
    var $muteButton = $('#mute-button');

    $('<img>').attr('src', 'assets/art/mute.png').appendTo($muteButton);

    var keyPressBools = [false, false, false, false, false, false, false, false];

    var assetHandler = {
    	$controlAssets: [],
        $selectorAssets: [],
        $weightLifterAssets: [],
        $quickDrawAssets: [],
        $towerAssets: [],
        $music: [],
        $sfx: [],
    	loadAssets: function() {
            this.$music.push($('#p1win'));
            this.$music.push($('#p1win-fast'));
            this.$music.push($('#p1win-faster'));
            this.$music.push($('#p2win'));
            this.$music.push($('#p2win-fast'));
            this.$music.push($('#p2win-faster'));
            this.$music.push($('#fast'));
            this.$music.push($('#faster'));
            this.$music.push($('#gameover'));
            this.$music.push($('#boss'));
            this.$music.push($('#title'));

    		this.$music.push($('#cool'));
            this.$music.push($('#cool-fast'));
            this.$music.push($('#cool-faster'));
            this.$music.push($('#elephant'));
            this.$music.push($('#elephant-fast'));
            this.$music.push($('#elephant-faster'));
            this.$music.push($('#japan'));
            this.$music.push($('#japan-fast'));
            this.$music.push($('#japan-faster'));
            this.$music.push($('#nervous'));
            this.$music.push($('#nervous-fast'));
            this.$music.push($('#nervous-faster'));
            this.$music.push($('#wacky'));
            this.$music.push($('#wacky-fast'));
            this.$music.push($('#wacky-faster'));

            for (var i = 0; i < this.$music.length; i++) {
                this.$music[i][0].volume = 0.5;
            }

            this.$controlAssets.push($('<img>').attr('src', 'assets/art/W.png').attr('class', 'control control-up').appendTo($p1Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/art/A.png').attr('class', 'control').appendTo($p1Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/art/S.png').attr('class', 'control').appendTo($p1Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/art/D.png').attr('class', 'control').appendTo($p1Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/art/up.png').attr('class', 'control control-up').appendTo($p2Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/art/left.png').attr('class', 'control').appendTo($p2Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/art/down.png').attr('class', 'control').appendTo($p2Controls));
    		this.$controlAssets.push($('<img>').attr('src', 'assets/art/right.png').attr('class', 'control').appendTo($p2Controls));
            for (var i = 0; i < 4; i++) {
                this.$weightLifterAssets.push($('<img>').attr('src', 'assets/art/weightlifter' + i.toString() + '.png'));
                this.$quickDrawAssets.push($('<img>').attr('src', 'assets/art/quickdraw' + i.toString() + '.png'));
                this.$towerAssets.push($('<img>').attr('src', 'assets/art/tower' + i.toString() + '.png'));
            };

            for (var i = 0; i < 95; i++) {
                if (i < 10) {
                    this.$sfx.push($('<audio>').attr('src', 'assets/sfx/00' + i + '.wav').appendTo($body));
                }
                else {
                    this.$sfx.push($('<audio>').attr('src', 'assets/sfx/0' + i + '.wav').appendTo($body));
                }
                this.$sfx[i][0].volume = 0.2;
            }
    	}
    }

    function MiniGame(framesLeft, speed) {
        this.framesLeft = framesLeft;
        this.speed = speed;
        this.p1Amount = 0;
        this.p2Amount = 0;
        this.p1Alternator = true;
        this.p2Alternator = true;
        this.controls = [];
        this.winCondition = null;
        this.winValue = -1;
        this.fullKeyPresses = false;
        this.clue = '';
        this.musicNum = 0;

        this.miniGameNum = Math.floor(Math.random() * 5);

        switch (this.miniGameNum) {
            case 0:
                this.winCondition = 'greater';
                this.clue = 'MASH!';
                this.fullKeyPresses = true;
                this.controls = [0, 1, 2, 3, 4, 5, 6, 7];
                this.musicNum = 11 + Math.floor(this.speed * 2.75) - 2;
            break;
            case 1:
                this.winCondition = 'first';
                this.winValue = 13;
                this.clue = 'LIFT!';
                this.fullKeyPresses = true;
                this.controls = [0, 4];
                this.musicNum = 23 + Math.floor(this.speed * 2.75) - 2;
            break;
            case 2:
                this.winCondition = 'first';
                this.winValue = 1;
                this.clue = 'FIRE!';
                this.fullKeyPresses = false;
                this.controls = [3, 5];
                this.musicNum = 11 + Math.floor(this.speed * 2.75) - 2;
            break;
            case 3:
                this.winCondition = 'greater';
                this.clue = 'DON\'T PRESS!';
                this.fullKeyPresses = false;
                this.controls = [0, 1, 2, 3, 4, 5, 6, 7];
                this.musicNum = 17 + Math.floor(this.speed * 2.75) - 2;
            break;
            case 4:
                this.musicNum = 17 + Math.floor(this.speed * 2.75) - 2;
                var num1 = Math.floor(Math.random() * 90);
                var num2 = Math.floor(Math.random() * 10);
                this.winValue = 1;
                var sumDiff = 0;
                if (Math.random() < 0.5) {
                    sumDiff += Math.floor(Math.random() * 10) + 1;
                }
                else {
                    this.p1Amount = 1;
                    this.p2Amount = 1;
                }
                this.fullKeyPresses = true;
                this.winCondition = 'greater';
                this.clue = num1.toString() + ' + ' + num2.toString() + ' = ' + (num1 + num2 + sumDiff).toString() + '?';
                this.controls = [0, 2, 4, 6];
            break;
        }

        this.draw = function() {
            switch (this.miniGameNum) {
                case 0:
                    $p1Art.css('font-size', '192px');
                    $p2Art.css('font-size', '192px');
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
                        assetHandler.$quickDrawAssets[0].appendTo($p1Art);
                        assetHandler.$quickDrawAssets[2].appendTo($p2Art);
                    }
                    if (this.p1Amount == this.winValue) {
                        $p2Art.empty();
                        assetHandler.$quickDrawAssets[3].appendTo($p2Art);
                    }
                    if (this.p2Amount == this.winValue) {
                        $p1Art.empty();
                        assetHandler.$quickDrawAssets[1].appendTo($p1Art);
                    }
                break;
                case 3:
                    if ($p1Art.children().length == 0) {
                        assetHandler.$towerAssets[2].appendTo($p1Art);
                        assetHandler.$towerAssets[0].appendTo($p2Art);
                    }
                    if (this.p1Amount < 0) {
                        $p1Art.empty();
                        assetHandler.$towerAssets[3].appendTo($p1Art);
                    }
                    if (this.p2Amount < 0) {
                        $p2Art.empty();
                        assetHandler.$towerAssets[1].appendTo($p2Art);
                    }
                break;
                case 4:
                    $p1Art.css('font-size', '48px');
                    $p2Art.css('font-size', '48px');
                    if (this.p1Alternator) {
                        $p1Art.html('<br>I think it\'s correct!');
                    }
                    else {
                        $p1Art.html('<br>I think it\'s incorrect!');
                    }
                    if (this.p2Alternator) {
                        $p2Art.html('<br>I think it\'s correct!');
                    }
                    else {
                        $p2Art.html('<br>I think it\'s incorrect!');
                    }
                break;
                case 5:
                    if ($p1Art.children().length == 0) {
                        $p1Art.css('width', '142px');
                        $p1Art.css('height', '18px');
                        $p1Art.css('background-color', '#DDDD00');
                        $p1Art.css('position', 'absolute');
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
                        if ((this.p1Amount - 1) % 2 == 0) {
                            $p1Art.css('bottom', '10px');
                        }
                        else {
                            $p1Art.css('bottom', '0px');  
                        }
                    }
                    if (keyPressBools[4]) {
                        this.p2Amount++;
                        if ((this.p2Amount - 1) % 2 == 0) {
                            $p2Art.css('bottom', '10px');
                        }
                        else {
                            $p2Art.css('bottom', '0px');  
                        }
                    }
                break;
                case 2:
                    if (keyPressBools[3]) {
                        this.p1Amount++;
                    }
                    if (keyPressBools[5]) {
                        this.p2Amount++;
                    }
                break;
                case 3:
                    for (var i = 0; i < keyPressBools.length; i++) {
                        if ((i < 4) && (keyPressBools[i])) {
                            this.p1Amount = -1;
                        }
                        if ((i >= 4) && (keyPressBools[i])) {
                            this.p2Amount = -1;
                        }
                    };
                break;
                case 4:
                    if (keyPressBools[0]) {
                        this.p1Amount++;
                        this.p1Alternator = !this.p1Alternator;
                    }
                    if (keyPressBools[2]) {
                        this.p1Amount++;
                        this.p1Alternator = !this.p1Alternator;
                    }
                    if (keyPressBools[4]) {
                        this.p2Amount++;
                        this.p2Alternator = !this.p2Alternator;
                    }
                    if (keyPressBools[6]) {
                        this.p2Amount++;
                        this.p2Alternator = !this.p2Alternator;
                    }

                    if (this.p1Amount > 1) {
                        this.p1Amount = 0;
                    }
                    if (this.p2Amount > 1) {
                        this.p2Amount = 0;
                    }
                break;
            }
        }
        this.checkWin = function() {
            if (((this.winCondition == 'greater') && (this.p1Amount > this.p2Amount) && (this.framesLeft <= 45)) || ((this.winCondition == 'first') && (this.p1Amount >= this.winValue))) {
                console.log(this.p1Amount);
                return 1;
            }
            if (((this.winCondition == 'greater') && (this.p1Amount < this.p2Amount) && (this.framesLeft <= 45)) || ((this.winCondition == 'first') && (this.p2Amount >= this.winValue))) {
                return 2;
            }
            if (((this.framesLeft <= 45) && (this.p1Amount == this.p2Amount)) || ((this.winCondition == 'first') && (this.p1Amount <= this.winValue) && (this.p2Amount <= this.winValue) && (this.framesLeft <= 45))) {
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
        p1Selected: false,
        p2Selected: false,
        minutes: 3,
        seconds: 0,
        restartFrames: 300,
        opacityCounter: 0,
        startCountdown: 90,
        gameLength: 0,
        speed: 1,
        muted: false,

        titleScreenBool: true,
        changeMute: function() {
            game.muted = !game.muted;
            if (!game.muted) {
                if (game.titleScreenBool) {
                    game.playMusic(assetHandler.$music[10][0]);
                }
                $muteButton.children().attr('src', 'assets/art/mute.png');
            }
            else {
                if (game.titleScreenBool) {
                assetHandler.$music[10][0].pause();
                assetHandler.$music[10][0].currentTime = 0;
                }
                $muteButton.children().attr('src', 'assets/art/muted.png');
            }
        },
        playMusic: function(music) {
            if (!this.muted) {
                music.play();
            }
        },
        titleScreen: function() {
            game.titleScreenBool = true;
            if (game.intervalID != null) {
                window.clearInterval(game.intervalID);
            }
            $p1Score.text('Start?');
            $p2Score.text('Start?');
            $p1Score.css('max-width', '300px');
            $p2Score.css('max-width', '300px');

            game.p1Score = 0;
            game.p2Score = 0;
            game.p1TitlePos = 1;
            game.p2TitlePos = 1;
            game.p1Ready = false;
            game.p2Ready = false;
            game.p1SelectorCounter = 15;
            game.p2SelectorCounter = 15;
            game.p1Moved = false;
            game.p2Moved = false;
            game.minutes = 3;
            game.seconds = 0;
            game.restartFrames = 300;
            game.opacityCounter = 0;
            game.startCountdown = 90;
            game.gameLength = 0;
            game.speed = 1;

            game.playMusic(assetHandler.$music[10][0]);
            
            game.intervalID = window.setInterval(game.titleScreenUpdate, 1000 / 30);
            game.displayControls([0, 1, 2, 3, 4, 5, 6, 7]);
            $p1Timer.css('width', '0%');
            $p2Timer.css('width', '0%');
            $p1Art.css('font-size', '48px');
            $p2Art.css('font-size', '48px');
            $p1InfoText.text('Lunch Break Battle');
            $p2InfoText.text('Lunch Break Battle');
            $p1Art.html('<br>Programming/Art: Dan DiIorio<br>Font: Eeve Somepx<br>Music: Nintendo');
            $p2Art.html('<br>Programming/Art: Dan DiIorio<br>Font: Eeve Somepx<br>Music: Nintendo');
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
                else if (!game.p1Selected) {
                    game.p1Selected = true;
                    if (!game.p1Ready) {
                        $p1Score.text('Ready!');
                        game.p1Ready = true;
                    }
                    else {
                        $p1Score.text('Start?');
                        game.p1Ready = false;
                    }
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
                else if (!game.p1Selected) {
                    game.p1Selected = true;
                    if (!game.p1Ready) {
                        $p1Score.text('Ready!');
                        game.p1Ready = true;
                    }
                    else {
                        $p1Score.text('Start?');
                        game.p1Ready = false;
                    }
                }
                $p1Selector.css('top', '-69px');
            }
            else {
                game.p1Selected = false;
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
                else if (!game.p2Selected) {
                    game.p2Selected = true;
                    if (!game.p2Ready) {
                        $p2Score.text('Ready!');
                        game.p2Ready = true;
                    }
                    else {
                        $p2Score.text('Start?');
                        game.p2Ready = false;
                    }
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
                else if (!game.p2Selected) {
                    game.p2Selected = true;
                    if (!game.p2Ready) {
                        $p2Score.text('Ready!');
                        game.p2Ready = true;
                    }
                    else {
                        $p2Score.text('Start?');
                        game.p2Ready = false;
                    }
                }
                $p2Selector.css('top', '18px');
            }
            else {
                game.p2Selected = false;
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
                assetHandler.$music[10][0].volume -= (0.5 / 90);
                if (startCountdown == 0) {
                    window.clearInterval(game.intervalID);
                    assetHandler.$music[10][0].pause();
                    assetHandler.$music[10][0].currentTime = 0;
                    $p1Selector.css('opacity', '0');
                    $p2Selector.css('opacity', '0');
                    game.timer.framesLeft = (game.minutes * 60 * 30) + game.seconds * 30;
                    game.gameLength = game.timer.framesLeft;
                    $p1InfoText.text('Buckle up...');
                    $p2InfoText.text('Buckle up...');
                    $p1Art.css('font-size', '192px');
                    $p2Art.css('font-size', '192px');
                    $p1Art.empty();
                    $p2Art.empty();
                    assetHandler.$controlAssets[0].css('opacity', '0');
                    assetHandler.$controlAssets[2].css('opacity', '0');
                    assetHandler.$controlAssets[4].css('opacity', '0');
                    assetHandler.$controlAssets[6].css('opacity', '0');
                    game.countdown();
                }
            }
            else {
                startCountdown = 90;
                assetHandler.$music[10][0].volume = 0.5;
            }
        },
        countdown: function() {
            game.titleScreenBool = false;
            game.playMusic(assetHandler.$music[9][0]);
            window.setTimeout(game.start, 3000);
        },
        start: function() {
            $p1Score.css('max-width', '58px');
            $p2Score.css('max-width', '58px');
            $p1Score.text('0');
            $p2Score.text('0');
            $timer.text(Math.floor(game.timer.framesLeft / 30 / 60) + ':' + game.timer.getSeconds(Math.floor(game.timer.framesLeft / 30) % 60));
            game.intervalID = window.setInterval(game.update, 1000 / 30);
            game.currentMiniGame = new MiniGame(165, 1);
        },
        update: function() {
            game.currentMiniGame.checkInputs();
            game.checkKeyBools();
            if (game.timer.updateTimer()) {
                if ((Math.ceil(game.currentMiniGame.framesLeft) == 165) && (game.currentMiniGame.speed == 1) && (game.timer.framesLeft <= game.gameLength * 0.75)) {
                    game.currentMiniGame.speed = 1.25;
                    game.speed = 1.25;
                    game.currentMiniGame.framesLeft = 315;
                    game.currentMiniGame.musicNum++;
                    $p1InfoText.text('SPEED UP!');
                    $p2InfoText.text('SPEED UP!');
                    $p1Art.empty();
                    $p2Art.empty();
                    game.playMusic(assetHandler.$music[6][0]);
                }
                else if ((Math.ceil(game.currentMiniGame.framesLeft) == 165) && (game.currentMiniGame.speed == 1.25) && (game.timer.framesLeft <= game.gameLength * 0.5)) {
                    game.currentMiniGame.speed = 1.5;
                    game.speed = 1.5;
                    game.currentMiniGame.framesLeft = 307;
                    game.currentMiniGame.musicNum++;
                    $p1InfoText.text('SPEED UP!');
                    $p2InfoText.text('SPEED UP!');
                    $p1Art.empty();
                    $p2Art.empty();
                    game.playMusic(assetHandler.$music[7][0]);
                }
                if (Math.ceil(game.currentMiniGame.framesLeft) == 165) {
                    if (game.currentMiniGame.miniGameNum != 4) {
                        game.currentMiniGame.p1Amount = 0;
                        game.currentMiniGame.p2Amount = 0;
                    }
                    game.displayControls(game.currentMiniGame.controls);
                    $p1InfoText.text(game.currentMiniGame.clue);
                    $p2InfoText.text(game.currentMiniGame.clue);
                    $p1Art.empty();
                    $p2Art.empty();
                    game.playMusic(assetHandler.$music[game.currentMiniGame.musicNum][0]);
                }
                if (game.currentMiniGame.framesLeft <= 165) {
                    game.currentMiniGame.draw();
                    $p1Timer.css('width', 608 * ((game.currentMiniGame.framesLeft - 45) / 120) + 'px');
                    $p2Timer.css('width', 608 * ((game.currentMiniGame.framesLeft - 45) / 120) + 'px');
                    switch (game.currentMiniGame.checkWin()) {
                        case 1:
                            $p1InfoText.text('YOU WIN!');
                            $p2InfoText.text('YOU LOSE!');
                            game.p1Score++;
                            assetHandler.$music[game.currentMiniGame.musicNum][0].pause();
                            assetHandler.$music[game.currentMiniGame.musicNum][0].currentTime = 0;
                            game.playMusic(assetHandler.$music[0 + Math.floor(game.currentMiniGame.speed * 2.75) - 2][0]);
                            game.endMiniGame();
                        break;
                        case 2:
                            $p1InfoText.text('YOU LOSE!');
                            $p2InfoText.text('YOU WIN!');
                            game.p2Score++;
                            assetHandler.$music[game.currentMiniGame.musicNum][0].pause();
                            assetHandler.$music[game.currentMiniGame.musicNum][0].currentTime = 0;
                            game.playMusic(assetHandler.$music[3 + Math.floor(game.currentMiniGame.speed * 2.75) - 2][0]);
                            game.endMiniGame();
                        break;
                        case 3:
                            $p1InfoText.text('DRAW!');
                            $p2InfoText.text('DRAW!');
                            game.p1Score++;
                            game.p2Score++;
                            assetHandler.$music[game.currentMiniGame.musicNum][0].pause();
                            assetHandler.$music[game.currentMiniGame.musicNum][0].currentTime = 0;
                            game.playMusic(assetHandler.$music[0 + Math.floor(game.currentMiniGame.speed * 2.75) - 2][0]);
                            game.endMiniGame();
                        break;
                    }
                }
                game.currentMiniGame.framesLeft -= game.currentMiniGame.speed;
            }
            else {
                if (game.restartFrames == 300) {
                    if ((game.currentMiniGame != null) && (game.currentMiniGame.framesLeft > 45)) {
                        assetHandler.$music[game.currentMiniGame.musicNum][0].pause();
                        assetHandler.$music[0][0].pause();
                        assetHandler.$music[1][0].pause();
                        assetHandler.$music[game.currentMiniGame.musicNum][0].currentTime = 0;
                        assetHandler.$music[0][0].currentTime = 0;
                        assetHandler.$music[1][0].currentTime = 0;
                    }
                    $p1Art.text(game.p1Score).css('font-size', '192px');
                    $p2Art.text(game.p2Score).css('font-size', '192px');
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
                    game.playMusic(assetHandler.$music[8][0]);
                    assetHandler.$controlAssets[0].css('opacity', '0');
                    assetHandler.$controlAssets[1].css('opacity', '0');
                    assetHandler.$controlAssets[2].css('opacity', '0');
                    assetHandler.$controlAssets[3].css('opacity', '0');
                    assetHandler.$controlAssets[4].css('opacity', '0');
                    assetHandler.$controlAssets[5].css('opacity', '0');
                    assetHandler.$controlAssets[6].css('opacity', '0');
                    assetHandler.$controlAssets[7].css('opacity', '0');
                }

                game.restartFrames--;

                $p1Timer.css('width', 608 * (game.restartFrames / 300) + 'px');
                $p2Timer.css('width', 608 * (game.restartFrames / 300) + 'px');

                if (game.restartFrames == 0) {
                    game.titleScreen();
                }
            }
        },
        checkKeyBools: function() {
            if (game.titleScreenBool) {
                for (var i = 0; i < keyPressBools.length; i++) {
                    
                    if ((game.p1Ready) && ((i == 1) || (i == 3))) {
                        i++;
                    }

                    if ((game.p1Ready) && ((i == 5) || (i == 7))) {
                        i++;
                    }

                    if (i == 8) {
                        break;
                    }

                    if (keyPressBools[i]) {
                        if ((assetHandler.$controlAssets[i].attr('class') == 'control') || (assetHandler.$controlAssets[i].attr('class') == 'control control-up')) {
                            assetHandler.$controlAssets[i].addClass('control-pressed');
                            game.playMusic(assetHandler.$sfx[Math.floor(Math.random() * 95)][0]);
                        }
                    }
                    else {
                        assetHandler.$controlAssets[i].removeClass('control-pressed');
                    }
                }
            }
            else if ((!game.titleScreenBool) && (game.currentMiniGame != null)) {
                for (var i = 0; i < game.currentMiniGame.controls.length; i++) {
                    if (keyPressBools[game.currentMiniGame.controls[i]]) {
                        if ((assetHandler.$controlAssets[game.currentMiniGame.controls[i]].attr('class') == 'control') || (assetHandler.$controlAssets[game.currentMiniGame.controls[i]].attr('class') == 'control control-up')) {
                            assetHandler.$controlAssets[game.currentMiniGame.controls[i]].addClass('control-pressed');
                            game.playMusic(assetHandler.$sfx[Math.floor(Math.random() * 95)][0]);
                        }
                    }
                    else {
                        assetHandler.$controlAssets[game.currentMiniGame.controls[i]].removeClass('control-pressed');
                    }
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
            if ((game.titleScreenBool) || ((game.currentMiniGame != null) && (!game.currentMiniGame.fullKeyPresses) && (game.currentMiniGame.framesLeft <= 165))) {
                game.changeKeyBool(event.keyCode, true);
            }
            else {
                game.changeKeyBool(event.keyCode, false);
            }
        },
        checkKeyReleases: function() {
            if ((game.currentMiniGame != null) && (!game.titleScreenBool) && (game.currentMiniGame.fullKeyPresses)) {
                if (game.currentMiniGame.framesLeft <= 165) {
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
            this.currentMiniGame = new MiniGame(232, game.speed);
        }
	};

    $(window).on('keydown', game.checkKeyPresses);
    $(window).on('keyup', game.checkKeyReleases);

    $muteButton.on('click', game.changeMute);

	assetHandler.loadAssets();

    game.titleScreen();
});