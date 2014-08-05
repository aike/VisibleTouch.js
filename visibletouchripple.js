/*
 *
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */

//////////////////////////////////
var VisibleTouchRipple = function(ctx, x, y) {
	this.ctx = ctx;
	this.age = 0;
	this.maxAge = 15;
	this.x = x;
	this.y = y;
}

VisibleTouchRipple.prototype.draw = function() {
	if (this.age < this.maxAge) {
		var r = this.age * 4;

		var alpha = (1.0 - this.age / this.maxAge / 1).toFixed(2);
		this.ctx.fillStyle = 'rgba(200, 200, 200, ' + alpha + ')';

		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, r, 0, Math.PI*2, false);
		this.ctx.fill();

		this.age++;
	}
}

$(function() {
	visibletouch.ripple = true;
});
