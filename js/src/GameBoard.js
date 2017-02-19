

define(function() {

  var GameBoard = Class.extend({

    init: function() {
      this.background = content.get('back');

      this.blocks = {
        0: content.get('background'),
        2: content.get('block-red'),
        5: content.get('block-green'),
        3: content.get('block-blue'),
        1: content.get('block-cyan'),
        4: content.get('block-orange'),
        6: content.get('block-yellow'),
        7: content.get('block-purple')
      }

      this.bricks = {
        L: content.get('L'),
        J: content.get('J'),
        T: content.get('T'),
        I: content.get('I'),
        S: content.get('S'),
        Z: content.get('Z'),
        O: content.get('O')
      }

      // TODO font numbers
    },

    draw: function(ctx, stat) {
      var bricks = stat.stats;

      ctx.fillRect(160, 0, 160, 320);

      ctx.fillRect(72, 160, 72, 72);

      // TODO drawing stats

      ctx.fillStyle = 'rgb(25, 25, 25)';
      ctx.font = '16px Helvetica';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.fillText('Score: ' + stat.score, 16, 32);
      ctx.fillText('Level: ' + stat.level, 16, 64);
      ctx.fillText('Lines: ' + stat.lines, 16, 96);
      ctx.fillText('Next:', 16, 192);

    },

    drawBlock: function(ctx, block, x, y) {
      var id = block.ID,
        size = 16;

      x = 160 + x * size;
      y = 0 + y * size;

      ctx.drawImage(this.blocks[id], x, y);
    },

    drawNextBlock: function(ctx, block, x, y) {
      ctx.drawImage(this.bricks[block], x, y);
    }
  });

  return GameBoard;

});