// New
// - Run models locally
// - Introducing fonts
// - Introduce util function for drawing text
// - More complex functions
// - setInterval()

// Variables
let poseNetPoses
let im2txtCaption
let capture
let lettersChain = new LettersChain("Loading...", 10, 20)
let tracker = { x: 0, y: 0 }
let font;

let im2txtInterval = setInterval(sendImageToIm2txt, 5000);

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
    // image(capture, 0, 0)
    liveStream = utils.getLiveStream('http://10.10.4.129:8081')
    image(liveStream, 0, 0)
    utils.drawText(im2txtCaption, 20, height - 40, 20, font)    
    if (poseNetPoses && poseNetPoses[0]) {
        tracker = getPartPosition(poseNetPoses[0].keypoints, "nose")
        drawPoses(poseNetPoses, ["nose"])
    }
    lettersChain.draw(tracker.x, tracker.y);
};

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

function refreshLettersChain(txt) {
    if (lettersChain)
        lettersChain.update(txt)
    else
        lettersChain = new LettersChain(txt, 10, 20)
}