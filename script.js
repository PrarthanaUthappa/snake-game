document.addEventListener('DOMContentLoaded',function()
{
const game_arena=document.getElementById('game')
const cellSize=20;
const arena_size=600;
let gamestarted=false
let score=0;;
let snake=[{x:160,y:240},{x:140,y:240},{x:120,y:240}]
let food={x:300,y:240} //x:15*20(cellsize) y:10*20 ,,,top left pixel of food


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

function rungame()
{
    if(!gamestarted)
    {
        gamestarted=true;
        drawFoodAndSnake();
    }
}


function initial()
{
const score_board=document.createElement('div');
score_board.id='score_board'
document.body.insertBefore(score_board,game_arena)//at top

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