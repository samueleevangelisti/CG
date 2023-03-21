function globalsInputOnChange(event) {
  switch(event.target.name) {
    case 'fovy':
      setFovy(parseFloat(event.target.value));
      break;
    case 'near':
      setNear(parseFloat(event.target.value));
      break;
    case 'far':
      setFar(parseFloat(event.target.value));
      break;
    case 'distance':
      setDistance(parseFloat(event.target.value));
      break;
    case 'theta':
      setTheta(parseFloat(event.target.value));
      break;
    case 'phi':
      setPhi(parseFloat(event.target.value));
      break;
    case 'target':
      setTarget(JSON.parse(event.target.value));
      break;
    case 'viewUp':
      setViewUp(JSON.parse(event.target.value));
      break;
    case 'yRotation':
      setYRotationAngle(parseFloat(event.target.value));
      break;
    case 'zRotation':
      setZRotationAngle(parseFloat(event.target.value));
      break;
    case 'xRotation':
      setXRotationAngle(parseFloat(event.target.value));
      break;
    case 'camera':
      setCamera(JSON.parse(event.target.value));
      break;
    default:
      break;
  }
}

////////////////////////////////////////////////////////////

var deltaDistance = 0.5;
var isMouseDown = false;
var mouseDownX;
var mouseDownY;

function canvasOnMouseDown(event) {
  isMouseDown = true;
  mouseDownX = event.offsetX;
  mouseDownY = event.offsetY;
}

function canvasOnMouseMove(event) {
  if(isMouseDown) {
    setTheta(radToDeg(theta) - ((event.offsetX - mouseDownX) * 180 / canvas.width));
    setPhi(radToDeg(phi) - ((event.offsetY - mouseDownY) * 180 / canvas.height));
    mouseDownX = event.offsetX;
    mouseDownY = event.offsetY;
  }
}

function canvasOnMouseUp(event) {
  isMouseDown = false;
}

function canvasOnMouseWheel(event) {
  setDistance(distance + ((event.deltaY > 0 ? 1 : -1) * deltaDistance));
}
