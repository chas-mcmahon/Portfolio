(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(canvasEl) {
    this.ctx = canvasEl.getContext("2d");
    this.SCREENWIDTH = canvasEl.width;
    this.SCREENHEIGHT = canvasEl.height;
    this.asteroids = [];// this.addAsteroids(10);
    this.ship = this.addShip(this.SCREENWIDTH, this.SCREENHEIGHT);
    this.bullets = [];
  };

  Game.prototype.generateAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(
        this.SCREENWIDTH,
        this.SCREENHEIGHT
      ));
    }
  };

  Game.prototype.addShip = function(x, y) {
    return Asteroids.Ship.newShip(x, y);
  };

  Game.prototype.fireBullet = function() {
    if (this.ship.vel[0] != 0 || this.ship.vel[1] != 0 ) {
      this.bullets.push(this.ship.fireBullet(this));
    }
  }

  Game.prototype.draw = function() {
    this.ctx.clearRect(0,0, this.SCREENWIDTH, this.SCREENHEIGHT);
    var that = this;
    this.ship.draw(this.ctx, Asteroids.Ship.COLOR);

    this.bullets.forEach(function(bullet) {
      bullet.draw(that.ctx, Asteroids.Bullet.COLOR);
    });

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(that.ctx, Asteroids.Asteroid.COLOR);
    })
  };

  Game.prototype.move = function(){
    var that = this;
    this.ship.move(this.SCREENWIDTH, this.SCREENHEIGHT);

    this.bullets.forEach(function(bullet) {
      bullet.move(that.SCREENWIDTH, that.SCREENHEIGHT);
    });

    this.asteroids.forEach(function(asteroid){
      asteroid.move(that.SCREENWIDTH, that.SCREENHEIGHT);
    })
  };

  Game.prototype.bulletsOffScreen = function(){
    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].centerX - this.bullets[i].radius >= this.SCREENWIDTH) {
        this.removeBullet(i);
      } else if (this.bullets[i].centerX + this.bullets[i].radius <= 0) {
        this.removeBullet(i);
      }
      if (this.bullets[i].centerY - this.bullets[i].radius >= this.SCREENHEIGHT) {
        this.removeBullet(i);
      } else if (this.bullets[i].centerY + this.bullets[i].radius <= 0) {
        this.removeBullet(i);
      }
    }
  };

  Game.prototype.removeAsteroid = function(AstIndex) {
    delete this.asteroids.splice(AstIndex, 1);
  };

  Game.prototype.removeBullet = function(BulIndex) {
    delete this.bullets.splice(BulIndex, 1);
  };

  Game.prototype.step = function(){
    var game = this;

    for (var i = 0; i < game.asteroids.length; i++) {
      if (game.ship.isCollideWith(game.asteroids[i])) {
        alert("You lose!!!");
      }
    }
    for (var i = 0; i < game.bullets.length; i++) {
      asteroid_index = game.bullets[i].hitAsteroids();
      if (asteroid_index != null) {
        this.removeBullet(i);
        this.removeAsteroid(asteroid_index);
      }
    }
    game.move();
    game.bulletsOffScreen();
    game.draw();
   };

  Game.prototype.bindKeyHandlers = function(){
    var that = this;
    key('w', function(){ that.ship.power([ 0,-1]) });
    key('a', function(){ that.ship.power([-1, 0]) });
    key('s', function(){ that.ship.power([ 0, 1]) });
    key('d', function(){ that.ship.power([ 1, 0]) });
    key('space', function(){ that.fireBullet() });
  };

  Game.prototype.start = function(){
    var game = this;
    this.bindKeyHandlers();
    this.generateAsteroids(15);
    window.setInterval(function () {
      game.step();
    }, 15);
  };

})(this);
