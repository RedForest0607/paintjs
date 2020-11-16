const colors = $(".jsColor"); //제이쿼리는 다음과 같은 방법으로 html 요소를 가져온다
const canvas = $("#jsCanvas");
const brushSize = $("#jsRange");
const mode = $("#jsMode");
const ctx = $("canvas")[0].getContext('2d');

let painting = false;

ctx.strokeStyle = "#2c2c2c";
ctx.strokelineWidth = 2.5;

function changeBrushSize(event){//브러시 사이즈 바꾸기
    ctx.lineWidth = event.target.value; 
}
if(brushSize){
    brushSize.bind("input",changeBrushSize);
}

startPainting = function() {
    painting = true;
}
stopPainting = function(){
    painting=false;
}

function onMouseLeave(event){ //마우스가 캔버스를 벗어나면 그리는것을 그만한다
    stopPainting();
}

//캔버스에 선을 그리는 함수
function onMouseMove(event){
    const x = event.offsetX; //client좌표는 전체 윈도우에 대한 좌표, offset은 내부에 대한 좌표
    const y = event.offsetY;
    if(!painting){//마우스가 캔버스위에 돌아다니는중
        console.log("not Painting");
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{//클릭해서 직접 그릴떄
        console.log("drawing");
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

changeColor = function(event){//브러시 색 바꾸는 함수
    ctx.strokeStyle = event.target.style.backgroundColor;
}
Array.from(colors).forEach(color=> $("color").on("click",changeColor));
//                         만들어진 배열이름을 셀렉트 해줌, 이벤트는 on으로 만든다

if(canvas){
    canvas.on("mousemove", onMouseMove);
    canvas.on("mousedown", startPainting);
    canvas.on("mouseup", stopPainting);
    canvas.on("mouseleave", stopPainting);
}