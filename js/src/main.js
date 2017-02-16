

require.config({
  baseUrl: 'js',
  paths: {
    src: './src'
  }
});

require(['src/Game'], function(Game) {

  var App = Game.extend({

    init: function() {
      canvas.width = 160;
      canvas.height = 320;
      canvas.scale = 1;

      content.load('bg', 'assets/background.png');
      content.load('brick', 'assets/O_1-2-3-4.png');
    },

    tick: function() {
      console.log('tick...');
      if (content.progress() === 1) {
        canvas.ctx.drawImage(content.get('bg'), 0, 0);
      }
    }
  });

  (function() {
    var game = new App();
    game.run();
  })();
});