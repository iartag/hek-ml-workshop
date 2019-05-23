// New
// - Chaining

// Variables
let attnGANImage
let im2txtCaption
let capture
let font

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
    tint(255)
    image(capture, 0, 0)
    tint(255, 100)
    if (attnGANImage)
        image(attnGANImage, capture.width, 0, capture.height, capture.height)
    tint(255)
    if (im2txtCaption)
        utils.drawText(im2txtCaption, 20, capture.height - 40, 20, font)
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
    const image = utils.captureAndEncodeCanvas(capture)
    models['im2txt'].input({ image })
}