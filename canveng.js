// globals
var PI = Math.PI;
// 
function My_win(){
	var self = window;
	this.calibrate();
	return this;
};
My_win.prototype.calibrate = function(){
	this.max_height = Math.floor(self.innerHeight * 0.9);
	this.max_width = Math.floor(self.innerWidth * 0.9);
	this.origin = {'x': this.max_width/2, 'y': this.max_height/2};
};
My_win.prototype.h = function(){
	return this.max_height;
};
My_win.prototype.w = function(){
	return this.max_width;
};
My_win.prototype.o = function(){
	return this.origin;
};

//


//

// function set_c(id,lw){ 
// 	var can1 = document.getElementById(id);
// 	var ca = can1.getContext("2d");
// 	ca.canvas.width = win.w();//Math.floor(win.w()/mx)*mx;//window.innerWidth;//800;//unit*16;
// 	ca.canvas.height = win.h();//Math.floor(win.h()/my)*my;//window.innerHeight;//unit*16;
// 	ca.lineWidth = lw;
// 	ca.beginPath();
// 	return ca;
// };
function set_c(id){
	var canvas = document.getElementById(id);
	var can = canvas.getContext("2d");
	can.canvas.height = 800;
	can.canvas.width = 800;
	can.translate(400,400);
	return can;
};
//


//

function draw_grid(can, unit, x, y){ 
	var xinc = x+1;
	var yinc = y+1;
	for(var i=0;i<xinc;i++){
		can.moveTo(i*unit,0);
		can.lineTo(i*unit,x*unit);
		can.moveTo(0,i*unit);
		can.lineTo(x*unit,i*unit);
	};
	for(var i=0;i<yinc;i++){
		can.moveTo(i*unit,0);
		can.lineTo(i*unit,y*unit);
		can.moveTo(0,i*unit);
		can.lineTo(y*unit,i*unit);
	};
};
function Render_obj(){
};
Render_obj.prototype.load = function(can, data){
	this.can = can;
	this.data = data;
	return this;
};
Render_obj.prototype.morph = function(t_array){
	this.can.setTransform(t_array[0],t_array[1],t_array[2],t_array[3],t_array[4],t_array[5]);
	return this;
};
Render_obj.prototype.morph2 = function(t_array){
	this.can.transform(t_array[0],t_array[1],t_array[2],t_array[3],t_array[4],t_array[5]);
	return this;
};
Render_obj.prototype.draw_shape = function(){
	console.log(this.can);
	var can = this.can;
	var data = this.data;
	for(d in data){
		var pnt = data[d];
		switch(pnt.op){
			case 's':
				can.moveTo(pnt.x,pnt.y);
				break;
			case 'd':
				can.lineTo(pnt.x,pnt.y);
				break;
			case 'm':
				can.moveTo(pnt.x,pnt.y);
				break;
			case 'cir':
				can.moveTo(pnt.x+pnt.r,pnt.y);
				can.arc(pnt.x,pnt.y,pnt.r,0,2*PI);
			case 'end':
				can.closePath();
			default:

		};
	};
	return this;
};

function File_obj(){
	this.img = new Image();
	this.data_obj = {};	
	this.angle = 0;
};
File_obj.prototype.load_path = function(path){ // set file path for image
	this.img.src = path;
	return this;
};
File_obj.prototype.canv = function(can){ // set canvas to render
	this.can = can;
	return this;
};
File_obj.prototype.gen_pattern = function(x,y){
	this.pattern = this.can.createPattern(this.img,"repeat");
	this.can.rect(x,y,win.w(),win.h());
	this.can.fillStyle = this.pattern;
	// console.log(this.pattern);
	// console.log(this.can.createPattern(this.img,"repeat"));
	// console.log(this.can);
	// return this;
};
File_obj.prototype.gen_data_obj = function(x,y,xd,yd){ // set parameters for data_obj
	var xdv = x/xd;
	var ydv = y/yd;
	this.data_obj = {  // sx/sy = clipping coordinates, sw/sh = clipping size, x/y = position on canvas, w/h = image dimentions
						sx: 0,             
						sy: 0,
						sw: xdv,
						sh: ydv,
						x:  xdv,
						y:  ydv,
						w:  xdv,
						h:  ydv
					};
	this.set_params(this.data_obj); // set data_obj parameters
	return this;
};
File_obj.prototype.scale = function(x,y){
	this.data_obj.w = x;
	this.data_obj.h = y;
	return this;
};
File_obj.prototype.offset = function(x,y){ // change image clipping offset
	this.data_obj.sx = x;
	this.data_obj.sy = y;
	return this;
};
File_obj.prototype.move = function(x,y){ // change image position on canvas
	this.data_obj.x = x;
	this.data_obj.y = y;
	return this;
};
File_obj.prototype.imove = function(x,y){ // change image position on canvas
	this.data_obj.x += x;
	this.data_obj.y += y;
	return this;
};
File_obj.prototype.tmove = function(x,y){
	this.can.setTransform(1,1,1,1,x,y);
	return this;
};
File_obj.prototype.rotate = function(angle){
	this.angle += angle;
	// this.angle %= 3;
	this.can.rotate(angle);
};
File_obj.prototype.location = function(){
	return {x: this.data_obj.x, y:this.data_obj.y};
};
File_obj.prototype.mdata = function(data_obj){
	this.data_obj = data_obj;
	return this;
};
File_obj.prototype.set_params = function(){ // set data_obj parameters;
	// this.data_obj = {};
	// this.data_obj.sx = this.data_obj.sx || null;
	// this.data_obj.sy = this.data_obj.sy || null;
	// this.data_obj.sw = this.data_obj.sw || null;
	// this.data_obj.sh = this.data_obj.sh || null;
	// this.data_obj.x = this.data_obj.x;
	// this.data_obj.y = this.data_obj.y;
	// this.data_obj.w = this.data_obj.w || null;
	// this.data_obj.h = this.data_obj.h || this.data_obj.w || null;
	return this;
};
File_obj.prototype.draw = function(){ // render image to canvas
	// console.log(this.img,this.data_obj.sx,this.data_obj.sy,this.data_obj.sw,this.data_obj.sh,this.data_obj.x,this.data_obj.y,this.data_obj.w,this.data_obj.h);
	this.can.drawImage(this.img,this.data_obj.sx,this.data_obj.sy,this.data_obj.sw,this.data_obj.sh,this.data_obj.x,this.data_obj.y,this.data_obj.w,this.data_obj.h);
	return this;
};
File_obj.prototype.render_pattern = function(){
	this.can.fill();
	return this;
};



