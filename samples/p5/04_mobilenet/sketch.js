// New
// - Introduce text output

// TODO
// - Keep aspect ratio
// - Full screen
// - width / height as parameters
// - Typefaces
// - Add scaling

// Variables
let mobileNetCategory
let capture

// Setup 
function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO) // Create capture
    capture.hide()
};

// Draw loop
function draw() {
    background(0)
    image(capture, 0, 0) // Draw capture image
    drawText(mobileNetCategory) // Draw text
};

// Draw the text
function drawText(txt) {
    if (txt) {
        const h = 40
        textSize(h)
        const w = textWidth(txt)
        const p = 20
        fill(0, 150)
        noStroke()
        rectMode(CENTER)
        rect(width / 2, height / 2, w + p * 2, h + p)
        textAlign(CENTER, CENTER)
        fill(255)
        text(txt, width / 2, height / 2)
    }
}

// Function called when a key is released
function keyReleased() {
    // When ENTER is pressed
    if (keyCode === ENTER)
        sendImageTomobileNet()
}

// Send the current capture image to the model
function sendImageTomobileNet() {
    const image = utils.captureAndEncodeCanvas(capture)
    models['mobileNet'].input({ image })
}