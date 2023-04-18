function globalsInputOnChange(event) {
  switch(event.target.name.split('-').slice(-1).join('-')) {
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
    case 'camera':
      setCameraPosition(JSON.parse(event.target.value));
      break;
    case 'lightPosition':
      setLightPosition(JSON.parse(event.target.value));
      break;
    case 'lightColor':
      setLightColor(JSON.parse(event.target.value));
      break;
    case 'materialEmissive':
      setMaterialEmissive(JSON.parse(event.target.value));
      break;
    case 'materialAmbient':
      setMaterialAmbient(JSON.parse(event.target.value));
      break;
    case 'lightAmbient':
      setLightAmbient(JSON.parse(event.target.value));
      break;
    case 'materialDiffuse':
      setMaterialDiffuse(JSON.parse(event.target.value));
      break;
    case 'materialSpecular':
      setMaterialSpecular(JSON.parse(event.target.value));
      break;
    case 'shininess':
      setShininess(parseFloat(event.target.value));
      break;
    case 'opacity':
      setOpacity(parseFloat(event.target.value));
      break;
    case 'yRotation':
      setYRotationAngle(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
      break;
    case 'zRotation':
      setZRotationAngle(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
      break;
    case 'xRotation':
      setXRotationAngle(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
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
  event.preventDefault();
  isMouseDown = true;
  mouseDownX = event.offsetX;
  mouseDownY = event.offsetY;
}

function canvasOnMouseMove(event) {
  event.preventDefault();
  if(isMouseDown) {
    setTheta(utils.radToDeg(globals.theta) - ((event.offsetX - mouseDownX) * 180 / globals.canvas.width));
    setPhi(utils.radToDeg(globals.phi) - ((event.offsetY - mouseDownY) * 180 / globals.canvas.height));
    mouseDownX = event.offsetX;
    mouseDownY = event.offsetY;
  }
}

function canvasOnMouseUp(event) {
  event.preventDefault();
  isMouseDown = false;
}

function canvasOnMouseWheel(event) {
  event.preventDefault();
  setDistance(distance + ((event.deltaY > 0 ? 1 : -1) * deltaDistance));
}

// TODO DSE bisogna anche gestire le gesture del touch dei dispositivi mobili
