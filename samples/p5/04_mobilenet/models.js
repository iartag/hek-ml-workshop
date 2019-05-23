// Change this part
const RUNWAY_HOST = 'http://localhost'
const MOBILENET_PORT = 3000
const models = {}

models['mobileNet'] = new RunwayModel(`${RUNWAY_HOST}:${MOBILENET_PORT}`)

// This function is called when we receive a new message from the model
models['mobileNet'].output((data) => {
    mobileNetCategory = data.results[0].className || null
    console.log(`[mobileNet] ${mobileNetCategory}`)
    sendImageTomobileNet()
})