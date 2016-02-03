$(function(){
    var p1 = $('#player-1');
    var p2 = $('#player-2');

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
    		// this.$controlAssets[0].appendTo('.controls.p1');
    		// this.$controlAssets[1].appendTo('.controls.p1');
    		// this.$controlAssets[2].appendTo('.controls.p1');
    		// this.$controlAssets[3].appendTo('.controls.p1');
    		// this.$controlAssets[4].appendTo('.controls.p2');
    		// this.$controlAssets[5].appendTo('.controls.p2');
    		// this.$controlAssets[6].appendTo('.controls.p2');
    		// this.$controlAssets[7].appendTo('.controls.p2');
    	}
    }

    function MiniGame(speed, fullKeyPresses) {
        this.secondsLeft = 5;
        this.speed = speed;
        this.fullKeyPresses = fullKeyPresses;
    };

    var game = {
        secondsLeft: 180,
        currentMiniGame: new MiniGame(1, false),
        keyPressBools: [false, false, false, false, false, false, false, false],
        checkKeyBools: function() {
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
        }
	};

    window.setInterval(game.checkKeyBools, 1000 / 30);
    $(window).on('keydown', game.checkKeyPresses);
    $(window).on('keyup', game.checkKeyReleases);

	assetHandler.loadAssets();
    //game.displayControls([0, 4]);
});