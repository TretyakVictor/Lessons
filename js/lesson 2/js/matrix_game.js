"use strict";
var targetColor = 'green', sqColor = 'red', min = 1, max = 20, matrixRows = 20, matrixCols = 20;

function randInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function Matrix(containerId, rows, cols)
{
	this.containerId = containerId;

	this.rows = rows;

	this.cols = cols;

  this.matrix = document.getElementById(this.containerId);

  this.nums = this.rows * this.cols;

	this.create = function()
	{

		matrix.innerHTML = '';

		for (var i = 0; i < this.nums; i++)
		{
			var div = document.createElement('div');
			div.className = 'cell';
			matrix.appendChild(div);
		}
	}
  this.getRows = function(row, col) {
    return this.rows;
  }
	this.getCell = function(row, col)
	{
    var ind = (row - 1) * this.cols + col - 1;
    var cell = matrix.children[ind];
    if (cell.classList.contains(targetColor)) {
      return 1;
    } else {
      return false;
    }
	}

	this.setCell = function(row, col, val, type)
	{
		var ind = (row - 1) * this.cols + col - 1;
		var cell = matrix.children[ind];
    if (val && !type) {
      cell.classList.add(sqColor);
    } else if (val && type) {
      cell.classList.add(type);
    } else {
      cell.className = 'cell';
    }
	}
  this.checkCell = function(row, col)
	{
      if (row < 1 || row > this.rows) {
        return 1;
      }
      if (col < 1 || col > this.cols) {
        return 1;
      }
      var ind = (row - 1) * this.cols + col - 1;
  		var cell = matrix.children[ind];
      if (cell.classList.contains(targetColor)) {
        return 2;
      }
      return false;
	}
}
function Square(row, col, obj, course)
{
	this.body = [row, col];
	this.course = course;
	var that = this;

	this.create = function(type)
	{
    obj.setCell(that.body[0], that.body[1], true, type);
	}
  this.changeCourse = function(course) {
    if (course) {
      this.course = course;
    } else {
      this.course = 'right';
    }
  }
	this.move = function()
	{
		var last_body = that.body.slice();
    console.log(that.course);
    console.log(last_body);
		switch(that.course)
		{
      case 'right':
				that.body[1]++;
				break;
      case 'left':
				that.body[1]--;
				break;
      case 'bottom':
				that.body[0]++;
				break;
			case 'top':
				that.body[0]--;
				break;

		}
    obj.setCell(last_body[0], last_body[1], false);
    if (obj.checkCell(that.body[0], that.body[1])) {
      alert('Game over!');
      that.body[0] = that.body[1] = 1;
      that.changeCourse();
      obj.setCell(that.body[0], that.body[1], true);
    } else {
      obj.setCell(that.body[0], that.body[1], true);
    }
	}
}
function moveCursor(e, obj) {
  switch (e.keyCode) {
    case 37:
    case 65:
      obj.changeCourse('left');
      break;
    case 38:
    case 87:
      obj.changeCourse('top');
      break;
    case 39:
    case 68:
      obj.changeCourse('right');
      break;
    case 40:
    case 83:
      obj.changeCourse('bottom');
      break;
    default:
      break;
  }
}
function generate() {
  var m1 = new Matrix('matrix', matrixRows, matrixCols);
	var square = new Square(1, 2, m1, 'right');
  var targetSquare = new Square(randInt(min, max), randInt(min, max), m1);
  m1.create();
	square.create();
	targetSquare.create('green');
	setInterval(square.move, 300);
  m1.matrix.focus();
  m1.matrix.onkeydown = function(e) {
    moveCursor(e, square);
  }
}
window.onload = function() {
  generate();
}
