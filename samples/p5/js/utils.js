const utils = {

    // Draw text
    drawText(txt, x, y, size, font) {
        if (txt) {
            if (size)
                textSize(size)
            if (font)
                textFont(font)
            const w = textWidth(txt)
            const h = size
            const p = size / 10
            fill(0, 220)
            rect(x - p * 2, y - p, w + p * 4, h + p * 2)
            fill(255);
            textAlign(LEFT, TOP)
            text(txt, x, y)
        }
    },

    // Capture and encode canvas
    captureAndEncodeCanvas(capture) {
        tint(255)
        const w = capture.width
        const h = capture.height
        let image = capture.get(0, 0, w, h)
        image.resize(w, h)
        return image.canvas.toDataURL("image/jpeg")
    },

    // Split a text into lines ox maxChars length
    splitTextToLines(txt, maxChars) {
        const words = txt.split(' ')
        let letterCounter = 0
        let line = ""
        let lines = []
        for (var i = 0; i < words.length; i++) {
            const word = words[i]
            letterCounter += word.length + 1
            line += word + " "
            if (line.length >= maxChars || i == words.length - 1) {
                lines.push(line)
                line = ""
            }
        }
        return lines
    },

    // Get livestream
    getLiveStream(url) {
        if (!document.getElementById('liveStream')) {
            let livestream = document.createElement('img')
            livestream.id = 'liveStream'
            livestream.src = url
            livestream.crossOrigin = "anonymous"
            document.querySelector('body').appendChild(livestream)
        }
        const liveStream = select('#liveStream')
        if (liveStream)
            return liveStream
    },

    // Capture and encode live stream
    captureAndEncodeLiveStream(liveStream) {
        const url = liveStream.elt.src + "0/current"
        return fetch(url)
            .then(response => {
                return response.blob();
            })
            .then(blob => {
                return getImage(URL.createObjectURL(blob))
            })
            .then(img => {
                return dataUrlFromImage(img)
            })
    }

}

function getImage(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image()
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function() {
            reject(img)
        }
        img.src = url
    })
}

function dataUrlFromImage(img) {
    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0) 
    return canvas.toDataURL("image/jpeg")
}