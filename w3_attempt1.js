






//// v2
var myGamePiece;
// var controller = new Controller();
var myObstacle;


let leftBtn = false;
let rightBtn = false;
let upBtn = false;
let downBtn = false;


function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle = new component(70, 150, "green", 300, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        // this.canvas.style.cursor = "none"; //hide the original cursor

        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('mousemove', function (e) {
            // console.log(e)
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    stopLeft : function() {

    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }

}

function updateGameArea() {
    // const collisionRes = myGamePiece.crashWith(myObstacle);
    handleCollision(myGamePiece, myObstacle);
    myGameArea.clear();
    myObstacle.update();

    // VVV Move with mouse
    // if (myGameArea.x && myGameArea.y) {
    //     myGamePiece.x = myGameArea.x;
    //     myGamePiece.y = myGameArea.y;
    // }
    //VVV  Move with arrows
    myGamePiece.newPos();    
    myGamePiece.update();
    // }
}

function handleCollision(ob1, ob2) {
    const leftCollision = ob1.x > (ob2.x - ob1.width) && ob1.x < ob2.x;
    const rightCollision = ob1.x < (ob2.x + ob2.width) && ob1.x > (ob2.x + ob2.width - ob1.width);
    const topCollision = ob1.y > (ob2.y - ob1.height) && ob1.y < ob2.y;
    const bottomCollision = ob1.y < (ob2.y + ob2.height) && ob1.y > (ob2.y + ob2.height - ob1.height);


    if (detectCollision(ob1, ob2)) {

        if (ob1.x > (ob2.x - ob1.width) && ob1.x < ob2.x) ob1.x -= (ob1.x + ob1.width - ob2.x);
        if (ob1.x < (ob2.x + ob2.width) && ob1.x > (ob2.x + ob2.width - ob1.width)) ob1.x += (ob2.x + ob2.width - ob1.x);
        if (ob1.y > (ob2.y - ob1.height) && ob1.y < ob2.y) ob1.y -= (ob1.y + ob1.height - ob2.y);
        if (ob1.y < (ob2.y + ob2.height) && ob1.y > (ob2.y + ob2.height - ob1.height)) ob1.y += (ob2.y + ob2.height - ob1.y);
    
    }


    if (detectCollision(ob1, ob2)) {
        console.log(detectCollision(ob1, ob2));
    }
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}



function detectCollision(ob1, ob2) {
    if (ob1.x < (ob2.x + ob2.width)
        && ob1.x > (ob2.x - ob1.width)
        && ob1.y < (ob2.y + ob2.height)
        && ob1.y > (ob2.y - ob1.height)
    ) {
        console.warn('Collision Detected');
        return true;
    }
    return false
    // console.log(ob1, ob2);
}



document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;

function checkKeyDown(e) {

    if (e.keyCode == '38') {
        upBtn = true;
        myGamePiece.speedY = -10; 
    }
    else if (e.keyCode == '40') {
        downBtn = true;
        myGamePiece.speedY = 10; 
    }
    else if (e.keyCode == '37') {
        leftBtn = true;
        myGamePiece.speedX = -10; 
    }
    else if (e.keyCode == '39') {
        rightBtn = true;
        myGamePiece.speedX = 10; 
    }

}

function checkKeyUp(e) {

    if (e.keyCode == '38') {
        upBtn = false;
        myGamePiece.speedY = 0; 
    }
    else if (e.keyCode == '40') {
        downBtn = false;
        myGamePiece.speedY = 0; 
    }
    else if (e.keyCode == '37') {
        leftBtn = false;
        myGamePiece.speedX = 0; 
    }
    else if (e.keyCode == '39') {
        rightBtn = false;
        myGamePiece.speedX = 0; 
    }
}

  






