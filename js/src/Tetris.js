

define([
  'src/GameBoard',
  'src/StatManager',
  'src/Brick',
  'src/Block',
  'src/Randomizer'
], function(GameBoard, StatManager, Brick, Block, Randomizer) {

  var Tetris = Class.extend({

    init: function(cols, rows) {

      this.cols = cols;
      this.rows = rows;

      this.gameBoard = new GameBoard();
      this.stat = new StatManager();
      this.random = new Randomizer();

      this.blockControl = [];

      this.reset();
    },

    reset: function() {
      this.frames = 1;

      this.blockControl = [];
      for (var i = 0; i < this.cols; i++) {
        this.blockControl[i] = [];
        for (var j = 0; j < this.rows; j++) {
          this.blockControl[i][j] = new Block(Block.NONE);
        }
      }

      this.random.initialize();
      
      this.nextBrick = this.random.nextID();

      this.setNextBrick();

      this.currentBrick.setTo(this.blockControl);
    },

    update: function(inpt) {
      this.currentBrick.setTo(this.blockControl, Block.NONE);

      if (inpt.pressed('up')) {
        this.moveRotate();
      }
      if (inpt.pressed('down')) {
        this.moveDown();
      }
      if (inpt.pressed('left')) {
        this.moveLeft();
      }
      if (inpt.pressed('right')) {
        this.moveRight();
      }
      if (inpt.pressed('space')) {
        this.hardDrop();
      }

      if (this.frames++ % 20 === 0) {
        this.moveDown();
      }

      this.currentBrick.setTo(this.blockControl);
    },

    gameOver: function() {
      window.alert('Congrats! You scored ' + this.stat.score + ' points! Try again...');
      this.reset();
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

      this.gameBoard.drawNextBlock(ctx, this.nextBrick, 80, 180);
    },

    setNextBrick: function() {
      var bc = this.blockControl;
      var cb = this.currentBrick;

      this.currentBrick = new Brick(this.nextBrick);
      this.currentBrick.x = 3;

      // check brick position if free
      if (this.currentBrick.check(this.blockControl, 0, 1)) {
        this.currentBrick.setTo(this.blockControl);
      } else {
        // console.log('game over');
        this.gameOver();
      }

      this.nextBrick = this.random.nextID();
    },

    moveLeft: function() {
      var bc = this.blockControl;
      var cb = this.currentBrick;

      if (cb.check(bc, -1, 0)) {
        cb.x -= 1;
      }
    },

    moveRight: function() {
      var bc = this.blockControl;
      var cb = this.currentBrick;

      if (cb.check(bc, 1, 0)) {
        cb.x += 1;
      }
    },

    moveRotate: function(dr) {
      dr = dr || 1;
      var bc = this.blockControl;
      var cb = this.currentBrick;

      if (cb.check(bc, 0, 0, dr)) {
        cb.rotation = cb.getRotation(dr);
      }
    },

    moveDown: function() {
      var bc = this.blockControl;
      var cb = this.currentBrick;

      // display block control
      // var arena = '\n';
      // for (var i = 0; i < this.rows; i++) {
      //   for (var j = 0; j < this.cols; j++) {
      //     arena += this.blockControl[j][i].ID;
      //   }
      //   arena += '\n';
      // }
      // console.log(arena);

      if (cb.check(bc, 0, 1)) {
        cb.y += 1;
      } else {
        cb.setTo(bc);
        this.checkRows();
        this.setNextBrick();
      }
    },

    hardDrop: function() {
      var bc = this.blockControl;
      var cb = this.currentBrick;
      var move = true;

      while (move) {
        if (cb.check(bc, 0, 1)) {
           cb.y += 1;
           this.stat.score += 2;
        } else {
          move = false;
          cb.setTo(bc);
          this.checkRows();
          this.setNextBrick();
        }
      }
    },

    checkRows: function() {
      var full, removed = 0;

      for (var i = this.rows-1; i >= 0; i--) {
        full = true;
        for (var j = 0; j < this.cols; j++) {
          if (!this.blockControl[j][i].solid) {
            full = false;
            break;
          }
        }

        if (full) {
          this.removedRow(i);
          removed++;
          this.stat.lines++;
          i++;
        }
      }

      if (removed > 0) {
        this.stat.addScore(removed);
        this.stat.checkLevelUp();
      }
    },

    removedRow: function(row) {
      var bc = this.blockControl;

      for (var i = row; i > 0; i--) {
        for (var j = 0; j < this.cols; j++) {
          bc[j][i].setType(bc[j][i - 1].ID);
        }
      }
    }
  });

  return Tetris;
});