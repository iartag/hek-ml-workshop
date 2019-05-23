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
    tint(255,0)
    image(capture, 0, 0)
    tint(255)
    if (pix2pixImage)
        image(pix2pixImage, width / 2, 0, width / 2, height)
    if (faceLandmarks){
        // drawFace(faceLandmarks)
        drawSquareFace(faceLandmarks)
    }
}

function keyReleased() {
    if (keyCode === ENTER) {
        sendImageToFaceLandmarks()
        sendImageToPix2pix()
    }
}

function drawFace(landmarks, parts) {
    noFill()
    for (const key in landmarks) {
        const landmark = landmarks[key]
        for (const feature in landmark)
            if (!parts || parts.includes(feature)) {
                beginShape()
                for (const point of landmark[feature])
                    vertex(point[0], point[1])
                endShape()                
            }
    }
}

function drawSquareFace(landmarks) {
    noStroke()
    for (const key in landmarks) {
        const l = landmarks[key]
        let x, y, w, h
        // // Face contour
        // fill(colors[1])
        // x = l.chin[0][0]
        // y = l.chin[0][1]
        // w = (l.chin[16][0] - l.chin[0][0]) * 1.2
        // h = (l.chin[8][1] - l.chin[0][1]) * 1.2
        // rect(x, y, w, h)        
        // left eye square 1
        fill(colors[1])
        x = l.left_eyebrow[0][0]
        y = l.left_eyebrow[2][1]
        w = (l.left_eyebrow[4][0] - l.left_eyebrow[0][0]) * 1.2
        h = (l.left_eye[4][1] - l.left_eyebrow[2][1]) * 1.8
        rect(x, y, w, h)
        // right eye square 1
        x = l.right_eyebrow[0][0]
        y = l.right_eyebrow[2][1]
        w = (l.right_eyebrow[4][0] - l.right_eyebrow[0][0]) * 1.2
        h = (l.right_eye[4][1] - l.right_eyebrow[2][1]) * 1.8
        rect(x, y, w, h)
        // left eye square 2
        fill(colors[3])
        x = l.left_eye[0][0]
        y = l.left_eye[2][1]
        w = (l.left_eye[3][0] - l.left_eye[0][0]) 
        h = (l.left_eye[4][1] - l.left_eye[2][1]) * 1.8
        rect(x, y, w, h)
        // right eye square 2
        fill(colors[3])
        x = l.right_eye[0][0]
        y = l.right_eye[2][1]
        w = (l.right_eye[3][0] - l.right_eye[0][0])
        h = (l.right_eye[4][1] - l.right_eye[2][1]) * 1.8
        rect(x, y, w, h)
        // nose
        fill(colors[5])
        x = l.nose_tip[0][0]
        y = l.nose_bridge[2][1]
        w = (l.nose_tip[4][0] - l.nose_tip[0][0])
        h = (l.nose_tip[2][1] - l.nose_bridge[0][1])
        rect(x, y, w, h)
        // Mouth 1
        fill(colors[6])
        x = l.top_lip[0][0]
        y = l.top_lip[2][1]
        w = (l.top_lip[6][0] - l.top_lip[0][0]) * 1.2
        h = (l.bottom_lip[3][1] - l.top_lip[2][1]) * 1.2
        rect(x, y, w, h)
        // Mouth 2
        fill(colors[7])
        x = l.top_lip[2][0]
        y = l.top_lip[9][1]
        w = (l.top_lip[7][0] - l.top_lip[10][0]) * 1.2
        h = (l.bottom_lip[9][1] - l.top_lip[9][1]) * 1.2
        rect(x, y, w, h)
    }
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