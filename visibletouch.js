/*
 *
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */

if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame =
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
}

var visibletouch = {option: null};

$(function() {

///////////////////////////////////////////////////////
var VisibleTouch = function() {
	this.ripples = [];
	this.canvas = $('<canvas>')
		.attr({
			width: $(window).width(),
			height: $(window).height()
		})
		.css({
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: -1000
		})
		.appendTo('body');
	this.ctx = this.canvas[0].getContext('2d');

	this.foreground = false;

	this.mouse = null;
	this.ripple = null;
	this.ano = null;
}

VisibleTouch.prototype.addObject = function(x, y) {
	if (this.ripple) {
		this.ripples.push(new VisibleTouchRipple(this.ctx, x, y));
	} else if (this.ano) {
		this.ripples.push(this.ano.createObject(x, y));
	}
}

VisibleTouch.prototype.draw = function() {
	if (this.ripples.length > 0) {
		if (!this.foreground) {
			this.canvas.css({zIndex: 1000});
		}
		this.ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
		for (var i = 0; i < this.ripples.length; i++) {
			this.ripples[i].draw();
		}
		while ((this.ripples.length > 0) && (this.ripples[0].age >= this.ripples[0].maxAge)) {
			this.ripples.shift();
		}
		if (this.ripples.length === 0) {
			this.ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
			this.canvas.css({zIndex: -1000});			
		}
	}
}

VisibleTouch.prototype.onResize = function() {
	this.canvas
		.attr({
			width: $(window).width(),
			height: $(window).height()
		});
}

///////////////////////////////////////////////////////

var opt = { mousex: -40, mousey: -40, mousesize: 80};

if (visibletouch.option) {
	if (visibletouch.option.mousex)    opt.mousex    = visibletouch.option.mousex;
	if (visibletouch.option.mousey)    opt.mousey    = visibletouch.option.mousey;
	if (visibletouch.option.mousesize) opt.mousesize = visibletouch.option.mousesize;
}

visibletouch = new VisibleTouch();
visibletouch.option = opt;

$('body').mousedown(function(e) {
	if (visibletouch.mouse) {
		visibletouch.mouse.mousedown(e.which);
	}
});

$('body').click(function(e) {
	visibletouch.addObject(e.pageX, e.pageY);
	if (visibletouch.mouse) {
		visibletouch.mouse.mouseup(e.which);
	}
});

$(window).resize(function() {
	visibletouch.onResize();
});

var timerloop = function() {
	visibletouch.draw();
	window.requestAnimationFrame(timerloop);
};
timerloop();


})
