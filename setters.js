var setters = {
  fovyInputElement: document.getElementById('fovy-input'),
  setFovy: function(newFovy) {
    log(`setters.setFovy(${newFovy})`);
    globals.fovy = utils.degToRad(newFovy);
    setters.fovyInputElement.value = utils.radToDeg(globals.fovy).toFixed(2);
  },
  nearInputElement: document.getElementById('near-input'),
  setNear: function(newNear) {
    log(`setters.setNear(${newNear})`);
    globals.near = newNear;
    if(globals.near > globals.far) {
      globals.near = globals.far;
    } else if(globals.near < 1) {
      globals.near = 1;
    }
    setters.nearInputElement.value = globals.near;
  },
  farInputElement: document.getElementById('far-input'),
  setFar: function(newFar) {
    log(`setters.setFar(${newFar})`);
    globals.far = newFar;
    if(globals.far > 100) {
      globals.far = 100;
    } else if(globals.far < globals.near) {
      globals.far = globals.near;
    }
    setters.farInputElement.value = globals.far;
  },
  distanceInputElement: document.getElementById('distance-input'),
  setDistance: function(newDistance) {
    log(`setters.setDistance(${newDistance})`);
    globals.distance = newDistance;
    if(globals.distance > 99) {
      globals.distance = 99;
    } else if(globals.distance < 2) {
      globals.distance = 2;
    }
    setters.distanceInputElement.value = globals.distance;
  },
  thetaInputElement: document.getElementById('theta-input'),
  setTheta: function(newTheta) {
    log(`setters.setTheta(${newTheta})`);
    globals.theta = (utils.degToRad(newTheta) + utils.degToRad(360)) % utils.degToRad(360);
    setters.thetaInputElement.value = utils.radToDeg(globals.theta).toFixed(2);
  },
  phiInputElement: document.getElementById('phi-input'),
  setPhi: function(newPhi) {
    log(`setters.setPhi(${newPhi})`);
    globals.phi = utils.degToRad(newPhi);
    if(globals.phi > utils.degToRad(90)) {
      globals.phi = utils.degToRad(90);
    } else if(globals.phi < utils.degToRad(1)) {
      globals.phi = utils.degToRad(1);
    }
    setters.phiInputElement.value = utils.radToDeg(globals.phi).toFixed(2);
  },
  targetInputElement: document.getElementById('target-input'),
  setTarget: function(newTarget) {
    log(`setters.setTarget(${JSON.stringify(newTarget)})`);
    globals.target = newTarget;
    setters.targetInputElement.value = JSON.stringify(globals.target);
  },
  viewUpInputElement: document.getElementById('view-up-input'),
  setViewUp: function(newViewUp) {
    log(`setters.setViewUp(${JSON.stringify(newViewUp)})`);
    globals.viewUp = newViewUp;
    setters.viewUpInputElement.value = JSON.stringify(globals.viewUp);
  },
  cameraInputElement: document.getElementById('camera-input'),
  setCameraPosition: function(newCameraPosition) {
    globals.cameraPosition = newCameraPosition;
    setters.cameraInputElement.value = JSON.stringify(globals.cameraPosition);
  },
  lightPositionInputElement: document.getElementById('light-position-input'),
  setLightPosition: function(newLightPosition) {
    log(`setters.setLightPosition(${newLightPosition})`);
    globals.lightPosition = newLightPosition;
    setters.lightPositionInputElement.value = JSON.stringify(globals.lightPosition);
  },
  lightColorInputElement: document.getElementById('light-color-input'),
  setLightColor: function(newLightColor) {
    log(`setters.setLightColor(${newLightColor})`);
    globals.lightColor = newLightColor;
    setters.lightColorInputElement.value = JSON.stringify(globals.lightColor);
  },
  lightAmbientInputElement: document.getElementById('light-ambient-input'),
  setLightAmbient: function(newLightAmbient) {
    log(`setters.setLightAmbient(${newLightAmbient})`);
    globals.lightAmbient = newLightAmbient;
    setters.lightAmbientInputElement.value = JSON.stringify(globals.lightAmbient);
  },
  setTextureSource: function(index, newTextureSource) {
    log(`setters.setTextureSource(${index}, ${newTextureSource})`);
    globals.textureSourceArr[index] = newTextureSource;
    document.getElementById(`${index}-texture-source-input`).value = globals.textureSourceArr[index];
    utils.loadTexture(index, globals.textureSourceArr[index]);
  },
  setIsFlat: function(itemId, newIsFlat) {
    log(`setters.setIsFlat(${itemId}, ${newIsFlat})`);
    globals.itemObj[itemId].isFlat = newIsFlat;
    document.getElementById(`${itemId}-is-flat-input`).checked = globals.itemObj[itemId].isFlat;
  },
  setMaterialEmissive: function(itemId, newMaterialEmissive) {
    log(`setters.setMaterialEmissive(${itemId}, ${newMaterialEmissive})`);
    globals.itemObj[itemId].materialEmissive = newMaterialEmissive;
    document.getElementById(`${itemId}-material-emissive-input`).value = JSON.stringify(globals.itemObj[itemId].materialEmissive);
  },
  setMaterialAmbient: function(itemId, newMaterialAmbient) {
    log(`setters.setMaterialAmbient(${itemId}, ${newMaterialAmbient})`);
    globals.itemObj[itemId].materialAmbient = newMaterialAmbient;
    document.getElementById(`${itemId}-material-ambient-input`).value = JSON.stringify(globals.itemObj[itemId].materialAmbient);
  },
  setMaterialDiffuse: function(itemId, newMaterialDiffuse) {
    log(`setters.setMaterialDiffuse(${itemId}, ${newMaterialDiffuse})`);
    globals.itemObj[itemId].materialDiffuse = newMaterialDiffuse;
    document.getElementById(`${itemId}-material-diffuse-input`).value = JSON.stringify(globals.itemObj[itemId].materialDiffuse);
  },
  setMaterialSpecular: function(itemId, newMaterialSpecular) {
    log(`setters.setMaterialSpecular(${itemId}, ${newMaterialSpecular})`);
    globals.itemObj[itemId].materialSpecular = newMaterialSpecular;
    document.getElementById(`${itemId}-material-specular-input`).value = JSON.stringify(globals.itemObj[itemId].materialSpecular);
  },
  setShininess: function(itemId, newShininess) {
    log(`setters.setShininess(${itemId}, ${newShininess})`);
    globals.itemObj[itemId].shininess = newShininess;
    document.getElementById(`${itemId}-shininess-input`).value = globals.itemObj[itemId].shininess.toFixed(2);
  },
  setOpacity: function(itemId, newOpacity) {
    log(`setters.setOpacity(${itemId}, ${newOpacity})`);
    globals.itemObj[itemId].opacity = newOpacity;
    if(globals.itemObj[itemId].opacity > 1) {
      globals.itemObj[itemId].opacity = 1;
    } else if(globals.itemObj[itemId].opacity < 0) {
      globals.itemObj[itemId].opacity = 0;
    }
    document.getElementById(`${itemId}-opacity-input`).value = globals.itemObj[itemId].opacity.toFixed(2);
  },
  setTexture: function(itemId, newTexture) {
    log(`setters.setTexture(${itemId}, ${newTexture})`);
    globals.itemObj[itemId].texture = newTexture;
    if(globals.itemObj[itemId].texture > globals.textureUnitArr.length - 1) {
      globals.itemObj[itemId].texture = globals.textureUnitArr.length - 1;
    } else if(globals.itemObj[itemId].texture < 0) {
      globals.itemObj[itemId].texture = 0;
    }
    document.getElementById(`${itemId}-texture-input`).value = globals.itemObj[itemId].texture;
  },
  setXTraslation: function(itemId, newXTraslation) {
    log(`setters.setXTraslation(${itemId}, ${newXTraslation})`);
    globals.itemObj[itemId].xTraslation = newXTraslation;
    document.getElementById(`${itemId}-x-traslation-input`).value = globals.itemObj[itemId].xTraslation.toFixed(2);
  },
  setYTraslation: function(itemId, newYTraslation) {
    log(`setters.setYTraslation(${itemId}, ${newYTraslation})`);
    globals.itemObj[itemId].yTraslation = newYTraslation;
    document.getElementById(`${itemId}-y-traslation-input`).value = globals.itemObj[itemId].yTraslation.toFixed(2);
  },
  setZTraslation: function(itemId, newZTraslation) {
    log(`setters.setZTraslation(${itemId}, ${newZTraslation})`);
    globals.itemObj[itemId].zTraslation = newZTraslation;
    document.getElementById(`${itemId}-z-traslation-input`).value = globals.itemObj[itemId].zTraslation.toFixed(2);
  },
  setYRotationAngle: function(itemId, newYRotationAngle) {
    log(`setters.setYRotationAngle(${itemId}, ${newYRotationAngle})`);
    globals.itemObj[itemId].yRotationAngle = (utils.degToRad(newYRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
    document.getElementById(`${itemId}-y-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].yRotationAngle).toFixed(2);
  },
  setZRotationAngle: function(itemId, newZRotationAngle) {
    log(`setters.setZRotationAngle(${itemId}, ${newZRotationAngle})`);
    globals.itemObj[itemId].zRotationAngle = (utils.degToRad(newZRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
    document.getElementById(`${itemId}-z-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].zRotationAngle).toFixed(2);
  },
  setXRotationAngle: function(itemId, newXRotationAngle) {
    log(`setters.setXRotationAngle(${itemId}, ${newXRotationAngle})`);
    globals.itemObj[itemId].xRotationAngle = (utils.degToRad(newXRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
    document.getElementById(`${itemId}-x-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].xRotationAngle).toFixed(2);
  }
};
