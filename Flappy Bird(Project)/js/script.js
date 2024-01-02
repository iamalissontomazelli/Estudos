/* Tela */

let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

/* Movimento Bird */
let birdWidth = 34; /*  width and Height ratio = 408/228 = 17/12 */
let birdHeight = 24; 
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;


/* Aqui foi criado a posição do passaro na tela. */
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

/* Pipes */
let pipeArray = [];
let pipeWidth = 64; /* width/ height ratio = 384/3072 = 1/8 */
let pipeHeight = 600;
let pipeX = boardWidth;
let pipeY = 0;



let topPipeImg; 
let bottomPipeImg;

/* Fisica do jogo  */
let velocityX = -1; /*  velocidade de movimento da esquerda */
let velocityY = 0; /*  velocidade do bird */
let gravity = 0.2;

/*  criando gameOver */
let gameOver = false;

/*  Criando contador de pontos */
let score = 0;



window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); /* vamos usar para criar a tela */


    /*  Desenhando o flappy bird  */
    /* context.fillStyle = "green";
    context.fillRect(bird.x, bird.y, bird.width, bird.height); */


    /* Inserindo image do Bird no Rect */
    birdImg = new Image();
    birdImg.src = "../img/flappybird.png";
    birdImg.onload = function(){
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

        /* top pipe load image */
    topPipeImg = new Image();
    topPipeImg.src = "../img/toppipe.png";

        /* bottom pipe load image   */
    bottomPipeImg = new Image();
    bottomPipeImg.src = "../img/bottompipe.png";


    requestAnimationFrame(update);
    setInterval(placePipes, 1500); /*  sempre 1.5 segundo */
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    /* bird */
    velocityY += gravity;
    /* bird.y += velocityY; */
    bird.y = Math.max(bird.y + velocityY, 0); /* adicionando um limite de pulo */
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    /* Pipes */
    for (let i=0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if  (!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)){
            gameOver = true;
        }
    }

            /* Reset do game  */

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift(); /* para remover elementos */
    }



    /*  Score  */
    context.fillStyle = "black";
    context.font ="55px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placePipes() {
    if (gameOver){
        return;
    }

    /* 0-1* pipeHeight/2 
    0 -> -128 pipeHeight/4
    1 -> -128 -256 */
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);


    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code =="keyX"){
         /* jump */
velocityY = -6;

/* Reset the game  */
        if (gameOver){
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
         }
    }
}
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}