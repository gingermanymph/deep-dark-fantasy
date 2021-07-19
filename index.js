function setSize(){
    console.log('called')
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
let depth;

const SETTINGS = {};

document.body.onresize = setSize;
setSize();

SETTINGS.scale = 50;
SETTINGS.depth = 2;
SETTINGS.maxDepth = 2.5;
SETTINGS.rows = 10;
SETTINGS.columns = 3;
SETTINGS.lineWidth = 1;
SETTINGS.tableWidth = .3;

SETTINGS.lineColor = {
    h: 20,
    s: 100,
    l: 50
}

SETTINGS.tableColor = {
    h: 200,
    s: 50,
    l: 50
}

SETTINGS.bgColor = {
    h: 200,
    s: 0,
    l: 0
}

function draw() {
    ctxGraph.fillStyle = `hsl(${SETTINGS.bgColor.h}, ${SETTINGS.bgColor.s}%, ${SETTINGS.bgColor.l}%)`;
    ctxGraph.fillRect(0, 0, width, height);

    SETTINGS.maxDepth = SETTINGS.depth > SETTINGS.maxDepth - .5 ? SETTINGS.depth + .5 : SETTINGS.maxDepth;
    // ?? Do we need it (scalable graph )??
    SETTINGS.maxDepth = SETTINGS.depth < SETTINGS.maxDepth - 2 ? SETTINGS.maxDepth - 2.5 : SETTINGS.maxDepth;


    ctxGraph.beginPath();
    ctxGraph.lineWidth = SETTINGS.tableWidth;
    ctxGraph.strokeStyle = `hsl(${SETTINGS.tableColor.h}, ${SETTINGS.tableColor.s}%, ${SETTINGS.tableColor.l}%)`;

    // horizontal lines
    let c = height / SETTINGS.rows;
    let counter = height;
    depth = SETTINGS.maxDepth;
    let dec = depth / SETTINGS.rows;

    ctxGraph.fillStyle = 'red'
    ctxGraph.font = "16px serif";
    while (counter > 0) {
        ctxGraph.fillText(depth.toFixed(2), width - 30, counter - 5);
        ctxGraph.moveTo(0, counter - .5);
        ctxGraph.lineTo(width, counter - .5);
        counter -= c;
        depth -= dec;
    }

    ctxGraph.stroke();

    // vertical lines
    c = width / SETTINGS.columns;
    counter = width;

    while (counter > 0) {
        ctxGraph.moveTo(counter - .5, 0);
        ctxGraph.lineTo(counter - .5, height);
        counter -= c;
    }

    ctxGraph.stroke();

    ctxGraph.beginPath();
    ctxGraph.lineJoin = "round";
    ctxGraph.lineWidth = SETTINGS.lineWidth;

    my_gradient = ctxGraph.createLinearGradient(0, 0, 0, height);
    my_gradient.addColorStop(1, "red");
    my_gradient.addColorStop(0, "orange");
    //  ctxGraph.moveTo(0, height / (SETTINGS.maxDepth / data[0]));
    ctxGraph.moveTo(0 , height);
    for (var i = 0; i <= data.length; i++) {
        ctxGraph.lineTo(width / data.length * i, height / (SETTINGS.maxDepth / data[i]));
    }
    ctxGraph.lineTo(width, height);
    ctxGraph.stroke();
    // ctxGraph.fill();
    
}

let int = setInterval(function() {
    // requestAnimationFrame(draw);
    draw()
    if (data.length > SETTINGS.scale){
        data.splice(0, 10)
    } else {
       // data.splice(0, 1)
    }
    data = data.concat(emulate(SETTINGS.depth * 100, 50, 5)) 
    // data.push(SETTINGS.depth + Math.random()* 0.02);
}, 250);