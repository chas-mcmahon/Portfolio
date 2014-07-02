$(document).ready(function(){

  $("ul#TicTacToeBoard").on("click", "li", function(){
    var $target = $(event.target);
    var $targetId = $target.attr('id');

    if ($target.html() === "") $target.html(TTT.player);

    TTT.turn($targetId, function(){
      if (TTT.winner()) {
        if ( !alert("Someone won!") ) {
          location.reload();
        };
      }
    });
  });
});