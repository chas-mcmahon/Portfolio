(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(options) {
    Asteroids.MoveObject.call(this, options);
  };

  Ship.inherits(Asteroids.MoveObject);
  Ship.COLOR = 'red';
  Ship.RADIUS = 5;

  Ship.startPoint = function(screenWidth, screenHeight){
    return [(screenWidth/2),(screenHeight/2)];
  };

  Ship.newShip = function(screenWidth, screenHeight) {
    return new Ship({
      pos: this.startPoint(screenWidth, screenHeight),
      vel: [0,0],
      radius: Ship.RADIUS
    });
  };

  Ship.prototype.power = function(impulse) {
    var newX = Math.abs(this.vel[0] + impulse[0]);
    var newY = Math.abs(this.vel[1] + impulse[1]);
    if (newX < 5){
      this.vel[0] += impulse[0];
    }
    if (newY < 5){
      this.vel[1] += impulse[1]
    }
  };

  Ship.prototype.fireBullet = function(game){
    var speed = Math.sqrt(
      Math.pow(this.vel[0], 2) +
      Math.pow(this.vel[1], 2)
    );
    var start_point = [this.centerX, this.centerY];
    var direction = [this.vel[0] / speed, this.vel[1] / speed];
    return Asteroids.Bullet.newBullet({
      pos: start_point,
      vel: direction,
      radius: 1,
      game: game
    });
  };

  Ship.prototype.draw = function(ctx){
    var image = $("#shipImage")[0];
    ctx.drawImage(image, (this.centerX - 15), (this.centerY - 10))
    // ctx.drawImage(image, 0, 0, 30, 20, (this.centerX - 15), (this.centerY - 10), 30, 20);
  };

})(this);