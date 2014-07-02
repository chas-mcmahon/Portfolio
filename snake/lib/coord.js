(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Coord = SnakeGame.Coord = function(x, y){
    this.x = x;
    this.y = y;
  }

  Coord.prototype.plus = function(otherCoord) {
    var x = this.x + otherCoord.x;
    var y = this.y + otherCoord.y;
    return new SnakeGame.Coord(x, y);
  };

  Coord.prototype.isEqualTo = function(otherCoord) {
    return ((this.x === otherCoord.x) && (this.y === otherCoord.y));
  }

  Coord.random = function() {
    var x = Math.floor(
      Math.random() * SnakeGame.View.WIDTH
    );

    var y = Math.floor(
      Math.random() * SnakeGame.View.HEIGHT
    );

    return new SnakeGame.Coord(x, y);
  };

})(this);