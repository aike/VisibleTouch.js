/*
 *
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */


//////////////////////////////////
var AnoRippleRect = function(ctx, x, y) {
	this.ctx = ctx;
	this.age = 0;
	this.maxAge = 40;
	this.x = x;
	this.y = y;
	this.angle = 0;
}

AnoRippleRect.prototype.draw = function() {
	if (this.age < this.maxAge) {
		var r = this.age * 6;

		var alpha = (0.5 - this.age / this.maxAge / 2).toFixed(2);
		this.ctx.strokeStyle = 'rgba(200, 200, 200, ' + alpha + ')';
		this.ctx.lineWidth = 10;

		var p24 = Math.PI * 2 / 4;
		var x1 = Math.sin(this.angle + p24 * 0) * r;	var y1 = Math.cos(this.angle + p24 * 0) * r;
		var x2 = Math.sin(this.angle + p24 * 1) * r;	var y2 = Math.cos(this.angle + p24 * 1) * r;
		var x3 = Math.sin(this.angle + p24 * 2) * r;	var y3 = Math.cos(this.angle + p24 * 2) * r;
		var x4 = Math.sin(this.angle + p24 * 3) * r;	var y4 = Math.cos(this.angle + p24 * 3) * r;

		this.ctx.beginPath();
		this.ctx.moveTo(this.x + x1, this.y + y1);
		this.ctx.lineTo(this.x + x2, this.y + y2);
		this.ctx.lineTo(this.x + x3, this.y + y3);
		this.ctx.lineTo(this.x + x4, this.y + y4);
		this.ctx.lineTo(this.x + x1, this.y + y1);
		this.ctx.stroke();

		this.age++;
		this.angle -= 0.06;
	}
}

//////////////////////////////////
var AnoRippleTriangle = function(ctx, x, y) {
	this.ctx = ctx;
	this.age = 0;
	this.maxAge = 40;
	this.x = x;
	this.y = y;
	this.angle = 0;
}

AnoRippleTriangle.prototype.draw = function() {
	if (this.age < this.maxAge) {
		var r = this.age * 6;

		var alpha = (0.5 - this.age / this.maxAge / 2).toFixed(2);
		this.ctx.strokeStyle = 'rgba(200, 200, 200, ' + alpha + ')';
		this.ctx.lineWidth = 10;

		var p23 = Math.PI * 2 / 3;
		var x1 = Math.sin(this.angle + p23 * 0) * r;	var y1 = Math.cos(this.angle + p23 * 0) * r;
		var x2 = Math.sin(this.angle + p23 * 1) * r;	var y2 = Math.cos(this.angle + p23 * 1) * r;
		var x3 = Math.sin(this.angle + p23 * 2) * r;	var y3 = Math.cos(this.angle + p23 * 2) * r;

		this.ctx.beginPath();
		this.ctx.moveTo(this.x + x1, this.y + y1);
		this.ctx.lineTo(this.x + x2, this.y + y2);
		this.ctx.lineTo(this.x + x3, this.y + y3);
		this.ctx.lineTo(this.x + x1, this.y + y1);
		this.ctx.stroke();

		this.age++;
		this.angle -= 0.06;
	}
}

//////////////////////////////////
var AnoRippleCircle = function(ctx, x, y) {
	this.ctx = ctx;
	this.age = 0;
	this.maxAge = 40;
	this.x = x;
	this.y = y;
}

AnoRippleCircle.prototype.draw = function() {
	if (this.age < this.maxAge) {
		var r = this.age * 6;

		var alpha = (0.5 - this.age / this.maxAge / 2).toFixed(2);
		this.ctx.strokeStyle = 'rgba(200, 200, 200, ' + alpha + ')';
		this.ctx.lineWidth = 12;

		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, r, 0, Math.PI*2, false);
		this.ctx.stroke();

		this.age++;
	}
}

//////////////////////////////////
var AnoRippleLine = function(ctx, x, y) {
	this.ctx = ctx;
	this.age = 0;
	this.maxAge = 40;
	this.x = x;
	this.y = y;

	var angle = Math.random() * Math.PI * 2;
	var r = Math.max($(window).width(), $(window).height());
	var p22 = Math.PI * 2 / 2;
	this.x1 = this.x + Math.sin(angle + p22 * 0) * r;
	this.y1 = this.y + Math.cos(angle + p22 * 0) * r;
	this.x2 = this.x + Math.sin(angle + p22 * 1) * r;
	this.y2 = this.y + Math.cos(angle + p22 * 1) * r;

	this.lineWidth = 5 + Math.floor(Math.random() * 10);
}

AnoRippleLine.prototype.draw = function() {
	if (this.age < this.maxAge) {

		var alpha = (0.5 - this.age / this.maxAge / 2).toFixed(2);
		this.ctx.strokeStyle = 'rgba(200, 200, 200, ' + alpha + ')';
		this.ctx.lineWidth = this.lineWidth;

		this.ctx.beginPath();
		this.ctx.moveTo(this.x1, this.y1);
		this.ctx.lineTo(this.x2, this.y2);
		this.ctx.stroke();

		this.age++;
	}
}

///////////////////////////////////////////////////////
var VisibleTouchAno = function(ctx) {
	this.ctx = ctx;
	this.type = -1;
}

VisibleTouchAno.prototype.random = function() {
	this.type = -1;
}
VisibleTouchAno.prototype.rect = function() {
	this.type = 0;
}
VisibleTouchAno.prototype.triangle = function() {
	this.type = 1;
}
VisibleTouchAno.prototype.circle = function() {
	this.type = 2;
}
VisibleTouchAno.prototype.line = function() {
	this.type = 3;
}

VisibleTouchAno.prototype.createObject = function(x, y) {
	var r;
	if (this.type === -1) {
		r = Math.floor(Math.random() * 4);
	} else {
		r = this.type;
		this.type = -1;
	}
	var obj;
	switch (r) {
		case 0:
			obj = new AnoRippleRect(this.ctx, x, y);
			break;
		case 1:
			obj = new AnoRippleTriangle(this.ctx, x, y);
			break;
		case 2:
			obj = new AnoRippleCircle(this.ctx, x, y);
			break;
		case 3:
			obj = new AnoRippleLine(this.ctx, x, y);
			break;
	}
	return obj;
}

///////////////////////////////////////////////////////

$(function() {
	visibletouch.ano = new VisibleTouchAno(visibletouch.ctx);
	visibletouch.random   = function() { visibletouch.ano.random(); };
	visibletouch.rect     = function() { visibletouch.ano.rect(); };
	visibletouch.triangle = function() { visibletouch.ano.triangle(); };
	visibletouch.circle   = function() { visibletouch.ano.circle(); };
	visibletouch.line     = function() { visibletouch.ano.line(); };
});
