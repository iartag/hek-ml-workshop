// Ideas
// - Use the image color to draw the vehicles
// - Make a flappy-bird like game :P

// Variables
let poseNetPoses
let im2txtCaption
let capture
let font;
var vehicles = [];
let liveStream

// We send the image to im2txt every 5 seconds
let im2txtInterval = setInterval(sendImageToIm2txt, 20000);

// Preload fonts
function preload() {
    font = loadFont('../assets/botanika_heavy.otf');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO)
    capture.hide()
};

function draw() {
    background(0)
    liveStream = utils.getLiveStream('http://10.10.4.129:8081')
    image(liveStream, 0, 0)
    if (im2txtCaption && poseNetPoses) {
        drawPoses(poseNetPoses, ["rightWrist"])        
        const point1 = getPartPosition(poseNetPoses[0].keypoints, "rightWrist")
        drawInteractiveText(point1)
    }
};

// Draw interactive text
function drawInteractiveText(point1) {
    for (let i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors(point1);
        v.update();
        v.show();
    }    
}

function createTextPoints(txt) {
   const lines = splitTextToLines(txt, 15)
   let points = []
   vehicles = []
   for (let i = 0; i < lines.length; i++) {
        const txtPoints = font.textToPoints(lines[i], 10, 100+100*i, 100, { sampleFactor: 0.2 })
        points = points.concat(txtPoints)
   }
   for (let i = 0; i < points.length; i++) {
       let pt = points[i];
       let vehicle = new Vehicle(pt.x, pt.y);
       vehicles.push(vehicle);
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

function splitTextToLines(txt, maxChars) {
    const words = txt.split(' ')
    let letterCounter = 0
    let line = ""
    let lines = []
    for (var i = 0; i < words.length; i++) {
        let word = words[i]
        letterCounter += word.length + 1
        line += word + " "
        if (line.length >= maxChars || i == words.length - 1) {
            lines.push(line)
            line = ""
        }
    }
    return lines
}

// Function called when a key is released
function keyReleased() {
    // if ENTER is pressed
    if (keyCode === ENTER)
        sendImageToPoseNet()
}

// Send the current capture image to the model
function sendImageToPoseNet() {
    // const image = utils.captureAndEncodeCanvas(capture)
    // models['poseNet'].input({ image })
    utils.captureAndEncodeLiveStream(liveStream).then(image => {
        models['im2txt'].input({ image })
    })

}

// Send the current capture image to the model
function sendImageToIm2txt() {
    // const image = utils.captureAndEncodeCanvas(capture)
    // models['im2txt'].input({ image })
    utils.captureAndEncodeLiveStream(liveStream).then(image => {
        models['im2txt'].input({ image })
    })

}