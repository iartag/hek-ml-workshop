let pg;
let socket;
let liveStream;
let canvasWidth = 740;
let canvasHeight = 360;

setInterval(sendImage, 100);

function sendImage() {
    socket.emit('query', {
        "image": pg.canvas.toDataURL('image/jpeg')
    });
}

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('p5Container');
    pixelDensity(1);

    pg = createGraphics(canvasWidth, canvasHeight);

    socket = io.connect("http://localhost:3002");
}


function draw() {
    background(0);

    liveStream = select('#liveStream');
    if (liveStream)
        pg.image(liveStream, 0, 0, canvasWidth, canvasHeight);

    image(pg, 0, 0);

}