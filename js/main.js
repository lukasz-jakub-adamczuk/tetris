// 'use strict';

// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");
// canvas.width = 512;
// canvas.height = 480;
// document.body.appendChild(canvas);

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
// var modifier = 1;

// assets
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = 'assets/bg.png';

var brickReady = false;
var brickImage = new Image();
brickImage.onload = function() {
  brickReady = true;
};
brickImage.src = 'assets/O_1-2-3-4.png';


// game objects
var brick = {
  speed: 16,
  x: 0,
  y: 0
}

var score = 0;


// controls
var keys = {};

addEventListener('keydown', function(e) {
  keys[e.keyCode] = true;
});

addEventListener('keyup', function(e) {
  delete keys[e.keyCode];
});


// init all objects
var reset = function() {
  brick.x = canvas.width / 2;
  brick.y = 0;
};


// update game objects
var update = function(modifier) {
  // up
  if (38 in keys) {
    brick.y -= brick.speed * modifier;
  }
  // down
  if (40 in keys) {
    brick.y += brick.speed * modifier;
  }
  // left
  if (37 in keys) {
    brick.x -= brick.speed * modifier;
  }
  // right
  if (39 in keys) {
    brick.x += brick.speed * modifier;
  }

  // clean row
  if (false) {
    // increase score
  }
};


// draw all
var render = function() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (brickReady) {
    ctx.drawImage(brickImage, brick.x, brick.y);
  }

  console.log(brick);
}


// game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  requestAnimationFrame(main);
}


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


var then = Date.now();
reset();
main();

// setInterval(function() {
//   window.location.href = window.location.href;
// }, 1000);