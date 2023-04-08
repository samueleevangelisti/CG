var fovyInputElement = document.getElementById('fovy-input');

function setFovy(newFovy) {
  log(`setFovy(${newFovy})`);
  globals.fovy = degToRad(newFovy);
  fovyInputElement.value = radToDeg(globals.fovy).toFixed(2);
}

////////////////////////////////////////////////////////////

var nearInputElement = document.getElementById('near-input');

function setNear(newNear) {
  log(`setNear(${newNear})`);
  globals.near = newNear;
  if(globals.near > globals.far) {
    globals.near = globals.far;
  } else if(globals.near < 1) {
    globals.near = 1;
  }
  nearInputElement.value = globals.near;
}

////////////////////////////////////////////////////////////

var farInputElement = document.getElementById('far-input');

function setFar(newFar) {
  log(`setFar(${newFar})`);
  globals.far = newFar;
  if(globals.far > 100) {
    globals.far = 100;
  } else if(globals.far < globals.near) {
    globals.far = globals.near;
  }
  farInputElement.value = globals.far;
}

////////////////////////////////////////////////////////////

var distanceInputElement = document.getElementById('distance-input');

function setDistance(newDistance) {
  log(`setDistance(${newDistance})`);
  distance = newDistance;
  if(distance > 99) {
    distance = 99;
  } else if(distance < 2) {
    distance = 2;
  }
  distanceInputElement.value = distance;
}

////////////////////////////////////////////////////////////

var thetaInputElement =  document.getElementById('theta-input');

function setTheta(newTheta) {
  log(`setTheta(${newTheta})`);
  globals.theta = (degToRad(newTheta) + degToRad(360)) % degToRad(360);
  thetaInputElement.value = radToDeg(globals.theta).toFixed(2);
}

////////////////////////////////////////////////////////////

var phiInputElement =  document.getElementById('phi-input');

function setPhi(newPhi) {
  log(`setPhi(${newPhi})`);
  globals.phi = degToRad(newPhi);
  if(globals.phi > degToRad(90)) {
    globals.phi = degToRad(90);
  } else if(globals.phi < degToRad(1)) {
    globals.phi = degToRad(1);
  }
  phiInputElement.value = radToDeg(globals.phi).toFixed(2);
}

////////////////////////////////////////////////////////////

var targetInputElement = document.getElementById('target-input');

function setTarget(newTarget) {
  log(`setTarget(${JSON.stringify(newTarget)})`);
  globals.target = newTarget;
  targetInputElement.value = JSON.stringify(globals.target);
}

////////////////////////////////////////////////////////////

var viewUpInputElement = document.getElementById('view-up-input');

function setViewUp(newViewUp) {
  log(`setViewUp(${JSON.stringify(newViewUp)})`);
  globals.viewUp = newViewUp;
  viewUpInputElement.value = JSON.stringify(globals.viewUp);
}

////////////////////////////////////////////////////////////

var cameraInputElement = document.getElementById('camera-input');

function setCameraPosition(newCameraPosition) {
  globals.cameraPosition = newCameraPosition;
  cameraInputElement.value = JSON.stringify(globals.cameraPosition);
}

////////////////////////////////////////////////////////////

var lightPositionInputElement = document.getElementById('light-position-input');

function setLightPosition(newLightPosition) {
  globals.lightPosition = newLightPosition;
  lightPositionInputElement.value = JSON.stringify(globals.lightPosition);
}

////////////////////////////////////////////////////////////

var materialAmbientInputElement = document.getElementById('material-ambient-input');

function setMaterialAmbient(newMaterialAmbient) {
  globals.materialAmbient = newMaterialAmbient;
  materialAmbientInputElement.value = JSON.stringify(globals.materialAmbient);
}

////////////////////////////////////////////////////////////

var lightAmbientInputElement = document.getElementById('light-ambient-input');

function setLightAmbient(newLightAmbient) {
  lightAmbient = newLightAmbient;
  lightAmbientInputElement.value = JSON.stringify(lightAmbient);
}

////////////////////////////////////////////////////////////

function setYRotationAngle(itemId, newYRotationAngle) {
  log(`setYRotationAngle(${itemId}, ${newYRotationAngle})`);
  globals.itemObj[itemId].yRotationAngle = (degToRad(newYRotationAngle) + degToRad(360)) % degToRad(360);
  document.getElementById(`${itemId}-y-rotation-input`).value = radToDeg(globals.itemObj[itemId].yRotationAngle).toFixed(2);
}

////////////////////////////////////////////////////////////

function setZRotationAngle(itemId, newZRotationAngle) {
  log(`setZRotationAngle(${itemId}, ${newZRotationAngle})`);
  globals.itemObj[itemId].zRotationAngle = (degToRad(newZRotationAngle) + degToRad(360)) % degToRad(360);
  document.getElementById(`${itemId}-z-rotation-input`).value = radToDeg(globals.itemObj[itemId].zRotationAngle).toFixed(2);
}

////////////////////////////////////////////////////////////

function setXRotationAngle(itemId, newXRotationAngle) {
  log(`setXRotationAngle(${itemId}, ${newXRotationAngle})`);
  globals.itemObj[itemId].xRotationAngle = (degToRad(newXRotationAngle) + degToRad(360)) % degToRad(360);
  document.getElementById(`${itemId}-x-rotation-input`).value = radToDeg(globals.itemObj[itemId].xRotationAngle).toFixed(2);
}
