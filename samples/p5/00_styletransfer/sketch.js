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
    // image(capture, 0, 0)
    liveStream = utils.getLiveStream('http://10.10.4.129:8081')
    image(liveStream, 0, 0)
    if (styleTransferImage)
        image(styleTransferImage, width / 2, 0)
}

function keyReleased() {
    if (keyCode === ENTER)
        sendImageToStyleTransfer()
}

// Send the current capture image to the model
function sendImageToStyleTransfer() {
    // const contentImage = utils.captureAndEncodeCanvas(capture)
    // models['styleTransfer'].input({ contentImage })
    utils.captureAndEncodeLiveStream(liveStream).then(contentImage => {
        models['styleTransfer'].input({ contentImage })
    })
}