(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MoveObject = Asteroids.MoveObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;

    this.centerX = this.pos[0];
    this.centerY = this.pos[1];
  }

  MoveObject.prototype.move = function(screenWidth, screenHeight) {

    this.centerX += this.vel[0] % screenWidth;
    this.centerY += this.vel[1] % screenHeight;
    
    if (this.centerX - this.radius >= screenWidth) {
      this.centerX = 0 - this.radius;
    } else if (this.centerX + this.radius <= 0) {
      this.centerX = screenWidth + this.radius;
    }

    if (this.centerY - this.radius >= screenHeight) {
      this.centerY = 0 - this.radius;
    } else if (this.centerY + this.radius <= 0) {
      this.centerY = screenHeight + this.radius;
    }
  };

  MoveObject.prototype.draw = function(ctx, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MoveObject.prototype.isCollideWith = function(otherObject){
    distX = Math.abs(this.centerX - otherObject.centerX);
    distY = Math.abs(this.centerY - otherObject.centerY);
    totRad = this.radius + otherObject.radius;

    if ((totRad * totRad) > ((distX * distX) + (distY * distY))){
      return true;
    } else {
      return false;
    }
  };

  Function.prototype.inherits = function(superClass){
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  };

})(this);