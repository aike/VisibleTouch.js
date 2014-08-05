/*
 *
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */

var VisibleTouchMouse = function(x, y, r) {
	this.x = 1;
	this.y = 1;
	this.h = r - 10;
	this.w = Math.floor(r * 2 / 3) - 6;
	this.r = Math.floor(this.w / 2);

	var css = {position: 'fixed', zIndex: 1000};
	if (x >= 0) {
		css.left = x;
	} else {
		css.right = -x;
	}
	if (y >= 0) {
		css.top = y;
	} else {
		css.bottom = -y;
	}

	this.canvas = $('<canvas>')
		.attr({
			width: r,
			height: r
		})
		.css(css)
		.appendTo('body');
	this.ctx = this.canvas[0].getContext('2d');

	this.pushedL = false;
	this.pushedR = false;

	this.draw();
}

VisibleTouchMouse.prototype.draw = function() {
	this.ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);

	this.ctx.lineWidth = 1.5;
	this.ctx.strokeStyle = 'rgba(100, 100, 100, 1.0)';
	this.ctx.fillStyle = 'rgba(240, 240, 240, 1.0)';

	this.fillRoundRect(this.x, this.y, this.w, this.h, this.r);

	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = 'rgba(100, 100, 100, 1.0)';
	if (this.pushedL) {
		this.ctx.fillStyle = 'rgba(200, 100, 100, 0.5)';
	} else {
		this.ctx.fillStyle = 'rgba(200, 100, 100, 0.0)';
	}
	this.drawButtonL(this.x, this.y, this.w, this.h, this.r);

	if (this.pushedR) {
		this.ctx.fillStyle = 'rgba(200, 100, 100, 0.5)';
	} else {
		this.ctx.fillStyle = 'rgba(200, 100, 100, 0.0)';
	}
	this.drawButtonR(this.x, this.y, this.w, this.h, this.r);
}

VisibleTouchMouse.prototype.fillRoundRect = function(l, t, w, h, r) {
	this.ctx.shadowBlur = 4;
	this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
	this.ctx.shadowOffsetX = 4
	this.ctx.shadowOffsetY = 4;

	this.ctx.beginPath();
	this.ctx.arc(l + r, t + r, r, - Math.PI, - 0.5 * Math.PI, false);
	this.ctx.arc(l + w - r, t + r, r, - 0.5 * Math.PI, 0, false);
	this.ctx.arc(l + w - r, t + h - r, r, 0, 0.5 * Math.PI, false);
	this.ctx.arc(l + r, t + h - r, r, 0.5 * Math.PI, Math.PI, false);
	this.ctx.closePath();
	this.ctx.fill();

	this.ctx.shadowBlur = 0;
	this.ctx.shadowColor = 'rgba(100, 100, 100, 0.0)';
	this.ctx.shadowOffsetX = 0
	this.ctx.shadowOffsetY = 0;

	this.ctx.stroke();
}

VisibleTouchMouse.prototype.drawButtonL = function(l, t, w, h, r) {
	this.ctx.beginPath();
	this.ctx.arc(l + r, t + r, r, - Math.PI, - 0.5 * Math.PI, false);
	this.ctx.lineTo(l + r, t + r);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.stroke();
}

VisibleTouchMouse.prototype.drawButtonR = function(l, t, w, h, r) {
	this.ctx.beginPath();
	this.ctx.arc(l + w - r, t + r, r, - 0.5 * Math.PI, 0, false);
	this.ctx.lineTo(l + w - r, t + r);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.stroke();
}

VisibleTouchMouse.prototype.mousedown = function(which) {
	if (which === 1) {
		this.pushedL = true;
	} else {
		this.pushedR = true;
		var self = this;
		setTimeout(function() {
			self.pushedR = false;
			self.draw();
		}, 200);
	}
	this.draw();
}

VisibleTouchMouse.prototype.mouseup = function(which) {
	if (which === 1) {
		this.pushedL = false;
	} else {
		this.pushedR = false;
	}
	this.draw();
}

///////////////////////////////////////////////////////

$(function() {
	visibletouch.mouse = new VisibleTouchMouse(
		visibletouch.option.mousex,
		visibletouch.option.mousey,
		visibletouch.option.mousesize);
});
