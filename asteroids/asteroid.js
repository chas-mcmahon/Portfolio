(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    Asteroids.MoveObject.call(this, pos, vel, radius, color);
  };

  Asteroid.inherits(Asteroids.MoveObject);

  Asteroid.COLOR = 'white';
  Asteroid.RADIUS = 25;

  Asteroid.randPosition = function(screenWidth, screenHeight) {
    startX = Math.floor(Math.random()*screenWidth);
    startY = Math.floor(Math.random()*screenHeight);
    return newPos = [startX, startY];
  };

  Asteroid.randomAsteroid = function(screenWidth, screenHeight) {
    newVelX = ((Math.random()*2) -1)/2;
    newVelY = ((Math.random()*2) -1)/2;
    if ((newVelX === 0) && (newVelY === 0)) {
      newVelX = -2;
      newVelY = 1;
    };
    newPos = Asteroid.randPosition(screenWidth, screenHeight);
    return new Asteroid(newPos, [newVelX, newVelY], Asteroid.RADIUS, Asteroid.COLOR);
  };

})(this);


