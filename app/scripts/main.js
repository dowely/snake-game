var head, onGrid;

function startGame() {

	gameArea.start();
	head = new Snake(100,80,15,15, 'green', 'RIGHT');
	
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
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 375;
		this.canvas.height = 240;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);
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
	this.tail = [
		{},
		{},
		{},
		{},
		{}
	];
	
	ctx = gameArea.context;
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = this.fill;
	ctx.fill();
		
	this.newPos = function() {
		if (this.vector == 'RIGHT') this.x += this.speed;
		if (this.vector == 'LEFT') this.x -= this.speed;
		if (this.vector == 'UP') this.y -= this.speed;
		if (this.vector == 'DOWN') this.y += this.speed;
	};
	
	this.update = function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	
	this.colided = function() {
		if (this.x <= 0 || this.y <= 0) {
			return true;
		} else if (this.x >= gameArea.canvas.width - this.width) {
			return true;
		} else if (this.y >= gameArea.canvas.height - this.height) {
			return true;
		} else return false;
	};
}

function updateGameArea() {
	gameArea.clear();
	head.newPos();
	
	if (head.colided()) clearInterval(gameArea.interval);
	head.update();
}