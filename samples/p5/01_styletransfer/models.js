// Change this part
const RUNWAY_HOST = 'http://localhost'
const STYLETRANSFER_PORT = 3000
const models = {}

models['styleTransfer'] = new RunwayModel(`${RUNWAY_HOST}:${STYLETRANSFER_PORT}`)

// This function is called when we receive a new message from attnGAN model
models['styleTransfer'].output((data) => {
    styleTransferImage = loadImage(data.stylizedImage)
    console.log('[styleTransfer] Received an image')
    sendImageToStyleTransfer()
})