// Change this part
const RUNWAY_HOST = 'http://localhost'
const PIX2PIX_PORT = 3000
const FACELANDMARKS_PORT = 3001
const models = {}

models['pix2pix'] = new RunwayModel(`${RUNWAY_HOST}:${PIX2PIX_PORT}`)
models['faceLandmarks'] = new RunwayModel(`${RUNWAY_HOST}:${FACELANDMARKS_PORT}`)

models['pix2pix'].output((data) => {
    pix2pixImage = loadImage(data.image)
    console.log('[pix2pix] Received an image')
    sendImageToPix2pix()
})

models['faceLandmarks'].output((data) => {
    faceLandmarks = data.landmarks
    console.log('[faceLandmarks] 🤡 Received some coordinate')
    sendImageToFaceLandmarks()
})