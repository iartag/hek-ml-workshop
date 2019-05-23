// Change this part
const RUNWAY_HOST = 'http://localhost'
const POSENET_PORT = 3000
const IM2TXT_PORT = 3001

const models = {}

models['poseNet'] = new RunwayModel(`${RUNWAY_HOST}:${POSENET_PORT}`)
models['im2txt'] = new RunwayModel(`${RUNWAY_HOST}:${IM2TXT_PORT}`)

models['poseNet'].output((data) => {
    poseNetPoses = data.poses || null
    console.log(`[PoseNet] ${poseNetPoses.length} posers 🕺 detected`)
    sendImageToPoseNet()
})

models['im2txt'].output((data) => {
    im2txtCaption = data.results[0].caption
    console.log(`[im2txt] ${im2txtCaption}`)
    refreshLettersChain(im2txtCaption)
})