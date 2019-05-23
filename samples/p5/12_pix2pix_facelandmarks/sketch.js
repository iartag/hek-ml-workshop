// Variables
let faceLandmarks
let pix2pixImage
let colors = ['#0000FF', '#004DFF', '#00A8FF', '#00FFFF', '#A7FF46', '#FF5400', '#FF0000', '#FFFF00', '#AC0000']
let capture

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO)
    capture.hide()
    background(colors[0])
}

function draw() {
    background(colors[0])
    image(capture, 0, 0)
    if (pix2pixImage)
        image(pix2pixImage, width / 2, 0, width / 2, height)
    if (faceLandmarks)
        drawFace()

}

function keyReleased() {
    if (keyCode === ENTER) {
        sendImageToPix2pix()
        sendImageToFaceLandmarks()
    }
}

function drawFace() {
    console.log(faceLandmarks)
}

function sendImageToPix2pix() {
    let image = get(0, 0, width/2, height)
    image = image.canvas.toDataURL("image/jpeg")
    models['pix2pix'].input({ image })
}

function sendImageToFaceLandmarks() {
    const photo = utils.captureAndEncodeCanvas(capture)
    models['faceLandmarks'].input({ photo })
}

// Resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}