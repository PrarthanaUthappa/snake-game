document.addEventListener('DOMContentLoaded',function()
{
const game_arena=document.getElementById('game')
const cellSize=20;
const arena_size=500;
let gamestarted=false;
let score=0;
let snake=[{x:160,y:240},{x:140,y:240},{x:120,y:240}]
let food={x:300,y:240} //x:15*20(cellsize) y:10*20 ,,,top left pixel of food


function changeDirection(e)
{
    const isGoingdown=dy===cellSize;
    const isGoingup=dy===-cellSize;
    const isGoingleft=dx===-cellSize;
    const isGoingright=dx===cellSize;
    if(e.key==='ArrowUp' && !isGoingdown)
    {
        dx=0;
        dy=-cellSize;
    }
    else if(e.key==='ArrowDown' && !isGoingup)
    {
        dx=0;
        dy=cellSize;
    }
    else if(e.key==='ArrowLeft' && !isGoingright)
    {
        dx=-cellSize;
        dy=0;
    }
    else if(e.key==='ArrowRight' && !isGoingleft)
    {
        dx=cellSize;
        dy=0;   
    }
}

function drawdiv(x,y,className)
{
    const divelement=document.createElement('div')
    divelement.classList.add(className);
    divelement.style.top=`${y}px`;
    divelement.style.left=`${x}px`;
    return divelement;
}

function drawFoodAndSnake()
{
    game_arena.innerHTML='';//wipe out everything and redraw with new positions

    snake.forEach((snakecell)=>
    {
        const snakeElement=drawdiv(snakecell.x,snakecell.y,'snake')
        game_arena.appendChild(snakeElement)
    })

    const foodelement=drawdiv(food.x,food.y,'food')
    game_arena.appendChild(foodelement)

}

let dx=cellSize;
let dy=0;
let intervalId;
let snakespeed=400;


function movefood()
{
    let maxx,maxy;
    do{
        maxx=Math.floor(Math.random()*25)*cellSize;
        maxy=Math.floor(Math.random()*25)*cellSize;

    }while(snake.some(snakecell=>snakecell.x===maxx && snakecell.y===maxy))
food.x=maxx;
food.y=maxy;
}

function moveSnake()
{
    const newHead= {x:snake[0].x+dx,y:snake[0].y+dy};
    if(isGameOver())
    {
        return;
    }
    snake.unshift(newHead)

    if(newHead.x===food.x && newHead.y===food.y)
    {
        score=score+10;
        movefood();
        if(snakespeed>50)
        {
            clearInterval(intervalId)
            snakespeed-snakespeed-20;
            gameLoop();
        }
    }
    else{
        snake.pop();
    }

}
function isGameOver()
{
    //body collision
    for(let i=1;i<snake.length;i++)
    {
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
        {
            return true;
        }
    }
    //wall collission checks
    const hitRightWall=snake[0].x > arena_size - cellSize;
    const hitLefttWall=snake[0].x < 0;
    const hitTopWall=snake[0].y < 0;
    const hitBottomWall=snake[0].y > arena_size - cellSize;
    return hitBottomWall || hitLefttWall || hitRightWall || hitTopWall;
}

function gameLoop()
{
intervalId=setInterval(()=>
{
    if(isGameOver())
    {
        clearInterval(intervalId);
        gamestarted=false;
        alert("game over ! your score is " + score);
        return;
    }
    moveSnake();
    drawFoodAndSnake();
    updateScore();
},snakespeed)
}

function rungame()
{
    if(!gamestarted)
    {
        gamestarted=true;
        document.addEventListener('keydown',changeDirection);
        gameLoop();
    }
}

function updateScore()
{
    const scoreBoard=document.getElementById('score_board')
    scoreBoard.textContent=`Score :${score}`;
}
function initial()
{
const score_board=document.createElement('div');
score_board.id='score_board'
document.body.insertBefore(score_board,game_arena)//at top

const startbtn=document.createElement('button')
startbtn.textContent='Start Game'
startbtn.classList.add('start_btn')

startbtn.addEventListener('click', function startgame()
{
    startbtn.style.display='none';
    
    rungame();
});
document.body.appendChild(startbtn) //at bottom

}

initial();
});