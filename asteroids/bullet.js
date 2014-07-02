(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, radius, color, game){
    this.game = game;
    for(var i = 0; i < vel.length; i++) { vel[i] *= Bullet.SPEED; }
    Asteroids.MoveObject.call(this, pos, vel, radius, color);
  };

  Bullet.inherits(Asteroids.MoveObject);
  Bullet.COLOR = "red";
  Bullet.RADIUS = 1;
  Bullet.SPEED = 5;

  Bullet.newBullet = function(pos, vel, radius, color, game) {
    return new Bullet(pos, vel, radius, color, game);
  };

  Bullet.prototype.hitAsteroids = function() {
    for (var i = 0; i < this.game.asteroids.length; i++) {
      if (this.isCollideWith(this.game.asteroids[i]) == true) {
        return i;
      }
    }
    return null
  };



})(this);