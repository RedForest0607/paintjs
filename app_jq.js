const colors = $(".jsColor"); //제이쿼리는 다음과 같은 방법으로 html 요소를 가져온다
const canvas = $("#jsCanvas");
const brushSize = $("#jsRange");
const mode = $("#jsMode");
const ctx = $("#jsCanvas")[0].getContext("2d");

canvas.width = 700;
canvas.height = 700;

let painting = false;

ctx.strokeStyle = "#2c2c2c";
ctx.strokelineWidth = 2.5;

function changeBrushSize(event){//브러시 사이즈 바꾸기
    ctx.lineWidth = event.target.value; 
}
if(brushSize){
    brushSize.bind("input",changeBrushSize);
}

function startPainting() {
    painting = true;
}
function stopPainting(){
    painting=false;
}

//캔버스에 선을 그리는 함수
function onMouseMove(event){
    const x = event.offsetX; //client좌표는 전체 윈도우에 대한 좌표, offset은 내부에 대한 좌표
    const y = event.offsetY;
    if(!painting){//마우스가 캔버스위에 돌아다니는중
        console.log("not Painting");
        try{ctx.beginPath();
        ctx.moveTo(x, y);
        }catch(error){
            console.log("not working");
        }
        
    }else{//클릭해서 직접 그릴떄
        console.log("drawing");
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function changeColor(event){//브러시 색 바꾸는 함수
    ctx.strokeStyle = event.target.style.backgroundColor;
    console.log("color changed");
}
Array.from(colors).forEach(color => $(color).bind("click", changeColor));
//                         만들어진 배열이름을 셀렉트 해줌, 이벤트는 on으로 만든다

if(canvas){
    canvas.on("mousemove", onMouseMove);
    canvas.on("mousedown", startPainting);
    canvas.on("mouseup", stopPainting);
    canvas.on("mouseleave", stopPainting);
}