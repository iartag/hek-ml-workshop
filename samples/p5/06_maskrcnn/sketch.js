// Example using MaskRCMNN
// NOT WORKING - MaskRCNN model seems very unstable

// Variables
let maskRCNNImage
let capture

// Setup 
function setup() {
    // Create the canvas
    canvas = createCanvas(windowWidth, windowHeight)
    // Create capture
    capture = createCapture(VIDEO)
    capture.hide()
};

// Draw loop
function draw() {
    background(0)
    // Draw capture image
    image(capture, 0, 0)
    // Draw mask
    if (maskRCNNImage)
        image(maskRCNNImage, 10, 10, 320, 240)
};

// Function called when a key is released
function keyReleased() {
    if (keyCode === ENTER) {
        sendImageToMaskRCNN()        
    }
}

// Send the current capture image to the model
function sendImageToMaskRCNN() {
    const image = utils.captureAndEncodeCanvas(capture)
    models['maskRCNN'].input({ image, category: "person" })
}