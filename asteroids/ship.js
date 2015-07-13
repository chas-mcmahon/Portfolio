(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, radius, color) {
    Asteroids.MoveObject.call(this, pos, vel, radius, color);
  };

  Ship.inherits(Asteroids.MoveObject);
  Ship.COLOR = 'red';
  Ship.RADIUS = 5;

  Ship.startPoint = function(screenWidth, screenHeight){
    return [(screenWidth/2),(screenHeight/2)];
  };

  Ship.newShip = function(screenWidth, screenHeight) {
    return new Ship(
      this.startPoint(screenWidth, screenHeight),
      [0,0],
      Ship.RADIUS,
      Ship.COLOR
    );
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function(game){
    var speed = Math.sqrt(
      Math.pow(this.vel[0], 2) +
      Math.pow(this.vel[1], 2)
    );

    var start_point = [this.centerX, this.centerY];

    var direction = [this.vel[0] / speed, this.vel[1] / speed];
    return Asteroids.Bullet.newBullet(start_point, direction, 1, 'red', game);
  };

})(this);