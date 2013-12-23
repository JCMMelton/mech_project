
function set(){
	begin();
	mech1.operate();
	target_t.draw();
	map.draw();
	end();
};
function init(){
	tors = set_c("torso");
	legs_c = set_c("legs");
	map_c = set_c("map");
	bul_r = set_c("right_bullets");
	bul_l = set_c("left_bullets");
	strk = set_c("structures");
	mech1 = new Mech(1,"test_mech1");
	mech1.build(test_mech1);
	map = new File_obj();
	map.load_path(map1.path).canv(map_c).mdata(map1.map_data);
	smoke = new File_obj();
	smoke.load_path("images/smoke_cloud.png");
	target_t = new Target();
};
function begin(){
	tors = set_c("torso");
	legs_c = set_c("legs");
	map_c = set_c("map");
	bul_r = set_c("right_bullets");
	bul_l = set_c("left_bullets");
	strk = set_c("structures");
	tors.clearRect(-100,-100,200,200);
	tors.beginPath();
	legs_c.clearRect(-100,-100,200,200);
	legs_c.beginPath();
	map_c.clearRect(-400,-400,400,400);
	map_c.beginPath();
	strk.beginPath();
};
function end(){
	tors.stroke();
	legs_c.stroke();
	map_c.stroke();
	bul_l.stroke();
	bul_r.stroke();
	strk.stroke();
};
function Mech(id,name){
	this.angle = 1;
	this.cotangent = 1;
	this.id = id;
	this.name = name;
	this.special_latch = false;
};
function is_between(test,up,lw){ // checks if a number is within a given range
	low = test>lw;
	hi = test<up;
	if(low&&hi){
		return true;
	}else{
		return false;
	};
};
Mech.prototype.operate = function(){
	this.turn_torso();
	this.torso.draw();
	this.leg_ops();
	this.legs.draw();
	this.guns();
	this.cycle_bullets();
	// console.log(this.special_latch,input.space);
	if(this.special_latch && !this.spec_cd){
		this.spec_x = this.special(this.spec_x);
	}else if(this.spec_cd){
		this.spec_cd--;
	};
	this.move(map);
};
Mech.prototype.get_angle = function(x,y){
	return Math.atan2(y,x);
};
Mech.prototype.turn_torso = function(){
	var at = Math.atan2(input.mouse_y-400,input.mouse_x-400);
	var ta = Math.atan(input.mouse_x-400/input.mouse_y-400);

	var old = this.angle;
	var pi = Math.PI;
	var unit = (2*pi)/17;
	var pies = [
				-pi,
				(unit-pi),
				(unit*2-pi),
				(unit*3-pi),
				(unit*4-pi),
				(unit*5-pi),
				(unit*6-pi),
				(unit*7-pi),
				(unit*8-pi),
				(unit*9-pi),
				(unit*10-pi),
				(unit*11-pi),
				(unit*12-pi),
				(unit*13-pi),
				(unit*14-pi),
				(unit*15-pi),
				(unit*16-pi),
				pi
				];
	var slices = [
				[[1,2,3,4,5,6,7,8],[9,10,11,12,13,14,15,16]],
				[[2,3,4,5,6,7,8,9],[10,11,12,13,14,15,16,0]],
				[[3,4,5,6,7,8,9,10],[11,12,13,14,15,16,0,1]],
				[[4,5,6,7,8,9,10,11],[12,13,14,15,16,0,1,2]],
				[[5,6,7,8,9,10,11,12],[13,14,15,16,0,1,2,3]],
				[[6,7,8,9,10,11,12,13],[14,15,16,0,1,2,3,4]],
				[[7,8,9,10,11,12,13,14],[15,16,0,1,2,3,4,5]],
				[[8,9,10,11,12,13,14,15],[16,0,1,2,3,4,5,6]],
				[[9,10,11,12,13,14,15,16],[0,1,2,3,4,5,6,7]],
				[[10,11,12,13,14,15,16,0],[1,2,3,4,5,6,7,8]],
				[[11,12,13,14,15,16,0,1],[2,3,4,5,6,7,8,9]],
				[[12,13,14,15,16,0,1,2],[3,4,5,6,7,8,9,10]],
				[[13,14,15,16,0,1,2,3],[4,5,6,7,8,9,10,11]],
				[[14,15,16,0,1,2,3,4],[5,6,7,8,9,10,11,12]],
				[[15,16,0,1,2,3,4,5],[6,7,8,9,10,11,12,13]],
				[[16,0,1,2,3,4,5,6],[7,8,9,10,11,12,13,14]],
				[[0,1,2,3,4,5,6,7],[8,9,10,11,12,13,14,15]]
				];
	c1 = set_c("torso");
	c2 = set_c("legs");
	var qm = 0;
	var qo = 0;
	for(var q=0;q<17;q++){
		if(is_between(at,pies[q+1],pies[q])){
			qm = q;
		};
		if(is_between(old,pies[q+1],pies[q])){
			qo = q;
		};
	};
	var sedis = slices[qm];
	if(qo != qm){
		for(var t=0;t<8;t++){
			if(qo == sedis[0][t]){
				old-=0.15;
			}else if(qo == sedis[1][t]){
				old+=0.15;
			};
		};
	}else if(!is_between(old,at+unit,at-unit)){
		if(at > old){
			old+=0.11;
		}else{
			old-=0.11;
		}
	}else if(!is_between(old,at+.05,at-.05)){
		if(at > old){
			old+=0.02;
		}else{
			old-=0.02;
		}
	}else if(!is_between(old,at+.01,at-.01)){
		if(at > old){
			old+=0.005;
		}else{
			old-=0.005;
		}
	};
	if(old >= pi){ 
		old = -pi;
	};
	if(old < -pi){
		old = pi;
	};
	this.angle = old;
	this.cotangent = ta + old;
	this.torso.rotate(old);
};
Mech.prototype.build = function(mech_data){
	this.file = mech_data.file;
	this.data_obj = mech_data.data_obj;
	this.torso = new File_obj();
	this.torso.load_path(mech_data.file).canv(tors).mdata(mech_data.data_obj);
	this.leg_data = mech_data.legs;
	this.legs = new File_obj();
	this.legs.load_path(this.leg_data.file).canv(legs_c).mdata(this.leg_data.data_obj);
	this.shooting = false;
	this.speed = mech_data.speed;
	this.leg_angle = 0;
	this.rot = 0;
	this.special = mech_data.special;
	this.spec_x = mech_data.spec_x;
	this.spec_cd = mech_data.spec_cd;
	this.bullets = [];
	this.weapons = mech_data.weapons;
	this.lw_counter = 0;
	this.rw_counter = 0;
};
Mech.prototype.leg_ops = function(){
	this.leg_ani();
	var res = this.leg_dir();
	this.legs.rotate(res[0]);
	this.legs.angle = res[1];	
};
Mech.prototype.leg_ani = function(){
	if(input.u||input.d){
		var ad = this.leg_data.ani;
		var da = this.legs.data_obj;  
		da.sx = 200*ad.x[ad.ix++];
		da.sy = 200*ad.y[ad.iy++];
		ad.ix %= ad.x.length;
		ad.iy %= ad.y.length;
	};
};
Mech.prototype.leg_dir = function(){
	var old = this.leg_angle;
	var nang = old + this.rot;
	ret  = -nang;
	this.leg_angle = nang;
	return [ret, nang];
};
Mech.prototype.move = function(map){
	var vel;
	var dir = 1;
	x_shift = 0;
	y_shift = 0;
	if(input.u){
		vel = this.speed;
	}else if(input.d){
		vel = this.speed*-0.75;
		dir = -1;
	}else{
		vel = 0;
	};
	if(input.r){
		this.rot = -.05;
	}else if(input.l){
		this.rot = .05;
	}else{
		this.rot = 0;
	};
	y_shift += (vel * Math.sin(this.leg_angle));
	x_shift -= (vel * Math.cos(this.leg_angle));
	map.data_obj.sx += x_shift;
	map.data_obj.sy += y_shift;
	// console.log(x_shift,y_shift);
	for(b in this.bullets){
		var bb = this.bullets[b];
		bb[2] -= Math.abs(x_shift*3)*dir;
		bb[5] -= Math.abs(y_shift*3)*dir;
	};
	// target_t.shape.morph2([1,1,1,1,x_shift,y_shift]);
	// target_t.y += y_shift;
};
Mech.prototype.guns = function(){
	if(this.lw_counter == 0 && input.left_click){
		this.new_bullet('l');
	};
	if(this.rw_counter == 0 && input.right_click){
		this.new_bullet('r');
	};
};
Mech.prototype.new_bullet = function(arm){
	var wep = this.weapons[arm];
	var pi = Math.PI;
	if(arm === 'l'){
		this.lw_counter = wep.cooldown;
	}else{
		this.rw_counter = wep.cooldown;
	};
	this.bullets.push( [ Math.cos(this.angle+pi*((Math.random()/wep.spread)-(Math.random()/(wep.spread*2)))), Math.sin(this.angle+pi*((Math.random()/wep.spread)-(Math.random()/(wep.spread*2)))), // index 0,1
						 0 , wep.offset, wep.vel , 0, wep.l,									 // index 2,3,4,5,6 
						 arm, 0 ]);												 // index 7,8
};
Mech.prototype.cycle_bullets = function(){
	if(this.rw_counter){
		this.rw_counter--;
	};
	if(this.lw_counter){
		this.lw_counter--;
	};
	for(b in this.bullets){
		var bb = this.bullets[b];
		if(bb[7] === 'r'){
			this.weapons.r.render(bul_r,bb,-1);
		}else if( bb[7] === 'l'){
			this.weapons.l.render(bul_l,bb,1);
		};

		bb[2]+=bb[4];
		bb[5]+=bb[4];

		bb[8]++;
		if(bb[8]>=30){
			this.bullets.splice(this.bullets.indexOf(bb),1);
		};
	};
};
var weapons = {
	mg: {
		offset:   34,
		vel:      90,
		l:        40,
		damage:   2,
		spread:   35,
		cooldown: 2,
		render: function(can,bb,arm){
			can.strokeStyle = "#FF8000"; 
			can.lineWidth = 1;
			can.moveTo( bb[2]       *bb[0] -bb[3] *bb[1],  bb[5]       *bb[1] +(arm*bb[3]) * -bb[0]);
			can.lineTo((bb[2]+bb[6])*bb[0] -bb[3] *bb[1], (bb[5]+bb[6])*bb[1] +(arm*bb[3]) * -bb[0]);
		}
	},
	plasma_canon: {
		offset:   33,
		vel:      80,
		l:        40,
		damage:   20,
		spread:   15,
		cooldown: 15,
		render: function(can,bb,arm){
			can.strokeStyle = "#0080FF"; 
			can.lineWidth = 5;
			var xx1 = bb[2]*bb[0]+(arm*bb[3])*bb[1];
			var yy1 = bb[5]*bb[1]+(arm*bb[3])*-bb[0];
			can.moveTo( xx1,yy1);
			can.arc(xx1,yy1,3,0,Math.PI*2);
			for(var i=0;i<(bb[8]-1);i+=.5){
				if(i<6){
					var xx1 = (bb[2]-bb[6]*i)*bb[0]+(arm*bb[3]) * bb[1];
					var yy1 = (bb[5]-bb[6]*i)*bb[1]+(arm*bb[3]) *-bb[0];
					can.moveTo(xx1,yy1);
					can.arc(xx1,yy1,3/(i*6),0,Math.PI*2);
				};
			};
		}
	},
	rocket: {
		offset:   33,
		vel:      70,
		l:        10,
		damage:   70,
		spread:   200,
		cooldown: 50,
		render: function(can,bb,arm){
			var s_dat = {  // sx/sy = clipping coordinates, sw/sh = clipping size, x/y = position on canvas, w/h = image dimentions
							sx: 0,             
							sy: 0,
							sw: 50,
							sh: 50,
							x:  -25,
							y:  -25,
							w:  50,
							h:  50 };
			smoke.canv(can).mdata(s_dat);
			can.strokeStyle = "#777777";
			can.lineWidth = 2;
			can.moveTo( bb[2]       *bb[0] -bb[3] *bb[1],  bb[5]       *bb[1] +(arm*bb[3]) * -bb[0]);
			can.lineTo((bb[2]+bb[6])*bb[0] -bb[3] *bb[1], (bb[5]+bb[6])*bb[1] +(arm*bb[3]) * -bb[0]);
			for(var i=0;i<(bb[8]-1);i+=.5){
				var xx1 = (bb[2]-bb[6]*i*2)*bb[0]+(arm*bb[3]) * bb[1];
				var yy1 = (bb[5]-bb[6]*i*2)*bb[1]+(arm*bb[3]) *-bb[0];
				smoke.move(xx1,yy1).scale(50*(i/8),50*(i/8)).draw();
			};
		}
	}
};
var test_mech1 = {
	file: "images/test_mech1.png",
	data_obj: 
		{  // sx/sy = clipping coordinates, sw/sh = clipping size, x/y = position on canvas, w/h = image dimentions
			sx: 100,             
			sy: 100,
			sw: 200,
			sh: 200,
			x:  -50,
			y:  -50,
			w:  100,
			h:  100
		},
	legs: {
		file: "images/test_mech1_legs.png",
		data_obj: 
		{  // sx/sy = clipping coordinates, sw/sh = clipping size, x/y = position on canvas, w/h = image dimentions
			sx: 0,             
			sy: 0,
			sw: 200,
			sh: 200,
			x:  -100,
			y:  -100,
			w:  200,
			h:  200
		},
		ani: {
			x:[0,0,0,0,1,1,1,1,1,1,0,0],
			ix:0,
			y:[0,0,1,1,0,0,1,1,0,0,1,1],
			iy:0
		}
	},
	// shooting: false
	speed: 4,
	weapons:{
		r: weapons.mg,
		l: weapons.plasma_canon
	},
	special: function(x){
		if(x!=0){
			this.speed = 10;
			x--;
		}else{
			this.special_latch = false;
			x = 5;
			this.speed = 4;
			this.spec_cd = 100;
		};
		return x;
	},
	spec_x: 5,
	spec_cd: 100
};
var map1 = {
	path: "images/test_map.png",
	map_data:{
		sx: 800,             
		sy: 800,
		sw: 800,
		sh: 800,
		x:  -400,
		y:  -400,
		w:  3200,
		h:  3200
	}
};
function Target(){
	this.x = 50;
	this.y = 50;
	this.shape = new Render_obj();
	this.data = [
		{'op':'s','x':100+this.x,'y':100+this.y},
		{'op':'d','x':150+this.x,'y':100+this.y},
		{'op':'d','x':150+this.x,'y':150+this.y},
		{'op':'d','x':100+this.x,'y':150+this.y},
		{'op':'end'}
	];
	this.shape.load(strk,this.data);
	this.draw = function(){

		// strk.rect(400,400,this.x,this.y);
		
		this.shape.draw_shape();
		// strk.fillStyle("#ffffff");
		// strk.fillRect(100,100,this.x,this.y);
	};
};
document.onmousemove = function(){
	// mech1.torso.rotate(mech1.mech_angle());
};
// window.onkeydown = function(){
// 	if(input.space && !mech1.special_latch && !mech1.spec_cd){
// 		mech1.special_latch = true;
// 	};
// };