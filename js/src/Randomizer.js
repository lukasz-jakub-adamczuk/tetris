

define(function() {

  var Randomizer = Class.extend({

    init: function() {
      this._IDs = 'LITSZOJ'.split('');
      this._S_ID = this._IDs.indexOf('S');
      this._Z_ID = this._IDs.indexOf('Z');
      this.size = this._IDs.length;
      this.initialize();
    },

    initialize: function() {
      this.idx = 0;
      this.bag = new Array(this.size);

      for (var i = 0; i < this.size; i++) {
        this.bag[i] = i;
      }

      do {
        this.shuffle();
      } while (this.bag[0] === this._S_ID || this.bag[0] === this._Z_ID)
    },

    shuffle: function(array) {
      var array = array || this.bag,
        counter = array.length,
        tmp,
        idx;

      while (counter > 0) {
        idx = Math.round(Math.random() * --counter);
        tmp = array[counter];
        array[counter] = array[idx];
        array[idx] = tmp;
      }

      return array;
    },

    nextInt: function() {
      var i = this.bag[this.idx];
      this.idx++;
      if (this.idx >= this.size) {
        this.idx = 0;
        this.shuffle();
      }
      return i;
    },

    nextID: function() {
      return this._IDs[this.nextInt()];
    }
  });

  return Randomizer;

});