var options = {
    thresholdLevel: 0.5
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(options, 'thresholdLevel', 0, 1).step(0.01);
};