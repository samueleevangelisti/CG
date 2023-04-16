var fovyInputElement = document.getElementById('fovy-input');

function setFovy(newFovy) {
  log(`setFovy(${newFovy})`);
  globals.fovy = utils.degToRad(newFovy);
  fovyInputElement.value = utils.radToDeg(globals.fovy).toFixed(2);
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
  globals.theta = (utils.degToRad(newTheta) + utils.degToRad(360)) % utils.degToRad(360);
  thetaInputElement.value = utils.radToDeg(globals.theta).toFixed(2);
}

////////////////////////////////////////////////////////////

var phiInputElement =  document.getElementById('phi-input');

function setPhi(newPhi) {
  log(`setPhi(${newPhi})`);
  globals.phi = utils.degToRad(newPhi);
  if(globals.phi > utils.degToRad(90)) {
    globals.phi = utils.degToRad(90);
  } else if(globals.phi < utils.degToRad(1)) {
    globals.phi = utils.degToRad(1);
  }
  phiInputElement.value = utils.radToDeg(globals.phi).toFixed(2);
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
  log(`setLightPosition(${newLightPosition})`);
  globals.lightPosition = newLightPosition;
  lightPositionInputElement.value = JSON.stringify(globals.lightPosition);
}

////////////////////////////////////////////////////////////

var materialAmbientInputElement = document.getElementById('material-ambient-input');

function setMaterialAmbient(newMaterialAmbient) {
  log(`setMaterialAmbient(${newMaterialAmbient})`);
  globals.materialAmbient = newMaterialAmbient;
  materialAmbientInputElement.value = JSON.stringify(globals.materialAmbient);
}

////////////////////////////////////////////////////////////

var lightAmbientInputElement = document.getElementById('light-ambient-input');

function setLightAmbient(newLightAmbient) {
  log(`setLightAmbient(${newLightAmbient})`);
  globals.lightAmbient = newLightAmbient;
  lightAmbientInputElement.value = JSON.stringify(globals.lightAmbient);
}

////////////////////////////////////////////////////////////

var materialDiffuseInputElement = document.getElementById('material-diffuse-input');

function setMaterialDiffuse(newMaterialDiffuse) {
  log(`setMaterialDiffuse(${newMaterialDiffuse})`);
  globals.materialDiffuse = newMaterialDiffuse;
  materialDiffuseInputElement.value = JSON.stringify(globals.materialDiffuse);
}

////////////////////////////////////////////////////////////

var materialSpecularInputElement = document.getElementById('material-specular-input');

function setMaterialSpecular(newMaterialSpecular) {
  log(`setMaterialSpecular(${newMaterialSpecular})`);
  globals.materialSpecular = newMaterialSpecular;
  materialSpecularInputElement.value = JSON.stringify(globals.materialSpecular);
}

////////////////////////////////////////////////////////////

var lightSpecularInputElement = document.getElementById('light-specular-input');

function setLightSpecular(newLightSpecular) {
  log(`setLightSpecular(${newLightSpecular})`);
  globals.lightSpecular = newLightSpecular;
  lightSpecularInputElement.value = JSON.stringify(globals.lightSpecular);
}

////////////////////////////////////////////////////////////

var shininessInputElement = document.getElementById('shininess-input');

function setShininess(newShininess) {
  log(`setShininess(${newShininess})`);
  globals.shininess = newShininess;
  shininessInputElement.value = globals.shininess;
}

////////////////////////////////////////////////////////////

function setYRotationAngle(itemId, newYRotationAngle) {
  log(`setYRotationAngle(${itemId}, ${newYRotationAngle})`);
  globals.itemObj[itemId].yRotationAngle = (utils.degToRad(newYRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
  document.getElementById(`${itemId}-y-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].yRotationAngle).toFixed(2);
}

////////////////////////////////////////////////////////////

function setZRotationAngle(itemId, newZRotationAngle) {
  log(`setZRotationAngle(${itemId}, ${newZRotationAngle})`);
  globals.itemObj[itemId].zRotationAngle = (utils.degToRad(newZRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
  document.getElementById(`${itemId}-z-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].zRotationAngle).toFixed(2);
}

////////////////////////////////////////////////////////////

function setXRotationAngle(itemId, newXRotationAngle) {
  log(`setXRotationAngle(${itemId}, ${newXRotationAngle})`);
  globals.itemObj[itemId].xRotationAngle = (utils.degToRad(newXRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
  document.getElementById(`${itemId}-x-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].xRotationAngle).toFixed(2);
}
