const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");


let player;
let enemy;
let hiding;
let time;
let timer;
let gameOver=false;



function init(){

player={
x:100,
y:200,
size:20,
speed:4
};


enemy={
x:500,
y:200,
size:25,
speed:1.5
};


hiding={
x:300,
y:100,
size:50
};


time=60;
gameOver=false;


document.getElementById("time").innerHTML=time;


clearInterval(timer);

timer=setInterval(()=>{

if(!gameOver){

time--;

document.getElementById("time").innerHTML=time;


if(time<=0){

win();

}

}

},1000);


}



function draw(){


ctx.clearRect(0,0,600,400);


//地图

ctx.fillStyle="#555";
ctx.fillRect(0,0,600,400);


//隐藏区域

ctx.fillStyle="#0099ff";
ctx.fillRect(
hiding.x,
hiding.y,
hiding.size,
hiding.size
);


ctx.fillStyle="white";
ctx.fillText(
"隐藏点",
hiding.x+5,
hiding.y+30
);



//玩家

ctx.fillStyle="#00ff00";

ctx.fillRect(
player.x,
player.y,
player.size,
player.size
);


//敌人

ctx.fillStyle="red";

ctx.fillRect(
enemy.x,
enemy.y,
enemy.size,
enemy.size
);


//追踪AI

let dx=player.x-enemy.x;
let dy=player.y-enemy.y;

let distance=Math.sqrt(dx*dx+dy*dy);


if(distance>1){

enemy.x+=dx/distance*enemy.speed;
enemy.y+=dy/distance*enemy.speed;

}


//碰撞

if(distance<25){

lose();

}



//隐藏判断

let hideDistance=Math.sqrt(
(player.x-hiding.x)**2+
(player.y-hiding.y)**2
);


if(hideDistance<50){

enemy.speed=0.5;

}else{

enemy.speed=1.5;

}


if(!gameOver){

requestAnimationFrame(draw);

}


}


function move(dir){

if(gameOver)return;


if(dir=="up")
player.y-=20;


if(dir=="down")
player.y+=20;


if(dir=="left")
player.x-=20;


if(dir=="right")
player.x+=20;


//边界

player.x=Math.max(
0,
Math.min(
580,
player.x
));


player.y=Math.max(
0,
Math.min(
380,
player.y
));


}



document.addEventListener(
"keydown",
e=>{


if(e.key=="ArrowUp"||e.key=="w")
move("up");


if(e.key=="ArrowDown"||e.key=="s")
move("down");


if(e.key=="ArrowLeft"||e.key=="a")
move("left");


if(e.key=="ArrowRight"||e.key=="d")
move("right");


});



function win(){

gameOver=true;

alert("🎉 躲藏成功！");

}


function lose(){

gameOver=true;

alert("😱 被发现了！");

}



document
.getElementById("restart")
.onclick=()=>{

init();
draw();

};



init();
draw();
