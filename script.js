const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
//canvas settings
canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;
const startButton = document.querySelector('.start');


///////////////////////////////////////////////////

//ball sizing 
const ballSize = 20;
//ball position
let ballX = (cw / 2 - ballSize / 2);
let ballY = (ch / 2 - ballSize / 2);
//////////////////////////////////
let ballSpeedX = 2;
let ballSpeedY = -1.5;


////////////////////////////////////////////////////
//paddles///////////////////////////////////////////
const paddleHeight = 100;
const paddleWidth = 20;
////////////////////////////////////////////////////

//paddles position//////////////////////////////////
const xPosition = 70;
let yPosition = 200
const xAiPosition = 910;
let yAiPosition = 200;
/////////////////////////////////////////////////////
//middle lines///////////////////////////////////////
const middleLineWidth = 6;
const middleLineHeight = 16;
///////////////////////////////////////////////////////

let topCanvas = canvas.offsetTop;




//table render
function table() {

    ctx.fillStyle = '#000';

    ctx.fillRect(0, 0, cw, ch);

    //middle line render////

    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "gray";
        ctx.fillRect(cw / 2 - middleLineWidth / 2, linePosition, middleLineWidth, middleLineHeight);

    }
}

//mouse move-ta funckcja "przesuwa" punkt (0,0) do połowy rakietki.Czyli bazowo e.clientY jest odczytywane od góry okna,po odjęciu offsetTop canvasu,od jego początku a po odjęciu połowy rakietki od jej środka.Czyli rakietka może dojechać swoją połową do konca canvas.
canvas.addEventListener("mousemove", function (e) {

    yPosition = e.clientY - topCanvas;
    if (yPosition >= ch - paddleHeight) {

        yPosition = ch - paddleHeight;

    } else if (yPosition <= 0) {
        yPosition = 0;
    }
});




//player paddle render
function playerpaddleRender() {
    ctx.fillStyle = '#2dce32';
    ctx.fillRect(xPosition, yPosition, paddleWidth, paddleHeight);



}
//ai paddle render
function aiPaddleRender() {
    ctx.fillStyle = "#4286f4";
    ctx.fillRect(xAiPosition, yAiPosition, paddleWidth, paddleHeight);
    const paddleMiddle = yAiPosition + paddleHeight / 2;
    const ballMiddle = ballY + ballSize / 2;
    //ai player movement
    function aiMove() {

        if (ballX > 500) {


            if (paddleMiddle - ballMiddle > 200) {
                yAiPosition -= 24;

            } else if (paddleMiddle - ballMiddle > 50) {
                yAiPosition -= 10
            } else if (paddleMiddle - ballMiddle < -200) {
                yAiPosition += 24;
            } else if (paddleMiddle - ballMiddle < -50) {
                yAiPosition += 10;
            }

        }

        if (ballX <= 500 && ballX > 100) {
            if (paddleMiddle - ballMiddle > 100) {
                yAiPosition -= 3;
            } else if (paddleMiddle - ballMiddle < -100) {
                yAiPosition += 3;
            }
        }


    }
    aiMove();
}

//beatcontrol
function beatControl() {

    if (ballX <= paddleWidth + ballSize) {
        ballSpeedX = -ballSpeedX;
        //console.log(ballX);
    } else if (ballX <= xPosition + paddleWidth) {
        ballSpeedX = -ballSpeedX;
        // console.log(ballX);
    }

}
//ball render
function ball() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUp();
    }

    if (ballX <= 0 || ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    } else if (ballX < 0) {
        ball();
    }

}

function speedUp() {
    if (ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += 0.5;
    } else if (ballSpeedX < 0 && ballSpeedX > -16) {

        ballSpeedX -= 0.5;
    }

    if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += 0.5;
    } else if (ballSpeedY < 0 && ballSpeedY > -16) {

        ballSpeedY -= 0.5;
    }
}

function game() {


    table();
    playerpaddleRender();
    aiPaddleRender();

    beatControl();
    ball();
}

game();




startButton.addEventListener('click', function () {
    startButton.style.display = "none";

    setInterval(game, 1000 / 60);
})
