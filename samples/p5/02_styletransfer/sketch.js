// New
// - Introduce GUI
// - Introduce key functions

// Variables
let styleTransferImage

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    background(33)
}

function draw() {
    fill(options.color)
    noStroke()
    rectMode(CENTER)
    ellipseMode(CENTER)
    if (mouseIsPressed)
        ellipse(mouseX, mouseY, options.size, options.size);
    if (styleTransferImage)
        image(styleTransferImage, width / 2, 0, width / 2, height)
}

function keyReleased() {
    if (keyCode === ENTER) {
        sendImageToStyleTransfer()
    } else if (keyCode === UP_ARROW && options.size < 50) {
        options.size ++
    } else if (keyCode === DOWN_ARROW && options.size > 0) {
        options.size --
    } else if (keyCode === BACKSPACE) {
        background(33)
    }
}

// Send the current capture image to the model
function sendImageToStyleTransfer() {
    const image = get(0, 0, width/2, height)
    const contentImage = image.canvas.toDataURL("image/jpeg")
    models['styleTransfer'].input({ contentImage })
}