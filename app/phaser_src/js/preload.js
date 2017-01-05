var FlightRouteSim = FlightRouteSim || {};

//loading the game assets
FlightRouteSim.Preload = function(){};

FlightRouteSim.Preload.prototype = {
	preload: function() {
		//show loading screen
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);

		//Get Json Async off
		$.ajaxSetup({
	        async: false
	    });

	    //Get Map data
	    var mapdata;
	    $.getJSON("phaser_src/assets/data/" + this.game.global.airport_code + "/mapdata.json", function(data) {
	    	mapdata = data;
		});

		this.game.global.mapdata = mapdata;
    	var max = mapdata["width"] * mapdata["height"];
    	var i; //images start on 01
    	for (i = 1; i <= max; i++) {
    		var num;
    		if (i < 10) {
    			num = "0" + i;
    		} else {
    			num = "" + i;
    		}
    		this.game.load.image("base_" + num, "phaser_src/assets/images/" + this.game.global.airport_code + "/base/base_" + num + ".png");
    	}

    	//Get Plane data
    	var airplanes;
    	$.getJSON("phaser_src/assets/data/airplanes.json", function(data) {
			airplanes = data;
		});
		for (var type in airplanes) {
			this.game.load.image(type, airplanes[type].imagepath);
        }
    	//Get Json Async on
		$.ajaxSetup({
	        async: true
	    });
		
	},
	create: function() {
		this.state.start('Game');
	}
};