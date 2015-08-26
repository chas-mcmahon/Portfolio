(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(canvasEl) {
    this.ctx = canvasEl.getContext("2d");
    this.SCREENWIDTH = canvasEl.width;
    this.SCREENHEIGHT = canvasEl.height;
    this.ship = this.addShip(this.SCREENWIDTH, this.SCREENHEIGHT);
    this.asteroids = [];
    this.lives = 3;
    this.points = 0;
    this.bullets = [];
  };

  Game.prototype.generateAsteroids = function(numAsteroids) {
      var i = 0;
      while (i < numAsteroids) {
        var asteroid = Asteroids.Asteroid.randomAsteroid(
          this.SCREENWIDTH,
          this.SCREENHEIGHT,
          this);

        if (this.ship.isCollideWith(asteroid)) {
          asteroid = null;
        } else {
          this.asteroids.push(asteroid);
          i++;
        }
      }
  };

  Game.prototype.resetGame = function() {
    this.asteroids = [];
    this.generateAsteroids(15);
    this.lives = 3;
    this.points = 0;
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
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.ship.isCollideWith({
        centerX: this.asteroids[i].centerX,
        centerY: this.asteroids[i].centerY,
        radius: this.asteroids[i].radius
      }) == true) {
        this.lives -= 1;
        this.ship.centerX = this.ship.pos[0];
        this.ship.centerY = this.ship.pos[1];
        this.ship.vel = [0,0];
        console.log("lives:", this.lives);
        // REMOVE VISUAL MARKER FOR LIVES OR SOMETHING
        if (this.lives === 0){
          window.showModal();
        }
      }
    }

    for (var i = 0; i < this.bullets.length; i++) {
      asteroid_index = this.bullets[i].hitAsteroids();
      if (asteroid_index != null) {
        this.removeBullet(i);
        this.removeAsteroid(asteroid_index);
        this.points += 1;
        console.log("points:", this.points);
      }
    }
    this.move();
    this.bulletsOffScreen();
    this.draw();
   };

  Game.prototype.bindKeyHandlers = function(){
    var that = this;
    key('w', function(){ that.ship.power([ 0,-1]) });
    key('a', function(){ that.ship.power([-1, 0]) });
    key('s', function(){ that.ship.power([ 0, 1]) });
    key('d', function(){ that.ship.power([ 1, 0]) });
    key('j', function(){ that.fireBullet() });
  };

  Game.prototype.start = function(){
    var game = this;
    this.bindKeyHandlers();
    this.generateAsteroids(15);
    window.setInterval(function () {
      game.step();
    }, 15);
    window.setInterval(function() {
      game.generateAsteroids(2);
    }, 1000)
  };

})(this);
