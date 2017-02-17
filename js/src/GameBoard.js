

define(function() {

  var GameBoard = Class.extend({

    init: function() {
      this.bg = content.get('bg');

      // TODO font numbers
    },

    draw: function(ctx, stat) {
      var bricks = stat.stats;

      ctx.drawImage(this.bg, 0, 0); 

      // TODO drawing stats

      ctx.fillStyle = "rgb(25, 25, 25)";
      ctx.font = "24px Helvetica";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("SCORE: " + bricks.TOTAL, 32, 32);

    }
  });

  return GameBoard;

});