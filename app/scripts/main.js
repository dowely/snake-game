var head;
var unitX = 15;
var unitY = 15;

function startGame() {

	gameArea.start();
	head = new Snake(6*unitX, 5*unitY, unitX, unitY, '#ff6666', 'RIGHT');
	
	document.addEventListener("keydown", function(e){
		if (e.keyCode == 37 && (head.vector == 'UP' || head.vector == 'DOWN')) {
			head.nextTurn = 'LEFT';
		} else if (e.keyCode == 38 && (head.vector == 'LEFT' || head.vector == 'RIGHT')) {
			head.nextTurn = 'UP';
		} else if (e.keyCode == 39 && (head.vector == 'UP' || head.vector == 'DOWN')) {
			head.nextTurn = 'RIGHT';
		} else if (e.keyCode == 40 && (head.vector == 'LEFT' || head.vector == 'RIGHT')) {
			head.nextTurn = 'DOWN';
		} else return 0;
	});
	
}

var gameArea = {
	rows : 16,
	columns : 25,
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = unitX * this.columns;
		this.canvas.height = unitY * this.rows;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 15);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function Snake(posX, posY, sizeX, sizeY, color, direction) {
	this.x = posX;
	this.y = posY;
	this.width = sizeX;
	this.height = sizeY;
	this.fill = color;
	this.speed = 1;
	this.vector = direction;
	this.nextTurn = direction;
	this.onGrid = false;
	this.tail = [
		{x : this.x , y : this.y}
	];
	
	ctx = gameArea.context;
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = this.fill;
	ctx.fill();
		
	this.newPos = function() {
		
		switch(this.vector) {
			
			case 'RIGHT':
				this.x += this.speed;
				if(this.x%this.width) {
					this.onGrid = false;
				} else {
					this.onGrid = true;
				}
				break;
				
			case 'LEFT':
				this.x -= this.speed;
				if(this.x%this.width) {
					this.onGrid = false;
				} else {
					this.onGrid = true;
				}
				break;
				
			case 'UP':
				this.y -= this.speed;
				if(this.y%this.height) {
					this.onGrid = false;
				} else {
					this.onGrid = true;
				}
				break;
				
			case 'DOWN':
				this.y += this.speed;
				if(this.y%this.height) {
					this.onGrid = false;
				} else {
					this.onGrid = true;
				}
				break;
				
			default:
				console.log("Swich did not worked...");
		}
		
		var tailAddition = {x : this.x , y : this.y};
		this.tail.unshift(tailAddition);
		if(this.tail.length > unitX * 5) this.tail.pop();
		
	};
	
	this.update = function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
		if(this.tail.length >= unitX * 5) {
			ctx.clearRect(this.tail[this.tail.length-1].x,this.tail[this.tail.length-1].y,this.width, this.height);
		}
	};
	
	this.colided = function() {
		if (this.x < 0 || this.y < 0) {
			return true;
		} else if (this.x > gameArea.canvas.width - this.width) {
			return true;
		} else if (this.y > gameArea.canvas.height - this.height) {
			return true;
		} else return false;
	};
}

function updateGameArea() {
	//gameArea.clear();
	head.newPos();
	if((head.vector != head.nextTurn) && head.onGrid) head.vector = head.nextTurn;
	if (head.colided()) clearInterval(gameArea.interval);
	head.update();
}