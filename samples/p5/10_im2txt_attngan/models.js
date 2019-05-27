// Change this part
const RUNWAY_HOST = 'http://localhost'
const IM2TXT_PORT = 3001
const ATTNGAN_PORT = 3000

const models = {}

models['im2txt'] = new RunwayModel(`${RUNWAY_HOST}:${IM2TXT_PORT}`)
models['attnGAN'] = new RunwayModel(`${RUNWAY_HOST}:${ATTNGAN_PORT}`)

// This function is called when we receive a new message from attnGAN model
models['attnGAN'].output((data) => {
    attnGANImage = loadImage(data.result)
    console.log('[attnGAN] Received an image')
    sendImageToIm2txt()
})

// This function is called when we receive a new message from im2txt model
models['im2txt'].output((data) => {
    im2txtCaption = data.results[0].caption
    console.log(`[im2txt] ${im2txtCaption}`)
    sendTextToAttnGAN()
})