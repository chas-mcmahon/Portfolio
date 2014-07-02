(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function($el){
    this.$el = $el;
  };

  View.WIDTH = 21;
  View.HEIGHT = 21;

  View.prototype.start = function(){

    this.snake = new SnakeGame.Snake("S", [new SnakeGame.Coord(11, 0)]);
    this.board = new SnakeGame.Board(View.WIDTH, View.HEIGHT, this.snake);
    this.bindKeyHandlers();
    var thatSnake = this.snake;
    var thatBoard = this.board;

    // thatBoard.render();
    var gameStep = setInterval(function(){
      console.log("Interval!");
      thatSnake.move(thatBoard);
      thatBoard.render();
    }, 100);

  };

  View.prototype.bindKeyHandlers = function(){
    var thatSnake = this.snake

    key("up", function(){
      thatSnake.turn("N");
    });

    key("down", function(){
      thatSnake.turn("S");
    });

    key("left", function(){
      thatSnake.turn("W");
    });

    key("right", function(){
      thatSnake.turn("E");
    });

  };

})(this);

$(document).ready(function(){
  var $body = $("body");
  game = new window.SnakeGame.View($body);
  game.start()
});
