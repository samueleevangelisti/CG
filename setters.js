var fovyInputElement = document.getElementById('fovy-input');

function setFovy(newFovy) {
  log(`setFovy(${newFovy})`);
  fovy = degToRad(newFovy);
  fovyInputElement.value = radToDeg(fovy).toFixed(2);
}

////////////////////////////////////////////////////////////

var nearInputElement = document.getElementById('near-input');

function setNear(newNear) {
  log(`setNear(${newNear})`);
  near = newNear;
  if(near > far) {
    near = far;
  } else if(near < 1) {
    near = 1;
  }
  nearInputElement.value = near;
}

////////////////////////////////////////////////////////////

var farInputElement = document.getElementById('far-input');

function setFar(newFar) {
  log(`setFar(${newFar})`);
  far = newFar
  if(far > 100) {
    far = 100;
  } else if(far < near) {
    far = near;
  }
  farInputElement.value = far;
}

////////////////////////////////////////////////////////////

var distanceInputElement = document.getElementById('distance-input');

function setDistance(newDistance) {
  log(`setDistance(${newDistance})`);
  distance = newDistance;
  if(distance > 99) {
    distance = 99;
  }else if(distance < 2) {
    distance = 2;
  }
  distanceInputElement.value = distance;
}

////////////////////////////////////////////////////////////

var thetaInputElement =  document.getElementById('theta-input');

function setTheta(newTheta) {
  log(`setTheta(${newTheta})`);
  theta = (degToRad(newTheta) + degToRad(360)) % degToRad(360);
  thetaInputElement.value = radToDeg(theta).toFixed(2);
}

////////////////////////////////////////////////////////////

var phiInputElement =  document.getElementById('phi-input');

function setPhi(newPhi) {
  // XXX TODO DSE per il momento è limitato tra 1 e 179, successivamente bisogna rendere consona la trasformazione
  log(`setPhi(${newPhi})`);
  phi = degToRad(newPhi);
  if(phi > degToRad(179)) {
    phi = degToRad(179);
  } else if(phi < degToRad(1)) {
    phi = degToRad(1);
  }
  phiInputElement.value = radToDeg(phi).toFixed(2);
}

////////////////////////////////////////////////////////////

var targetInputElement = document.getElementById('target-input');

function setTarget(newTarget) {
  log(`setTarget(${JSON.stringify(newTarget)})`);
  target = newTarget;
  targetInputElement.value = JSON.stringify(target);
}

////////////////////////////////////////////////////////////

var viewUpInputElement = document.getElementById('view-up-input');

function setViewUp(newViewUp) {
  log(`setViewUp(${JSON.stringify(newViewUp)})`);
  viewUp = newViewUp;
  viewUpInputElement.value = JSON.stringify(viewUp);
}

////////////////////////////////////////////////////////////

var yRotationInputElement = document.getElementById('y-rotation-input');

function setYRotationAngle(newYRotationAngle) {
  log(`setYRotationAngle(${newYRotationAngle})`);
  yRotationAngle = (degToRad(newYRotationAngle) + degToRad(360)) % degToRad(360);
  yRotationInputElement.value = radToDeg(yRotationAngle).toFixed(2);
}

////////////////////////////////////////////////////////////

var zRotationInputElement = document.getElementById('z-rotation-input');

function setZRotationAngle(newZRotationAngle) {
  log(`setZRotationAngle(${newZRotationAngle})`);
  zRotationAngle = (degToRad(newZRotationAngle) + degToRad(360)) % degToRad(360);
  zRotationInputElement.value = radToDeg(zRotationAngle).toFixed(2);
}

////////////////////////////////////////////////////////////

var xRotationInputElement = document.getElementById('x-rotation-input');

function setXRotationAngle(newXRotationAngle) {
  log(`setXRotationAngle(${newXRotationAngle})`);
  xRotationAngle = (degToRad(newXRotationAngle) + degToRad(360)) % degToRad(360);
  xRotationInputElement.value = radToDeg(xRotationAngle).toFixed(2);
}

////////////////////////////////////////////////////////////

var cameraInputElement = document.getElementById('camera-input');

function setCameraPosition(newCameraPosition) {
  cameraPosition = newCameraPosition;
  cameraInputElement.value = JSON.stringify(cameraPosition);
}
