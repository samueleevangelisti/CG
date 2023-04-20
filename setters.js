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
  globals.distance = newDistance;
  if(globals.distance > 99) {
    globals.distance = 99;
  } else if(globals.distance < 2) {
    globals.distance = 2;
  }
  distanceInputElement.value = globals.distance;
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

var lightColorInputElement = document.getElementById('light-color-input');

function setLightColor(newLightColor) {
  log(`setLightColor(${newLightColor})`);
  globals.lightColor = newLightColor;
  lightColorInputElement.value = JSON.stringify(globals.lightColor);
}

////////////////////////////////////////////////////////////

var lightAmbientInputElement = document.getElementById('light-ambient-input');

function setLightAmbient(newLightAmbient) {
  log(`setLightAmbient(${newLightAmbient})`);
  globals.lightAmbient = newLightAmbient;
  lightAmbientInputElement.value = JSON.stringify(globals.lightAmbient);
}

////////////////////////////////////////////////////////////

function setTextureSource(index, newTextureSource) {
  log(`setTextureSource(${index}, ${newTextureSource})`);
  globals.textureSourceArr[index] = newTextureSource;
  document.getElementById(`${index}-texture-source-input`).value = globals.textureSourceArr[index];
  utils.loadTexture(index, globals.textureSourceArr[index]);
}

////////////////////////////////////////////////////////////

function setIsFlat(itemId, newIsFlat) {
  log(`setIsFlat(${itemId}, ${newIsFlat})`);
  globals.itemObj[itemId].isFlat = newIsFlat;
  document.getElementById(`${itemId}-is-flat-input`).checked = globals.itemObj[itemId].isFlat;
}

////////////////////////////////////////////////////////////

function setMaterialEmissive(itemId, newMaterialEmissive) {
  log(`setMaterialEmissive(${itemId}, ${newMaterialEmissive})`);
  globals.itemObj[itemId].materialEmissive = newMaterialEmissive;
  document.getElementById(`${itemId}-material-emissive-input`).value = JSON.stringify(globals.itemObj[itemId].materialEmissive);
}

////////////////////////////////////////////////////////////

function setMaterialAmbient(itemId, newMaterialAmbient) {
  log(`setMaterialAmbient(${itemId}, ${newMaterialAmbient})`);
  globals.itemObj[itemId].materialAmbient = newMaterialAmbient;
  document.getElementById(`${itemId}-material-ambient-input`).value = JSON.stringify(globals.itemObj[itemId].materialAmbient);
}

////////////////////////////////////////////////////////////

function setMaterialDiffuse(itemId, newMaterialDiffuse) {
  log(`setMaterialDiffuse(${itemId}, ${newMaterialDiffuse})`);
  globals.itemObj[itemId].materialDiffuse = newMaterialDiffuse;
  document.getElementById(`${itemId}-material-diffuse-input`).value = JSON.stringify(globals.itemObj[itemId].materialDiffuse);
}

////////////////////////////////////////////////////////////

function setMaterialSpecular(itemId, newMaterialSpecular) {
  log(`setMaterialSpecular(${itemId}, ${newMaterialSpecular})`);
  globals.itemObj[itemId].materialSpecular = newMaterialSpecular;
  document.getElementById(`${itemId}-material-specular-input`).value = JSON.stringify(globals.itemObj[itemId].materialSpecular);
}

////////////////////////////////////////////////////////////

function setShininess(itemId, newShininess) {
  log(`setShininess(${itemId}, ${newShininess})`);
  globals.itemObj[itemId].shininess = newShininess;
  document.getElementById(`${itemId}-shininess-input`).value = globals.itemObj[itemId].shininess.toFixed(2);
}

////////////////////////////////////////////////////////////

function setOpacity(itemId, newOpacity) {
  log(`setOpacity(${itemId}, ${newOpacity})`);
  globals.itemObj[itemId].opacity = newOpacity;
  if(globals.itemObj[itemId].opacity > 1) {
    globals.itemObj[itemId].opacity = 1;
  } else if(globals.itemObj[itemId].opacity < 0) {
    globals.itemObj[itemId].opacity = 0;
  }
  document.getElementById(`${itemId}-opacity-input`).value = globals.itemObj[itemId].opacity.toFixed(2);
}

////////////////////////////////////////////////////////////

function setTexture(itemId, newTexture) {
  log(`setTexture(${itemId}, ${newTexture})`);
  globals.itemObj[itemId].texture = newTexture;
  if(globals.itemObj[itemId].texture > globals.textureUnitArr.length - 1) {
    globals.itemObj[itemId].texture = globals.textureUnitArr.length - 1;
  } else if(globals.itemObj[itemId].texture < 0) {
    globals.itemObj[itemId].texture = 0;
  }
  document.getElementById(`${itemId}-texture-input`).value = globals.itemObj[itemId].texture;
}

////////////////////////////////////////////////////////////

function setXTraslation(itemId, newXTraslation) {
  log(`setXTraslation(${itemId}, ${newXTraslation})`);
  globals.itemObj[itemId].xTraslation = newXTraslation;
  document.getElementById(`${itemId}-x-traslation-input`).value = globals.itemObj[itemId].xTraslation.toFixed(2);
}

////////////////////////////////////////////////////////////

function setYTraslation(itemId, newYTraslation) {
  log(`setYTraslation(${itemId}, ${newYTraslation})`);
  globals.itemObj[itemId].yTraslation = newYTraslation;
  document.getElementById(`${itemId}-y-traslation-input`).value = globals.itemObj[itemId].yTraslation.toFixed(2);
}

////////////////////////////////////////////////////////////

function setZTraslation(itemId, newZTraslation) {
  log(`setZTraslation(${itemId}, ${newZTraslation})`);
  globals.itemObj[itemId].zTraslation = newZTraslation;
  document.getElementById(`${itemId}-z-traslation-input`).value = globals.itemObj[itemId].zTraslation.toFixed(2);
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
