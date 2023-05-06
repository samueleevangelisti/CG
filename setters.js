var setters = {
  fovyInputElement: document.getElementById('fovy-input'),
  setFovy: function(newFovy) {
    logUtils.debug('(setters.setFovy)', newFovy);
    globals.fovy = utils.degToRad(newFovy);
    setters.fovyInputElement.value = utils.radToDeg(globals.fovy).toFixed(2);
  },
  nearInputElement: document.getElementById('near-input'),
  setNear: function(newNear) {
    logUtils.debug('(setters.setNear)', newNear);
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
    logUtils.debug('(setters.setFar)', newFar);
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
    logUtils.debug('(setters.setDistance)', newDistance);
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
    logUtils.debug('(setters.setTheta)', newTheta);
    globals.theta = (utils.degToRad(newTheta) + utils.degToRad(360)) % utils.degToRad(360);
    setters.thetaInputElement.value = utils.radToDeg(globals.theta).toFixed(2);
  },
  phiInputElement: document.getElementById('phi-input'),
  setPhi: function(newPhi) {
    logUtils.debug('(setters.setPhi)', newPhi);
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
    logUtils.debug('(setters.setTarget)', newTarget);
    globals.target = newTarget;
    setters.targetInputElement.value = JSON.stringify(globals.target);
  },
  viewUpInputElement: document.getElementById('view-up-input'),
  setViewUp: function(newViewUp) {
    logUtils.debug('(setters.setViewUp)', newViewUp);
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
    logUtils.debug('(setters.setLightPosition)', newLightPosition);
    globals.lightPosition = newLightPosition;
    setters.lightPositionInputElement.value = JSON.stringify(globals.lightPosition);
  },
  lightColorInputElement: document.getElementById('light-color-input'),
  setLightColor: function(newLightColor) {
    logUtils.debug('(setters.setLightColor)', newLightColor);
    globals.lightColor = newLightColor;
    setters.lightColorInputElement.value = JSON.stringify(globals.lightColor);
  },
  lightAmbientInputElement: document.getElementById('light-ambient-input'),
  setLightAmbient: function(newLightAmbient) {
    logUtils.debug('(setters.setLightAmbient)', newLightAmbient);
    globals.lightAmbient = newLightAmbient;
    setters.lightAmbientInputElement.value = JSON.stringify(globals.lightAmbient);
  },
  setTextureSource: function(index, newTextureSource) {
    logUtils.debug('(setters.setTextureSource)', {
      index: index,
      newTextureSource: newTextureSource
    });
    globals.textureSourceArr[index] = newTextureSource;
    document.getElementById(`${index}-texture-source-input`).value = globals.textureSourceArr[index];
    utils.loadTexture(index, globals.textureSourceArr[index]);
  },
  setIsFlat: function(itemId, newIsFlat) {
    logUtils.debug('(setters.setIsFlat)', {
      itemId: itemId,
      newIsFlat: newIsFlat
    });
    globals.itemObj[itemId].isFlat = newIsFlat;
    document.getElementById(`${itemId}-is-flat-input`).checked = globals.itemObj[itemId].isFlat;
  },
  setMaterialEmissive: function(itemId, newMaterialEmissive) {
    logUtils.debug('(setters.setMaterialEmissive)', {
      itemId: itemId,
      newMaterialEmissive: newMaterialEmissive
    });
    globals.itemObj[itemId].materialEmissive = newMaterialEmissive;
    document.getElementById(`${itemId}-material-emissive-input`).value = JSON.stringify(globals.itemObj[itemId].materialEmissive);
  },
  setMaterialAmbient: function(itemId, newMaterialAmbient) {
    logUtils.debug('(setters.setMaterialAmbient)', {
      itemId: itemId,
      newMaterialAmbient: newMaterialAmbient
    });
    globals.itemObj[itemId].materialAmbient = newMaterialAmbient;
    document.getElementById(`${itemId}-material-ambient-input`).value = JSON.stringify(globals.itemObj[itemId].materialAmbient);
  },
  setMaterialDiffuse: function(itemId, newMaterialDiffuse) {
    logUtils.debug('(setters.setMaterialDiffuse)', {
      itemId: itemId,
      newMaterialDiffuse: newMaterialDiffuse
    });
    globals.itemObj[itemId].materialDiffuse = newMaterialDiffuse;
    document.getElementById(`${itemId}-material-diffuse-input`).value = JSON.stringify(globals.itemObj[itemId].materialDiffuse);
  },
  setMaterialSpecular: function(itemId, newMaterialSpecular) {
    logUtils.debug('(setters.setMaterialSpecular)', {
      itemId: itemId,
      newMaterialSpecular: newMaterialSpecular
    });
    globals.itemObj[itemId].materialSpecular = newMaterialSpecular;
    document.getElementById(`${itemId}-material-specular-input`).value = JSON.stringify(globals.itemObj[itemId].materialSpecular);
  },
  setShininess: function(itemId, newShininess) {
    logUtils.debug('(setters.setShininess)', {
      itemId: itemId,
      newShininess: newShininess
    });
    globals.itemObj[itemId].shininess = newShininess;
    document.getElementById(`${itemId}-shininess-input`).value = globals.itemObj[itemId].shininess.toFixed(2);
  },
  setOpacity: function(itemId, newOpacity) {
    logUtils.debug('(setters.setOpacity)', {
      itemId: itemId,
      newOpacity: newOpacity
    });
    globals.itemObj[itemId].opacity = newOpacity;
    if(globals.itemObj[itemId].opacity > 1) {
      globals.itemObj[itemId].opacity = 1;
    } else if(globals.itemObj[itemId].opacity < 0) {
      globals.itemObj[itemId].opacity = 0;
    }
    document.getElementById(`${itemId}-opacity-input`).value = globals.itemObj[itemId].opacity.toFixed(2);
  },
  setTexture: function(itemId, newTexture) {
    logUtils.debug('(setters.setTexture)', {
      itemId: itemId,
      newTexture: newTexture
    });
    globals.itemObj[itemId].texture = newTexture;
    if(globals.itemObj[itemId].texture > globals.textureUnitArr.length - 1) {
      globals.itemObj[itemId].texture = globals.textureUnitArr.length - 1;
    } else if(globals.itemObj[itemId].texture < 0) {
      globals.itemObj[itemId].texture = 0;
    }
    document.getElementById(`${itemId}-texture-input`).value = globals.itemObj[itemId].texture;
  },
  setXTraslation: function(itemId, newXTraslation) {
    logUtils.debug('(setters.setXTraslation)', {
      itemId: itemId,
      newXTraslation: newXTraslation
    });
    globals.itemObj[itemId].xTraslation = newXTraslation;
    document.getElementById(`${itemId}-x-traslation-input`).value = globals.itemObj[itemId].xTraslation.toFixed(2);
  },
  setYTraslation: function(itemId, newYTraslation) {
    logUtils.debug('(setters.setYTraslation)', {
      itemId: itemId,
      newYTraslation: newYTraslation
    });
    globals.itemObj[itemId].yTraslation = newYTraslation;
    document.getElementById(`${itemId}-y-traslation-input`).value = globals.itemObj[itemId].yTraslation.toFixed(2);
  },
  setZTraslation: function(itemId, newZTraslation) {
    logUtils.debug('(setters.setZTraslation)', {
      itemId: itemId,
      newZTraslation: newZTraslation
    });
    globals.itemObj[itemId].zTraslation = newZTraslation;
    document.getElementById(`${itemId}-z-traslation-input`).value = globals.itemObj[itemId].zTraslation.toFixed(2);
  },
  setYRotationAngle: function(itemId, newYRotationAngle) {
    logUtils.debug('(setters.setYRotationAngle)', {
      itemId: itemId,
      newYRotationAngle: newYRotationAngle
    });
    globals.itemObj[itemId].yRotationAngle = (utils.degToRad(newYRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
    document.getElementById(`${itemId}-y-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].yRotationAngle).toFixed(2);
  },
  setZRotationAngle: function(itemId, newZRotationAngle) {
    logUtils.debug('(setters.setZRotationAngle)', {
      itemId: itemId,
      newZRotationAngle: newZRotationAngle
    });
    globals.itemObj[itemId].zRotationAngle = (utils.degToRad(newZRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
    document.getElementById(`${itemId}-z-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].zRotationAngle).toFixed(2);
  },
  setXRotationAngle: function(itemId, newXRotationAngle) {
    logUtils.debug('(setters.setXRotationAngle)', {
      itemId: itemId,
      newXRotationAngle: newXRotationAngle
    });
    globals.itemObj[itemId].xRotationAngle = (utils.degToRad(newXRotationAngle) + utils.degToRad(360)) % utils.degToRad(360);
    document.getElementById(`${itemId}-x-rotation-input`).value = utils.radToDeg(globals.itemObj[itemId].xRotationAngle).toFixed(2);
  }
};
