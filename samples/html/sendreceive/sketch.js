let pg;
let socket;
let liveStream;

setInterval(sendImage, 100);

function sendImage() {
    socket.emit('query', {
        "image": pg.canvas.toDataURL('image/jpeg')
    });
}

function setup() {
    let canvas = createCanvas(320, 240);
    canvas.parent('p5Container');
    pixelDensity(1);

    pg = createGraphics(320, 240);

    socket = io.connect("http://localhost:3002");
}


function draw() {
    background(0);

    liveStream = select('#liveStream');
    if (liveStream)
        pg.image(liveStream, 0, 0, 320, 240);

    image(pg, 0, 0);

}