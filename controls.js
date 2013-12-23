function user_input(){
	this.u = 0;
	this.d = 0;
	this.l = 0;
	this.r = 0;
	this.space = false;
	this.mouse_x = 0;
	this.mouse_y = 0;
	this.mouse_down = false;
	this.left_click = false;
	this.right_click = false;
	this.dump_keys = function(){
		return {'r':this.r,'l':this.l,'d':this.d,'u':this.u};
	};
	this.mouse_dump = function(){
		return {'mouse_x': this.mouse_x,'mouse_y':this.mouse_y};
	};
};
input = new user_input();
window.onmousemove = function(){
	input.mouse_x = event.pageX;
	input.mouse_y = event.pageY;
};
window.onmousedown = function(){
	// console.log(event.button);
	input.mouse_down = true;
	if(event.button == 0){
		input.left_click = true;
	}else if(event.button == 2){
		input.right_click = true;
	};
};
window.onmouseup = function(){
	input.mouse_down = false;
	if(event.button == 0){
		input.left_click = false;
	}else if(event.button == 2){
		input.right_click = false;
	};
};
window.onkeydown = function(k){
	switch(k.keyCode){
		
		case 68://right arrow
			input.r = 1;
			input.l = 0;
			break;
		case 65://left arrow
			input.r = 0;
			input.l = 1;
			break;
		case 87://up arrow
			input.u = 1;
			input.d = 0;
			break;
		case 83://down arrow
			input.u = 0;
			input.d = 1;
			break;
		case 90://z key

			break;

		case 70://f key

			break;

		case 71://g key
			
			break;
		case 32://space
			input.space = true;
			break;
		default:
			
	};
};
window.onkeyup = function(k){
	switch(k.keyCode){
		
		case 68://right arrow
			input.r = 0;
			break;
		case 65://left arrow
			input.l = 0;
			break;
		case 87://up arrow
			input.u = 0;
			break;
		case 83://down arrow
			input.d = 0;
			break;
		case 90://z key
			
			break;

		case 70://f key
			
			break;

		case 71://g key
			
			break;
		case 32://space
			input.space = false;
			break;
		default:
			
	};
};

