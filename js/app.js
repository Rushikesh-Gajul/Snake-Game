let inputDr={x:0,y:0};
const foodSD=new Audio('../music/food.mp3');
const gmOverSD=new Audio('../music/gameover.mp3');
const moveSD=new Audio('../music/move.mp3');
const musicSD=new Audio('../music/music.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakearr=[
    {x:13,y:15}
]
food={x:5,y:12}

//Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
        
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
         return true;
    }
}


function gameEngine(){
  // Updating snake array and Food
 if(isCollide(snakearr)){
    gmOverSD.play();
    musicSD.pause();
    inputDr={x:0,y:0};
    score=0;
    alert("Game Over ,Press any key to play again");
    snakearr=[{x:13,y:15}];
    musicSD.play();
    score=0;
 }
  //if you have eaten the food ,increament the score and regenerate the food
  if(snakearr[0].y===food.y && snakearr[0].x===food.x){
    foodSD.play();
    snakearr.unshift({x:snakearr[0].x+inputDr.x,y:snakearr[0].y+inputDr.y});
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    score+=1;
    scoreBox.innerHTML="Score: "+score;
  }

  // Moving the snake 
  for(let i=snakearr.length-2;i>=0;i--){
    // const element=array[i];
    snakearr[i+1]={...snakearr[i]};
  }

  snakearr[0].x += inputDr.x;
  snakearr[0].y += inputDr.y;

  //display the snake
  board.innerHTML="";
  snakearr.forEach((e,index)=>{
      snakeElement=document.createElement('div');
      snakeElement.style.gridRowStart=e.y;
      snakeElement.style.gridColumnStart=e.x;
      if(index===0){
          snakeElement.classList.add('head'); 
        } else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food'); 
    board.appendChild(foodElement);
      
}

///main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDr={x:0,y:1}
    moveSD.play();
    musicSD.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDr.x=0;
            inputDr.y=-1;
            break;
        case "ArrowDown":
             console.log("ArrowDown");
             inputDr.x=0;
            inputDr.y=1;
             break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDr.x=-1;
            inputDr.y=0;
            break;
        case "ArrowRight":
             console.log("ArrowRight");
             inputDr.x=1;
            inputDr.y=0;
             break;
        default:
            break;
    }
});
