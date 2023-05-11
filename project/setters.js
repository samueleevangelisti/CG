var setters = {
  fovyInputElement: document.getElementById('fovy-input'),
  setFovy: function(newFovy) {
    logUtils.debug('(setters.setFovy)', newFovy);
    newFovy = utils.fixFloat(newFovy);
    if(newFovy > 179) {
      newFovy = 179;
    } else if(newFovy < 1) {
      newFovy = 1;
    }
    globals.fovy = utils.degToRad(newFovy);
    setters.fovyInputElement.value = newFovy;
  },
  nearInputElement: document.getElementById('near-input'),
  setNear: function(newNear) {
    logUtils.debug('(setters.setNear)', newNear);
    newNear = utils.fixFloat(newNear);
    if(newNear > globals.far) {
      newNear = globals.far;
    } else if(newNear < 1) {
      newNear = 1;
    }
    globals.near = newNear;
    setters.nearInputElement.value = newNear;
  },
  farInputElement: document.getElementById('far-input'),
  setFar: function(newFar) {
    logUtils.debug('(setters.setFar)', newFar);
    newFar = utils.fixFloat(newFar);
    if(newFar > 100) {
      newFar = 100;
    } else if(newFar < globals.near) {
      newFar = globals.near;
    }
    globals.far = newFar;
    setters.farInputElement.value = newFar;
  },
  distanceInputElement: document.getElementById('distance-input'),
  setDistance: function(newDistance) {
    logUtils.debug('(setters.setDistance)', newDistance);
    newDistance = utils.fixFloat(newDistance);
    if(newDistance > 99) {
      newDistance = 99;
    } else if(newDistance < 2) {
      newDistance = 2;
    }
    globals.distance = newDistance;
    setters.distanceInputElement.value = newDistance;
  },
  thetaInputElement: document.getElementById('theta-input'),
  setTheta: function(newTheta) {
    logUtils.debug('(setters.setTheta)', newTheta);
    newTheta = utils.fixFloat((utils.fixFloat(newTheta) + 360) % 360);
    globals.theta = utils.degToRad(newTheta);
    setters.thetaInputElement.value = newTheta;
  },
  phiInputElement: document.getElementById('phi-input'),
  setPhi: function(newPhi) {
    logUtils.debug('(setters.setPhi)', newPhi);
    newPhi = utils.fixFloat(newPhi);
    if(newPhi > 90) {
      newPhi = 90;
    } else if(newPhi < 1) {
      newPhi = 1;
    }
    globals.phi = utils.degToRad(newPhi);
    setters.phiInputElement.value = newPhi;
  },
  targetSpanElement: document.getElementById('target-span'),
  setTarget: function(newTarget) {
    logUtils.debug('(setters.setTarget)', newTarget);
    globals.target = newTarget;
    setters.targetSpanElement.innerHTML = JSON.stringify(newTarget.map((e) => {
      return utils.fixFloat(e);
    }));
  },
  viewUpSpanElement: document.getElementById('view-up-span'),
  setViewUp: function(newViewUp) {
    logUtils.debug('(setters.setViewUp)', newViewUp);
    globals.viewUp = newViewUp;
    setters.viewUpSpanElement.innerHTML = JSON.stringify(newViewUp.map((e) => {
      return utils.fixFloat(e);
    }));
  },
  cameraSpanElement: document.getElementById('camera-span'),
  setCameraPosition: function(newCameraPosition) {
    globals.cameraPosition = newCameraPosition;
    setters.cameraSpanElement.innerHTML = JSON.stringify(newCameraPosition.map((e) => {
      return utils.fixFloat(e);
    }));
  },
  lightPositionInputElement: document.getElementById('light-position-input'),
  setLightPosition: function(newLightPosition) {
    logUtils.debug('(setters.setLightPosition)', newLightPosition);
    newLightPosition = newLightPosition.map((e) => {
      return utils.fixFloat(e);
    });
    globals.lightPosition = newLightPosition;
    setters.lightPositionInputElement.value = JSON.stringify(newLightPosition);
  },
  lightColorInputElement: document.getElementById('light-color-input'),
  setLightColor: function(newLightColor) {
    logUtils.debug('(setters.setLightColor)', newLightColor);
    newLightColor = newLightColor.map((e) => {
      e = utils.fixFloat(e);
      if(e > 1) {
        e = 1;
      } else if(e < 0) {
        e = 0;
      }
      return e;
    });
    globals.lightColor = newLightColor;
    setters.lightColorInputElement.value = JSON.stringify(newLightColor);
  },
  lightAmbientInputElement: document.getElementById('light-ambient-input'),
  setLightAmbient: function(newLightAmbient) {
    logUtils.debug('(setters.setLightAmbient)', newLightAmbient);
    newLightAmbient = utils.fixFloat(newLightAmbient);
    if(newLightAmbient > 100) {
      newLightAmbient = 100;
    } else if(newLightAmbient < 0) {
      newLightAmbient = 0;
    }
    globals.lightAmbient = newLightAmbient;
    setters.lightAmbientInputElement.value = newLightAmbient;
  },
  setTextureSource: function(index, newTextureSource) {
    logUtils.debug('(setters.setTextureSource)', {
      index: index,
      newTextureSource: newTextureSource
    });
    globals.textureSourceArr[index] = newTextureSource;
    document.getElementById(`${index}-texture-source-input`).value = newTextureSource;
    utils.loadTexture(index, newTextureSource);
  },
  setIsFlat: function(itemId, newIsFlat) {
    logUtils.debug('(setters.setIsFlat)', {
      itemId: itemId,
      newIsFlat: newIsFlat
    });
    globals.itemObj[itemId].isFlat = newIsFlat;
    document.getElementById(`${itemId}-is-flat-input`).checked = newIsFlat;
  },
  setMaterialEmissive: function(itemId, newMaterialEmissive) {
    logUtils.debug('(setters.setMaterialEmissive)', {
      itemId: itemId,
      newMaterialEmissive: newMaterialEmissive
    });
    newMaterialEmissive = newMaterialEmissive.map((e) => {
      e = utils.fixFloat(e);
      if(e > 1) {
        e = 1;
      } else if(e < 0) {
        e = 0;
      }
      return e;
    });
    globals.itemObj[itemId].materialEmissive = newMaterialEmissive;
    document.getElementById(`${itemId}-material-emissive-input`).value = JSON.stringify(newMaterialEmissive);
  },
  setMaterialAmbient: function(itemId, newMaterialAmbient) {
    logUtils.debug('(setters.setMaterialAmbient)', {
      itemId: itemId,
      newMaterialAmbient: newMaterialAmbient
    });
    newMaterialAmbient = newMaterialAmbient.map((e) => {
      e = utils.fixFloat(e);
      if(e > 1) {
        e = 1;
      } else if(e < 0) {
        e = 0;
      }
      return e;
    });
    globals.itemObj[itemId].materialAmbient = newMaterialAmbient;
    document.getElementById(`${itemId}-material-ambient-input`).value = JSON.stringify(newMaterialAmbient);
  },
  setMaterialDiffuse: function(itemId, newMaterialDiffuse) {
    logUtils.debug('(setters.setMaterialDiffuse)', {
      itemId: itemId,
      newMaterialDiffuse: newMaterialDiffuse
    });
    newMaterialDiffuse = newMaterialDiffuse.map((e) => {
      e = utils.fixFloat(e);
      if(e > 1) {
        e = 1;
      } else if(e < 0) {
        e = 0;
      }
      return e;
    });
    globals.itemObj[itemId].materialDiffuse = newMaterialDiffuse;
    document.getElementById(`${itemId}-material-diffuse-input`).value = JSON.stringify(newMaterialDiffuse);
  },
  setMaterialSpecular: function(itemId, newMaterialSpecular) {
    logUtils.debug('(setters.setMaterialSpecular)', {
      itemId: itemId,
      newMaterialSpecular: newMaterialSpecular
    });
    newMaterialSpecular = newMaterialSpecular.map((e) => {
      e = utils.fixFloat(e);
      if(e > 1) {
        e = 1;
      } else if(e < 0) {
        e = 0;
      }
      return e;
    });
    globals.itemObj[itemId].materialSpecular = newMaterialSpecular;
    document.getElementById(`${itemId}-material-specular-input`).value = JSON.stringify(newMaterialSpecular);
  },
  setShininess: function(itemId, newShininess) {
    logUtils.debug('(setters.setShininess)', {
      itemId: itemId,
      newShininess: newShininess
    });
    newShininess = utils.fixFloat(newShininess);
    globals.itemObj[itemId].shininess = newShininess;
    document.getElementById(`${itemId}-shininess-input`).value = newShininess;
  },
  setOpacity: function(itemId, newOpacity) {
    logUtils.debug('(setters.setOpacity)', {
      itemId: itemId,
      newOpacity: newOpacity
    });
    newOpacity = utils.fixFloat(newOpacity);
    if(newOpacity > 1) {
      newOpacity = 1;
    } else if(newOpacity < 0) {
      newOpacity = 0;
    }
    globals.itemObj[itemId].opacity = newOpacity;
    document.getElementById(`${itemId}-opacity-input`).value = newOpacity;
  },
  setTexture: function(itemId, newTexture) {
    logUtils.debug('(setters.setTexture)', {
      itemId: itemId,
      newTexture: newTexture
    });
    if(newTexture > globals.textureUnitArr.length - 1) {
      newTexture = globals.textureUnitArr.length - 1;
    } else if(newTexture < 0) {
      newTexture = 0;
    }
    globals.itemObj[itemId].texture = newTexture;
    document.getElementById(`${itemId}-texture-input`).value = newTexture;
  },
  setXTraslation: function(itemId, newXTraslation) {
    logUtils.debug('(setters.setXTraslation)', {
      itemId: itemId,
      newXTraslation: newXTraslation
    });
    newXTraslation = utils.fixFloat(newXTraslation);
    globals.itemObj[itemId].xTraslation = newXTraslation;
    document.getElementById(`${itemId}-x-traslation-input`).value = newXTraslation;
  },
  setYTraslation: function(itemId, newYTraslation) {
    logUtils.debug('(setters.setYTraslation)', {
      itemId: itemId,
      newYTraslation: newYTraslation
    });
    newYTraslation = utils.fixFloat(newYTraslation);
    globals.itemObj[itemId].yTraslation = newYTraslation;
    document.getElementById(`${itemId}-y-traslation-input`).value = newYTraslation;
  },
  setZTraslation: function(itemId, newZTraslation) {
    logUtils.debug('(setters.setZTraslation)', {
      itemId: itemId,
      newZTraslation: newZTraslation
    });
    newZTraslation = utils.fixFloat(newZTraslation);
    globals.itemObj[itemId].zTraslation = newZTraslation;
    document.getElementById(`${itemId}-z-traslation-input`).value = newZTraslation;
  },
  setYRotationAngle: function(itemId, newYRotationAngle) {
    logUtils.debug('(setters.setYRotationAngle)', {
      itemId: itemId,
      newYRotationAngle: newYRotationAngle
    });
    newYRotationAngle = utils.fixFloat(utils.fixFloat(newYRotationAngle) + 360 % 360);
    globals.itemObj[itemId].yRotationAngle = utils.degToRad(newYRotationAngle);
    document.getElementById(`${itemId}-y-rotation-input`).value = newYRotationAngle;
  },
  setZRotationAngle: function(itemId, newZRotationAngle) {
    logUtils.debug('(setters.setZRotationAngle)', {
      itemId: itemId,
      newZRotationAngle: newZRotationAngle
    });
    newZRotationAngle = utils.fixFloat(utils.fixFloat(newZRotationAngle) + 360 % 360);
    globals.itemObj[itemId].zRotationAngle = utils.degToRad(newZRotationAngle);
    document.getElementById(`${itemId}-z-rotation-input`).value = newZRotationAngle;
  },
  setXRotationAngle: function(itemId, newXRotationAngle) {
    logUtils.debug('(setters.setXRotationAngle)', {
      itemId: itemId,
      newXRotationAngle: newXRotationAngle
    });
    newXRotationAngle = utils.fixFloat(utils.fixFloat(newXRotationAngle) + 360 % 360);
    globals.itemObj[itemId].xRotationAngle = utils.degToRad(newXRotationAngle);
    document.getElementById(`${itemId}-x-rotation-input`).value = newXRotationAngle;
  }
};
