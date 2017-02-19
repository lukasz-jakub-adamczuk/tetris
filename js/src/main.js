

require.config({
  baseUrl: 'js',
  paths: {
    src: './src'
  }
});

require(['src/Game', 'src/Tetris'], function(Game, Tetris) {

  var App = Game.extend({

    init: function() {
      canvas.width = 480;
      canvas.height = 320;
      canvas.scale = 1;

      content.load('background', 'assets/background.png');
      
      content.load('block-blue', 'assets/block_blue.png');
      content.load('block-cyan', 'assets/block_cyan.png');
      content.load('block-green', 'assets/block_green.png');
      content.load('block-orange', 'assets/block_orange.png');
      content.load('block-purple', 'assets/block_purple.png');
      content.load('block-red', 'assets/block_red.png');
      content.load('block-yellow', 'assets/block_yellow.png');
      
      content.load('L', 'assets/L_1.png');
      content.load('J', 'assets/J_1.png');
      content.load('T', 'assets/T_1.png');
      content.load('I', 'assets/I_1-3.png');
      content.load('S', 'assets/S_1-3.png');
      content.load('Z', 'assets/Z_1-3.png');
      content.load('O', 'assets/O_1-2-3-4.png');
 
      input.bindKey('space', input.Keys.SPACE);
      input.bindKey('left', [input.Keys.LEFT_ARROW, input.Keys.A]);
      input.bindKey('right', [input.Keys.RIGHT_ARROW, input.Keys.D]);
      input.bindKey('up', [input.Keys.UP_ARROW, input.Keys.W]);
      input.bindKey('down', [input.Keys.DOWN_ARROW, input.Keys.S]);

      this.hasLoad = false;
    },

    tick: function() {
      
      if (this.hasLoad) {
        this.tetris.update(input);
        this.tetris.draw(canvas.ctx);
      } else {
        this.hasLoad = content.progress() === 1;

        if (this.hasLoad) {
          this.tetris = new Tetris(10, 20);
        }
      }
    }
  });

  (function() {
    var game = new App();
    game.run();

    window.onblur = game.stop.bind(game);
    window.onfocus = game.run.bind(game);
  })();
});