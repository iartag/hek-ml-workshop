// Change this part
const RUNWAY_HOST = 'http://localhost'
const PIX2PIX_PORT = 3000
const models = {}

models['pix2pix'] = new RunwayModel(`${RUNWAY_HOST}:${PIX2PIX_PORT}`)

// This function is called when we receive a new message from attnGAN model
models['pix2pix'].output((data) => {
    pix2pixImage = loadImage(data.image)
    console.log('[pix2pix] Received an image')
    sendImageToPix2pix()
})