(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  
  var Bullet = Asteroids.Bullet = function(options){
    Asteroids.MoveObject.call(this, options);
    this.game = options.game;
    for(var i = 0; i < this.vel.length; i++) { this.vel[i] *= Bullet.SPEED; }
  };

  Bullet.inherits(Asteroids.MoveObject);
  Bullet.COLOR = "red";
  Bullet.RADIUS = 3;
  Bullet.SPEED = 5;

  Bullet.newBullet = function(options) {
    return new Bullet({
      pos: options.pos,
      vel: options.vel,
      radius: Bullet.RADIUS,
      game: options.game
    });
  };

  Bullet.prototype.hitAsteroids = function() {
    for (var i = 0; i < this.game.asteroids.length; i++) {
      if (this.isCollideWith({
        centerX: this.game.asteroids[i].centerX,
        centerY: this.game.asteroids[i].centerY,
        radius: this.game.asteroids[i].radius
      }) == true) {
        return i;
      }
    }
    return null
  };
  
})(this);