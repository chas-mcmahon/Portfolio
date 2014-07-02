(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Board = SnakeGame.Board = function(len, wid, snake){
    var temp = [];

    _.times(len, function(){
      temp.push(new Array(wid));
    });

    this.board = temp;
    this.snake = snake;
    this.apple = new SnakeGame.Apple(
      SnakeGame.Coord.random(),
      this
    );
  }

  Board.prototype.newApple = function(){
    this.apple = new SnakeGame.Apple( SnakeGame.Coord.random(), this );
  };

  Board.prototype.render = function(){
    var boardStr = "";

    var Board = this.board;
    var Snake = this.snake;
    var Apple = this.apple;

    for (var i = 0; i < Board.length; i++) {
      boardStr += "<div class='row'>"
      for (var j = 0; j < Board[i].length; j++) {
        var currentCoord = new SnakeGame.Coord(j, i);

        if (Snake.includesSegment(currentCoord) ){
          boardStr += "<div class='snake'></div>";
        } else if (Apple.coord.isEqualTo(currentCoord) ){
          boardStr += "<div class='apple'></div>";
        } else {
          boardStr += "<div class='space'></div>";
        };
      };

     boardStr += "</div>";
    };

    $(".board").html(boardStr);
  };

})(this);