// Variables
let poseNetPoses
let im2txtCaption
let capture
let font;

setInterval(sendImageToIm2txt, 5000);

// Preload fonts
function preload() {
    font = loadFont('../assets/akkurat_bold.ttf');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO)
    capture.hide()
};

function draw() {
    background(0)
    // image(capture, 0, 0)
    liveStream = utils.getLiveStream('http://10.10.4.129:8081')
    image(liveStream, 0, 0)

    if (im2txtCaption && poseNetPoses) {
        // drawPoses(poseNetPoses, ["leftWrist", "rightWrist"])
        if (poseNetPoses[0]) {
            const point1 = getPartPosition(poseNetPoses[0].keypoints, "leftWrist")
            const point2 = getPartPosition(poseNetPoses[0].keypoints, "rightWrist")        
            drawInteractiveText(point1, point2)            
        }
    }
};

// Draw interactive text
function drawInteractiveText(point1, point2) {
    const dx = point1.x - point2.x
    const dy = point1.y - point2.y
    const x = point2.x + dx / 2
    const y = point2.y + dy / 2
    const dist = sqrt(pow(dx, 2) + pow(dy, 2))
    const angle = atan2(dy, dx);
    const size = round(dist/10)
    const spacing = size * 1.2
    const lines = utils.splitTextToLines(im2txtCaption, round(dist/10))
    for (var i = 0; i < lines.length; i++) {
        push()
            translate(x, y + (i * spacing) - lines.length / 2 * spacing)
            rotate(angle)
            drawText(lines[i], 0, 0, size)
        pop()
    }
}

// Draw all the poses. If an array is passed as `parts` the function 
// the function will only draw the parts defined in that array
// https://github.com/tensorflow/tfjs-models/tree/master/posenet#keypoints
function drawPoses(poses, parts) {
    for (const pose of poses)
        if (pose.keypoints)
            drawPose(pose.keypoints, parts)
}

// Draw individual pose.
function drawPose(keypoints, parts) {
    for (const keypoint of keypoints)
        if (!parts || parts.includes(keypoint.part))
            circle(keypoint.position.x, keypoint.position.y, 10)
}

// Return the position { "x": x, "y": y } of a body part
// https://github.com/tensorflow/tfjs-models/tree/master/posenet#keypoints
function getPartPosition(keypoints, part) {
    for (const keypoint of keypoints)
        if (keypoint.part == part)
            return keypoint.position
}

// Draw text
function drawText(txt, x, y, size) {
    if (txt) {
        textSize(size)
        textFont(font)
        rectMode(CENTER)
        const w = textWidth(txt)
        const h = size
        fill(0, 200)
        rect(x, y, w, h)
        fill(255);
        textAlign(CENTER, CENTER)
        text(txt, x, y)
    }
}

// Function called when a key is released
function keyReleased() {
    if (keyCode === ENTER)
        sendImageToPoseNet()
}

// Send the current capture image to the model
function sendImageToPoseNet() {
    utils.captureAndEncodeLiveStream(liveStream).then(image => {
        models['poseNet'].input({ image })
    })    
    // const image = utils.captureAndEncodeCanvas(capture)    
    // models['poseNet'].input({ image })
}

// Send the current capture image to the model
function sendImageToIm2txt() {
    utils.captureAndEncodeLiveStream(liveStream).then(image => {
        models['im2txt'].input({ image })
    })        
    // const image = utils.captureAndEncodeCanvas(capture)    
    // models['im2txt'].input({ image })
}