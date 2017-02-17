

define(['src/GameBoard', 'src/StatManager', 'src/Brick'], function(GameBoard, StatManager, Brick) {

  var Tetris = Class.extend({

    init: function() {

      this.gameBoard = new GameBoard();
      this.stat = new StatManager();

      var brick = new Brick(Brick.S);

      console.log('' + brick);
      
    },

    update: function(inpt) {
      if (inpt.pressed('space')) {
        console.log(inpt.mouse.x);
      }
    },

    draw: function(ctx) {
      this.gameBoard.draw(ctx, this.stat);
    }
  });

  return Tetris;
});