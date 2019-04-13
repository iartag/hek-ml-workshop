let pg
let socket
let liveStream

function setup() {
    let canvas = createCanvas(320, 240)
    canvas.parent('p5Container')

    pixelDensity(1)
    // imageMode(CENTER)

    pg = createGraphics(320, 240)

    socket = io.connect("http://localhost:3002");
}


function draw() {
    background(0)

    liveStream = select('#liveStream')
    if (liveStream)
        pg.image(liveStream, 0, 0, 320, 240)
    
    image(pg, 0, 0)

    // socket.emit('query', {
    //     "image": pg.canvas.toDataURL('image/jpeg')
    // });

}

function mouseDragged() {

    let x = map(mouseX, 0, width, 0, pg.width)
    let y = map(mouseY, 0, height, 0, pg.height)

}

function keyTyped() {

    if (key === 's') {
        console.log(pg.canvas.toDataURL('image/jpeg'))
        socket.emit('query', {
            "image": pg.canvas.toDataURL('image/jpeg')
        });
    }
    if (key === 'e') {
        pg.background(255)
    }
}