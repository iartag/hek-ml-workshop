var options = {
    colorMode: 1,
    shape: 'ellipse'
}

window.onload = function() {
  var gui = new dat.GUI()
  gui.add(options, 'colorMode', 1, 9).step(1).listen()
  gui.add(options, 'shape', ['ellipse', 'rect']).listen()
}