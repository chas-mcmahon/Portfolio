$(document).ready(function(){
  window.showModal = function(){
    $("#modal").addClass("is-active");
    $(".points").html("Score: " + window.game.points);
  }

  window.hideModal = function(){
    $("#modal").removeClass("is-active");
    window.game.resetGame();
  }

  $("body").on("click", ".js-hide-modal", window.hideModal);
});