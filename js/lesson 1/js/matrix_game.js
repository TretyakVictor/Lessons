"use strict";
var x = 1,
  y = 1;
function createMatrix(nh, nw) {
  var length = nh * nw;
  for (var i = 0; i < length; i++) {
    var div = document.createElement('div');
    div.className = 'cell';
    matrix.appendChild(div);
  }
}

function checkCursor(row, col, flag) {
  var cell = getCellPosition(row, col);
  if (flag) {
    cell.classList.remove('green');
  } else if (cell.classList.contains('red')) {
    alert('Done!');
    cell.classList.remove('red');
    start();
  } else {
    cell.classList.add('green');
  }
}

function getCellPosition(row, col) {
  if (row < 1 || row > 20) {
    row = x = 1;
  } else if (row > 20) {
    row = x = 1;
  }
  if (col < 1 || col > 20) {
    col = y = 1;
  }
  return matrix.childNodes[(20 * (row - 1) + col)];
}

function setCursor(row, col, color) {
  getCellPosition(row, col).classList.add(color);
}

function moveCursor(e) {
  checkCursor(x, y, true);
  switch (e.keyCode) {
    case 37:
    case 65:
      setCursor(x, --y);
      break;
    case 38:
    case 87:
      setCursor(--x, y);
      break;
    case 39:
    case 68:
      setCursor(x, ++y);
      break;
    case 40:
    case 83:
      setCursor(++x, y);
      break;
    default:
      break;
  }
}
function randInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}
function start() {
  x = y = 1;
  setCursor(1, 1, 'green');
  setCursor(randInt(1, 20), randInt(1, 20), 'red');
}

window.onload = function() {
  var n1 = 20,
    n2 = 20,
    matrix = document.getElementById('matrix');
  createMatrix(n1, n2);
  matrix.focus();
  matrix.onkeydown = function(e) {
    console.log(e.keyCode);
    moveCursor(e);
    checkCursor(x, y);
  }
  start();
}
