// New
// - Introduce GUI
// - Introduce key functions

// TODO
// - Fix blinking (change filter...)

// Variables
let styleTransferImage
let capture

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO)
    capture.hide()
}

function draw() {
    image(capture, 0, 0)
    filter(THRESHOLD, options.thresholdLevel)
    if (styleTransferImage)
        image(styleTransferImage, width / 2, 0, width / 2, height)
}

// Function called when a key is released
function keyReleased() {
    if (keyCode === ENTER)
        sendImageToStyleTransfer()
}

// Send the current capture image to the model
function sendImageToStyleTransfer() {
    const image = get(0, 0, width/2, height)
    const contentImage = image.canvas.toDataURL("image/jpeg")
    models['styleTransfer'].input({ contentImage })
}