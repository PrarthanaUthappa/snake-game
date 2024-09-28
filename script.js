document.addEventListener('DOMContentLoaded',function()
{
const game_arena=document.getElementById('game')
const cellSize=20;
const arena_size=600;
let gamestarted=false
let score=0;;
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

function moveSnake()
{
    const newHead= {x:snake[0].x+dx,y:snake[0].y+dy};
    snake.unshift(newHead)

    if(newHead.x===food.x && newHead.y===food.y)
    {
        score=score+10;

    }
    else{
        snake.pop();
    }
}

function gameLoop()
{
setInterval(()=>
{
    moveSnake();
    drawFoodAndSnake();
},500)
}

function rungame()
{
    if(!gamestarted)
    {
        gamestarted=true;
        document.addEventListener('keypress',changeDirection);
        gameLoop();
    }
}


function initial()
{
// const score_board=document.createElement('div');
// score_board.id='score_board'
// document.body.insertBefore(score_board,game_arena)//at top

const startbtn=document.createElement('btn')
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