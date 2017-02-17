

define([
  'src/GameBoard',
  'src/StatManager',
  'src/Brick',
  'src/Block'
], function(GameBoard, StatManager, Brick, Block) {

  var Tetris = Class.extend({

    init: function(cols, rows) {

      this.cols = cols;
      this.rows = rows;

      this.gameBoard = new GameBoard();
      this.stat = new StatManager();

      this.blockControl = [];

      var brick = new Brick(Brick.S);

      // console.log('' + brick);
      this.reset();
    },

    reset: function() {
      this.blockControl = [];
      for (var i = 0; i < this.cols; i++) {
        this.blockControl[i] = [];
        for (var j = 0; j < this.rows; j++) {
          this.blockControl[i][j] = new Block(Block.NONE);
        }
      }
    },

    update: function(inpt) {
      // if (inpt.pressed('space')) {
      //   console.log(inpt.mouse.x);
      // }
    },

    draw: function(ctx) {
      this.gameBoard.draw(ctx, this.stat);

      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          var b = this.blockControl[i][j];
          if (b.solid) {
            this.gameBoard.drawBlock(ctx, b, i, j);
          }
        }
      }
    }
  });

  return Tetris;
});