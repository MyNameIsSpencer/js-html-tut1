






//// v2
var myGamePiece;
// var controller = new Controller();
var myObstacle;


function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle = new component(10, 200, "green", 300, 120);
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

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
}

function updateGameArea() {

    if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop();
    } else {
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
    }
}

// function moveup() {
//     myGamePiece.speedY -= 1; 
// }

// function movedown() {
//     myGamePiece.speedY += 1; 
// }

// function moveleft() {
//     myGamePiece.speedX -= 1; 
// }

// function moveright() {
//     myGamePiece.speedX += 1; 
// }

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}






document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;

function checkKeyDown(e) {

    if (e.keyCode == '38') {
        myGamePiece.speedY = -10; 
    }
    else if (e.keyCode == '40') {
        myGamePiece.speedY = 10; 
    }
    else if (e.keyCode == '37') {
        myGamePiece.speedX = -10; 
    }
    else if (e.keyCode == '39') {
        myGamePiece.speedX = 10; 
    }

}

function checkKeyUp(e) {

    if (e.keyCode == '38') {
        myGamePiece.speedY = 0; 
    }
    else if (e.keyCode == '40') {
        myGamePiece.speedY = 0; 
    }
    else if (e.keyCode == '37') {
        myGamePiece.speedX = 0; 
    }
    else if (e.keyCode == '39') {
        myGamePiece.speedX = 0; 
    }
}

/////  W3 method of key presses
// window.addEventListener('keydown', function (e) {
//     myGameArea.key = e.keyCode;
//   })
//   window.addEventListener('keyup', function (e) {
//     myGameArea.key = false;
//   })

  



// var update = function() {

//     if (controller.left.active)  { console.log('left pressed') }
//     if (controller.right.active) { game.world.player.moveRight(); }
//     if (controller.up.active)    { game.world.player.jump(); controller.up.active = false; }

//     // game.update();

//   };


// var keyDownUp = function(event) {

//     controller.keyDownUp(event.type, event.keyCode);

//   };


// window.addEventListener("load", function(event) {
// }



// window.addEventListener("keydown", keyDownUp);
// window.addEventListener("keyup",   keyDownUp);
// window.addEventListener("resize",  resize);



















//// V1
// var myGamePiece;

// function startGame() {
//     myGameArea.start();
//     myGamePiece = new component(130, 20, "rgba(0, 0, 255, 0.5)", 20, 120);
//     redGamePiece = new component(75, 75, "red", 10, 10);
//     yellowGamePiece = new component(75, 75, "yellow", 50, 60);
//     blueGamePiece = new component(75, 75, "blue", 10, 110);
// }

// var myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 1000;
//         this.canvas.height = 800;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.interval = setInterval(updateGameArea, 20);
//     },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }
// }

// function component(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.x = x;
//     this.y = y;
//     this.update = function() {
//         ctx = myGameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

// function updateGameArea() {
//     myGameArea.clear();
//     myGamePiece.x += 1;
//     redGamePiece.x += 1;
//     yellowGamePiece.x += 1;
//     yellowGamePiece.y += 1;
//     blueGamePiece.x += 1;
//     blueGamePiece.y -= 1;
//     redGamePiece.update();
//     yellowGamePiece.update();
//     blueGamePiece.update();
//     myGamePiece.update();
// }