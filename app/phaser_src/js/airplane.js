/**
 * Airplane class
 * 
 */

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

Airplane = function(game, type) {
	Phaser.Sprite.call(this, game, 0, 0, type);
	this.anchor.setTo(0.5, 0.5);
	game.add.existing(this);
	this.currentPaths = [];
	this.pathProgress = 0;
	this.angle = 12;
	this.speed = 0;
};

Airplane.prototype = Object.create(Phaser.Sprite.prototype);
Airplane.prototype.constructor = Airplane;

Airplane.prototype.update = function() {
	var path = this.currentPaths[0];
	if (path) {
		//If no initial speed, set speed fro path
		if (this.speed == 0) {
			this.speed = path.speed;
		}
		//Set previous position
		var lastPosition = JSON.parse(JSON.stringify(this.position));

		//Add acceleration
		if (path.acceleration != 0 && this.speed < path.maxspeed) {
			this.speed += path.acceleration;
		}

		//Increment progress
		this.pathProgress += this.speed;

		//Update position
		if (path.type == "linear") {
			this.x = Phaser.Math.linearInterpolation(path.x, this.pathProgress);
			this.y = Phaser.Math.linearInterpolation(path.y, this.pathProgress);
		}
		else if (path.type == "bezier") {
			this.x = Phaser.Math.bezierInterpolation(path.x, this.pathProgress);
			this.y = Phaser.Math.bezierInterpolation(path.y, this.pathProgress);
		}

		//Set new angle of sprite
		if (this.pathProgress < 1) {
			var lastAngle = JSON.parse(JSON.stringify(this.angle));
			var newAngle = Math.round(Math.degrees(Phaser.Math.angleBetweenPoints(lastPosition, this.position))) + 90;
			if (Math.abs(newAngle - lastAngle) < 2) {
				this.angle = newAngle;
			}
		}

		//Path finished
		if (this.pathProgress >= 1) {
			//Reset speed and progress
			this.pathProgress = 0;
			this.speed = 0;

			//Remove current path
			this.currentPaths.shift(); //remove first/current path
		}
	}
};

Airplane.prototype.customUpdate = function(phaser) {
	
}

Airplane.prototype.addPath = function(path) {
    this.currentPaths.push(path);
};