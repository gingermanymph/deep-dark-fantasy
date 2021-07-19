function setSize(){
    width = cvsGram.width = cvsGraph.width = innerWidth;
    height = cvsGram.height = cvsGraph.height = innerHeight;
}

let cvsGram = document.getElementById('ddf-gram');
let cvsGraph = document.getElementById('ddf-graph');

let ctxGram = cvsGram.getContext('2d');
let ctxGraph = cvsGraph.getContext('2d');

let width;
let height;
let data = [];
let data2 = [];
let depth;

const SETTINGS = {};

document.body.onresize = setSize;
setSize();

SETTINGS.scale = 550;
SETTINGS.depth = 2;
SETTINGS.maxDepth = 2.5;
SETTINGS.rows = 10;
SETTINGS.columns = 0;
SETTINGS.lineWidth = 1;
SETTINGS.tableWidth = .3;

SETTINGS.lineColor = {
    h: 20,
    s: 100,
    l: 50
}

SETTINGS.tableColor = {
    h: 290,
    s: 65,
    l: 30
}

SETTINGS.bgColor = {
    h: 200,
    s: 0,
    l: 0
}

function drawGraph() {
    ctxGraph.fillStyle = `hsl(${SETTINGS.bgColor.h}, ${SETTINGS.bgColor.s}%, ${SETTINGS.bgColor.l}%)`;
    ctxGraph.fillRect(0, 0, width, height);

    SETTINGS.maxDepth = SETTINGS.depth > SETTINGS.maxDepth - .5 ? SETTINGS.depth + .5 : SETTINGS.maxDepth;
    // ?? Do we need it (scalable graph )??
    SETTINGS.maxDepth = SETTINGS.depth < SETTINGS.maxDepth - 2 ? SETTINGS.maxDepth - 2.5 : SETTINGS.maxDepth;

    // drawing graph
    ctxGraph.beginPath();
    ctxGraph.lineJoin = "round";
    ctxGraph.lineWidth = SETTINGS.lineWidth;

    my_gradient = ctxGraph.createLinearGradient(0, 0, 0, height);
    my_gradient.addColorStop(1, "hsl(17, 98%, 50%)");
    my_gradient.addColorStop(0, "hsl(32, 98%, 50%)");
    ctxGraph.fillStyle = my_gradient;
    ctxGraph.strokeStyle = my_gradient;
    ctxGraph.moveTo(0 , height);
    for (var i = 0; i <= data.length; i++) {
        ctxGraph.lineTo(width / data.length * i, height / (SETTINGS.maxDepth / data[i]));
    }
    ctxGraph.lineTo(width, height);
    // ctxGraph.stroke();
    ctxGraph.fill();


    ctxGraph.beginPath();
    ctxGraph.lineWidth = SETTINGS.tableWidth;
    ctxGraph.strokeStyle = `hsl(${SETTINGS.tableColor.h}, ${SETTINGS.tableColor.s}%, ${SETTINGS.tableColor.l}%)`;

    // horizontal lines
    let c = height / SETTINGS.rows;
    let counter = height;
    depth = SETTINGS.maxDepth;
    let dec = depth / SETTINGS.rows;

    ctxGraph.fillStyle = 'white'
    ctxGraph.font = "14px serif";
    while (counter > 0) {
        ctxGraph.fillText(depth.toFixed(2), width - 30, counter - 5);
        counter -= c;
        depth -= dec;
    }
    ctxGraph.stroke();    
}

function drawGram(){
    data2 = data.slice(data.length-10);
    len = data2.length
    h = height / len;
    x = width - 1;
    // ctxGram.fillStyle = 'hsl(240, 100%, 15%)';
    // ctxGram.fillRect(0, 0, width, height);

    let imgData = ctxGram.getImageData(2, 0, width, height);
    ctxGram.fillRect(0, 0, width, height);
    ctxGram.putImageData(imgData, 0, 0);

    for(let i = 0; i < len; i++){
        ctxGram.beginPath();
        ctxGram.strokeStyle = 'red';

        ctxGram.lineWidth = 2;
        ctxGram.moveTo(x, height / (SETTINGS.maxDepth / data2[i]));
        ctxGram.lineTo(x, height / (SETTINGS.maxDepth / data2[i]) + 2);
        ctxGram.stroke();
    }

}

let int = setInterval(function() {
    // requestAnimationFrame(drawGraph);
    drawGraph();
    drawGram();
    if (data.length > SETTINGS.scale){
        data.splice(0, 10)
    } else {
       // data.splice(0, 1)
    }
    data = data.concat(emulate(SETTINGS.depth * 100, 25, 10)) 
    // data.push(SETTINGS.depth + Math.random()* 0.02);
}, 300);

let int2 = setInterval(function() {
    // requestAnimationFrame(drawGraph);
    drawGram();
    // data.push(SETTINGS.depth + Math.random()* 0.02);
}, 50);