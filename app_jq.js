const colors = $(".jsColor");
const canvas = $("#jsCanvas");
const brushSize = $("#jsRange");
const mode = $("#jsMode");
const ctx = $("2d");

ctx.strokeStyle = "#2c2c2c";
ctx.strokelineWidth = 2.5;
let painting = false;

startPainting = function() {
    painting = true;
    console.log("onMouseMove");
}
changeColor = function(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
}
stopPainting = function(){
    painting=false;
}

onMouseMove = function(){
    stopPainting();
    console.log("onMouseMove");
}
function onMouseLeave(event){
    stopPainting();
}
function changeBrushSize(event){
    ctx.lineWidth = event.target.value;
    console.log(ctx.strokelineWidth);  
}
if(canvas){
    canvas.bind("mousemove", onMouseMove);
}

//마우스 좌표 가져옴
function onMouseMove(event){
    const x = event.offsetX; //client좌표는 전체 윈도우에 대한 좌표, offset은 내부에 대한 좌표
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        //ctx.moveTo(x, y);
    }else{
        console.log(`drawing ${x} ${y} to`);
        ctx.lineTo(x,y);
        ctx.stroke();
        console.log(`${x} ${y}`);
    }
}
if(brushSize){
    brushSize.bind("input",changeBrushSize);
}
Array.from(colors).forEach(color=> on("click",changeColor));