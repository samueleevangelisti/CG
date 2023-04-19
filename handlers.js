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
    case 'lightAmbient':
      setLightAmbient(JSON.parse(event.target.value));
      break;
    case 'textureSource':
      setTextureSource(event.target.name.split('-').slice(0, -1).join('-'), event.target.value);
      break;
    case 'isFlat':
      setIsFlat(event.target.name.split('-').slice(0, -1).join('-'), event.target.checked);
      break;
    case 'materialEmissive':
      setMaterialEmissive(event.target.name.split('-').slice(0, -1).join('-'), JSON.parse(event.target.value));
      break;
    case 'materialAmbient':
      setMaterialAmbient(event.target.name.split('-').slice(0, -1).join('-'), JSON.parse(event.target.value));
      break;
    case 'materialDiffuse':
      setMaterialDiffuse(event.target.name.split('-').slice(0, -1).join('-'), JSON.parse(event.target.value));
      break;
    case 'materialSpecular':
      setMaterialSpecular(event.target.name.split('-').slice(0, -1).join('-'), JSON.parse(event.target.value));
      break;
    case 'shininess':
      setShininess(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
      break;
    case 'opacity':
      setOpacity(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
      break;
    case 'texture':
      setTexture(event.target.name.split('-').slice(0, -1).join('-'), parseInt(event.target.value));
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

var handlers = {
  deltaDistance: 0.5,
  isMouseDown: false,
  mouseDownX: 0,
  mouseDownY: 0,
  isTouchDown: false,
  touchDownX: 0,
  touchDownY: 0,
  canvasOnMouseDown: function(event) {
    event.preventDefault();
    handlers.isMouseDown = true;
    handlers.mouseDownX = event.offsetX;
    handlers.mouseDownY = event.offsetY;
  },
  canvasOnTouchStart: function(event) {
    event.preventDefault();
    handlers.isTouchDown = true;
    handlers.touchDownX = event.touches[0].clientX;
    handlers.touchDownY = event.touches[0].clientY;
  },
  canvasOnMouseMove: function(event) {
    event.preventDefault();
    if(handlers.isMouseDown) {
      setTheta(utils.radToDeg(globals.theta) - ((event.offsetX - handlers.mouseDownX) * 180 / globals.canvas.width));
      setPhi(utils.radToDeg(globals.phi) - ((event.offsetY - handlers.mouseDownY) * 180 / globals.canvas.height));
      handlers.mouseDownX = event.offsetX;
      handlers.mouseDownY = event.offsetY;
    }
  },
  canvasOnTouchMove: function(event) {
    event.preventDefault();
    if(handlers.isTouchDown) {
      setTheta(utils.radToDeg(globals.theta) - ((event.touches[0].clientX - handlers.touchDownX) * 180 / globals.canvas.width));
      setPhi(utils.radToDeg(globals.phi) - ((event.touches[0].clientY - handlers.touchDownY) * 180 / globals.canvas.height));
      handlers.touchDownX = event.touches[0].clientX;
      handlers.touchDownY = event.touches[0].clientY;
    }
  },
  canvasOnMouseUp: function(event) {
    event.preventDefault();
    handlers.isMouseDown = false;
  },
  canvasOnTouchEnd: function(event) {
    event.preventDefault();
    handlers.isTouchDown = false;
  },
  canvasOnMouseWheel: function(event) {
    event.preventDefault();
    setDistance(globals.distance + ((event.deltaY > 0 ? 1 : -1) * handlers.deltaDistance));
  }
};
