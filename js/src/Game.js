

define(function() {

  var Game = Class.extend({

    tick: function() {
      console.warn('should be overriden...');
    },

    run: function() {
      // console.log('running...');
      var self = this;
      function loop() {
        self._reqframe = window.requestAnimationFrame(loop);

        self.tick();

        canvas.flip();
      }
      this._reqframe = window.requestAnimationFrame(loop);
    }
  });

  return Game;
})