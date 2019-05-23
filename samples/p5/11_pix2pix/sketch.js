// Variables
let pix2pixImage
let colors = ['#0000FF', '#004DFF', '#00A8FF', '#00FFFF', '#A7FF46', '#FF5400', '#FF0000', '#FFFF00', '#AC0000']
let x, y, w, h

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    background('#0000AD')
}

function draw() {
    fill(colors[options.colorMode-1])
    noStroke()
    if (mouseIsPressed)
        if (options.shape === 'rect')
            rect(x,y,w,h)
        else
            ellipse(x,y,w,h)
    if (pix2pixImage)
        image(pix2pixImage, width / 2, 0, width / 2, height)
}

function keyReleased() {
    if (keyCode === ENTER)
        sendImageToPix2pix()
    else if (keyCode === UP_ARROW && options.colorMode < 9)
        options.colorMode ++
    else if (keyCode === DOWN_ARROW && options.colorMode > 0)
        options.colorMode --
    else if (key === 'e')
        options.shape = 'ellipse'
    else if (key === 'r')
        options.shape = 'rect'
    else if (keyCode === BACKSPACE)
        background('#0000AD')
}

function mousePressed() {
    x = mouseX
    y = mouseY
    w = 0
    h = 0
}

function mouseDragged() {
    w = abs(mouseX - x)
    h = abs(mouseY - y)
}

// Send the current capture image to the model
function sendImageToPix2pix() {
    let image = get(0, 0, width/2, height)
    image = image.canvas.toDataURL("image/jpeg")
    models['pix2pix'].input({ image })
}

// Resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}