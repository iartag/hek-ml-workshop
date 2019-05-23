var options = {
    color: [0, 255, 122],
    size: 10,
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.addColor(options, 'color')
  gui.add(options, 'size').min(1).max(50).step(1).listen();
};