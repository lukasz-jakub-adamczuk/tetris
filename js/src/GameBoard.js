

define(function() {

  var GameBoard = Class.extend({

    init: function() {
      this.bg = content.get('bg');
      this.blocks = {
        blue: content.get('block-blue')
      }

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

    },

    drawBlock: function(ctx, block, x, y) {
      // how it's working
      // var id = block.id, 
      var id = block.ID,
        size = 16;

      x = 160 + x * size;
      y = 0 + y * size;

      ctx.drawImage(this.blocks.blue, 0, 0, size, size, x, y, size, size);
    }
  });

  return GameBoard;

});