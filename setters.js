var fovyTdElement = document.getElementById('fovy-td');

function setFovy(newFovy) {
  log(`setFovy(${newFovy})`);
  fovy = degToRad(newFovy);
  fovyTdElement.innerHTML = `${radToDeg(fovy).toFixed(2)}°`;
}

function changeFovy(deltaFovy) {
  log(`changeFovy(${deltaFovy})`);
  fovy += degToRad(deltaFovy);
  fovyTdElement.innerHTML = `${radToDeg(fovy).toFixed(2)}°`;
}

////////////////////////////////////////////////////////////

var nearTdElement = document.getElementById('near-td');

function setNear(newNear) {
  log(`setNear(${newNear})`);
  near = newNear
  nearTdElement.innerHTML = near;
}

function changeNear(deltaNear) {
  log(`changeNear(${deltaNear})`);
  near += deltaNear;
  if(near > far) {
    near = far;
  } else if(near < 1) {
    near = 1;
  }
  nearTdElement.innerHTML = near;
}

////////////////////////////////////////////////////////////

var farTdElement = document.getElementById('far-td');

function setFar(newFar) {
  log(`setFar(${newFar})`);
  far = newFar
  farTdElement.innerHTML = far;
}

function changeFar(deltaFar) {
  log(`changeFar(${deltaFar})`);
  far += deltaFar;
  if(far > 100) {
    far = 100;
  } else if(far < near) {
    far = near;
  }
  farTdElement.innerHTML = far;
}

////////////////////////////////////////////////////////////

var thetaTdElement =  document.getElementById('theta-td');

function setTheta(newTheta) {
  log(`setTheta(${newTheta})`);
  theta = degToRad(newTheta);
  thetaTdElement.innerHTML = `${radToDeg(theta).toFixed(2)}°`;
}

function changeTheta(deltaTheta) {
  log(`changeTheta(${deltaTheta})`);
  theta = ((theta + degToRad(deltaTheta)) + degToRad(360)) % degToRad(360);
  thetaTdElement.innerHTML = `${radToDeg(theta).toFixed(2)}°`;
}

////////////////////////////////////////////////////////////

var phiTdElement =  document.getElementById('phi-td');

function setPhi(newPhi) {
  log(`setPhi(${newPhi})`);
  phi = degToRad(newPhi);
  phiTdElement.innerHTML = `${radToDeg(phi).toFixed(2)}°`;
}

function changePhi(deltaPhi) {
  // XXX TODO DSE per il momento è limitato tra 1 e 179, successivamente bisogna rendere consona la trasformazione
  log(`changePhi(${deltaPhi})`);
  phi += degToRad(deltaPhi);
  if(phi > degToRad(179)) {
    phi = degToRad(179);
  } else if(phi < degToRad(1)) {
    phi = degToRad(1);
  }
  phiTdElement.innerHTML = `${radToDeg(phi).toFixed(2)}°`;
}

////////////////////////////////////////////////////////////

var targetTdElement = document.getElementById('target-td');

function setTarget(newTarget) {
  log(`setTarget(${JSON.stringify(newTarget)})`);
  target = newTarget;
  targetTdElement.innerHTML = JSON.stringify(target);
}

function changeTarget(deltaTarget) {
  log(`changeTarget(${deltaTarget})`);
  target[0] += deltaTarget[0];
  target[1] += deltaTarget[1];
  target[2] += deltaTarget[2];
  targetTdElement.innerHTML = JSON.stringify(target);
}

////////////////////////////////////////////////////////////

var distanceTdElement = document.getElementById('distance-td');

function setDistance(newDistance) {
  log(`setDistance(${newDistance})`);
  distance = newDistance;
  distanceTdElement.innerHTML = distance;
}

function changeDistance(deltaDistance) {
  log(`changeDistance(${deltaDistance})`);
  distance += deltaDistance;
  if(distance > 99) {
    distance = 99;
  }else if(distance < 2) {
    distance = 2;
  }
  distanceTdElement.innerHTML = distance;
}

////////////////////////////////////////////////////////////

var yRotationTdElement = document.getElementById('y-rotation-td');

function setYRotationAngle(newYRotationAngle) {
  log(`setYRotationAngle(${newYRotationAngle})`);
  yRotationAngle = newYRotationAngle;
  yRotationTdElement.innerHTML = `${radToDeg(yRotationAngle).toFixed(2)}°`;
}

function changeYRotationAngle(deltaYRotationAngle) {
  log(`changeYRotationAngle(${deltaYRotationAngle})`);
  yRotationAngle = ((yRotationAngle + degToRad(deltaYRotationAngle)) + degToRad(360)) % degToRad(360);
  yRotationTdElement.innerHTML = `${radToDeg(yRotationAngle).toFixed(2)}°`;
}

////////////////////////////////////////////////////////////

var zRotationTdElement = document.getElementById('z-rotation-td');

function setZRotationAngle(newZRotationAngle) {
  log(`setZRotationAngle(${newZRotationAngle})`);
  zRotationAngle = newZRotationAngle;
  zRotationTdElement.innerHTML = `${radToDeg(zRotationAngle).toFixed(2)}°`;
}

function changeZRotationAngle(deltaZRotationAngle) {
  log(`changeZRotationAngle(${deltaZRotationAngle})`);
  zRotationAngle = ((zRotationAngle + degToRad(deltaZRotationAngle)) + degToRad(360)) % degToRad(360);
  zRotationTdElement.innerHTML = `${radToDeg(zRotationAngle).toFixed(2)}°`;
}

////////////////////////////////////////////////////////////

var xRotationTdElement = document.getElementById('x-rotation-td');

function setXRotationAngle(newXRotationAngle) {
  log(`setXRotationAngle(${newXRotationAngle})`);
  xRotationAngle = newXRotationAngle;
  xRotationTdElement.innerHTML = `${radToDeg(xRotationAngle).toFixed(2)}°`;
}

function changeXRotationAngle(deltaXRotationAngle) {
  log(`changeXRotationAngle(${deltaXRotationAngle})`);
  xRotationAngle = ((xRotationAngle + degToRad(deltaXRotationAngle)) + degToRad(360)) % degToRad(360);
  xRotationTdElement.innerHTML = `${radToDeg(xRotationAngle).toFixed(2)}°`;
}

////////////////////////////////////////////////////////////

var cameraTdElement = document.getElementById('camera-td');

function setCameraPosition(newCameraPosition) {
  cameraPosition = newCameraPosition;
  cameraTdElement.innerHTML = JSON.stringify(cameraPosition);
}
