// New
// - Full screen

// Variables
let styleTransferImage
let capture
let liveStream

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO)
    capture.hide()
}

function draw() {
    if (styleTransferImage){
        tint(255,30)
        image(styleTransferImage, 0, 0, width, height)
    } else {
        image(capture, 0, 0, width, height)
    }
}

function keyReleased() {
    if (keyCode === ENTER)
        sendImageToStyleTransfer()
}

// Send the current capture image to the model
function sendImageToStyleTransfer() {
    let image = get(0, 0, width, height)
    image.resize(image.width/4, image.height/4)
    const contentImage = image.canvas.toDataURL("image/jpeg")
    models['styleTransfer'].input({ contentImage })
}