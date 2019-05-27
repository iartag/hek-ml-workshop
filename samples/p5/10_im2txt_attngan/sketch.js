// New
// - Chaining

// Variables
let attnGANImage
let im2txtCaption
let capture
let font
let liveStream

// Preload fonts
function preload() {
    font = loadFont('../assets/consolas.ttf')
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO)
    capture.hide()
    background(51)
}

function draw() {
    // background(51)
    tint(255)
    liveStream = utils.getLiveStream('http://10.10.4.129:8081')
    image(liveStream, 0, 0, liveStream.width/2, liveStream.height/2)
    tint(255, 50)
    if (attnGANImage)
        image(attnGANImage, capture.width, 0, capture.height, capture.height)
    tint(255)
    if (im2txtCaption)
        utils.drawText(im2txtCaption, 20, liveStream.height/2 - 40, 20, font)
}

// Function called when a key is released
function keyReleased() {
    if (keyCode === ENTER) 
        sendImageToIm2txt()
}

// Send the caption to attnGAN
function sendTextToAttnGAN() {
    console.log(im2txtCaption)
    models['attnGAN'].input({ caption: im2txtCaption })
}

// Send the current capture image to the model
function sendImageToIm2txt() {
    // const image = utils.captureAndEncodeCanvas(capture)
    // models['im2txt'].input({ image })
    utils.captureAndEncodeLiveStream(liveStream).then(image => {
        models['im2txt'].input({ image })
    })

}