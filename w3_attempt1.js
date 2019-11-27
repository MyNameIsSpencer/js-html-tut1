






//// v2
var myGamePiece;
// var controller = new Controller();
var myObstacles = [];
var myObstacle;
var myScore;


let leftBtn = false;
let rightBtn = false;
let upBtn = false;
let downBtn = false;


function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle = new component(70, 150, "green", 300, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 700;
        // this.canvas.style.cursor = "none"; //hide the original cursor

        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
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

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

}

function updateGameArea() {
    handleCollision(myGamePiece, myObstacle);
    myGameArea.clear();
    myObstacle.x += -1;


    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        handleCollision(myGamePiece, myObstacles[i]);
    }


    myGameArea.clear();
    myGameArea.frameNo += 1;
    





    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
      }


    // if (myGameArea.frameNo == 1 || everyinterval(150)) {
    //   x = myGameArea.canvas.width;
    //   y = myGameArea.canvas.height - 200
    //   console.log(x, y);
    //   myObstacles.push(new component(10, 200, "green", x, y));
    // }




    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }

    // VVV Move with mouse
    // if (myGameArea.x && myGameArea.y) {
    //     myGamePiece.x = myGameArea.x;
    //     myGamePiece.y = myGameArea.y;
    // }

    //VVV  Move with arrows
    myObstacle.update();



    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
    // }
}

function handleCollision(ob1, ob2) {
    if (detectCollision(ob1, ob2)) {
        if (ob1.x > (ob2.x - ob1.width) && ob1.x < ob2.x) ob1.x -= (ob1.x + ob1.width - ob2.x);
        if (ob1.x < (ob2.x + ob2.width) && ob1.x > (ob2.x + ob2.width - ob1.width)) ob1.x += (ob2.x + ob2.width - ob1.x);
        if (ob1.y > (ob2.y - ob1.height) && ob1.y < ob2.y) ob1.y -= (ob1.y + ob1.height - ob2.y);
        if (ob1.y < (ob2.y + ob2.height) && ob1.y > (ob2.y + ob2.height - ob1.height)) ob1.y += (ob2.y + ob2.height - ob1.y);
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

  



