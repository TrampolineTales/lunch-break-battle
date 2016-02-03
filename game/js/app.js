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

    var game = {
    	displayControls: function(controlsToDisplay) {
    		for (var i = 0; i < controlsToDisplay.length; i++) {
    			controlsToDisplay[i]
    		};
    	}
	};

	assetHandler.loadAssets();
});