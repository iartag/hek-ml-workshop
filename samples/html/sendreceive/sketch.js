let pg;
let socket;
let liveStream;
let canvasWidth = 640;
let canvasHeight = 480;

// socket.on('message', function (message) {
//     sendObject();
// });

// function sendObject() {
// }

function sendImage() {
    socket.emit('query', {
        "contentImage": pg.canvas.toDataURL('image/jpeg')
    });
}

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('p5Container');
    pixelDensity(1);

    pg = createGraphics(canvasWidth, canvasHeight);

    socket = io.connect("http://localhost:3006");
    socket.on("connect", function () {
        setInterval(sendImage, 100);
    });

}


function draw() {
    background(0);

    liveStream = select('#liveStream');
    if (liveStream)
        pg.image(liveStream, 0, 0, canvasWidth, canvasHeight);

    image(pg, 0, 0);

}