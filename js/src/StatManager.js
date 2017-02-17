

define(function() {
	
  var StatManager = Class.extend({

    init: function() {
      this.reset(0);
    },

    reset: function() {
      this.stats = {
        L: 0,
        I: 0,
        T: 0,
        S: 0, 
        Z: 0,
        O: 0,
        J: 0,

        TOTAL: 12
      }
    },

    increase: function(id) {
      this.stats[id] += 1;
      this.stats['TOTAL'] += 1;
    }
  });

  return StatManager;

});