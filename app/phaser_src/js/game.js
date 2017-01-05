var FlightRouteSim = FlightRouteSim || {};

//title screen
FlightRouteSim.Game = function(){};

FlightRouteSim.Game.prototype = {
	preload: function() {
      this.game.time.advancedTiming = true;
    }, 

	create: function() {
		//Load Tiles for Base Background Layer 
		var data = this.game.global.mapdata;
		var max = data["width"] * data["height"];
		this.game.world.setBounds(0, 0, data["width"] * data["size"], data["height"] * data["size"]);
		//Note: image names start on 01
    	for (i = 1; i <= max; i++) {
    		var num;
    		if (i < 10) {
    			num = "0" + i;
    		} else {
    			num = "" + i;
    		}
    		var z = i - 1; //account for i starting on 1
    		var xPos = z % data["width"] * data["size"];
    		var yPos = Math.floor(z/data["width"]) * data["size"];
    		var sprite = this.game.add.sprite(xPos, yPos, "base_" + num);
    	}

    	//Load Paths
		//Get Json Async off
		$.ajaxSetup({
	        async: false
	    });

	    //Get Map data
	    var temp_pathdata;
	    $.getJSON("phaser_src/assets/data/" + this.game.global.airport_code + "/pathdata.json", function(data) {
	    	temp_pathdata = data;
		});

	    var pathdata = {};
		for (var path in temp_pathdata) {
			pathdata[path] = new Path(temp_pathdata[path])
        }
        this.game.global.pathdata = pathdata;

	    //Get Json Async on
		$.ajaxSetup({
	        async: true
	    });

		//Load flights
		var plane = new Airplane(this.game, "B738");
		plane.addPath(pathdata["path"]);
		plane.addPath(pathdata["path2"]);

		var airplanedata = {};
		airplanedata["test"] = plane;
		this.game.global.airplanedata = airplanedata;

		
		//move player with cursor keys
		this.cursors = this.game.input.keyboard.createCursorKeys();

		//Set timer
		//this.game.time.events.loop(Phaser.Timer.SECOND * 60, this.updateFlightInfo, this);
	},

	update: function() {
		if (this.cursors.up.isDown) {
	        this.game.camera.y -= 16;
	    } else if (this.cursors.down.isDown) {
	        this.game.camera.y += 16;
	    }

	    if (this.cursors.left.isDown) {
	        this.game.camera.x -= 16;
	    } else if (this.cursors.right.isDown) {
	        this.game.camera.x += 16;
	    }

	    for (var plane in this.game.global.airplanedata) {
			this.game.global.airplanedata[plane].customUpdate();
        }
	},

	//Refresh's information on flights
	updateFlightInfo: function() {
		
	},

	render: function() {
		this.game.debug.text(this.game.time.fps + " x: " + (this.game.input.x + + this.game.camera.x)+ " y: " + (this.game.input.y + + this.game.camera.y) || '--', 2, 14, "#00ff00");   

	}
};