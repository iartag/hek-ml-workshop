// Change this part
const RUNWAY_HOST = 'http://localhost'
const MASKRCNN_PORT = 3000
const models = {}

models['maskRCNN'] = new RunwayModel(`${RUNWAY_HOST}:${MASKRCNN_PORT}`)

// This function is called when we receive a new message from the model
models['maskRCNN'].output((data) => {
    maskRCNNImage = loadImage(data.output)
    console.log(`[MaskRCNN] image received`)
    sendImageToMaskRCNN()
})