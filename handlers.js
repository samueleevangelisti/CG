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
      setters.setTheta(utils.radToDeg(globals.theta) - ((event.offsetX - handlers.mouseDownX) * 180 / globals.canvas.width));
      setters.setPhi(utils.radToDeg(globals.phi) - ((event.offsetY - handlers.mouseDownY) * 180 / globals.canvas.height));
      handlers.mouseDownX = event.offsetX;
      handlers.mouseDownY = event.offsetY;
    }
  },
  canvasOnTouchMove: function(event) {
    event.preventDefault();
    if(handlers.isTouchDown) {
      setters.setTheta(utils.radToDeg(globals.theta) - ((event.touches[0].clientX - handlers.touchDownX) * 180 / globals.canvas.width));
      setters.setPhi(utils.radToDeg(globals.phi) - ((event.touches[0].clientY - handlers.touchDownY) * 180 / globals.canvas.height));
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
    setters.setDistance(globals.distance + ((event.deltaY > 0 ? 1 : -1) * handlers.deltaDistance));
  },
  globalsInputOnChange: function(event) {
    switch(event.target.name.split('-').slice(-1).join('-')) {
      case 'fovy':
        setters.setFovy(parseFloat(event.target.value));
        break;
      case 'near':
        setters.setNear(parseFloat(event.target.value));
        break;
      case 'far':
        setters.setFar(parseFloat(event.target.value));
        break;
      case 'distance':
        setters.setDistance(parseFloat(event.target.value));
        break;
      case 'theta':
        setters.setTheta(parseFloat(event.target.value));
        break;
      case 'phi':
        setters.setPhi(parseFloat(event.target.value));
        break;
      case 'target':
        setters.setTarget(JSON.parse(event.target.value));
        break;
      case 'viewUp':
        setters.setViewUp(JSON.parse(event.target.value));
        break;
      case 'camera':
        setters.setCameraPosition(JSON.parse(event.target.value));
        break;
      case 'lightPosition':
        setters.setLightPosition(JSON.parse(event.target.value));
        break;
      case 'lightColor':
        setters.setLightColor(JSON.parse(event.target.value));
        break;
      case 'lightAmbient':
        setters.setLightAmbient(JSON.parse(event.target.value));
        break;
      case 'textureSource':
        setters.setTextureSource(event.target.name.split('-').slice(0, -1).join('-'), event.target.value);
        break;
      case 'isFlat':
        setters.setIsFlat(event.target.name.split('-').slice(0, -1).join('-'), event.target.checked);
        break;
      case 'materialEmissive':
        setters.setMaterialEmissive(event.target.name.split('-').slice(0, -1).join('-'), JSON.parse(event.target.value));
        break;
      case 'materialAmbient':
        setters.setMaterialAmbient(event.target.name.split('-').slice(0, -1).join('-'), JSON.parse(event.target.value));
        break;
      case 'materialDiffuse':
        setters.setMaterialDiffuse(event.target.name.split('-').slice(0, -1).join('-'), JSON.parse(event.target.value));
        break;
      case 'materialSpecular':
        setters.setMaterialSpecular(event.target.name.split('-').slice(0, -1).join('-'), JSON.parse(event.target.value));
        break;
      case 'shininess':
        setters.setShininess(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
        break;
      case 'opacity':
        setters.setOpacity(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
        break;
      case 'texture':
        setters.setTexture(event.target.name.split('-').slice(0, -1).join('-'), parseInt(event.target.value));
        break;
      case 'xTraslation':
        setters.setXTraslation(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
        break;
      case 'yTraslation':
        setters.setYTraslation(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
        break;
      case 'zTraslation':
        setters.setZTraslation(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
        break;
      case 'yRotation':
        setters.setYRotationAngle(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
        break;
      case 'zRotation':
        setters.setZRotationAngle(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
        break;
      case 'xRotation':
        setters.setXRotationAngle(event.target.name.split('-').slice(0, -1).join('-'), parseFloat(event.target.value));
        break;
      default:
        break;
    }
  }
};
