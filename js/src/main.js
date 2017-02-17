

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

      content.load('bg', 'assets/background.png');
      content.load('brick', 'assets/O_1-2-3-4.png');
 
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
          this.tetris = new Tetris();
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